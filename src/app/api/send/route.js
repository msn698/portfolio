import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL;
const ownerEmail = process.env.OWNER_EMAIL;

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

async function sendEmail(emailData) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}

export async function POST(req) {
  const { email, subject, message } = await req.json();
  
  const emailTemplate = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2d2d2d;">New Contact Message</h1>
      <p><strong>From:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${message.replace(/\n/g, '<br/>')}
      </div>
    </div>
  `;

  const confirmationTemplate = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2d2d2d;">Thank you for your message!</h1>
      <p>I have received your message and will get back to you shortly.</p>
      <p><strong>Your message details:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      </div>
    </div>
  `;

  try {
    // Send email to the owner
    await sendEmail({
      from: fromEmail,
      to: ownerEmail,
      reply_to: email,
      subject: subject,
      html: emailTemplate
    });

    // Send confirmation to the user
    const data = await sendEmail({
      from: fromEmail,
      to: email,
      reply_to: ownerEmail,
      subject: `Re: ${subject}`,
      html: confirmationTemplate
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
