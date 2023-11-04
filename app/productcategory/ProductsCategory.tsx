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
import { useRouter } from "next/navigation";

interface itemInterface {
  id?: number;
  brand?: string;
  country?: string;
  image?: string;
  name?: string;
  price?: number;
  rating?: number;
  sale?: number;
  sex?: string;
  size?: number;
  stock?: number;
  type?: string;
}

export const ProductsCategory = (props: any) => {
  const router = useRouter();
  const product = props.product;
  const [data, setData] = React.useState<itemInterface[]>([]);
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

  const handleCardClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
    router.push(`/singleproduct/${id}`);
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
          gap={{
            rows: 20,
            cols: 40,
          }}
          cols={[
            {
              width: "30%",
            },
            {
              width: "30%",
            },
            {
              width: "30%",
            },
          ]}
        >
          {data.map((item: any, index) => {
            return (
              <GridLayoutItem key={item.id}>
                <Card
                  orientation="horizontal"
                  style={{
                    height: "300px",
                  }}
                  onClick={(e: React.MouseEvent<HTMLElement>) =>
                    handleCardClick(e, item.id)
                  }
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
