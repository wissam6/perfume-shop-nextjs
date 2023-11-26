"use server";

import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
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

export const signupAction = async (
  email: string,
  userName: string,
  password: string,
  confirmpassword: string
) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  let emailExists: any,
    userNameExists: boolean = false;
  querySnapshot.forEach((doc) => {
    if (doc.data().email === email) {
      emailExists = true;
    }
    if (doc.data().userName === userName) {
      userNameExists = true;
    }
  });
  let validSignUp = false;
  if (!emailExists && !userNameExists && password === confirmpassword) {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        userName: userName,
        email: email,
        password: await bcrypt.hash(password, 10),
      });
      console.log("Document written with ID: ", docRef.id);
      validSignUp = true;
    } catch (e) {
      //console.error("Error adding document: ", e);
    }
  } else if (!emailExists && userNameExists) {
    //console.log("username already exists");
  } else if (password !== confirmpassword) {
    //console.log("passwords do not match");
  } else {
    //console.log("email already exists");
  }
  if (validSignUp) {
    redirect("/authentication/signin");
  }
};
