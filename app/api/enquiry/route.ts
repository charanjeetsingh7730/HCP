import { NextRequest, NextResponse } from 'next/server';
import { processQuotationEnquiry } from '@/lib/enquiry';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await processQuotationEnquiry(body);
    const status = result.success ? 200 : result.errors ? 400 : 502;
    return NextResponse.json(result, { status });
  } catch (error) {
    console.error('[api/enquiry]', error);
    return NextResponse.json(
      { success: false, referenceId: '', emailed: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
