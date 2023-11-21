"use client";

import * as React from "react";
import {
  Form,
  Field,
  FormElement,
  FieldRenderProps,
  FormRenderProps,
  FieldWrapper,
} from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Error, Hint } from "@progress/kendo-react-labels";
import { DialogPopup } from "@/app/components/DialogPopup/DialogPopup";
import Link from "next/link";

const emailRegex: RegExp = new RegExp(/\S+@\S+\.\S+/);

export const SignIn = (props: any) => {
  const [visible, setVisible] = React.useState<boolean>(false);

  const EmailInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
      <div className="k-form-field-wrap">
        <Input {...others} labelClassName={"k-form-label"} />
        {visited && validationMessage && <Error>{validationMessage}</Error>}
      </div>
    );
  };

  interface submitProps {
    email: string;
    password: string;
  }
  const handleSubmit: any = ({ email, password }: submitProps) => {
    submit(email, password);
  };

  const submit = async (email: string, password: string) => {
    props.formAction(email, password);
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const userExists = localStorage.getItem("users");
      if (userExists) {
        setVisible(true);
      }
    }
  }, []);

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
                    component={EmailInput}
                    label={"Email"}
                    required
                    /* server side validation is used instead */
                    //validator={emailValidator}
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
        <Hint>
          Do not have an account?{" "}
          <Link style={{ marginLeft: "5px", color: "red" }} href="./signup">
            Sign Up
          </Link>
        </Hint>
      </div>
      <DialogPopup isVisible={visible} message="You are already logged in" />
    </React.Fragment>
  );
};
