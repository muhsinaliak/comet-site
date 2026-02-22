import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { quoteFormSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { z } from "zod";

// Lazy init — prevents build-time crash when RESEND_API_KEY is not set
function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY || "placeholder");
}

const quoteItemSchema = z.object({
  productId: z.string(),
  productName: z.object({ tr: z.string(), en: z.string() }),
  productSku: z.string(),
  quantity: z.number().int().positive().max(9999),
  notes: z.string().max(500).optional().default(""),
  unitPrice: z
    .object({
      amount: z.number(),
      currency: z.enum(["TRY", "USD", "EUR"]),
      discountedAmount: z.number().optional(),
    })
    .nullable()
    .optional(),
});

const quoteRequestSchema = z.object({
  contact: quoteFormSchema,
  items: z.array(quoteItemSchema).min(1).max(100),
});

export async function POST(req: NextRequest) {
  // Rate limit: 3 submissions per hour per IP
  const ip = getClientIp(req);
  const limit = rateLimit(`quote:${ip}`, { limit: 3, windowSec: 60 * 60 });

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

  const parsed = quoteRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Geçersiz form verisi", details: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { contact, items } = parsed.data;

  const contactEmail = process.env.CONTACT_EMAIL;
  const emailFrom = process.env.EMAIL_FROM || "Comet Control <noreply@cometcontrol.com>";

  // If no API key configured, log and return success (dev mode)
  if (!process.env.RESEND_API_KEY) {
    console.log("[Quote Form - DEV MODE]", { contact, items });
    return NextResponse.json({ success: true });
  }

  try {
    const resend = getResend();
    await resend.emails.send({
      from: emailFrom,
      to: contactEmail || contact.email,
      replyTo: contact.email,
      subject: `[Teklif Talebi] ${contact.companyName} - ${items.length} Ürün`,
      html: buildQuoteEmail({ contact, items }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Quote API] Email sending failed:", error);
    return NextResponse.json(
      { error: "Teklif talebiniz gönderilemedi. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}

type QuoteItem = z.infer<typeof quoteItemSchema>;
type QuoteContact = z.infer<typeof quoteFormSchema>;

const CURRENCY_SYMBOLS: Record<string, string> = {
  TRY: "₺",
  USD: "$",
  EUR: "€",
};

function formatPrice(amount: number, currency: string): string {
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  return `${symbol}${amount.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function buildQuoteEmail(data: { contact: QuoteContact; items: QuoteItem[] }): string {
  const { contact, items } = data;

  const itemRows = items
    .map(
      (item) => `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;">
        <strong style="color:#0a0f1c;font-size:14px;">${escapeHtml(item.productName.tr)}</strong><br>
        <span style="color:#64748b;font-size:12px;font-family:monospace;">${escapeHtml(item.productSku)}</span>
        ${item.notes ? `<br><span style="color:#94a3b8;font-size:12px;font-style:italic;">${escapeHtml(item.notes)}</span>` : ""}
      </td>
      <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;text-align:center;color:#0a0f1c;font-weight:600;">
        ${item.quantity}
      </td>
      <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;text-align:right;color:#00389e;font-weight:600;">
        ${
          item.unitPrice
            ? formatPrice(
                (item.unitPrice.discountedAmount ?? item.unitPrice.amount) * item.quantity,
                item.unitPrice.currency
              )
            : "—"
        }
      </td>
    </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Teklif Talebi</title>
</head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="640" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,56,158,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#00389e,#0052cc);padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">
                Comet Control
              </h1>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">
                Yeni Teklif Talebi — ${new Date().toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" })}
              </p>
            </td>
          </tr>
          <!-- Company Info -->
          <tr>
            <td style="padding:32px 40px 0;">
              <h2 style="margin:0 0 20px;color:#0a0f1c;font-size:18px;font-weight:700;">
                Müşteri Bilgileri
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;padding:4px 0;">
                ${(
                  [
                    ["Firma Adı", contact.companyName],
                    ["Yetkili Kişi", contact.contactPerson],
                    contact.position ? ["Pozisyon", contact.position] : null,
                    ["E-posta", contact.email],
                    ["Telefon", contact.phone],
                    ["Tercihli İletişim", contact.preferredContactMethod === "email" ? "E-posta" : "Telefon"],
                    contact.deadline ? ["Termin", contact.deadline] : null,
                  ] as (string[] | null)[]
                )
                  .filter((row): row is string[] => row !== null)
                  .map(
                    ([label, value]) => `
                <tr>
                  <td style="padding:10px 20px;border-bottom:1px solid #e2e8f0;width:40%;">
                    <span style="color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">${escapeHtml(label)}</span>
                  </td>
                  <td style="padding:10px 20px;border-bottom:1px solid #e2e8f0;">
                    <span style="color:#0a0f1c;font-size:14px;font-weight:500;">${escapeHtml(value)}</span>
                  </td>
                </tr>`
                  )
                  .join("")}
              </table>
            </td>
          </tr>
          <!-- Project Description -->
          <tr>
            <td style="padding:24px 40px 0;">
              <div style="background:#eff6ff;border-radius:12px;padding:20px;border-left:4px solid #00389e;">
                <p style="margin:0 0 8px;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Proje Açıklaması</p>
                <p style="margin:0;color:#0a0f1c;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(contact.projectDescription)}</p>
              </div>
            </td>
          </tr>
          <!-- Products -->
          <tr>
            <td style="padding:24px 40px 0;">
              <h2 style="margin:0 0 16px;color:#0a0f1c;font-size:18px;font-weight:700;">
                Talep Edilen Ürünler (${items.length} kalem)
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
                <thead>
                  <tr style="background:#f8fafc;">
                    <th style="padding:12px 16px;text-align:left;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Ürün</th>
                    <th style="padding:12px 16px;text-align:center;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Adet</th>
                    <th style="padding:12px 16px;text-align:right;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Tutar</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRows}
                </tbody>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:32px 40px;">
              <a href="mailto:${escapeHtml(contact.email)}"
                 style="display:inline-block;background:#00f26f;color:#0a0f1c;padding:14px 28px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;">
                Müşteriyle İletişime Geç →
              </a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
              <p style="margin:0;color:#94a3b8;font-size:12px;text-align:center;">
                Bu e-posta Comet Control web sitesi teklif formu aracılığıyla gönderilmiştir.
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
