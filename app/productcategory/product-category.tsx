import { ProductsCategoryClient } from "./ProductsCategory";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const ProductsCategory = async (props: any) => {
  let data: any;
  const product = props.product;
  //to be replaced by fetching only the needed category
  let products: any = [];
  const querySnapshot = await getDocs(collection(db, "perfumes"));
  querySnapshot.forEach((doc) => {
    let docData = doc.data();
    docData.id = doc.id;
    if (docData.brand.toLowerCase() === product) {
      products = [...products, docData];
    }
  });
  data = products;
  return <ProductsCategoryClient product={product} data={data} />;
};
