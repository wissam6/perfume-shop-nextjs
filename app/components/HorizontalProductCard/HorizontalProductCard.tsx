"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
  CardImage,
  CardSubtitle,
} from "@progress/kendo-react-layout";
import { starIcon, starOutlineIcon } from "@progress/kendo-svg-icons";
import { SvgIcon } from "@progress/kendo-react-common";

export const HorizontalProductCard = (props: any) => {
  console.log(props.item);
  return (
    <div>
      <Card orientation="horizontal" style={{ padding: "10px" }}>
        <CardImage src={props.item.image} />
        <div className="k-vbox">
          <CardHeader>
            <CardTitle>
              {props.item.brand + " " + props.item.name + " " + props.item.type}
            </CardTitle>
            <CardSubtitle>
              <span className="reviews">
                <SvgIcon icon={starIcon} style={{ color: "#ffce2a" }} />
                <SvgIcon icon={starIcon} style={{ color: "#ffce2a" }} />
                <SvgIcon icon={starIcon} style={{ color: "#ffce2a" }} />
                <SvgIcon icon={starIcon} style={{ color: "#ffce2a" }} />
                <SvgIcon icon={starOutlineIcon} />
                <div>4/5 (681)</div>
              </span>
            </CardSubtitle>
          </CardHeader>
          <CardBody>
            <p>${props.item.price}</p>
          </CardBody>
          <CardActions>
            <button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary">
              Add to Cart
            </button>
            <button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary">
              Remove
            </button>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};
