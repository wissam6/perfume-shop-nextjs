import * as React from "react";
import { Header } from "../components/Header/HeaderClient";
import { Footer } from "../components/Footer/Footer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
}
