import * as React from "react";
import { HeaderServer } from "../components/Header/HeaderServer";
import { Footer } from "../components/Footer/Footer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <HeaderServer />
      {children}
      <Footer />
    </React.Fragment>
  );
}
