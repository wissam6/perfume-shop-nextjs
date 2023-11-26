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
import { Button } from "@progress/kendo-react-buttons";
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

export const ProductsCategoryClient = (props: any) => {
  const data = props.data;
  const router = useRouter();
  const product = props.product;

  const handleCardClick = (e: React.MouseEvent<HTMLElement>, id: number) => {
    let target = e.target as any;
    if (
      target.className !== "k-button-text" &&
      target.className !== "k-button"
    ) {
      router.push(`/singleproduct/${id}`);
    }
  };

  const addToCart = (
    event: React.MouseEvent<HTMLElement>,
    item: itemInterface
  ) => {
    if (typeof window !== "undefined") {
      let oldItems: any = localStorage.getItem("items");
      if (oldItems !== null) {
        oldItems = JSON.parse(oldItems);
        oldItems.push(item);
        localStorage.setItem("items", JSON.stringify(oldItems));
        window.dispatchEvent(new Event("storage"));
      } else {
        localStorage.setItem("items", JSON.stringify([item]));
        window.dispatchEvent(new Event("storage"));
      }
    }
  };

  const addToFavourites = (
    event: React.MouseEvent<HTMLElement>,
    item: itemInterface
  ) => {
    if (typeof window !== "undefined") {
      let oldItems: any = localStorage.getItem("fav");
      if (oldItems !== null) {
        oldItems = JSON.parse(oldItems);
        oldItems.push(item);
        localStorage.setItem("fav", JSON.stringify(oldItems));
        window.dispatchEvent(new Event("storage"));
      } else {
        localStorage.setItem("fav", JSON.stringify([item]));
        window.dispatchEvent(new Event("storage"));
      }
    }
  };

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
          {data.map((item: any, index: number) => {
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
                      <Button
                        onClick={(e) => addToCart(e, item)}
                        className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary"
                      >
                        Add to Cart
                      </Button>
                      <Button
                        onClick={(e) => addToFavourites(e, item)}
                        className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary"
                      >
                        Favorite
                      </Button>
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
