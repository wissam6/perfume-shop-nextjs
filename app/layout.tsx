import "./globals.css";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: "300",
  style: "normal",
  subsets: ["latin"],
});
//import "@progress/kendo-theme-default/dist/all.css";

export const metadata = {
  title: "Golden Perfume",
  description: "Perfume Online Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          data-kendo="true"
          href={`https://cdn.kendostatic.com/themes/7.0.1/default/default-main.css`}
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
