"use client";

import * as React from "react";
import { Header } from "../components/Header/Header";
import { Categories } from "../components/Header/Categories";
import styles from "./home.module.css";

export const Home = () => {
  return (
    <div>
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
      <div className="onsale">
        <h3 className={styles.title}>On Sale</h3>
      </div>
    </div>
  );
};
