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
import {
  heartIcon,
  loginIcon,
  plusCircleIcon,
} from "@progress/kendo-svg-icons";
import { useRouter } from "next/navigation";
import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";
import { cartIcon } from "@progress/kendo-svg-icons";
import { ThemeSwitcher } from "../theme-switcher/ThemeSwitcher";
import styles from "./header.module.css";
import Image from "next/image";

export const Header = (props: any) => {
  const userInfo = props.user && JSON.parse(props.user.value);
  const router = useRouter();
  const [cartNumber, setCartNumber] = React.useState<number>();
  const [favouritesNumber, setFavouritesNumber] = React.useState();
  const [show, setShow] = React.useState<boolean>(false);
  const anchor = React.useRef(null);
  const handleClick = () => {
    setShow(!show);
  };

  React.useEffect(() => {
    if (typeof window !== undefined) {
      const cartNumber =
        localStorage.getItem("items") !== null
          ? JSON.parse(localStorage.getItem("items") as any).length
          : 0;
      setCartNumber(cartNumber);
      const favouritesNumber =
        localStorage.getItem("fav") !== null
          ? JSON.parse(localStorage.getItem("fav") as any).length
          : 0;
      setFavouritesNumber(favouritesNumber);
    }

    const handleStorage = () => {
      const items = localStorage.getItem("items") || "";
      const parsedItems = JSON.parse(items);
      if (parsedItems) {
        if (parsedItems.length) {
          setCartNumber(parsedItems.length);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  React.useEffect(() => {
    const handleStorage = () => {
      const items = localStorage.getItem("fav") || "";
      const parsedItems = JSON.parse(items);
      if (parsedItems) {
        if (parsedItems.length) {
          setFavouritesNumber(parsedItems.length);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const logout = () => {
    localStorage.removeItem("users");
    router.push("/home");
  };
  return (
    <React.Fragment>
      <div className="headerDiv">
        <AppBar positionMode="sticky">
          <AppBarSection className={styles.title}>
            <Link href="/home">
              <h1 className={styles.title}>
                <span style={{ color: "#ffd700" }}>Golden</span> Perfume
              </h1>
            </Link>
          </AppBarSection>
          <Image src="perfume.svg" alt="My Happy SVG" width={50} height={50} />
          <AppBarSpacer
            style={{
              width: 32,
            }}
          />
          <AppBarSection className="appbar-items">
            <ul className={styles.ulStyles}>
              <li className={styles.liStyles}>
                <Link href="/aboutus">About Us</Link>
              </li>
              <li className={styles.liStyles}>
                <Link href="/home#our-top-brands">Our Top Brands</Link>
              </li>
              <li className={styles.liStyles}>
                <Link href="/allproducts">All Products</Link>
              </li>
              <li className={styles.liStyles}>
                <Link href="/home#contact-us">Contact Us</Link>
              </li>
            </ul>
          </AppBarSection>
          <AppBarSpacer />
          <AppBarSection>
            <div
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              <Link href={"/cart"} as="/cart">
                <BadgeContainer>
                  <SvgIcon icon={cartIcon} size="large" />
                  <Badge
                    size="small"
                    align={{ vertical: "bottom", horizontal: "end" }}
                    cutoutBorder={true}
                  >
                    {cartNumber}
                  </Badge>
                </BadgeContainer>
              </Link>
              <Link href={"/favourites"} as="/favourites">
                <BadgeContainer>
                  <SvgIcon icon={heartIcon} size="large" />
                  <Badge
                    size="small"
                    align={{ vertical: "bottom", horizontal: "end" }}
                    cutoutBorder={true}
                  >
                    {favouritesNumber}
                  </Badge>
                </BadgeContainer>
              </Link>
            </div>
          </AppBarSection>
          <AppBarSection>
            <ThemeSwitcher />
          </AppBarSection>
          {!userInfo && (
            <>
              <AppBarSection>
                <Link href="/authentication/signin">
                  Sign In <SvgIcon icon={loginIcon} />
                </Link>
              </AppBarSection>
              <AppBarSection>
                <Link href="/authentication/signup">
                  Sign Up <SvgIcon icon={plusCircleIcon} />
                </Link>
              </AppBarSection>
            </>
          )}
          {userInfo && (
            <>
              <AppBarSection>Welcome, {userInfo.username}</AppBarSection>
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
                      <Link href="/profile">Profile</Link>
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
