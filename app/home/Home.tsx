"use client";

import * as React from "react";
import { Header } from "../components/Header/Header";
import { Categories } from "../components/Header/Categories";
import styles from "./home.module.css";

export const Home = () => {
  fetch("https://dummyjson.com/products/category/fragrances")
    .then((res) => res.json())
    .then(console.log);

  return (
    <React.Fragment>
      <Header />
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
      <div className="categories">
        <h3 className={styles.title}>Categories</h3>
        <Categories />
      </div>
    </React.Fragment>
  );
};
