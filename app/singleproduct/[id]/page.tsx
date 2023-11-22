import SingleProductPage from "../page";

export default function Page({ params }: { params: { id: string } }) {
  const ID = params.id.toLowerCase();
  return <SingleProductPage ID={ID} />;
}
