import { cookies } from "next/headers";
import { Header } from "./HeaderClient";

export const HeaderServer = () => {
  const cookieStore = cookies();
  const getUser = () => {
    const user = cookieStore.get("user");
    return user;
  };

  const user = getUser();

  return <Header user={user} />;
};
