import * as React from "react";
import Link from "next/link";


export default function Page() {
  return (
    <React.Fragment>
      <h1>Golden Perfume</h1>
      <Link href="/home">Home</Link>
      <br/>
      <Link href="/authentication/signin">Sign In</Link>
      <br/>
      <Link href="/authentication/signup">Sign Up</Link>
    </React.Fragment>
  );
}
