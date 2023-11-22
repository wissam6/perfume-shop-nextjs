import * as React from "react";
import SingleProductPage from "../page";
import { SingleProductSkeleton } from "./../single-product-skeleton";

export default function Page({ params }: { params: { id: string } }) {
  const ID = params.id.toLowerCase();
  return (
    <React.Suspense fallback={<SingleProductSkeleton />}>
      <SingleProductPage ID={ID} />;
    </React.Suspense>
  );
}
