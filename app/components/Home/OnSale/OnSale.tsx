"use client";

import * as React from "react";
import { ScrollView } from "@progress/kendo-react-scrollview";
import Image from "next/image";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import styles from "./onsale.module.css";

interface itemInterface {
  id?: number;
  brand?: string;
  country?: string;
  image: string;
  name: string;
  price: number;
  rating?: number;
  sale: number;
  sex?: string;
  size?: number;
  stock?: number;
  type?: string;
}

export const OnSale = () => {
  const [data, setData] = React.useState([]);
  const fetchData = async () => {
    let products: any = [];
    const querySnapshot = await getDocs(collection(db, "perfumes"));
    querySnapshot.forEach((doc) => {
      let docData = doc.data();
      docData.id = doc.id;
      products = [...products, docData];
    });
    const highestSale = products.sort(
      (a: any, b: any) => parseFloat(b.sale) - parseFloat(a.sale)
    );
    setData(highestSale.slice(0, 4));
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="float-container">
        <div className="float-child">
          <Image
            src="https://assets.teenvogue.com/photos/649509494d05f2cdc3e1b25d/master/pass/GettyImages-916194640%20(1).jpg"
            alt="sale"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={500}
            height={300}
          />
        </div>
        <div className="onSale float-child">
          <ScrollView
            className={styles.scrollview}
            automaticViewChange={true}
            automaticViewChangeInterval={2000}
          >
            {data.map((item: itemInterface, index) => {
              let newPrice: number = item.price * (item.sale / 100);
              newPrice = item.price - newPrice;
              return (
                <div key={index}>
                  <h3
                    style={{
                      paddingLeft: "10px",
                      position: "absolute",
                    }}
                  >
                    <div>
                      <span>
                        Previous Price: <del>${item.price}</del>
                      </span>
                    </div>
                    <div>New Price: {newPrice}</div>
                  </h3>
                  <Image
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    width={500}
                    height={300}
                  />
                </div>
              );
            })}
          </ScrollView>
        </div>
      </div>
      <style>
        {`
        .float-container {
            /* border: 3px solid #fff; */
            padding: 20px;
        }

        .float-child {
            width: 50%;
            float: left;
            padding: 20px;
          /*   border: 2px solid red; */
        }  
        `}
      </style>
    </React.Fragment>
  );
};
