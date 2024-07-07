import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;
const ownerEmail = process.env.OWNER_EMAIL; // Ensure you add the owner's email to your environment variables

export async function POST(req, res) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);
  try {
    // Send email to the owner
    await resend.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      subject: subject,
      react: (
        <>
          <h1>{subject}</h1>
          <p>New message from: {email}</p>
          <p>{message}</p>
        </>
      ),
    });

    // Send confirmation email to the user
    const data = await resend.emails.send({
      from: fromEmail,
      to: [email],
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
