"use client";

import * as React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

//import './styles.css';

const topBrands = [
  "https://media.cnn.com/api/v1/images/stellar/prod/210203182253-perfume-gucci-bloom-eau-de-parfum.jpg?q=w_1700,h_956,x_0,y_0,c_fill",
  "https://media.cnn.com/api/v1/images/stellar/prod/220707134827-editors-perfume-missdior.jpg?c=original",
  "https://media.cnn.com/api/v1/images/stellar/prod/210203183829-perfume-viktorrolf-flowerbomb.jpg?q=w_1700,h_956,x_0,y_0,c_fill",
  "https://content.api.news/v3/images/bin/d2dcf285e80b82a7348ef9af58aaf30b",
];

const images = [
  "https://static.beautytocare.com/media/catalog/product/cache/global/image/1300x1300/85e4522595efc69f496374d01ef2bf13/v/e/versace-eros-flame-eau-de-parfum-for-men-100ml.jpg",
  "https://www.sephora.com/productimages/sku/s2615052-main-zoom.jpg",
  "https://douglas.bg/media/catalog/product/cache/dd4850ad4231b6306bceadf38a0bbeed/1/_/1_4271_1.jpg",
  "https://prod-admin-images.s3.ap-south-1.amazonaws.com/K22GjqT3GPh0_HD1284O/product/gucci-bloom-edp-50ml-01.jpg",
];

const NUMBER_OF_PICTURES = 3;

export const Categories = () => {
  const router = useRouter();

  const handleImageClick = (e: any) => {
    router.push(`/productcategory/${e.target.alt}`);
  };

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
    <React.Fragment>
      <h3 style={{ paddingLeft: "20px" }} id={"our-top-brands"}>
        Our Top Brands
      </h3>
      <p style={{ paddingLeft: "20px" }}>
        We offer a wide collection of the most popular and most used perfumes of
        the best brands. We are partners with Dior, Chanel, Calven Klein, and 73
        other top brands. Just below you can see our latest perfume addition
        which are Dioriviera, My Way Parfum Eau de Parfum, Victoria&apos;s
        Secret Bare Rose Eau de Parfum, and Aqua Media Cologne Forte.
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
      <div className="float-container">
        <div className="float-child pane-content">
          <h3>Versace</h3>
          <Image
            onClick={handleImageClick}
            className="topBrandsImage"
            src={images[0]}
            alt="Versace"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              scale: 0.7,
            }}
            width={500}
            height={300}
          />

          <h3>Dior</h3>
          <Image
            className="topBrandsImage"
            src={images[1]}
            onClick={handleImageClick}
            alt="Dior"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              scale: 0.5,
            }}
            width={500}
            height={300}
          />
        </div>

        <div className="float-child pane-content">
          <h3>Tom Ford</h3>
          <Image
            className="topBrandsImage"
            onClick={handleImageClick}
            src={images[2]}
            alt="TomFord"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              scale: 0.7,
            }}
            width={500}
            height={300}
          />

          <h3>Gucci</h3>
          <Image
            className="topBrandsImage"
            onClick={handleImageClick}
            src={images[3]}
            alt="Gucci"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              scale: 0.7,
            }}
            width={500}
            height={300}
          />
        </div>
      </div>

      <style>
        {`
        .pane-content { 
          padding: 0 10px;
          text-align: center;
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: 50%;
        }
        .k-splitbar {
          background-color: white;
        }
        .topBrandsImage {
          transition: all .5s ease-in-out;
        }
        .topBrandsImage:hover {
          transform: scale(1.1);
        }
        .float-container {
          padding: 20px;
        }
        .float-child {
          width: 50%;
          float: left;
          padding: 20px;
        }  
        `}
      </style>
    </React.Fragment>
  );
};
