'use server';

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;
const ownerEmail = process.env.OWNER_EMAIL; // Ensure you add the owner's email to your environment variables

export const runtime = 'edge';

export async function POST(req) {
  const { email, subject, message } = await req.json();
  
  const emailContent = {
    subject: subject,
    from: fromEmail,
    text: `Message from: ${email}\n\nSubject: ${subject}\n\nMessage: ${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2d2d2d;">New Contact Message</h1>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${message.replace(/\n/g, '<br/>')}
        </div>
      </div>
    `
  };

  try {
    // Send email to the owner
    await resend.emails.send({
      ...emailContent,
      to: [ownerEmail],
      reply_to: email
    });

    // Send confirmation to the user
    const data = await resend.emails.send({
      from: fromEmail,
      to: [email],
      reply_to: ownerEmail,
      subject: `Re: ${subject}`,
      html: `
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
      `
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
