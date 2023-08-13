import * as React from "react";
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Footer/Footer";
export default function RootLayout({ children }) {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
}
