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
          <AppBarSection className="title">
            <Link href="/home">
              <h1 className="title">Golden Perfume</h1>
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
        <style>{`
            
            .headerDiv .title {
                font-size: 18px;
                margin: 0;
            }
            .headerDiv .k-badge-container {
                margin-right: 8px;
            }
            .headerDiv ul {
                font-size: 14px;
                list-style-type: none;
                padding: 0;
                margin: 0;
                display: flex;
            }
            .headerDiv li {
                margin: 0 9px;
            }
            .headerDiv li:hover {
                cursor: pointer;
                color: #84cef1;
            }
            .headerDiv .k-appbar-section {
                display: flex;
            }
            .headerDiv .k-button k-button-md k-rounded-md k-button-solid k-button-solid-base {
                padding: 0 8px;
            }
            .headerDiv .content li {
                margin: 0;
                padding: 6px 5px;
            }
            .headerDiv .content ul {
                display: block;
            }
            .content {
                padding: 4px 8px;
            }
            @media only screen and (max-width: 600px) {
              .headerDiv  
              .appbar-items,
                .user-actions,
                .k-avatar,
                .k-appbar-separator {
                    display: none;
                }
                .headerDiv
                .overflow-button {
                    display: block;
                }
                .headerDiv
                .content ul li:last-child {
                    display: block;
                }
            }
            /* Small devices (portrait tablets and large phones, 600px and up) */
            @media only screen and (min-width: 600px) {
              .headerDiv  
              .appbar-items,
                .user-actions .k-badge-container,
                .k-avatar,
                .k-appbar-separator {
                    display: none;
                }
                .headerDiv
                .overflow-button {
                    display: block;
                }
                .headerDiv
                .content ul li:last-child {
                    display: none;
                }
            }
            /* Medium devices (landscape tablets, 768px and up) */
            @media only screen and (min-width: 768px) {
              .headerDiv  
              .appbar-items,
                .user-actions .k-badge-container,
                .k-appbar-separator,
                .k-avatar {
                    display: block;
                }
            }
            /* Large devices (laptops/desktops, 992px and up) */
            @media only screen and (min-width: 992px) {}
            `}</style>
      </div>
    </React.Fragment>
  );
};
