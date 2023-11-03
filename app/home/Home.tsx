"use client";

import * as React from "react";
import { Categories } from "../components/Home/Categories";
import { OnSale } from "../components/Home/OnSale/OnSale";
import { Footer } from "../components/Footer/Footer";
import styles from "./home.module.css";
import Image from "next/image";

const topBrands = [
  "https://media.cnn.com/api/v1/images/stellar/prod/210203182253-perfume-gucci-bloom-eau-de-parfum.jpg?q=w_1700,h_956,x_0,y_0,c_fill",
  "https://media.cnn.com/api/v1/images/stellar/prod/220707134827-editors-perfume-missdior.jpg?c=original",
  "https://media.cnn.com/api/v1/images/stellar/prod/210203183829-perfume-viktorrolf-flowerbomb.jpg?q=w_1700,h_956,x_0,y_0,c_fill",
  "https://content.api.news/v3/images/bin/d2dcf285e80b82a7348ef9af58aaf30b",
];
const NUMBER_OF_PICTURES = 3;
export const Home = () => {
  const [currentImage, setCurrentImage] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevIndex) =>
        prevIndex == NUMBER_OF_PICTURES ? 0 : prevIndex + 1
      );
    }, 1000);
    return () => {
      /* cleanup */
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <div className={styles.homeVideo}>
        <video
          className={styles.video}
          autoPlay={true}
          loop={true}
          muted={true}
        >
          <source
            src={
              "https://www.dior.com/couture/var/dior/storage/original/video/ddfe8821d149731d34a4a2734ba0a3d6.mp4"
            }
            type="video/mp4"
          />
        </video>
      </div>
      <div className={styles.categories}>
        <h3 className={styles.title} id={"our-top-brands"}>
          Our Top Brands
        </h3>
        <p style={{ paddingLeft: "20px" }}>
          We offer a wide collection of the most popular and most used perfumes
          of the best brands. We are partners with Dior, Chanel, Calven Klein,
          and 73 other top brands. Just below you can see our latest perfume
          addition which are Dioriviera, My Way Parfum Eau de Parfum,
          Victoria&apos;s Secret Bare Rose Eau de Parfum, and Aqua Media Cologne
          Forte.
        </p>
        <div className="float-container">
          <div className="float-child">
            <Image
              src="https://wwd.com/wp-content/uploads/2021/12/best-perfumes.jpg?w=911"
              alt="woman with perfume"
              style={{
                width: "100%",
                height: "auto",
              }}
              width={500}
              height={300}
            />
          </div>
          <div className="float-child">
            <Image
              src={topBrands[currentImage]}
              alt="new perfumes"
              style={{
                width: "100%",
                height: "auto",
              }}
              width={500}
              height={300}
            />
          </div>
        </div>
        <Categories />
      </div>
      <div className="onsale">
        <h3 className={styles.title}>
          On Sale <span style={{ fontWeight: "bolder" }}>(up to 35%)</span>
        </h3>
        <p
          style={{
            padding: "20px",
          }}
        >
          The below items have the highest sale. You can click <a>here</a> to
          view all the items that are on sale
        </p>
        <OnSale />
      </div>
      <div className="footer">
        <h3 className={styles.title} id={"contact-us"}>
          Contact Us
        </h3>
        <Footer />
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
            /* padding: 20px; */
          /*   border: 2px solid red; */
        }  
        `}
      </style>
    </div>
  );
};
