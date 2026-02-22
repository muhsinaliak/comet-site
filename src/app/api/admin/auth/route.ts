import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ADMIN_PASSWORD environment variable is not set");
    }
    // Development fallback only — never used in production
    return "comet2024-dev";
  }
  return password;
}

export async function POST(req: NextRequest) {
  // Rate limit: 5 attempts per 15 minutes per IP
  const ip = getClientIp(req);
  const limit = rateLimit(`auth:${ip}`, { limit: 5, windowSec: 15 * 60 });

  if (!limit.success) {
    return NextResponse.json(
      { success: false, error: "Çok fazla deneme. 15 dakika sonra tekrar deneyin." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  let password: string;
  try {
    const body = await req.json();
    password = body?.password;
  } catch {
    return NextResponse.json({ success: false, error: "Geçersiz istek" }, { status: 400 });
  }

  if (!password || typeof password !== "string") {
    return NextResponse.json({ success: false, error: "Şifre gerekli" }, { status: 400 });
  }

  let adminPassword: string;
  try {
    adminPassword = getAdminPassword();
  } catch {
    return NextResponse.json(
      { success: false, error: "Sunucu yapılandırma hatası" },
      { status: 500 }
    );
  }

  if (password === adminPassword) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 saat
      path: "/",
    });
    return res;
  }

  return NextResponse.json(
    { success: false, error: "Geçersiz şifre", remaining: limit.remaining },
    { status: 401 }
  );
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("admin_auth");
  return res;
}
