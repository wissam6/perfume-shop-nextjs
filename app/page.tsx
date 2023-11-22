import * as React from "react";
import { Home } from "./home/Home";
import { HeaderServer } from "./components/Header/HeaderServer";
export default function Page() {
  return (
    <React.Fragment>
      <HeaderServer />
      <Home />
    </React.Fragment>
  );
}
