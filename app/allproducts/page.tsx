import { AllProducts } from "../components/AllProducts/ProductsGrid";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function Page() {
  const fetchData = async () => {
    let products: any = [];
    const querySnapshot = await getDocs(collection(db, "perfumes"));
    querySnapshot.forEach((doc) => {
      let docData = doc.data();
      docData.id = doc.id;
      products = [...products, docData];
    });
    return products;
  };

  const data = await fetchData();
  //throw new Error("test error handling");
  return <AllProducts data={data} />;
}
