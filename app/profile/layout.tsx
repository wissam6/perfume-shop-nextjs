"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  BottomNavigation,
  BottomNavigationSelectEvent,
  BottomNavigationItemProps,
} from "@progress/kendo-react-layout";
import { Header } from "../components/Home/Header";

const items: BottomNavigationItemProps[] = [
  {
    text: "Profile",
    id: "1",
    icon: "user",
    route: "/profile/profile",
  },
  {
    text: "Inbox",
    id: "2",
    icon: "email",
    route: "/profile/inbox",
    selected: true,
  },
  {
    text: "Calendar",
    id: "3",
    icon: "calendar",
    route: "/profile/calendar",
  },
];

export default function BottomNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selected, setSelected] = React.useState("/profile/profile");

  const router = useRouter();
  const onSelect = (e: BottomNavigationSelectEvent) => {
    setSelected(e.itemTarget.route);
    router.push(e.itemTarget.route);
  };

  const setSelectedItem = (pathName: string) => {
    const currentPath = items.find((item) => item.route === pathName);
    if (currentPath && currentPath.text) {
      return currentPath.text;
    }
  };

  const selectedItem = setSelectedItem(selected);

  return (
    <>
      {/*  <Header /> */}
      <div className={"example-wrapper"}>
        <div className={"page"}>
          <div className={"content"}>{children}</div>
          <BottomNavigation
            positionMode={"sticky"}
            items={items.map((item) => ({
              ...item,
              selected: item.text === selectedItem,
            }))}
            onSelect={onSelect}
          />
        </div>

        <style>{`
                .example-wrapper {
                    width: 350px;
                    margin: 0 auto;
                    box-shadow: 0px 10px 20px #00000029;
                    border-radius: 30px;
                }
                .page { padding: 10px 10px 0 10px; }
                .content {
                    background: #F9F9F9;
                    border-radius: 30px 30px 0 0;
                    height: 550px;
                }
                .k-bottom-nav { border-radius: 0 0 20px 20px; }
                .title {
                    text-align: center;
                    font-size: 30px;
                    padding: 40px 0;
                }
                .list {
                    display: flex;
                    flex-direction: column;
                    padding: 0 20px;
                }
                .list-item {
                    display: flex;
                    flex-direction: row;
                    margin-bottom: 30px;
                    position: relative;
                }
                .k-avatar { margin-right: 15px; }
                .separator { border: 1px solid #ccc; }
                .section {
                    background: #EDEDED;
                    font-weight: bold;
                    padding: 2px 5px;
                    margin-bottom: 15px;
                }
                .centered { margin: 30px auto;}
                .v-line {
                    width: 2px;
                    margin: 0 10px 0 15px;
                }
                .profile-image {
                    width: 100px;
                    height: 100px;
                    flex-basis: 100px;
                    padding: 1px;
                    margin: 0 auto;
                }
                .email { font-weight: bold; }
                .my-icon {
                    position: absolute;
                    right: 0;
                }
            `}</style>
      </div>
    </>
  );
}
