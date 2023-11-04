"use client";

import * as React from "react";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  Avatar,
} from "@progress/kendo-react-layout";
import { Popup } from "@progress/kendo-react-popup";
import Link from "next/link";
import { SvgIcon } from "@progress/kendo-react-common";
import { Button } from "@progress/kendo-react-buttons";
import { loginIcon, plusCircleIcon } from "@progress/kendo-svg-icons";
import styles from "./header.module.css";

export const Header = () => {
  const [show, setShow] = React.useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<string>();
  const anchor = React.useRef(null);
  const handleClick = () => {
    setShow(!show);
  };
  React.useEffect(() => {
    const userExists = localStorage.getItem("users");
    if (userExists) {
      setIsLoggedIn(true);
      setUser(userExists);
    }
  }, []);
  return (
    <React.Fragment>
      <div className="headerDiv">
        <AppBar positionMode="sticky">
          <AppBarSection className={styles.title}>
            <Link href="/home">
              <h1 className={styles.title}>Golden Perfume</h1>
            </Link>
          </AppBarSection>

          <AppBarSpacer
            style={{
              width: 32,
            }}
          />

          <AppBarSection className="appbar-items">
            <ul>
              <li>
                <Link href="./aboutus">About Us</Link>
              </li>
              <li>
                <Link href="./home#our-top-brands">Our Top Brands</Link>
              </li>
              <li>
                <Link href="./allproducts">All Products</Link>
              </li>
              <li>
                <Link href="./home#contact-us">Contact Us</Link>
              </li>
            </ul>
          </AppBarSection>

          <AppBarSpacer />
          {!isLoggedIn && (
            <>
              <AppBarSection>
                <Link href="./authentication/signin">
                  Sign In <SvgIcon icon={loginIcon} />
                </Link>
              </AppBarSection>
              <AppBarSection>
                <Link href="./authentication/signup">
                  Sign Up <SvgIcon icon={plusCircleIcon} />
                </Link>
              </AppBarSection>
            </>
          )}
          {isLoggedIn && (
            <>
              <AppBarSection>Welcome, {user}</AppBarSection>
              <button ref={anchor} onClick={handleClick}>
                <Avatar rounded="full" type="text" style={{ marginRight: 5 }} />
              </button>
              <Popup
                anchor={anchor.current}
                show={show}
                style={{ marginLeft: -10 }}
              >
                <div className="content">
                  <ul>
                    <li>
                      <Link href="">Profile</Link>
                    </li>
                    <li>
                      <Link href="">My Orders</Link>
                    </li>
                  </ul>
                </div>
              </Popup>
            </>
          )}
        </AppBar>
      </div>
    </React.Fragment>
  );
};
