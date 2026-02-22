import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// Lazy init — prevents build-time crash when RESEND_API_KEY is not set
function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY || "placeholder");
}

export async function POST(req: NextRequest) {
  // Rate limit: 3 submissions per hour per IP
  const ip = getClientIp(req);
  const limit = rateLimit(`contact:${ip}`, { limit: 3, windowSec: 60 * 60 });

  if (!limit.success) {
    return NextResponse.json(
      { error: "Çok fazla istek. Lütfen daha sonra tekrar deneyin." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek formatı" }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Geçersiz form verisi", details: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  const contactEmail = process.env.CONTACT_EMAIL;
  const emailFrom = process.env.EMAIL_FROM || "Comet Control <noreply@cometcontrol.com>";

  // If no API key configured, log and return success (dev mode)
  if (!process.env.RESEND_API_KEY) {
    console.log("[Contact Form - DEV MODE]", { name, email, subject, message });
    return NextResponse.json({ success: true });
  }

  try {
    const resend = getResend();
    await resend.emails.send({
      from: emailFrom,
      to: contactEmail || email,
      replyTo: email,
      subject: `[İletişim Formu] ${subject}`,
      html: buildContactEmail({ name, email, subject, message }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API] Email sending failed:", error);
    return NextResponse.json(
      { error: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}

function buildContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>İletişim Formu</title>
</head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,56,158,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:#00389e;padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">
                Comet Control
              </h1>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">
                İletişim Formu Bildirimi
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 24px;color:#0a0f1c;font-size:18px;font-weight:600;">
                Yeni Mesaj: ${escapeHtml(data.subject)}
              </h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;padding:24px;margin-bottom:24px;">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                    <span style="color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Gönderen</span><br>
                    <span style="color:#0a0f1c;font-size:15px;font-weight:600;margin-top:4px;display:block;">${escapeHtml(data.name)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;">
                    <span style="color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">E-posta</span><br>
                    <a href="mailto:${escapeHtml(data.email)}" style="color:#00389e;font-size:15px;font-weight:500;margin-top:4px;display:block;text-decoration:none;">${escapeHtml(data.email)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <span style="color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Konu</span><br>
                    <span style="color:#0a0f1c;font-size:15px;font-weight:500;margin-top:4px;display:block;">${escapeHtml(data.subject)}</span>
                  </td>
                </tr>
              </table>

              <div style="background:#f8fafc;border-radius:12px;padding:24px;border-left:4px solid #00389e;">
                <p style="margin:0 0 8px;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Mesaj</p>
                <p style="margin:0;color:#0a0f1c;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
              </div>

              <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e2e8f0;">
                <a href="mailto:${escapeHtml(data.email)}"
                   style="display:inline-block;background:#00389e;color:#ffffff;padding:14px 28px;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;">
                  Yanıtla →
                </a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
              <p style="margin:0;color:#94a3b8;font-size:12px;text-align:center;">
                Bu e-posta Comet Control web sitesi iletişim formu aracılığıyla gönderilmiştir.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
