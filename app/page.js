'use client';

import * as React from "react";
import { Home } from "./home/Home";
import { Header } from "./components/Home/Header";
export default function Page() {
  return (
    <React.Fragment>
      <Header/>
      <Home/>
    </React.Fragment>
  );
}
