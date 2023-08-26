import * as React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

//import './styles.css';
const images = [
  "https://static.beautytocare.com/media/catalog/product/a/c/acqua-di-parma-colonia-eau-de-cologne-180ml.jpg",
  "https://www.plantesetparfums.com/wp-content/uploads/2021/05/eau-de-toilette-reve-dorient-plantes-parfums.jpg",
  "data:image/jpeg;base64,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",
  "https://static.beautytocare.com/media/catalog/product/cache/global/image/85e4522595efc69f496374d01ef2bf13/v/e/versace-man-eau-fraiche-eau-de-toilette-for-men-100ml.jpg",
  "https://static.beautytocare.com/media/catalog/product/cache/global/image/1300x1300/85e4522595efc69f496374d01ef2bf13/v/e/versace-eros-flame-eau-de-parfum-for-men-100ml.jpg",
];

export const Categories = () => {
  const params = useParams();
  const router = useRouter();

  const handleImageClick = (e: any) => {
    router.push(`/productcategory/${e.target.alt}`);
  };

  return (
    <div>
      <div className="float-container">
        <div className="float-child pane-content">
          <h3>Chanel</h3>
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

          <h3>Calvin Klein</h3>
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
            src={images[3]}
            alt="Tom Ford"
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
            src={images[4]}
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
