"use client";

import { ProductsCategory } from "../ProductsCategory";
import { useSearchParams } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const product = params.id.toLowerCase();
  return <ProductsCategory product={product} />;
}
