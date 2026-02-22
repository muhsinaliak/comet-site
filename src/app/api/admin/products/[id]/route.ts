import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src/data/products.json");

function checkAuth(req: NextRequest) {
  return req.cookies.get("admin_auth")?.value === "true";
}

function readProducts() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeProducts(data: Record<string, unknown>) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// GET - Get single product
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const data = readProducts();
    const product = data.products.find((p: { id: string }) => p.id === id);

    if (!product) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("[Product GET] Failed:", error);
    return NextResponse.json({ error: "Ürün yüklenemedi" }, { status: 500 });
  }
}

// PUT - Update product
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let updates: Record<string, unknown>;
  try {
    const { id } = await params;
    updates = await req.json();
    const data = readProducts();
    const index = data.products.findIndex((p: { id: string }) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    data.products[index] = { ...data.products[index], ...updates };
    writeProducts(data);

    return NextResponse.json(data.products[index]);
  } catch (error) {
    console.error("[Product PUT] Failed:", error);
    return NextResponse.json({ error: "Ürün güncellenemedi" }, { status: 500 });
  }
}

// DELETE - Delete product
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const data = readProducts();
    const index = data.products.findIndex((p: { id: string }) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
    }

    const deleted = data.products.splice(index, 1)[0];
    writeProducts(data);

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("[Product DELETE] Failed:", error);
    return NextResponse.json({ error: "Ürün silinemedi" }, { status: 500 });
  }
}
