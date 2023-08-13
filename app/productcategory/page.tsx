"use client";

import { ProductsCategory } from "./ProductsCategory";
import { useSearchParams } from "next/navigation";

const product = "versace";

export const Page = (props) => {
  /* const searchParams = useSearchParams();
  const search = searchParams.get("search");
  console.log(search); */
  return <ProductsCategory product={product} />;
};

export default Page;
