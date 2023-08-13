"use client";

import * as React from "react";
import { ScrollView } from "@progress/kendo-react-scrollview";
import Image from "next/image";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import styles from "./onsale.module.css";

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
      (a, b) => parseFloat(b.sale) - parseFloat(a.sale)
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
            src="https://media4.s-nbcnews.com/i/streams/2014/June/140604/2D274906019762-today-rihanna-perfume-140604-tease.jpg"
            alt="sale"
            /*  style={{
              width: "100%",
              height: "auto",
            }} */
            className={styles.scrollview}
            width={700}
            height={385}
          />
        </div>
        <div className="onSale float-child">
          <ScrollView
            className={styles.scrollview}
            automaticViewChange={true}
            automaticViewChangeInterval={2000}
          >
            {data.map((item, index) => {
              let newPrice = item.price * (item.sale / 100);
              newPrice = item.price - newPrice;
              return (
                <div key={index}>
                  <h3
                    style={{
                      paddingLeft: "10px",
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
                    /* style={{
                      width: "100%",
                      height: "310px",
                    }} */
                    className={styles.scrollview}
                    width={700}
                    height={325}
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
