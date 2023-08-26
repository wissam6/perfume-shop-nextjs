"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import {
  Form,
  Field,
  FormElement,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
const bcrypt = require("bcryptjs");

export const SignIn = () => {
  const [loggedUser, setLoggedUser] = React.useState();

  const router = useRouter();
  interface submitProps {
    email: string;
    password: string;
  }
  const handleSubmit: any = ({ email, password }: submitProps) => {
    submit(email, password);
  };

  const submit = async (email: string, password: string) => {
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
      window.alert("incorrect email");
    } else {
      bcrypt.compare(password, hashPassword, function (err: any, res: any) {
        if (err) {
          console.log(err);
        }
        if (res) {
          setLoggedUser(userName);
          router.push("/");
        } else {
          window.alert("incorrect password");
        }
      });
    }
  };

  React.useEffect(() => {
    localStorage.setItem("users", JSON.stringify(loggedUser));
  }, [loggedUser]);

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
                  Welcome
                </h3>
                <div className="mb-3">
                  <Field
                    name={"email"}
                    component={Input}
                    label={"Email"}
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
