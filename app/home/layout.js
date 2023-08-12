import { Header } from "../components/Home/Header";

export default function Layout({ children }) {
    return (
      <html lang="en">
        <body>
        <Header />
          {children}</body>
      </html>
    )
  }