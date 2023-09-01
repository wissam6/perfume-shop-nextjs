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

export const SingleProduct = (props) => {
  const [item, setItem]: any = React.useState();
  const fetchData = async () => {
    //to be replaced by fetching only the needed category
    let products: any = [];
    const querySnapshot = await getDocs(collection(db, "perfumes"));
    querySnapshot.forEach((doc) => {
      if (doc.id.toLowerCase() === props.ID) {
        setItem(doc.data());
        console.log(doc.data());
      }
    });
  };
  const sortedEvents = sortEventList(events);
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          //justifyContent: "space-evenly",
          //flexWrap: "wrap",
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
              {/* <CardImage src={item.image} /> */}
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
