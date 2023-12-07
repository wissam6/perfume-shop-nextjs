"use client";

import * as React from "react";
import { Avatar } from "@progress/kendo-react-layout";
export const Inbox = () => {
  return (
    <div>
      <h1 className={"title k-color-primary"}>Inbox</h1>
      <div className={"list"}>
        <div className={"list-item"}>
          <Avatar type={"text"} themeColor={"tertiary"}>
            AB
          </Avatar>
          <div>
            Hi Thomas, Since Monday I&apos;ll be out of office, I&apos;m
            rescheduling the meeting for Tuesday.
          </div>
        </div>
        <div className={"list-item separator"} />
        <div className={"list-item sub-title"}>Last Week</div>
        <div className={"list-item"}>
          <Avatar type={"text"} themeColor={"info"}>
            TY
          </Avatar>
          <div>
            Hi Tom, my aunt comes for a visit this Saturday, so I can’t come
            back to St. Pete…
          </div>
        </div>
        <div className={"list-item"}>
          <Avatar type={"text"} themeColor={"warning"}>
            IH
          </Avatar>
          <div>
            Dear All, We would like to inform you that IT will be doing planned
            upgrades…
          </div>
        </div>
      </div>
    </div>
  );
};
