"use client";
import React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { groupBy } from "@progress/kendo-data-query";
import { circleIcon } from "@progress/kendo-svg-icons";
import { SvgIcon } from "@progress/kendo-react-common";
const themes = [
  {
    swatch: "default/default-main",
    theme: "default",
    text: "Main",
  },
  {
    swatch: "default/default-main-dark",
    theme: "default",
    text: "Main Dark",
  },
  {
    swatch: "default/default-ocean-blue",
    theme: "default",
    text: "Ocean Blue",
  },
  {
    swatch: "default/default-ocean-blue-a11y",
    theme: "default",
    text: "Ocean Blue a11y",
  },
  {
    swatch: "default/default-nordic",
    theme: "default",
    text: "Nordic",
  },
  {
    swatch: "default/default-purple",
    theme: "default",
    text: "Purple",
  },
  {
    swatch: "default/default-turquoise",
    theme: "default",
    text: "Turquoise",
  },
  {
    swatch: "bootstrap/bootstrap-main",
    theme: "bootstrap",
    text: "Main",
  },
  {
    swatch: "bootstrap/bootstrap-main-dark",
    theme: "bootstrap",
    text: "Main Dark",
  },
  {
    swatch: "bootstrap/bootstrap-nordic",
    theme: "bootstrap",
    text: "Nordic",
  },
  {
    swatch: "bootstrap/bootstrap-urban",
    theme: "bootstrap",
    text: "Urban",
  },
  {
    swatch: "bootstrap/bootstrap-vintage",
    theme: "bootstrap",
    text: "Vintage",
  },
  {
    swatch: "material/material-main",
    theme: "material",
    text: "Main",
  },
  {
    swatch: "material/material-main-dark",
    theme: "material",
    text: "Main Dark",
  },
  {
    swatch: "material/material-arctic",
    theme: "material",
    text: "Arctic",
  },
  {
    swatch: "material/material-lime-dark",
    theme: "material",
    text: "Lime Dark",
  },
  {
    swatch: "material/material-nova",
    theme: "material",
    text: "Nova",
  },
  {
    swatch: "fluent/fluent-main",
    theme: "fluent",
    text: "Main",
  },
];

export const ThemeSwitcher = ({ theme, onThemeChange }: any) => {
  const state: any = {
    groupedData: groupBy(themes, [
      {
        field: "theme",
      },
    ]).reduce((res: any, group: any) => [...res, ...group.items], []),
  };

  const [value, setValue] = React.useState();

  const handleChange = (event: any) => {
    const link = document.head.querySelector("link[data-kendo");
    if (link) {
      link.setAttribute(
        "href",
        `https://cdn.kendostatic.com/themes/7.0.1/${event.target.value.swatch}.css`
      );
    }
    setValue(event.value);
  };

  const itemRender = (li: any, itemProps: any) => {
    let color;
    if (itemProps.dataItem.theme !== undefined) {
      if (itemProps.dataItem.theme === "default") {
        color = "#ff6358";
      } else if (itemProps.dataItem.theme === "bootstrap") {
        color = "#0275d8";
      } else if (itemProps.dataItem.theme === "material") {
        color = "#3f51b5";
      } else {
        color = "#323130";
      }
    }

    const itemChildren = (
      <span>
        <SvgIcon icon={circleIcon} size="xlarge" color={color} />
        {li.props.children}
      </span>
    );
    return React.cloneElement(li, li.props, itemChildren);
  };

  return (
    <>
      <DropDownList
        data={state.groupedData}
        itemRender={itemRender}
        textField="text"
        groupField="theme"
        style={{ width: "180px" }}
        onChange={handleChange}
        defaultValue={{
          swatch: "default/default-main",
          theme: "default",
          text: "Change Theme",
        }}
        value={value}
      />
    </>
  );
};
