"use client";
import Link from "next/link";
import { Button } from "@progress/kendo-react-buttons";
export default function Page() {
  return (
    <>
      <Button>
        <Link href="./home">Back to Home</Link>
      </Button>
      <br />
      <br />
      Golden Perfume has been established in 2023 and is a rising perfume
      worldwide perfume business. We well all kinds of perfumes and we ship to
      the whole world.
    </>
  );
}
