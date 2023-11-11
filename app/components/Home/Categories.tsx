import * as React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

//import './styles.css';
const images = [
  "https://static.beautytocare.com/media/catalog/product/cache/global/image/1300x1300/85e4522595efc69f496374d01ef2bf13/v/e/versace-eros-flame-eau-de-parfum-for-men-100ml.jpg",
  "https://www.sephora.com/productimages/sku/s2615052-main-zoom.jpg",
  "https://douglas.bg/media/catalog/product/cache/dd4850ad4231b6306bceadf38a0bbeed/1/_/1_4271_1.jpg",
  "https://prod-admin-images.s3.ap-south-1.amazonaws.com/K22GjqT3GPh0_HD1284O/product/gucci-bloom-edp-50ml-01.jpg",
];

export const Categories = () => {
  const router = useRouter();

  const handleImageClick = (e: any) => {
    router.push(`/productcategory/${e.target.alt}`);
  };

  return (
    <div>
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
    </div>
  );
};
