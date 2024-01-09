import Image from "next/image";
import styles from "./page.module.css";
import HomeHeader from "@/components/Home/homeHeader";
import HomeCard from "@/components/Home/homeCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Assessment | Home",
};

export default async function Home() {
  return (
    <div
      style={{
        background:
          "linear-gradient(to right, #051937, #001b4b, #001c5f, #001b71, #0c1682)",
      }}
    >
      <HomeHeader />
      <HomeCard />
    </div>
  );
}
