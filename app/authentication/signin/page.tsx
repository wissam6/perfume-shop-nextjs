"use client";
import * as React from "react";
import { SignIn } from "./SignIn";
import Link from "next/link";
import { Button } from "@progress/kendo-react-buttons";

export default function Page() {
  return (
    <React.Fragment>
      <Button>
        <Link href="../home">Back to Home</Link>
      </Button>
      <SignIn />
    </React.Fragment>
  );
}
