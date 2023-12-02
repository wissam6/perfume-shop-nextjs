"use client";

import { Loader } from "@progress/kendo-react-indicators";

export const GridLoader = () => {
  return (
    <>
      Loading Grid Data...
      <Loader size="large" type={"converging-spinner"} />
    </>
  );
};
