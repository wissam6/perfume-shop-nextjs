'use client';

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Page() {
  const router = useRouter();
  React.useEffect(()=> {
    router.push("/home");
  }, [])
  return (
    <React.Fragment>
      <h1>Golden Perfume</h1>
      <Link href="/home">Home</Link>
      <br/>
      <Link href="/authentication/signin">Sign In</Link>
      <br/>
      <Link href="/authentication/signup">Sign Up</Link>
      <br/>
      <Link href="/allproducts">All Products</Link>
    </React.Fragment>
  );
}
