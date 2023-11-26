"use client";
import * as React from "react";
import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
  CardImage,
  CardSubtitle,
  Avatar,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { Loader } from "@progress/kendo-react-indicators";

export const ProductLoader = () => {
  return (
    <React.Fragment>
      <h3
        style={{
          fontSize: "80px",
          paddingLeft: "2em",
        }}
      ></h3>
      <div
        style={{
          paddingLeft: "10em",
          paddingBottom: "8em",
        }}
      >
        <GridLayout
          gap={{
            rows: 20,
            cols: 40,
          }}
          cols={[
            {
              width: "30%",
            },
            {
              width: "30%",
            },
            {
              width: "30%",
            },
          ]}
        >
          {[1, 2, 3].map((index: number) => {
            return (
              <GridLayoutItem key={index}>
                <Card
                  orientation="horizontal"
                  style={{
                    height: "300px",
                  }}
                >
                  <CardImage />
                  <div className="k-vbox">
                    <CardHeader>
                      <CardTitle></CardTitle>
                      <CardSubtitle></CardSubtitle>
                    </CardHeader>
                    <CardBody>
                      <ul
                        style={{
                          listStyle: "none",
                          paddingLeft: "0px",
                        }}
                      >
                        <Loader size="large" type={"infinite-spinner"} />
                        <li>price: </li>
                        <li>rating: </li>
                        <li>sex: </li>
                        <li>size: </li>
                        <li>remaining: </li>
                      </ul>
                    </CardBody>
                    <CardActions>
                      <Button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary">
                        Add to Cart
                      </Button>
                      <Button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-primary">
                        Favorite
                      </Button>
                    </CardActions>
                  </div>
                </Card>
              </GridLayoutItem>
            );
          })}
        </GridLayout>
      </div>
    </React.Fragment>
  );
};
