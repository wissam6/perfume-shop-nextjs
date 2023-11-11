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
import { useRouter } from "next/navigation";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import styles from "./header.module.css";

export const Header = () => {
  const router = useRouter();
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
  const logout = () => {
    localStorage.removeItem("users");
    router.push("./home");
  };
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
            <ul className={styles.ulStyles}>
              <li className={styles.liStyles}>
                <Link href="./aboutus">About Us</Link>
              </li>
              <li className={styles.liStyles}>
                <Link href="./home#our-top-brands">Our Top Brands</Link>
              </li>
              <li className={styles.liStyles}>
                <Link href="./allproducts">All Products</Link>
              </li>
              <li className={styles.liStyles}>
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
          <AppBarSection>
            <DropDownList defaultValue={"theme chooser"} />
          </AppBarSection>
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
                    <li>
                      <Button onClick={logout}>Logout</Button>
                    </li>
                  </ul>
                </div>
              </Popup>
            </>
          )}
        </AppBar>
      </div>
      <style>
        {`
        .k-badge-container {
          margin-right: 8px;
        }
        .k-appbar-section {
          display: flex;
        }
        .k-button k-button-md k-rounded-md k-button-solid k-button-solid-base {
          padding: 0 8px;
        }
        .content li {
          margin: 0;
          padding: 6px 5px;
        }
        .content ul {
          display: block;
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .content {
          padding: 4px 8px;
        }
        `}
      </style>
    </React.Fragment>
  );
};
