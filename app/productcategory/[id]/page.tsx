import * as React from "react";
import { ProductsCategory } from "../product-category";
import { ProductLoader } from "../products-loader";

//import { useSearchParams } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const product = params.id.toLowerCase();

  return (
    <React.Suspense fallback={<ProductLoader />}>
      <ProductsCategory product={product} />{" "}
    </React.Suspense>
  );
}
