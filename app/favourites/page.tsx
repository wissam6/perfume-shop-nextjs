"use client";
import { HorizontalProductCard } from "../components/HorizontalProductCard/HorizontalProductCard";
//import { HeaderServer } from "../components/Header/HeaderServer";

import * as React from "react";
import { heartOutlineIcon } from "@progress/kendo-svg-icons";
import { SvgIcon } from "@progress/kendo-react-common";

export default function Page() {
  const [favourites, setFavourites] = React.useState([]);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const favouritesArray =
        JSON.parse(localStorage.getItem("fav") as string) || "";
      setFavourites(favouritesArray);
    }
  }, []);
  return (
    <>
      {/*  <HeaderServer /> */}
      <h3
        style={{
          margin: "20px",
          fontSize: "80px",
        }}
      >
        Favourites <SvgIcon icon={heartOutlineIcon} size="xxxlarge" />
      </h3>
      {favourites &&
        favourites.map((favourite: any) => {
          return (
            <HorizontalProductCard
              key={favourite.id}
              item={favourite}
              page={"favourites"}
            />
          );
        })}
    </>
  );
}
