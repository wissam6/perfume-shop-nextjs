"use client";
import { HorizontalProductCard } from "../components/HorizontalProductCard/HorizontalProductCard";
import { HeaderServer } from "../components/Header/HeaderServer";

import * as React from "react";
import { cartIcon } from "@progress/kendo-svg-icons";
import { SvgIcon } from "@progress/kendo-react-common";

export default function Page() {
  const [cart, setCart] = React.useState([]);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const cartString: string = localStorage.getItem("items") || "";
      const cart = JSON.parse(cartString);
      setCart(cart);
    }
  }, []);
  return (
    <>
      <HeaderServer />
      <h3
        style={{
          margin: "20px",
          fontSize: "80px",
        }}
      >
        Cart <SvgIcon icon={cartIcon} size="xxxlarge" />
      </h3>
      {cart.map((cart: any) => {
        return (
          <HorizontalProductCard key={cart.id} item={cart} page={"cart"} />
        );
      })}
    </>
  );
}
