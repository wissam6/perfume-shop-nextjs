import * as React from "react";
import { SignIn } from "./SignIn";
import { BackToHome } from "../../components/BackToHome/BackToHome";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { redirect } from "next/navigation";
const bcrypt = require("bcryptjs");

export default async function Page() {
  const formAction = async (email: string, password: string) => {
    "use server";
    let emailExists = false;
    let hashPassword;
    let userName: any;

    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
      if (doc.data().email === email) {
        emailExists = true;
        hashPassword = doc.data().password;
        userName = doc.data().userName;
      }
    });

    if (!emailExists) {
      console.log("incorrect email");
    } else {
      const isPassEqual = await bcrypt.compare(password, hashPassword);
      if (isPassEqual) {
        if (typeof window !== "undefined") {
          localStorage.setItem("users", JSON.stringify(userName));
        }
        redirect("/");
      } else {
        console.log("incorrect password");
      }
    }
  };
  return (
    <React.Fragment>
      <BackToHome />
      <SignIn formAction={formAction} />
    </React.Fragment>
  );
}
