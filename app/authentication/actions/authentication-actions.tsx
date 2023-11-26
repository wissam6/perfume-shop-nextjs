"use server";

import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
const bcrypt = require("bcryptjs");

export const signinAction = async (email: string, password: string) => {
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
      const userInfo = {
        username: userName,
        email: email,
      };
      cookies().set("user", JSON.stringify(userInfo));
      redirect("/");
    } else {
      console.log("incorrect password");
    }
  }
};
