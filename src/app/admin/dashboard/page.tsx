"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn, formatPrice } from "@/lib/utils";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Box,
  Star,
  MoreVertical,
  Package,
  AlertCircle,
} from "lucide-react";

interface ProductListItem {
  id: string;
  slug: string;
  sku: string;
  category: string;
  name: { tr: string; en: string };
  shortDescription: { tr: string; en: string };
  featured: boolean;
  status: string;
  model3d: unknown;
  images: { src: string }[];
  price: { amount: number; currency: "TRY" | "USD" | "EUR"; discountedAmount?: number } | null;
}

const CATEGORY_LABELS: Record<string, string> = {
  hvac: "HVAC",
  "industrial-iot": "IoT",
  "building-automation": "Bina Otomasyon",
  accessories: "Aksesuar",
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active: { label: "Aktif", color: "bg-green-500/20 text-green-400" },
  discontinued: { label: "Sonlandırılmış", color: "bg-red-500/20 text-red-400" },
  "coming-soon": { label: "Yakında", color: "bg-yellow-500/20 text-yellow-400" },
};

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      if (res.status === 401) {
        router.push("/admin");
        return;
      }
      const data = await res.json();
      setProducts(data);
    } catch {
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setDeleteId(null);
    } catch {
      alert("Silme hatası");
    }
  };

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      !q ||
      p.name.tr.toLowerCase().includes(q) ||
      p.name.en.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-6 h-6 border-2 border-brand-green/30 border-t-brand-green rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-[800] text-white tracking-tight">
            Ürünler
          </h1>
          <p className="text-sm text-white/40 mt-1">
            {products.length} ürün kayıtlı
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/dashboard/products/new")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-green text-brand-charcoal font-bold text-sm hover:bg-brand-green-muted transition-all"
        >
          <Plus size={16} />
          Yeni Ürün
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ürün ara (isim, SKU...)"
          className="w-full max-w-md pl-11 pr-4 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-green/50 text-sm"
        />
      </div>

      {/* Product table */}
      <div className="rounded-xl border border-white/[0.06] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-white/30">
                Ürün
              </th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-white/30">
                SKU
              </th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-white/30">
                Kategori
              </th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-white/30">
                Fiyat
              </th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-white/30">
                Durum
              </th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-white/30">
                3D
              </th>
              <th className="text-right px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-white/30">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => {
              const status = STATUS_LABELS[product.status] || STATUS_LABELS.active;
              return (
                <tr
                  key={product.id}
                  className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                        <Package size={16} className="text-white/30" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                          {product.name.tr}
                          {product.featured && (
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          )}
                        </div>
                        <div className="text-xs text-white/30 mt-0.5 line-clamp-1">
                          {product.shortDescription.tr}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-white/50 font-mono">{product.sku}</code>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-white/50">
                      {CATEGORY_LABELS[product.category] || product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {product.price ? (
                      <span className="text-xs font-semibold text-brand-green">
                        {formatPrice(product.price)}
                      </span>
                    ) : (
                      <span className="text-xs text-white/20">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", status.color)}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {product.model3d ? (
                      <span className="inline-flex items-center gap-1 text-xs text-brand-green">
                        <Box size={12} /> Var
                      </span>
                    ) : (
                      <span className="text-xs text-white/20">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => router.push(`/admin/dashboard/products/${product.id}`)}
                        className="p-2 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-all"
                        title="Düzenle"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteId(product.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all"
                        title="Sil"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-white/30">
                  {search ? "Sonuç bulunamadı" : "Henüz ürün yok"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1d27] rounded-2xl border border-white/10 p-6 w-full max-w-sm mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertCircle size={20} className="text-red-400" />
              </div>
              <div>
                <h3 className="font-display text-base font-[700] text-white">
                  Ürünü Sil
                </h3>
                <p className="text-xs text-white/40 mt-0.5">
                  Bu işlem geri alınamaz
                </p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-white/60 hover:text-white hover:border-white/20 transition-all"
              >
                İptal
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2.5 rounded-lg bg-red-500/20 text-red-400 text-sm font-bold hover:bg-red-500/30 transition-all"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
