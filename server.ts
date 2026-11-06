import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Target phone specified by the event organizer
const ORGANIZER_PHONE = '+996551376755';
const ORGANIZER_PHONE_CLEAN = '996551376755';

interface RSVPRecord {
  id: string;
  fullName: string;
  phone?: string;
  company?: string;
  language: 'kg' | 'ru';
  createdAt: string;
  status: 'sent_gateway' | 'sent_direct_device' | 'pending';
  gatewayResponse?: string;
}

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const rsvpFile = path.join(dataDir, 'rsvps.json');

function getRSVPs(): RSVPRecord[] {
  try {
    if (fs.existsSync(rsvpFile)) {
      const data = fs.readFileSync(rsvpFile, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to read RSVPs:', err);
  }
  return [];
}

function saveRSVP(record: RSVPRecord) {
  const current = getRSVPs();
  current.unshift(record);
  try {
    fs.writeFileSync(rsvpFile, JSON.stringify(current, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save RSVP:', err);
  }
}

// API endpoint for RSVP submission
app.post('/api/rsvp', async (req, res) => {
  try {
    const { fullName, phone, company, language = 'ru', directSent } = req.body;

    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return res.status(400).json({
        success: false,
        error: language === 'kg' ? 'Сураныч, аты-жөнүңүздү толук жазыңыз' : 'Пожалуйста, укажите ФИО'
      });
    }

    const trimmedName = fullName.trim();
    const smsMessage = language === 'kg'
      ? `AIYM BUSINESS-2026: Форумга катышуу ырасталды! Катышуучу: ${trimmedName}${company ? ` (${company})` : ''}${phone ? `, Тел: ${phone}` : ''}`
      : `AIYM BUSINESS-2026: Подтверждение участия в форуме! Участник: ${trimmedName}${company ? ` (${company})` : ''}${phone ? `, Тел: ${phone}` : ''}`;

    const rsvpRecord: RSVPRecord = {
      id: `RSVP-${Date.now().toString().slice(-6)}`,
      fullName: trimmedName,
      phone: phone?.trim(),
      company: company?.trim(),
      language,
      createdAt: new Date().toISOString(),
      status: directSent ? 'sent_direct_device' : 'pending'
    };

    // Check if an SMS Gateway API is configured via environment variables
    const smsApiKey = process.env.SMS_API_KEY || process.env.NIKASMS_API_KEY;
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_PHONE_NUMBER;

    let gatewaySent = false;
    let gatewayDetails = '';

    if (twilioSid && twilioToken && twilioFrom) {
      try {
        const auth = Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64');
        const params = new URLSearchParams();
        params.append('To', ORGANIZER_PHONE);
        params.append('From', twilioFrom);
        params.append('Body', smsMessage);

        const twilioRes = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${auth}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
          }
        );

        if (twilioRes.ok) {
          gatewaySent = true;
          gatewayDetails = 'Twilio SMS Gateway: Delivered';
          rsvpRecord.status = 'sent_gateway';
          rsvpRecord.gatewayResponse = gatewayDetails;
        } else {
          const errText = await twilioRes.text();
          gatewayDetails = `Twilio Error: ${errText}`;
        }
      } catch (err: any) {
        gatewayDetails = `Gateway dispatch exception: ${err.message}`;
      }
    } else if (smsApiKey) {
      // Generic SMS provider integration (e.g. Nikasms Kyrgyzstan or custom endpoint)
      try {
        const smsEndpoint = process.env.SMS_API_ENDPOINT || 'https://api.nikasms.com/send';
        const apiRes = await fetch(smsEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${smsApiKey}`
          },
          body: JSON.stringify({
            phone: ORGANIZER_PHONE_CLEAN,
            message: smsMessage,
            sender: 'AIYM2026'
          })
        });
        if (apiRes.ok) {
          gatewaySent = true;
          gatewayDetails = 'Provider SMS: Delivered';
          rsvpRecord.status = 'sent_gateway';
        }
      } catch (err: any) {
        gatewayDetails = `SMS API exception: ${err.message}`;
      }
    }

    saveRSVP(rsvpRecord);

    return res.json({
      success: true,
      rsvpId: rsvpRecord.id,
      fullName: trimmedName,
      gatewayConfigured: Boolean(twilioSid || smsApiKey),
      gatewaySent,
      gatewayDetails,
      targetPhone: ORGANIZER_PHONE,
      targetPhoneClean: ORGANIZER_PHONE_CLEAN,
      smsMessage,
      timestamp: rsvpRecord.createdAt
    });
  } catch (error: any) {
    console.error('RSVP API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера при обработке заявки'
    });
  }
});

// Endpoint to view confirmed RSVPs
app.get('/api/rsvp', (_req, res) => {
  const rsvps = getRSVPs();
  res.json({
    count: rsvps.length,
    rsvps
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`AIYM BUSINESS-2026 Invitation Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
