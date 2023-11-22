import "server-only";

import * as React from "react";
import { Categories } from "../components/Home/Categories/Categories";
import { OnSale } from "../components/Home/OnSale/OnSale";
import { Footer } from "../components/Footer/Footer";
import styles from "./home.module.css";

export const Home = () => {
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
