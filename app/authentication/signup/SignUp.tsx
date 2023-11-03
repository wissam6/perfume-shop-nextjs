"use client";
/* import "@progress/kendo-theme-fluent/dist/all.css"; */

import * as React from "react";
import {
  Form,
  Field,
  FormElement,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { db } from "../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
const bcrypt = require("bcryptjs");

export const SignUp = () => {
  const router = useRouter();
  interface submitProps {
    email: string;
    username: string;
    password: string;
    confirmpassword: string;
  }
  const handleSubmit: any = ({
    email,
    username,
    password,
    confirmpassword,
  }: submitProps) => {
    submit(email, username, password, confirmpassword);
  };

  const submit = async (
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

    if (!emailExists && !userNameExists && password === confirmpassword) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          userName: userName,
          email: email,
          password: await bcrypt.hash(password, 10),
        });
        router.push("/authentication/signin");
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else if (!emailExists && userNameExists) {
      window.alert("username already exists");
    } else if (password !== confirmpassword) {
      window.alert("passwords do not match");
    } else {
      window.alert("email already exists");
    }
  };
  return (
    <React.Fragment>
      <div
        style={{
          margin: "auto",
          width: "50%",
          paddingTop: "10%",
        }}
      >
        <Form
          onSubmit={handleSubmit}
          render={(formRenderProps: FormRenderProps) => (
            <FormElement style={{ maxWidth: 650 }}>
              <fieldset className={"k-form-fieldset"}>
                <h3 style={{ textAlign: "center", fontSize: "26px" }}>
                  Create Account
                </h3>
                <div className="mb-3">
                  <Field
                    name={"email"}
                    component={Input}
                    label={"email"}
                    type="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"username"}
                    component={Input}
                    label={"username"}
                    required
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"password"}
                    component={Input}
                    label={"password"}
                    type="password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"confirmpassword"}
                    component={Input}
                    label={"confirm password"}
                    type="password"
                    required
                  />
                </div>
              </fieldset>
              <div className="k-form-buttons">
                <button
                  style={{ width: "100%" }}
                  type={"submit"}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                  disabled={!formRenderProps.allowSubmit}
                >
                  Submit
                </button>
              </div>
            </FormElement>
          )}
        />
      </div>
    </React.Fragment>
  );
};
