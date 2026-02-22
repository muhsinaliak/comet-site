"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Save,
  Upload,
  X,
  Plus,
  Trash2,
  GripVertical,
  FileText,
  Image as ImageIcon,
  Box,
  Download,
  Film,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";

interface ProductFormData {
  id?: string;
  slug: string;
  sku: string;
  category: string;
  subcategory: string;
  featured: boolean;
  name: { tr: string; en: string };
  shortDescription: { tr: string; en: string };
  longDescription: { tr: string; en: string };
  images: { src: string; alt: { tr: string; en: string } }[];
  model3d: { glb: string; poster: string } | null;
  specifications: {
    group: { tr: string; en: string };
    items: { label: { tr: string; en: string }; value: string; unit: string }[];
  }[];
  documents: {
    type: string;
    title: { tr: string; en: string };
    file: string;
    fileSize: string;
    language: string;
  }[];
  software: {
    name: string;
    version: string;
    description: { tr: string; en: string };
    file: string;
    fileSize: string;
    platform: string;
    releaseDate: string;
  }[];
  accessories: { productId: string; relationship: string }[];
  videos: {
    title: { tr: string; en: string };
    url: string;
    thumbnail: string;
    duration: string;
  }[];
  tags: string[];
  status: string;
  price: { amount: number; currency: string; discountedAmount?: number } | null;
}

const EMPTY_PRODUCT: ProductFormData = {
  slug: "",
  sku: "",
  category: "hvac",
  subcategory: "",
  featured: false,
  name: { tr: "", en: "" },
  shortDescription: { tr: "", en: "" },
  longDescription: { tr: "", en: "" },
  images: [],
  model3d: null,
  specifications: [],
  documents: [],
  software: [],
  accessories: [],
  videos: [],
  tags: [],
  status: "active",
  price: null,
};

const CATEGORIES = [
  { value: "hvac", label: "HVAC Kontrol" },
  { value: "industrial-iot", label: "Endüstriyel IoT" },
  { value: "building-automation", label: "Bina Otomasyonu" },
  { value: "accessories", label: "Aksesuarlar" },
];

const DOC_TYPES = [
  { value: "datasheet", label: "Teknik Veri Sayfası" },
  { value: "installation-guide", label: "Montaj Kılavuzu" },
  { value: "certificate", label: "Sertifika" },
  { value: "brochure", label: "Broşür" },
  { value: "manual", label: "Kullanım Kılavuzu" },
];

export function ProductForm({
  initialData,
  isEdit = false,
}: {
  initialData?: ProductFormData;
  isEdit?: boolean;
}) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>(initialData || EMPTY_PRODUCT);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  const [tagInput, setTagInput] = useState("");
  const [uploading, setUploading] = useState<string | null>(null);

  const update = useCallback((path: string, value: unknown) => {
    setForm((prev) => {
      const next = { ...prev };
      const keys = path.split(".");
      let obj: Record<string, unknown> = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]] as Record<string, unknown>;
      }
      obj[keys[keys.length - 1]] = value;
      return { ...next };
    });
  }, []);

  const handleUpload = async (file: File, type: string): Promise<{ url: string; fileSize: string } | null> => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("type", type);

    try {
      setUploading(type);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Yükleme hatası");
        return null;
      }
      return await res.json();
    } catch {
      alert("Yükleme hatası");
      return null;
    } finally {
      setUploading(null);
    }
  };

  const handleSave = async () => {
    setError("");

    if (!form.name.tr || !form.slug || !form.sku) {
      setError("İsim (TR), Slug ve SKU zorunlu alanlardır");
      return;
    }

    setSaving(true);
    try {
      const url = isEdit
        ? `/api/admin/products/${form.id}`
        : "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Kaydetme hatası");
      }
    } catch {
      setError("Bağlantı hatası");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "basic", label: "Temel Bilgiler" },
    { id: "images", label: "Görseller & 3D" },
    { id: "specs", label: "Teknik Özellikler" },
    { id: "docs", label: "Dökümanlar" },
    { id: "software", label: "Yazılım" },
    { id: "videos", label: "Videolar" },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-[800] text-white tracking-tight">
            {isEdit ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
          </h1>
          {isEdit && (
            <p className="text-sm text-white/40 mt-1">{form.sku}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="px-4 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-white/60 hover:text-white hover:border-white/20 transition-all"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-green text-brand-charcoal font-bold text-sm hover:bg-brand-green-muted transition-all disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-brand-charcoal/30 border-t-brand-charcoal rounded-full animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Kaydet
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
              activeTab === id
                ? "bg-brand-green/10 text-brand-green"
                : "text-white/40 hover:text-white/60 hover:bg-white/[0.04]"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* ========== BASIC INFO ========== */}
        {activeTab === "basic" && (
          <>
            {/* Name TR/EN */}
            <FieldGroup title="Ürün İsmi">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="İsim (TR) *"
                  value={form.name.tr}
                  onChange={(v) => update("name.tr", v)}
                  placeholder="Akıllı Damper Aktüatörü SD100"
                />
                <Field
                  label="İsim (EN)"
                  value={form.name.en}
                  onChange={(v) => update("name.en", v)}
                  placeholder="Smart Damper Actuator SD100"
                />
              </div>
            </FieldGroup>

            {/* Slug, SKU, Category */}
            <FieldGroup title="Tanımlama">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field
                  label="Slug *"
                  value={form.slug}
                  onChange={(v) => update("slug", v)}
                  placeholder="smart-damper-sd100"
                  hint="URL'de kullanılacak (küçük harf, tire)"
                />
                <Field
                  label="SKU *"
                  value={form.sku}
                  onChange={(v) => update("sku", v)}
                  placeholder="CC-SD-100"
                />
                <div>
                  <label className="block text-[11px] font-semibold text-white/40 mb-1.5 uppercase tracking-wider">
                    Kategori
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white text-sm focus:outline-none focus:border-brand-green/50 appearance-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value} className="bg-[#1a1d27]">
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <Field
                  label="Alt Kategori"
                  value={form.subcategory}
                  onChange={(v) => update("subcategory", v)}
                  placeholder="damper-actuators"
                />
                <div>
                  <label className="block text-[11px] font-semibold text-white/40 mb-1.5 uppercase tracking-wider">
                    Durum
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => update("status", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white text-sm focus:outline-none focus:border-brand-green/50 appearance-none"
                  >
                    <option value="active" className="bg-[#1a1d27]">Aktif</option>
                    <option value="coming-soon" className="bg-[#1a1d27]">Yakında</option>
                    <option value="discontinued" className="bg-[#1a1d27]">Sonlandırılmış</option>
                  </select>
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => update("featured", e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/[0.06] text-brand-green focus:ring-brand-green/30"
                    />
                    <span className="text-sm text-white/60">Öne Çıkan Ürün</span>
                  </label>
                </div>
              </div>
            </FieldGroup>

            {/* Price */}
            <FieldGroup title="Fiyat">
              <div className="flex items-center gap-3 mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.price !== null}
                    onChange={(e) => {
                      if (e.target.checked) {
                        update("price", { amount: 0, currency: "USD" });
                      } else {
                        update("price", null);
                      }
                    }}
                    className="w-4 h-4 rounded border-white/20 bg-white/[0.06] text-brand-green focus:ring-brand-green/30"
                  />
                  <span className="text-sm text-white/60">Fiyat bilgisi ekle</span>
                </label>
              </div>
              {form.price && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-white/40 mb-1.5 uppercase tracking-wider">
                      Fiyat *
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price.amount || ""}
                      onChange={(e) =>
                        update("price", { ...form.price, amount: parseFloat(e.target.value) || 0 })
                      }
                      placeholder="0.00"
                      className="w-full px-3 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-white/40 mb-1.5 uppercase tracking-wider">
                      Para Birimi
                    </label>
                    <select
                      value={form.price.currency}
                      onChange={(e) =>
                        update("price", { ...form.price, currency: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white text-sm focus:outline-none focus:border-brand-green/50 appearance-none"
                    >
                      <option value="USD" className="bg-[#1a1d27]">USD ($)</option>
                      <option value="EUR" className="bg-[#1a1d27]">EUR (€)</option>
                      <option value="TRY" className="bg-[#1a1d27]">TRY (₺)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-white/40 mb-1.5 uppercase tracking-wider">
                      İndirimli Fiyat
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price.discountedAmount || ""}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        update("price", {
                          ...form.price,
                          discountedAmount: val || undefined,
                        });
                      }}
                      placeholder="Opsiyonel"
                      className="w-full px-3 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50 transition-colors"
                    />
                  </div>
                </div>
              )}
            </FieldGroup>

            {/* Descriptions */}
            <FieldGroup title="Açıklamalar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextArea
                  label="Kısa Açıklama (TR)"
                  value={form.shortDescription.tr}
                  onChange={(v) => update("shortDescription.tr", v)}
                  rows={3}
                />
                <TextArea
                  label="Kısa Açıklama (EN)"
                  value={form.shortDescription.en}
                  onChange={(v) => update("shortDescription.en", v)}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <TextArea
                  label="Detaylı Açıklama (TR)"
                  value={form.longDescription.tr}
                  onChange={(v) => update("longDescription.tr", v)}
                  rows={5}
                />
                <TextArea
                  label="Detaylı Açıklama (EN)"
                  value={form.longDescription.en}
                  onChange={(v) => update("longDescription.en", v)}
                  rows={5}
                />
              </div>
            </FieldGroup>

            {/* Tags */}
            <FieldGroup title="Etiketler">
              <div className="flex flex-wrap gap-2 mb-3">
                {form.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10 text-xs text-white/70"
                  >
                    {tag}
                    <button
                      onClick={() => setForm((f) => ({ ...f, tags: f.tags.filter((_, j) => j !== i) }))}
                      className="text-white/30 hover:text-red-400 transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && tagInput.trim()) {
                      e.preventDefault();
                      setForm((f) => ({ ...f, tags: [...f.tags, tagInput.trim()] }));
                      setTagInput("");
                    }
                  }}
                  placeholder="Etiket ekle ve Enter'a bas"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (tagInput.trim()) {
                      setForm((f) => ({ ...f, tags: [...f.tags, tagInput.trim()] }));
                      setTagInput("");
                    }
                  }}
                  className="px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>
            </FieldGroup>
          </>
        )}

        {/* ========== IMAGES & 3D ========== */}
        {activeTab === "images" && (
          <>
            <FieldGroup title="Ürün Görselleri">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {form.images.map((img, i) => (
                  <div key={i} className="relative group rounded-lg border border-white/10 bg-white/[0.04] overflow-hidden aspect-square flex items-center justify-center">
                    {img.src ? (
                      <img src={img.src} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={24} className="text-white/20" />
                    )}
                    <button
                      onClick={() => setForm((f) => ({ ...f, images: f.images.filter((_, j) => j !== i) }))}
                      className="absolute top-2 right-2 p-1.5 rounded-md bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60">
                      <input
                        type="text"
                        value={img.alt.tr}
                        onChange={(e) => {
                          const updated = [...form.images];
                          updated[i] = { ...updated[i], alt: { ...updated[i].alt, tr: e.target.value } };
                          setForm((f) => ({ ...f, images: updated }));
                        }}
                        placeholder="Alt text (TR)"
                        className="w-full px-2 py-1 rounded bg-white/10 border-0 text-white text-[10px] placeholder:text-white/30 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}

                {/* Upload button */}
                <label className="rounded-lg border-2 border-dashed border-white/10 hover:border-brand-green/30 aspect-square flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-white/[0.02]">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const result = await handleUpload(file, "image");
                      if (result) {
                        setForm((f) => ({
                          ...f,
                          images: [...f.images, { src: result.url, alt: { tr: "", en: "" } }],
                        }));
                      }
                    }}
                  />
                  {uploading === "image" ? (
                    <div className="w-5 h-5 border-2 border-brand-green/30 border-t-brand-green rounded-full animate-spin" />
                  ) : (
                    <>
                      <Upload size={20} className="text-white/20 mb-2" />
                      <span className="text-[10px] text-white/30 uppercase tracking-wider">Görsel Yükle</span>
                    </>
                  )}
                </label>
              </div>
            </FieldGroup>

            <FieldGroup title="3D Model">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-white/40 mb-1.5 uppercase tracking-wider">
                    GLB Dosyası
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.model3d?.glb || ""}
                      onChange={(e) => {
                        if (e.target.value) {
                          update("model3d", { glb: e.target.value, poster: form.model3d?.poster || "" });
                        } else {
                          update("model3d", null);
                        }
                      }}
                      placeholder="/models/product.glb"
                      className="flex-1 px-3 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50"
                    />
                    <label className="px-3 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all cursor-pointer flex items-center">
                      <input
                        type="file"
                        accept=".glb,.gltf"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const result = await handleUpload(file, "model");
                          if (result) {
                            update("model3d", { glb: result.url, poster: form.model3d?.poster || "" });
                          }
                        }}
                      />
                      {uploading === "model" ? (
                        <div className="w-4 h-4 border-2 border-brand-green/30 border-t-brand-green rounded-full animate-spin" />
                      ) : (
                        <Upload size={16} />
                      )}
                    </label>
                  </div>
                </div>
                <Field
                  label="Poster Görsel"
                  value={form.model3d?.poster || ""}
                  onChange={(v) => {
                    if (form.model3d) {
                      update("model3d", { ...form.model3d, poster: v });
                    }
                  }}
                  placeholder="/images/products/poster.webp"
                />
              </div>
            </FieldGroup>
          </>
        )}

        {/* ========== SPECIFICATIONS ========== */}
        {activeTab === "specs" && (
          <FieldGroup title="Teknik Özellikler">
            {form.specifications.map((group, gi) => (
              <div key={gi} className="mb-6 p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center justify-between mb-3">
                  <div className="grid grid-cols-2 gap-3 flex-1 mr-3">
                    <input
                      type="text"
                      value={group.group.tr}
                      onChange={(e) => {
                        const updated = [...form.specifications];
                        updated[gi] = { ...updated[gi], group: { ...updated[gi].group, tr: e.target.value } };
                        setForm((f) => ({ ...f, specifications: updated }));
                      }}
                      placeholder="Grup adı (TR)"
                      className="px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-green/50"
                    />
                    <input
                      type="text"
                      value={group.group.en}
                      onChange={(e) => {
                        const updated = [...form.specifications];
                        updated[gi] = { ...updated[gi], group: { ...updated[gi].group, en: e.target.value } };
                        setForm((f) => ({ ...f, specifications: updated }));
                      }}
                      placeholder="Grup adı (EN)"
                      className="px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-green/50"
                    />
                  </div>
                  <button
                    onClick={() => setForm((f) => ({ ...f, specifications: f.specifications.filter((_, j) => j !== gi) }))}
                    className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {group.items.map((item, ii) => (
                  <div key={ii} className="grid grid-cols-[1fr_1fr_auto_auto_auto] gap-2 mb-2 items-center">
                    <input
                      type="text"
                      value={item.label.tr}
                      onChange={(e) => {
                        const updated = [...form.specifications];
                        updated[gi].items[ii] = { ...updated[gi].items[ii], label: { ...updated[gi].items[ii].label, tr: e.target.value } };
                        setForm((f) => ({ ...f, specifications: updated }));
                      }}
                      placeholder="Etiket (TR)"
                      className="px-2.5 py-1.5 rounded bg-white/[0.06] border border-white/[0.06] text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-brand-green/50"
                    />
                    <input
                      type="text"
                      value={item.label.en}
                      onChange={(e) => {
                        const updated = [...form.specifications];
                        updated[gi].items[ii] = { ...updated[gi].items[ii], label: { ...updated[gi].items[ii].label, en: e.target.value } };
                        setForm((f) => ({ ...f, specifications: updated }));
                      }}
                      placeholder="Etiket (EN)"
                      className="px-2.5 py-1.5 rounded bg-white/[0.06] border border-white/[0.06] text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-brand-green/50"
                    />
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => {
                        const updated = [...form.specifications];
                        updated[gi].items[ii] = { ...updated[gi].items[ii], value: e.target.value };
                        setForm((f) => ({ ...f, specifications: updated }));
                      }}
                      placeholder="Değer"
                      className="w-24 px-2.5 py-1.5 rounded bg-white/[0.06] border border-white/[0.06] text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-brand-green/50"
                    />
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) => {
                        const updated = [...form.specifications];
                        updated[gi].items[ii] = { ...updated[gi].items[ii], unit: e.target.value };
                        setForm((f) => ({ ...f, specifications: updated }));
                      }}
                      placeholder="Birim"
                      className="w-16 px-2.5 py-1.5 rounded bg-white/[0.06] border border-white/[0.06] text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-brand-green/50"
                    />
                    <button
                      onClick={() => {
                        const updated = [...form.specifications];
                        updated[gi] = { ...updated[gi], items: updated[gi].items.filter((_, j) => j !== ii) };
                        setForm((f) => ({ ...f, specifications: updated }));
                      }}
                      className="p-1.5 rounded text-white/20 hover:text-red-400 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => {
                    const updated = [...form.specifications];
                    updated[gi] = {
                      ...updated[gi],
                      items: [...updated[gi].items, { label: { tr: "", en: "" }, value: "", unit: "" }],
                    };
                    setForm((f) => ({ ...f, specifications: updated }));
                  }}
                  className="mt-2 flex items-center gap-1.5 text-xs text-brand-green/70 hover:text-brand-green transition-colors"
                >
                  <Plus size={12} /> Özellik Ekle
                </button>
              </div>
            ))}

            <button
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  specifications: [
                    ...f.specifications,
                    { group: { tr: "", en: "" }, items: [{ label: { tr: "", en: "" }, value: "", unit: "" }] },
                  ],
                }))
              }
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-white/10 text-sm text-white/40 hover:text-white/60 hover:border-white/20 transition-all"
            >
              <Plus size={16} /> Yeni Grup Ekle
            </button>
          </FieldGroup>
        )}

        {/* ========== DOCUMENTS ========== */}
        {activeTab === "docs" && (
          <FieldGroup title="Dökümanlar">
            {form.documents.map((doc, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] mb-3">
                <FileText size={16} className="text-white/30 mt-1 shrink-0" />
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={doc.title.tr}
                    onChange={(e) => {
                      const updated = [...form.documents];
                      updated[i] = { ...updated[i], title: { ...updated[i].title, tr: e.target.value } };
                      setForm((f) => ({ ...f, documents: updated }));
                    }}
                    placeholder="Başlık (TR)"
                    className="px-2.5 py-1.5 rounded bg-white/[0.06] border border-white/[0.06] text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-brand-green/50"
                  />
                  <input
                    type="text"
                    value={doc.title.en}
                    onChange={(e) => {
                      const updated = [...form.documents];
                      updated[i] = { ...updated[i], title: { ...updated[i].title, en: e.target.value } };
                      setForm((f) => ({ ...f, documents: updated }));
                    }}
                    placeholder="Başlık (EN)"
                    className="px-2.5 py-1.5 rounded bg-white/[0.06] border border-white/[0.06] text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-brand-green/50"
                  />
                  <select
                    value={doc.type}
                    onChange={(e) => {
                      const updated = [...form.documents];
                      updated[i] = { ...updated[i], type: e.target.value };
                      setForm((f) => ({ ...f, documents: updated }));
                    }}
                    className="px-2.5 py-1.5 rounded bg-white/[0.06] border border-white/[0.06] text-white text-xs focus:outline-none focus:border-brand-green/50 appearance-none"
                  >
                    {DOC_TYPES.map((dt) => (
                      <option key={dt.value} value={dt.value} className="bg-[#1a1d27]">{dt.label}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={doc.file}
                      onChange={(e) => {
                        const updated = [...form.documents];
                        updated[i] = { ...updated[i], file: e.target.value };
                        setForm((f) => ({ ...f, documents: updated }));
                      }}
                      placeholder="/documents/file.pdf"
                      className="flex-1 px-2.5 py-1.5 rounded bg-white/[0.06] border border-white/[0.06] text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-brand-green/50"
                    />
                    <label className="px-2 py-1.5 rounded bg-white/[0.06] border border-white/[0.06] text-white/40 hover:text-white cursor-pointer flex items-center transition-colors">
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const result = await handleUpload(file, "document");
                          if (result) {
                            const updated = [...form.documents];
                            updated[i] = { ...updated[i], file: result.url, fileSize: result.fileSize };
                            setForm((f) => ({ ...f, documents: updated }));
                          }
                        }}
                      />
                      <Upload size={12} />
                    </label>
                  </div>
                </div>
                <button
                  onClick={() => setForm((f) => ({ ...f, documents: f.documents.filter((_, j) => j !== i) }))}
                  className="p-1.5 rounded text-white/20 hover:text-red-400 transition-colors shrink-0"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  documents: [...f.documents, { type: "datasheet", title: { tr: "", en: "" }, file: "", fileSize: "", language: "tr/en" }],
                }))
              }
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-white/10 text-sm text-white/40 hover:text-white/60 hover:border-white/20 transition-all"
            >
              <Plus size={16} /> Döküman Ekle
            </button>
          </FieldGroup>
        )}

        {/* ========== SOFTWARE ========== */}
        {activeTab === "software" && (
          <FieldGroup title="Yazılımlar">
            {form.software.map((sw, i) => (
              <div key={i} className="p-4 rounded-lg border border-white/[0.06] bg-white/[0.02] mb-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Yazılım Adı" value={sw.name} onChange={(v) => {
                    const updated = [...form.software]; updated[i] = { ...updated[i], name: v };
                    setForm((f) => ({ ...f, software: updated }));
                  }} placeholder="Comet Config Tool" />
                  <Field label="Versiyon" value={sw.version} onChange={(v) => {
                    const updated = [...form.software]; updated[i] = { ...updated[i], version: v };
                    setForm((f) => ({ ...f, software: updated }));
                  }} placeholder="1.0.0" />
                  <Field label="Platform" value={sw.platform} onChange={(v) => {
                    const updated = [...form.software]; updated[i] = { ...updated[i], platform: v };
                    setForm((f) => ({ ...f, software: updated }));
                  }} placeholder="Windows" />
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Field label="Dosya" value={sw.file} onChange={(v) => {
                        const updated = [...form.software]; updated[i] = { ...updated[i], file: v };
                        setForm((f) => ({ ...f, software: updated }));
                      }} placeholder="/software/tool.zip" />
                    </div>
                    <label className="mb-[1px] px-3 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white/40 hover:text-white cursor-pointer flex items-center transition-colors">
                      <input type="file" accept=".zip,.exe,.msi" className="hidden" onChange={async (e) => {
                        const file = e.target.files?.[0]; if (!file) return;
                        const result = await handleUpload(file, "software");
                        if (result) {
                          const updated = [...form.software];
                          updated[i] = { ...updated[i], file: result.url, fileSize: result.fileSize };
                          setForm((f) => ({ ...f, software: updated }));
                        }
                      }} />
                      <Upload size={14} />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button onClick={() => setForm((f) => ({ ...f, software: f.software.filter((_, j) => j !== i) }))}
                    className="text-xs text-red-400/60 hover:text-red-400 transition-colors">
                    Kaldır
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  software: [...f.software, { name: "", version: "", description: { tr: "", en: "" }, file: "", fileSize: "", platform: "Windows", releaseDate: new Date().toISOString().split("T")[0] }],
                }))
              }
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-white/10 text-sm text-white/40 hover:text-white/60 hover:border-white/20 transition-all"
            >
              <Plus size={16} /> Yazılım Ekle
            </button>
          </FieldGroup>
        )}

        {/* ========== VIDEOS ========== */}
        {activeTab === "videos" && (
          <FieldGroup title="Videolar">
            {form.videos.map((vid, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] mb-3">
                <Film size={16} className="text-white/30 mt-1 shrink-0" />
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <input type="text" value={vid.title.tr} onChange={(e) => {
                    const u = [...form.videos]; u[i] = { ...u[i], title: { ...u[i].title, tr: e.target.value } };
                    setForm((f) => ({ ...f, videos: u }));
                  }} placeholder="Başlık (TR)" className="px-2.5 py-1.5 rounded bg-white/[0.06] border border-white/[0.06] text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-brand-green/50" />
                  <input type="text" value={vid.title.en} onChange={(e) => {
                    const u = [...form.videos]; u[i] = { ...u[i], title: { ...u[i].title, en: e.target.value } };
                    setForm((f) => ({ ...f, videos: u }));
                  }} placeholder="Başlık (EN)" className="px-2.5 py-1.5 rounded bg-white/[0.06] border border-white/[0.06] text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-brand-green/50" />
                  <input type="text" value={vid.url} onChange={(e) => {
                    const u = [...form.videos]; u[i] = { ...u[i], url: e.target.value };
                    setForm((f) => ({ ...f, videos: u }));
                  }} placeholder="YouTube embed URL" className="px-2.5 py-1.5 rounded bg-white/[0.06] border border-white/[0.06] text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-brand-green/50 col-span-2" />
                  <input type="text" value={vid.duration} onChange={(e) => {
                    const u = [...form.videos]; u[i] = { ...u[i], duration: e.target.value };
                    setForm((f) => ({ ...f, videos: u }));
                  }} placeholder="Süre (3:45)" className="px-2.5 py-1.5 rounded bg-white/[0.06] border border-white/[0.06] text-white text-xs placeholder:text-white/20 focus:outline-none focus:border-brand-green/50" />
                </div>
                <button onClick={() => setForm((f) => ({ ...f, videos: f.videos.filter((_, j) => j !== i) }))}
                  className="p-1.5 rounded text-white/20 hover:text-red-400 transition-colors shrink-0"><X size={12} /></button>
              </div>
            ))}
            <button
              onClick={() => setForm((f) => ({ ...f, videos: [...f.videos, { title: { tr: "", en: "" }, url: "", thumbnail: "", duration: "" }] }))}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-white/10 text-sm text-white/40 hover:text-white/60 hover:border-white/20 transition-all"
            >
              <Plus size={16} /> Video Ekle
            </button>
          </FieldGroup>
        )}
      </div>
    </div>
  );
}

// ===== Sub-components =====

function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <h3 className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-white/40 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50 transition-colors"
      />
      {hint && (
        <p className="text-[10px] text-white/20 mt-1">{hint}</p>
      )}
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-white/40 mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full px-3 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-brand-green/50 resize-none transition-colors"
      />
    </div>
  );
}
