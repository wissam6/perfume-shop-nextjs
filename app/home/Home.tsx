"use client";

import * as React from "react";
import { Categories } from "../components/Home/Categories";
import { OnSale } from "../components/Home/OnSale/OnSale";
import styles from "./home.module.css";
import Image from "next/image";

const topBrands = [
  "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1687372056-screen-shot-2023-06-21-at-2-27-02-pm-64934109487c8.png?crop=1.00xw:0.807xh;0,0.119xh&resize=980:*",
  "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1687373539-screen-shot-2023-06-21-at-2-51-36-pm-649346d645136.png?crop=0.99812382739212xw:1xh;center,top&resize=980:*",
  "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1689716280-screen-shot-2023-07-18-at-5-36-58-pm-64b70601da0a5.png?crop=1xw:0.9888392857142857xh;center,top&resize=980:*",
  "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1689716280-screen-shot-2023-07-18-at-5-36-58-pm-64b70601da0a5.png?crop=1xw:0.9888392857142857xh;center,top&resize=980:*",
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
        <h3 className={styles.title}>Our Top Brands</h3>
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfw45WMsixBrEzKU5mb8T83gmNYzECQT_EQw&usqp=CAU"
              alt="woman with perfume"
              width={500}
              height={300}
            />
          </div>
          <div className="float-child">
            <Image
              src={topBrands[currentImage]}
              alt="new perfumes"
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
        <div
          style={{
            bottom: 0,
            height: "200px",
            width: "100%",
            backgroundColor: "lightgrey",
            display: "flex",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          <div className={styles.footerDiv}>
            <h3 className={styles.footerTitle}>Contacts</h3>
            <ul>
              <li>Email</li>
              <li>Phone</li>
              <li>Fax</li>
            </ul>
          </div>
          <div className={styles.footerDiv} style={{ marginLeft: 0 }}>
            <h3 className={styles.footerTitle}>Social Media</h3>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
            </ul>
          </div>
          <div className={styles.footerDiv} style={{ marginLeft: 0 }}>
            <h3 className={styles.footerTitle}>Get In Touch</h3>
            <ul>
              <li>Contact Us</li>
              <li>Give Feedback</li>
            </ul>
          </div>
        </div>
        <hr style={{ width: "90%" }} />
        <p style={{ paddingLeft: "5%", fontSize: "14px" }}>
          &copy; Golden Perfume 2023
        </p>
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
    </div>
  );
};
