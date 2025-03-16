import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;
const ownerEmail = process.env.OWNER_EMAIL; // Ensure you add the owner's email to your environment variables

export async function POST(req) {
  const { email, subject, message } = await req.json();
  
  const emailTemplate = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #2d2d2d;">Thank you for contacting us!</h1>
        <p>We have received your message and will get back to you shortly.</p>
        <p><strong>Your message:</strong></p>
        <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
      </body>
    </html>
  `;

  try {
    // Send email to the owner
    await resend.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      reply_to: email,
      subject: subject,
      html: emailTemplate
    });

    // Send confirmation email to the user
    const data = await resend.emails.send({
      from: fromEmail,
      to: [email],
      reply_to: ownerEmail,
      subject: `Re: ${subject}`,
      html: emailTemplate
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
