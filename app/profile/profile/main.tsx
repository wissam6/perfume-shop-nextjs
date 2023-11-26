"use client";

import * as React from "react";
import { Avatar } from "@progress/kendo-react-layout";
import Image from "next/image";
export const Profile = () => {
  const [user, setUser] = React.useState<string>("");
  React.useEffect(() => {
    const user = localStorage.getItem("users") || "";
    if (user) {
      setUser(user);
    }
  }, []);
  return (
    <div>
      <h1 className={"title k-color-primary"}>My Profile</h1>
      <div className={"list"}>
        <Avatar className={"profile-image"} type={"image"}>
          <Image
            src="https://www.telerik.com/kendo-react-ui-develop/components/images/kendoka-react.png"
            alt="KendoReact Layout Kendoka Avatar"
            width={100}
            height={100}
          />
        </Avatar>
        <div className={"email centered"}>{user}</div>
        <div className={"list-item separator"} />
        <div className={"list-item sub-title"}>Calendars</div>
        <div className={"list-item"}>
          <Avatar type={"text"} themeColor={"primary"} size={"small"} />
          <div>Work</div>
          <span className={"k-icon k-i-saturation my-icon"} />
        </div>
        <div className={"list-item"}>
          <Avatar type={"text"} themeColor={"info"} size={"small"} />
          <div>Family</div>
          <span className={"k-icon k-i-saturation my-icon"} />
        </div>
        <div className={"list-item"}>
          <Avatar type={"text"} themeColor={"warning"} size={"small"} />
          <div>Birthdays</div>
          <span className={"k-icon k-i-saturation my-icon"} />
        </div>
      </div>
    </div>
  );
};
