"use client";

import { ProductsCategory } from "./ProductsCategory";
//import { useSearchParams } from "next/navigation";

const product = "versace";

const ProductPage = () => {
  return <ProductsCategory product={product} />;
};

export default ProductPage;
