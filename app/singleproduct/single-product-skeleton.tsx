"use client";
import * as React from "react";

import { Skeleton } from "@progress/kendo-react-indicators";

import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardFooter,
  CardImage,
  Avatar,
} from "@progress/kendo-react-layout";

export const SingleProductSkeleton = () => {
  return (
    <div className="example">
      <div className="example-wrap k-d-flex k-justify-content-around">
        <Card style={{ minWidth: 350, width: 350, height: "auto" }}>
          <CardHeader className="k-hbox">
            <Skeleton
              shape={"circle"}
              style={{ width: 45, height: 45, marginRight: 16 }}
            />
            <div style={{ flex: "1 1 50%" }}>
              <Skeleton shape={"text"} style={{ width: "100%" }} />
              <Skeleton shape={"text"} style={{ width: "40%" }} />
            </div>
          </CardHeader>
          <Skeleton
            shape={"rectangle"}
            style={{ width: "100%", height: 230 }}
          />
          <CardFooter>
            <Skeleton shape={"text"} style={{ width: "100%" }} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
