import * as React from "react";
import { SignIn } from "./SignIn";
import { BackToHome } from "../../components/BackToHome/BackToHome";

export default async function Page() {
  return (
    <React.Fragment>
      <BackToHome />
      <SignIn />
    </React.Fragment>
  );
}
