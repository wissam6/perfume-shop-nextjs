import * as React from "react";
import { ProductsCategory } from "../product-category";

//import { useSearchParams } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const product = params.id.toLowerCase();

  return <ProductsCategory product={product} />;
}
