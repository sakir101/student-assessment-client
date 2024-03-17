"use client";

import Loading from "@/app/loading";
import {
  useGetAssignExpertiseQuery,
  useGetSingleFacultyByFacultyIdQuery,
} from "@/redux/api/facultyApi";
import { Tabs } from "antd";
import { TabsProps } from "antd/lib/tabs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { RadioChangeEvent } from "antd";

import React from "react";
import { FacultyInterest } from "@/types";

const { TabPane } = Tabs;
type TabPosition = "left" | "right" | "top" | "bottom";

const Page = () => {
  const query: Record<string, any> = {};
  const [id, setId] = useState<string>("");

  const [mode, setMode] = useState<TabPosition>("left");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    const match = url.match(/\/([^\/?]+)\?$/);
    const extractId = match ? match[1] : null;
    if (extractId !== null) {
      setId(extractId);
    }
  }, [pathname, searchParams]);

  const { data, isLoading, refetch } = useGetSingleFacultyByFacultyIdQuery(
    id,

    { refetchOnMountOrArgChange: true }
  );

  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  const userId = data?.user?.id;

  const { data: data1 } = useGetAssignExpertiseQuery(
    {
      id: userId,
      arg: query,
    },
    { refetchOnMountOrArgChange: true }
  );
  console.log(data1);
  const interestData = data1?.interest;
  const meta = data1?.meta;

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Personal Information",
      children: (
        <div>
          <div className="mt-5 grid grid-cols-2 items-center mx-auto ">
            <div>
              <p className="mb-5">
                <span className="text-lg text-gray-600 ">University</span>
              </p>
              <p className="mb-5">
                <span className="text-lg text-gray-600 ">Employee ID</span>
              </p>
              <p className="mb-5">
                <span className="text-lg text-gray-600 ">Contact Number</span>
              </p>
              <p className="mb-5">
                <span className="text-lg text-gray-600 ">Email</span>
              </p>
            </div>

            <div>
              <p className="mb-5">
                <span className="text-lg font-semibold">
                  {data?.institution}
                </span>
              </p>
              <p className="mb-5">
                <span className="text-lg font-semibold">{data?.facultyId}</span>
              </p>
              <p className="mb-5">
                <span className="text-lg font-semibold">
                  {data?.contactNum}
                </span>
              </p>
              <p className="mb-5">
                <span className="text-lg font-semibold">
                  {data?.user?.email}
                </span>
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Expertise",
      children: (
        <div className="mt-5 grid grid-cols-2 items-center mx-auto ">
          <div>
            <h2 className="me-4">Expertise Titles</h2>
          </div>
          <div>
            {data1?.interest.map((interest, index) => (
              <p key={index}>{interest.title}</p>
            ))}
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="mt-5 lg:mt-7 p-4">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {Object.keys(data || {}).length > 0 && (
            <div className="flex flex-col justify-center items-center">
              <div className="avatar">
                <div className="w-24 lg:w-40 rounded-full">
                  <Image
                    src={data?.profileImage}
                    width={1000}
                    height={1000}
                    layout="fixed"
                    alt="Profile Image"
                  />
                </div>
              </div>
              <div className="text-center text-xl mt-5">
                <span>
                  {data?.firstName} {data?.middleName} {data?.lastName}
                </span>
              </div>
              <div className="divider"></div>
              <div className="flex justify-center mx-auto">
                <Tabs
                  defaultActiveKey="1"
                  tabPosition={mode}
                  onChange={onChange}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {items.map((item) => (
                    <TabPane key={item.key} tab={item.label}>
                      {item.children}
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
