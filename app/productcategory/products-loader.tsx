"use client";
import * as React from "react";

import { Loader } from "@progress/kendo-react-indicators";

export const ProductLoader = () => {
  return (
    <div
      style={{
        margin: "0 auto",
        width: "50%",
      }}
    >
      Loading...
      <Loader size="large" type={"infinite-spinner"} />
    </div>
  );
};
