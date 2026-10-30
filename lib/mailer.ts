import nodemailer from 'nodemailer';
import { HCP_COMPANY } from '@/data/company';

export interface MailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

/**
 * SMTP is configured through environment variables (see .env.example).
 * For the company Gmail inbox use host smtp.gmail.com, port 465 and a Google "App password".
 */
export function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export function enquiryRecipient() {
  return process.env.ENQUIRY_RECIPIENT_EMAIL || HCP_COMPANY.contact.email;
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

export async function sendMail(message: MailMessage) {
  const from = process.env.ENQUIRY_FROM_EMAIL || process.env.SMTP_USER;
  await getTransporter().sendMail({
    from: `"${HCP_COMPANY.legalName}" <${from}>`,
    ...message,
  });
}

export function escapeHtml(value: string | undefined | null) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Wraps email body content in a simple branded, email-client-safe layout. */
export function emailLayout(title: string, body: string) {
  return `<!doctype html>
<html><body style="margin:0;background:#F5F9FC;font-family:Arial,Helvetica,sans-serif;color:#0F1E33">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F9FC;padding:24px 0">
<tr><td align="center">
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#ffffff;border:1px solid #E3EAF2;border-radius:12px;overflow:hidden">
<tr><td style="background:linear-gradient(120deg,#023F85,#0474C2 55%,#32B15B);background-color:#023F85;padding:20px 28px;color:#ffffff">
<div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:.85">${escapeHtml(HCP_COMPANY.legalName)}</div>
<div style="font-size:20px;font-weight:bold;margin-top:4px">${escapeHtml(title)}</div>
</td></tr>
<tr><td style="padding:24px 28px;font-size:14px;line-height:1.6">${body}</td></tr>
<tr><td style="padding:16px 28px;background:#F5F9FC;font-size:12px;color:#6B7A8C;border-top:1px solid #E3EAF2">
${escapeHtml(HCP_COMPANY.address.formatted)}<br/>
${escapeHtml(HCP_COMPANY.contact.phoneDisplay.join(' / '))} · ${escapeHtml(HCP_COMPANY.contact.email)}
</td></tr>
</table>
</td></tr></table>
</body></html>`;
}
