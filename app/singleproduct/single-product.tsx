import * as React from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { SingleProductCard } from "./single-product-card";

export const SingleProduct = async (props: any) => {
  let item;
  let price;
  let rating;
  let stock;
  let sizes;
  const sizesValues: string[] = [];
  const querySnapshot = await getDocs(collection(db, "perfumes"));
  querySnapshot.forEach((doc) => {
    if (doc.id.toLowerCase() === props.ID) {
      item = doc.data();
      price = doc.data().price;
      rating = doc.data().rating;
      stock = doc.data().stock;
      querySnapshot.forEach((doc2) => {
        if (
          doc2.data().name === doc.data().name &&
          doc2.data().brand === doc.data().brand
        ) {
          sizesValues.push(doc2.data().size);
        }
      });
      sizes = sizesValues;
    }
  });
  const data = {
    item: item,
    price: price,
    rating: rating,
    stock: stock,
    sizes: sizes,
  };
  return <SingleProductCard data={data} />;
};
