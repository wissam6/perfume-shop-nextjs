"use client";

import SingleProductPage from "../page";

export default function Page({ params }: { params: { id: string } }) {
  const ID = params.id.toLowerCase();
  console.log(ID);
  return <SingleProductPage ID={ID} />;
}
