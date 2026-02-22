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

// GET - List all products
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = readProducts();
    return NextResponse.json(data.products);
  } catch (error) {
    console.error("[Products GET] Failed to read products:", error);
    return NextResponse.json({ error: "Ürünler yüklenemedi" }, { status: 500 });
  }
}

// POST - Create new product
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let product: Record<string, unknown>;
  try {
    product = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek formatı" }, { status: 400 });
  }

  if (!product || typeof product !== "object") {
    return NextResponse.json({ error: "Geçersiz ürün verisi" }, { status: 400 });
  }

  // Generate ID if not provided
  if (!product.id) {
    product.id = `prod_${Date.now()}`;
  }

  // Set defaults
  if (!product.status) product.status = "active";
  if (!product.images) product.images = [];
  if (!product.specifications) product.specifications = [];
  if (!product.documents) product.documents = [];
  if (!product.software) product.software = [];
  if (!product.accessories) product.accessories = [];
  if (!product.videos) product.videos = [];
  if (!product.tags) product.tags = [];

  try {
    const data = readProducts();
    data.products.push(product);
    writeProducts(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("[Products POST] Failed to save product:", error);
    return NextResponse.json({ error: "Ürün kaydedilemedi" }, { status: 500 });
  }
}
