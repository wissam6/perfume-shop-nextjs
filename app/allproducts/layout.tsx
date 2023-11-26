import { HeaderServer } from "../components/Header/HeaderServer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderServer />
      {children}
    </>
  );
}
