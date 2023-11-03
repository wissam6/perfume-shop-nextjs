"use client";
import { SignUp } from "./SignUp";
import Link from "next/link";
import { Button } from "@progress/kendo-react-buttons";

export default function Page() {
  return (
    <>
      <Button>
        <Link href="../home">Back to Home</Link>
      </Button>
      <SignUp />
    </>
  );
}
