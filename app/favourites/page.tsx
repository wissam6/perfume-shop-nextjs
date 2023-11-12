"use client";
import { HorizontalProductCard } from "../components/HorizontalProductCard/HorizontalProductCard";
import { Header } from "../components/Home/Header";

import * as React from "react";
import { heartOutlineIcon } from "@progress/kendo-svg-icons";
import { SvgIcon } from "@progress/kendo-react-common";

export default function Page() {
  const [favourites, setFavourites] = React.useState([]);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const favouritesString: string = localStorage.getItem("fav") || "";
      const favourites = JSON.parse(favouritesString);
      setFavourites(favourites);
    }
  }, []);
  return (
    <>
      <Header />
      <h3
        style={{
          margin: "20px",
          fontSize: "80px",
        }}
      >
        Favourites <SvgIcon icon={heartOutlineIcon} size="xxxlarge" />
      </h3>
      {favourites.map((favourite: any) => {
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
