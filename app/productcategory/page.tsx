"use client";

import { ProductsCategory } from "./ProductsCategory";
import { useSearchParams } from "next/navigation";

const product = "versace";

export const ProductPage = () => {
  return <ProductsCategory product={product} />;
};
