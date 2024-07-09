import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;
const ownerEmail = process.env.OWNER_EMAIL; // Ensure you add the owner's email to your environment variables

export async function POST(req, res) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);
  try {
    // Send email to the owner with the user's email as reply-to
    await resend.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      reply_to: email, // Owner's reply goes to the user
      subject: subject, // Subject remains the same
      react: (
        <>
          <h1>Thank you for contacting us!</h1>
          <p>We have received your message and will get back to you shortly.</p>
          <p>Your message:</p>
          <p>{message}</p>
        </>
      ),
    });

    // Send confirmation email to the user with the owner's email as reply-to
    const data = await resend.emails.send({
      from: fromEmail,
      to: [email],
      reply_to: ownerEmail, // User's reply goes to the owner
      subject: `Re: ${subject}`,
      react: (
        <>
          <h1>Thank you for contacting us!</h1>
          <p>We have received your message and will get back to you shortly.</p>
          <p>Your message:</p>
          <p>{message}</p>
        </>
      ),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
