import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
  CardImage,
  CardSubtitle,
  Avatar,
  Timeline,
  sortEventList,
} from "@progress/kendo-react-layout";
import Image from "next/image";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "@progress/kendo-react-buttons";
import { events } from "./events";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export const SingleProduct = (props) => {
  const [item, setItem]: any = React.useState();
  const [sizes, setSizes]: any = React.useState();
  const [price, setPrice] = React.useState();
  const [rating, setRating] = React.useState();
  const [stock, setStock] = React.useState();
  const fetchData = async () => {
    const sizesValues: string[] = [];
    const querySnapshot = await getDocs(collection(db, "perfumes"));
    querySnapshot.forEach((doc) => {
      if (doc.id.toLowerCase() === props.ID) {
        setItem(doc.data());
        setPrice(doc.data().price);
        setRating(doc.data().rating);
        setStock(doc.data().stock);
        querySnapshot.forEach((doc2) => {
          if (
            doc2.data().name === doc.data().name &&
            doc2.data().brand === doc.data().brand
          ) {
            sizesValues.push(doc2.data().size);
          }
        });
        setSizes(sizesValues);
      }
    });
  };

  const sortedEvents = sortEventList(events);
  React.useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (e) => {
    const selectedSize = e.value;
    const querySnapshot = await getDocs(collection(db, "perfumes"));
    querySnapshot.forEach((doc) => {
      if (
        doc.data().name === item.name &&
        doc.data().brand === item.brand &&
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
        {item && (
          <>
            <Image src={item.image} alt="img" height={500} width={500} />
            <Card
              orientation="horizontal"
              style={{
                height: "500px",
                padding: "10px",
              }}
            >
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
                    <li>price: {price}</li>
                    <li>rating: {rating}</li>
                    <li>sex: {item.sex}</li>
                    <li>
                      size:{" "}
                      {sizes.length > 1 ? (
                        <DropDownList
                          data={sizes}
                          defaultValue={item.size}
                          onChange={handleChange}
                        />
                      ) : (
                        item.size
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
