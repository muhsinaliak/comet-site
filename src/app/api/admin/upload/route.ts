import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function checkAuth(req: NextRequest) {
  return req.cookies.get("admin_auth")?.value === "true";
}

const UPLOAD_DIRS: Record<string, string> = {
  image: "images/products",
  model: "models",
  document: "documents",
  software: "software",
};

const ALLOWED_MIME_TYPES: Record<string, string[]> = {
  image: ["image/webp", "image/png", "image/jpeg", "image/svg+xml"],
  model: ["model/gltf-binary", "model/gltf+json", "application/octet-stream"],
  document: ["application/pdf"],
  software: [
    "application/zip",
    "application/x-zip-compressed",
    "application/x-msdownload",
    "application/x-msi",
    "application/octet-stream",
  ],
};

const ALLOWED_EXTENSIONS: Record<string, string[]> = {
  image: [".webp", ".png", ".jpg", ".jpeg", ".svg"],
  model: [".glb", ".gltf"],
  document: [".pdf"],
  software: [".zip", ".exe", ".msi"],
};

const MAX_SIZES_MB: Record<string, number> = {
  image: 10,
  model: 50,
  document: 20,
  software: 100,
};

function sanitizeFilename(name: string): string {
  return path
    .basename(name)
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^[-.]/, "")
    .slice(0, 200);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Geçersiz form verisi" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const type = formData.get("type") as string | null;

  if (!file || !type) {
    return NextResponse.json({ error: "Dosya ve tür gerekli" }, { status: 400 });
  }

  if (file.size === 0) {
    return NextResponse.json({ error: "Boş dosya yüklenemez" }, { status: 400 });
  }

  const dir = UPLOAD_DIRS[type];
  if (!dir) {
    return NextResponse.json(
      { error: "Geçersiz yükleme türü. Kullanın: image, model, document, software" },
      { status: 400 }
    );
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS[type]?.includes(ext)) {
    return NextResponse.json(
      { error: `${type} için geçersiz dosya türü. İzin verilenler: ${ALLOWED_EXTENSIONS[type].join(", ")}` },
      { status: 400 }
    );
  }

  const mimeType = file.type.toLowerCase();
  if (mimeType && !ALLOWED_MIME_TYPES[type]?.includes(mimeType)) {
    return NextResponse.json(
      { error: `İzin verilmeyen MIME türü: ${mimeType}` },
      { status: 400 }
    );
  }

  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > MAX_SIZES_MB[type]) {
    return NextResponse.json(
      { error: `Dosya çok büyük. ${type} için maksimum: ${MAX_SIZES_MB[type]}MB` },
      { status: 400 }
    );
  }

  try {
    const uploadDir = path.join(process.cwd(), "public", dir);
    fs.mkdirSync(uploadDir, { recursive: true });

    const timestamp = Date.now();
    const safeName = sanitizeFilename(file.name);
    const filename = `${timestamp}-${safeName}`;
    const filePath = path.join(uploadDir, filename);

    // Path traversal prevention
    if (!filePath.startsWith(uploadDir + path.sep) && filePath !== uploadDir) {
      return NextResponse.json({ error: "Geçersiz dosya yolu" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(bytes));

    const publicUrl = `/${dir}/${filename}`;
    const fileSize =
      sizeMB < 1 ? `${Math.round(file.size / 1024)} KB` : `${sizeMB.toFixed(1)} MB`;

    return NextResponse.json({ url: publicUrl, filename, fileSize, originalName: file.name });
  } catch (error) {
    console.error("[Upload] File write failed:", error);
    return NextResponse.json({ error: "Dosya kaydedilemedi" }, { status: 500 });
  }
}
