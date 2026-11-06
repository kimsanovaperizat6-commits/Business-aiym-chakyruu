export type Language = 'kg' | 'ru';

export interface RSVPFormData {
  fullName: string;
  phone?: string;
  company?: string;
}

export interface RSVPResponse {
  success: boolean;
  rsvpId?: string;
  fullName?: string;
  gatewayConfigured?: boolean;
  gatewaySent?: boolean;
  gatewayDetails?: string;
  targetPhone?: string;
  targetPhoneClean?: string;
  smsMessage?: string;
  timestamp?: string;
  error?: string;
}
