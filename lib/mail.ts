import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendVerificationEmail = async (email: string, token: string) => {
  const comfirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email - Secret Verse",
    text: `
Hi there,

Thank you for signing up with Secret Verse.
Please confirm your email address to unlock your account.

Verify your email: ${comfirmLink}

If you didn’t request this, you can ignore this email.

— Secret Verse Team
`,
    html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Email Verification</title>
  </head>
  <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#0d0d0d; color:#f5f5f5;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0d0d0d; padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#1a1a1a; border-radius:12px; overflow:hidden; box-shadow:0 0 12px rgba(0,0,0,0.4);">
            
            <!-- Header -->
            <tr>
              <td align="center" style="padding:30px; background:linear-gradient(135deg,#d4af37,#b8860b);">
                <h1 style="margin:0; font-size:28px; font-weight:bold; color:#000;">Secret Verse</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px; color:#e5e5e5; font-size:16px; line-height:1.6;">
                <h2 style="color:#d4af37; margin-top:0;">Verify Your Email</h2>
                <p>Hi there,</p>
                <p>Thank you for signing up with <strong>Secret Verse</strong>. Please confirm your email address to unlock your account and explore everything we’ve built for you.</p>
                
                <p style="text-align:center; margin:30px 0;">
                  <a href="${comfirmLink}" 
                     style="background:linear-gradient(135deg,#d4af37,#b8860b); color:#000; padding:14px 28px; text-decoration:none; border-radius:8px; font-weight:bold; display:inline-block;">
                    Verify Email
                  </a>
                </p>
                
                <p>If the button above doesn’t work, copy and paste this link into your browser:</p>
                <p style="word-break:break-word; color:#d4af37;">
                  <a href="${comfirmLink}" style="color:#d4af37; text-decoration:none;">${comfirmLink}</a>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:20px; background-color:#111; color:#aaa; font-size:12px; text-align:center;">
                <p style="margin:0;">© ${new Date().getFullYear()} Secret Verse. All rights reserved.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,
  });
};
