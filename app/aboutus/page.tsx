import { HeaderServer } from "../components/Header/HeaderServer";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <HeaderServer />
      <div style={{ padding: "50px" }}>
        Golden Perfume has been established in 2023 and is a rising perfume
        worldwide perfume business. We sell all kinds of perfumes and we ship to
        the whole world.
        <br /> <br />
        <Image
          src={
            "https://images.squarespace-cdn.com/content/v1/5b86bce9ec4eb7a3a2afe37a/1540297126118-2DERWW4G9MRFE1D8QV0N/43778744_238417493506485_612761234564880803_n.jpg?format=2500w"
          }
          alt="Eau de Cologne"
          width={1080}
          height={720}
        />
      </div>
    </>
  );
}
