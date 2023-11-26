"use client";
import Link from "next/link";
import { Button } from "@progress/kendo-react-buttons";
import { SvgIcon } from "@progress/kendo-react-common";
import { chevronDoubleLeftIcon } from "@progress/kendo-svg-icons";

export const BackToHome = () => {
  return (
    <Button>
      <Link href="../home">
        {" "}
        <SvgIcon icon={chevronDoubleLeftIcon} />
        <span style={{ color: "red" }}>Back to Home</span>
      </Link>
    </Button>
  );
};
