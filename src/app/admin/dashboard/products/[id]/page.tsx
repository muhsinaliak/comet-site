"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductForm } from "../product-form";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${params.id}`);
        if (res.status === 401) {
          router.push("/admin");
          return;
        }
        if (res.status === 404) {
          router.push("/admin/dashboard");
          return;
        }
        const data = await res.json();
        setProduct(data);
      } catch {
        router.push("/admin/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-brand-green/30 border-t-brand-green rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) return null;

  return <ProductForm initialData={product} isEdit />;
}
