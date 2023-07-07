import * as React from "react";
import Link from "next/link";


export default function Page() {
  return (
    <React.Fragment>
      <h1>Welcome to Globomantics App</h1>
      <Link href="/authentication/signin">SignIn</Link>
      <br/>
      <Link href="/authentication/signup">SignIn</Link>
    </React.Fragment>
  );
}
