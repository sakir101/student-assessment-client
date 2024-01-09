"use client";

import React from "react";
import SingleCard from "./singleCard";
import { Card, Col, Row } from "antd";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";
import Image from "next/image";

const HomeCard = ({ allInfo }: any) => {
  const { Meta } = Card;
  const info = [
    {
      id: "1",
      title: "Supportive Community",
      description:
        "Student wil find the faculty whom they prefer Faculty also find those student whom they need. By these process a supportive community will build",
      image_url: "/images/studentCommunity.png",
    },
    {
      id: "2",
      title: "Showcasing Skill",
      description:
        "Student wil find the faculty whom they prefer Faculty also find those student whom they need. By these process a supportive community will build",
      image_url: "/images/skill.png",
    },
    {
      id: "3",
      title: "Career Guideline ",
      description:
        "Student wil find the faculty whom they prefer Faculty also find those student whom they need. By these process a supportive community will build",
      image_url: "/images/careerGuideline.png",
    },
  ];
  console.log(allInfo);
  return (
    <div className="px-5 lg:px-0">
      <h1 className="text-center text-blue-400">Why Choose Intellicruit</h1>
      <div className="grid gap-[34px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto mt-5 lg:w-3/4 ">
        {info?.map((item: any) => (
          <div key={item?.id} className="card  bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <Image
                src={item?.image_url}
                width={500}
                height={200}
                layout="responsive"
                alt="login image"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{item?.title}</h2>
              <p>{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
