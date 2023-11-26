"use client";
import { HorizontalProductCard } from "../components/HorizontalProductCard/HorizontalProductCard";

import * as React from "react";
import { cartIcon } from "@progress/kendo-svg-icons";
import { SvgIcon } from "@progress/kendo-react-common";

export function CartPage() {
  const [cart, setCart] = React.useState([]);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const cartArray =
        JSON.parse(localStorage.getItem("items") as string) || "";
      setCart(cartArray);
    }
  }, []);
  return (
    <>
      {/* <HeaderServer /> */}
      <h3
        style={{
          margin: "20px",
          fontSize: "80px",
        }}
      >
        Cart <SvgIcon icon={cartIcon} size="xxxlarge" />
      </h3>
      {cart &&
        cart.map((cart: any) => {
          return (
            <HorizontalProductCard key={cart.id} item={cart} page={"cart"} />
          );
        })}
    </>
  );
}
