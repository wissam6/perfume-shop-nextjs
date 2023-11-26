"use client";

import * as React from "react";
import {
  Form,
  Field,
  FormElement,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { Hint } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signupAction } from "../actions/authentication-actions";

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
    signupAction(email, username, password, confirmpassword);
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
        <Hint>
          Already have an account?{" "}
          <Link style={{ marginLeft: "5px", color: "red" }} href="./signin">
            Sign In
          </Link>
        </Hint>
      </div>
    </React.Fragment>
  );
};
