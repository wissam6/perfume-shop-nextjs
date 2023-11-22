import { cookies } from "next/headers";
import { Header } from "./HeaderClient";

export const HeaderServer = () => {
  const cookieStore = cookies();
  const user = cookieStore.get("user");
  const cart = cookieStore.get("cart");
  const favorites = cookieStore.get("favorites");
  return <Header user={user} cart={cart} favorites={favorites} />;
};
