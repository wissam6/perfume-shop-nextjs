"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
  CardSubtitle,
  Timeline,
  sortEventList,
} from "@progress/kendo-react-layout";
import Image from "next/image";
import { Button } from "@progress/kendo-react-buttons";
import { events } from "./events";
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const SingleProductCard = (props: any) => {
  const data = props.data;
  const [price, setPrice] = React.useState(data.price);
  const [rating, setRating] = React.useState(data.rating);
  const [stock, setStock] = React.useState(data.stock);
  const sortedEvents = sortEventList(events);
  const handleChange = async (e: DropDownListChangeEvent) => {
    const selectedSize = e.value;
    const querySnapshot = await getDocs(collection(db, "perfumes"));
    querySnapshot.forEach((doc) => {
      if (
        doc.data().name === data.item.name &&
        doc.data().brand === data.item.brand &&
        doc.data().size === selectedSize
      ) {
        setPrice(doc.data().price);
        setRating(doc.data().rating);
        setStock(doc.data().stock);
      }
    });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          padding: "35px",
          width: "50%",
          margin: "0 auto",
        }}
      >
        {data.item && (
          <>
            <Image src={data.item.image} alt="img" height={500} width={500} />
            <Card
              orientation="horizontal"
              style={{
                height: "500px",
                padding: "10px",
              }}
            >
              <div className="k-vbox">
                <CardHeader>
                  <CardTitle>{data.item.name}</CardTitle>
                  <CardSubtitle>{data.item.brand}</CardSubtitle>
                </CardHeader>
                <CardBody>
                  <ul
                    style={{
                      listStyle: "none",
                      paddingLeft: "0px",
                    }}
                  >
                    <li>price: {price}</li>
                    <li>rating: {rating}</li>
                    <li>sex: {data.item.sex}</li>
                    <li>
                      size:{" "}
                      {data.sizes.length > 1 ? (
                        <DropDownList
                          data={data.sizes}
                          defaultValue={data.item.size}
                          onChange={handleChange}
                        />
                      ) : (
                        data.item.size
                      )}
                    </li>
                    <li>remaining: {stock}</li>
                  </ul>
                </CardBody>
                <CardActions>
                  <Button>Add to Cart</Button>
                  <Button>Favorite</Button>
                </CardActions>
              </div>
            </Card>
          </>
        )}
      </div>
      <div>
        <h3
          style={{
            paddingLeft: "35px",
          }}
        >
          Order Process
        </h3>
        <Timeline events={sortedEvents} horizontal={true} />
      </div>
      <style>
        {`
          .k-timeline-horizontal .k-timeline-events-list .k-timeline-scrollable-wrap {
            height: 200px;
          }
          .k-timeline-horizontal .k-timeline-track-wrap .k-timeline-flag{
            display: none;
          }
          `}
      </style>
    </>
  );
};
