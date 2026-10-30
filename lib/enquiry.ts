import fs from 'fs';
import path from 'path';
import {
  ContactFormData,
  ContactFormSchema,
  QuotationFormData,
  QuotationFormSchema,
} from './schemas';
import { emailLayout, enquiryRecipient, escapeHtml, isMailConfigured, sendMail } from './mailer';

export interface SubmissionResult {
  success: boolean;
  referenceId: string;
  timestamp: string;
  message: string;
  /** true when the enquiry email reached the SMTP server */
  emailed: boolean;
  errors?: Record<string, string>;
}

type StoredRecord = { kind: 'enquiry' | 'contact'; referenceId: string; createdAt: string; emailed: boolean } & (
  | QuotationFormData
  | ContactFormData
);

const STORAGE_PATH = path.join(process.cwd(), 'data', 'submissions.json');

function generateReferenceId(prefix: string): string {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}-${year}-${rand}`;
}

/** Local backup log so no enquiry is lost even if email delivery fails (best effort; read-only hosts skip it). */
function saveLocally(record: StoredRecord): void {
  try {
    let list: StoredRecord[] = [];
    if (fs.existsSync(STORAGE_PATH)) list = JSON.parse(fs.readFileSync(STORAGE_PATH, 'utf8'));
    list.unshift(record);
    fs.writeFileSync(STORAGE_PATH, JSON.stringify(list.slice(0, 200), null, 2), 'utf8');
  } catch (err) {
    console.error('[enquiry] local backup skipped:', err);
  }
}

function fieldErrors(issues: { path: (string | number)[]; message: string }[]) {
  const errors: Record<string, string> = {};
  issues.forEach((i) => (errors[i.path.join('.')] = i.message));
  return errors;
}

function row(label: string, value: string | undefined) {
  if (!value) return '';
  return `<tr><td style="padding:6px 12px 6px 0;color:#6B7A8C;white-space:nowrap;vertical-align:top">${escapeHtml(
    label
  )}</td><td style="padding:6px 0;font-weight:bold">${escapeHtml(value)}</td></tr>`;
}

function productTable(data: QuotationFormData) {
  const cell = 'padding:8px 10px;border-bottom:1px solid #E3EAF2;text-align:left;vertical-align:top';
  const rows = data.items
    .map(
      (item, i) => `<tr>
<td style="${cell}">${i + 1}</td>
<td style="${cell}"><strong>${escapeHtml(item.productName)}</strong>${
        item.intendedApplication ? `<br/><span style="color:#6B7A8C;font-size:12px">Use: ${escapeHtml(item.intendedApplication)}</span>` : ''
      }</td>
<td style="${cell}">${escapeHtml(item.grade)}</td>
<td style="${cell}">${escapeHtml(item.quantity)} ${escapeHtml(item.unit)}</td>
<td style="${cell}">${escapeHtml(item.preferredMake || '—')}</td>
</tr>`
    )
    .join('');
  const th = `${cell};background:#EDF6FD;color:#023F85;font-size:12px;text-transform:uppercase`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:13px;margin:8px 0 16px">
<tr><th style="${th}">#</th><th style="${th}">Product</th><th style="${th}">Grade</th><th style="${th}">Quantity</th><th style="${th}">Make</th></tr>
${rows}</table>`;
}

function enquiryEmails(data: QuotationFormData, referenceId: string) {
  const details = `<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px">
${row('Reference', referenceId)}
${row('Name', data.fullName)}
${row('Company', data.companyName)}
${row('Email', data.businessEmail)}
${row('Phone', data.phoneNumber)}
${row('City', `${data.city}, ${data.country}`)}
${row('Buyer type', data.buyerType)}
${row('Deliver to', data.deliveryLocation)}
${row('Packaging', data.packagingPreference)}
${row('COA required', data.requiresCOA ? 'Yes' : 'No')}
</table>`;

  const notes = data.additionalNotes
    ? `<p style="margin:16px 0 0"><strong>Additional notes</strong><br/>${escapeHtml(data.additionalNotes).replace(/\n/g, '<br/>')}</p>`
    : '';

  const textItems = data.items
    .map((it, i) => `${i + 1}. ${it.productName} | Grade: ${it.grade} | Qty: ${it.quantity} ${it.unit} | Make: ${it.preferredMake || '-'}`)
    .join('\n');

  const internal = {
    to: enquiryRecipient(),
    replyTo: data.businessEmail,
    subject: `New Enquiry ${referenceId} — ${data.companyName} (${data.items.length} product${data.items.length > 1 ? 's' : ''})`,
    html: emailLayout(
      `New product enquiry · ${referenceId}`,
      `<p style="margin:0 0 12px">A new enquiry was submitted on the website.</p>
<h3 style="margin:16px 0 4px;font-size:15px;color:#023F85">Products requested</h3>${productTable(data)}
<h3 style="margin:16px 0 4px;font-size:15px;color:#023F85">Buyer details</h3>${details}${notes}`
    ),
    text: `New enquiry ${referenceId}\n\nProducts:\n${textItems}\n\nName: ${data.fullName}\nCompany: ${data.companyName}\nEmail: ${data.businessEmail}\nPhone: ${data.phoneNumber}\nCity: ${data.city}\nDeliver to: ${data.deliveryLocation}\nCOA: ${data.requiresCOA ? 'Yes' : 'No'}\nNotes: ${data.additionalNotes || '-'}`,
  };

  const acknowledgement = {
    to: data.businessEmail,
    replyTo: enquiryRecipient(),
    subject: `We received your enquiry ${referenceId} — Haryana Chemical & Pharmaceuticals`,
    html: emailLayout(
      'Thank you for your enquiry',
      `<p style="margin:0 0 12px">Dear ${escapeHtml(data.fullName)},</p>
<p style="margin:0 0 12px">Thank you for contacting Haryana Chemical &amp; Pharmaceuticals. Our sales desk will confirm grade, availability and pricing for the products below and reply with a formal quotation${
        data.requiresCOA ? ' and Certificate of Analysis' : ''
      }.</p>
<p style="margin:0 0 4px"><strong>Your reference:</strong> ${escapeHtml(referenceId)}</p>
${productTable(data)}
<p style="margin:0">For urgent requirements, simply reply to this email or call us.</p>`
    ),
    text: `Dear ${data.fullName},\n\nThank you for your enquiry (${referenceId}). We will reply with a quotation shortly.\n\n${textItems}`,
  };

  return { internal, acknowledgement };
}

export async function processQuotationEnquiry(payload: unknown): Promise<SubmissionResult> {
  const timestamp = new Date().toISOString();
  const validation = QuotationFormSchema.safeParse(payload);
  if (!validation.success) {
    return {
      success: false,
      referenceId: '',
      timestamp,
      message: 'Please check the highlighted fields and try again.',
      emailed: false,
      errors: fieldErrors(validation.error.errors),
    };
  }

  const data = validation.data;
  const referenceId = generateReferenceId('HCP');
  let emailed = false;

  if (isMailConfigured()) {
    const { internal, acknowledgement } = enquiryEmails(data, referenceId);
    try {
      await sendMail(internal);
      emailed = true;
    } catch (err) {
      console.error(`[enquiry] failed to email ${referenceId}:`, err);
    }
    if (emailed) {
      // The buyer acknowledgement is a courtesy; its failure must not fail the enquiry.
      sendMail(acknowledgement).catch((err) => console.error(`[enquiry] acknowledgement failed for ${referenceId}:`, err));
    }
  } else {
    console.warn(`[enquiry] SMTP not configured — ${referenceId} saved to data/submissions.json only.`);
  }

  saveLocally({ kind: 'enquiry', ...data, referenceId, createdAt: timestamp, emailed });

  if (isMailConfigured() && !emailed) {
    return {
      success: false,
      referenceId,
      timestamp,
      emailed,
      message: 'We could not send your enquiry right now. Please try again, or call / email us directly.',
    };
  }

  return { success: true, referenceId, timestamp, emailed, message: 'Your enquiry has been sent to our sales desk.' };
}

export async function processContactMessage(payload: unknown): Promise<SubmissionResult> {
  const timestamp = new Date().toISOString();
  const validation = ContactFormSchema.safeParse(payload);
  if (!validation.success) {
    return {
      success: false,
      referenceId: '',
      timestamp,
      message: 'Please check the highlighted fields and try again.',
      emailed: false,
      errors: fieldErrors(validation.error.errors),
    };
  }

  const data = validation.data;
  const referenceId = generateReferenceId('MSG');
  let emailed = false;

  if (isMailConfigured()) {
    try {
      await sendMail({
        to: enquiryRecipient(),
        replyTo: data.email,
        subject: `Website message: ${data.subject} — ${data.name}`,
        html: emailLayout(
          'New website message',
          `<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px">
${row('Reference', referenceId)}${row('Name', data.name)}${row('Company', data.company)}${row('Email', data.email)}${row('Phone', data.phone)}${row('Subject', data.subject)}
</table><p style="margin:16px 0 0">${escapeHtml(data.message).replace(/\n/g, '<br/>')}</p>`
        ),
        text: `${data.name} (${data.email}, ${data.phone})\nCompany: ${data.company || '-'}\nSubject: ${data.subject}\n\n${data.message}`,
      });
      emailed = true;
    } catch (err) {
      console.error(`[contact] failed to email ${referenceId}:`, err);
    }
  } else {
    console.warn(`[contact] SMTP not configured — ${referenceId} saved to data/submissions.json only.`);
  }

  saveLocally({ kind: 'contact', ...data, referenceId, createdAt: timestamp, emailed });

  if (isMailConfigured() && !emailed) {
    return {
      success: false,
      referenceId,
      timestamp,
      emailed,
      message: 'We could not send your message right now. Please try again, or call / email us directly.',
    };
  }

  return { success: true, referenceId, timestamp, emailed, message: 'Your message has been sent.' };
}
