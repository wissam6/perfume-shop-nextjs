"use client";
import "@progress/kendo-theme-fluent/dist/all.css";

import * as React from "react";
import {
  Form,
  Field,
  FormElement,
  FieldRenderProps,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";

export const SignIn = () => {
  const handleSubmit = (dataItem: { [name: string]: any }) =>
    alert(JSON.stringify(dataItem, null, 2));
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
                <h3 style={{ textAlign: "center", fontSize: "26px" }}>Login</h3>
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
