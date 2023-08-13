"use client";
import * as React from "react";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
  CardImage,
  CardSubtitle,
  Avatar,
} from "@progress/kendo-react-layout";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const ProductsCategory = (props) => {
  const product = props.product;
  const [data, setData] = React.useState([]);
  const fetchData = async () => {
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
    console.log(products);
    setData(products);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <h3
        style={{
          fontSize: "80px",
          paddingLeft: "2em",
        }}
      >
        {product.toUpperCase()}
      </h3>
      <div
        style={{
          paddingLeft: "10em",
          paddingBottom: "8em",
        }}
      >
        <GridLayout
          gap={{ rows: 6, cols: 3 }}
          rows={[{ height: 320 }, { height: 320 }]}
          cols={[
            { width: 270 },
            { width: 270 },
            { width: 270 },
            { width: 270 },
          ]}
        >
          {data.map((item, index) => {
            return (
              <GridLayoutItem key={item.id}>
                <Card
                  orientation="horizontal"
                  style={{
                    height: "300px",
                  }}
                >
                  <CardImage src={item.image} />
                  <div className="k-vbox">
                    <CardHeader>
                      <CardTitle>{item.name}</CardTitle>
                      <CardSubtitle>{item.brand}</CardSubtitle>
                    </CardHeader>
                    <CardBody>
                      <ul
                        style={{
                          listStyle: "none",
                          paddingLeft: "0px",
                        }}
                      >
                        <li>price: {item.price}</li>
                        <li>rating: {item.rating}</li>
                        <li>sex: {item.sex}</li>
                        <li>size: {item.size}</li>
                        <li>remaining: {item.stock}</li>
                      </ul>
                    </CardBody>
                    <CardActions>
                      <button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary">
                        Add to Cart
                      </button>
                      <button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary">
                        Favorite
                      </button>
                    </CardActions>
                  </div>
                </Card>
              </GridLayoutItem>
            );
          })}
        </GridLayout>
      </div>
    </React.Fragment>
  );
};
