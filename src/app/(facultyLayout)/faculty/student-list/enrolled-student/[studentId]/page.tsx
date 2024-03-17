"use client";

import { Tabs } from "antd";
import { TabsProps } from "antd/lib/tabs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { RadioChangeEvent } from "antd";

import React from "react";
import {
  useGetAssignInterestQuery,
  useGetSingleStudentByStudentIdQuery,
} from "@/redux/api/studentApi";
import Loading from "@/app/loading";

const { TabPane } = Tabs;

const Page = () => {
  const query: Record<string, any> = {};
  const [id, setId] = useState<string>("");

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

  const { data, isLoading, refetch } = useGetSingleStudentByStudentIdQuery(
    id,

    { refetchOnMountOrArgChange: true }
  );

  const userId = data?.user?.id;

  const { data: data1 } = useGetAssignInterestQuery(
    {
      id: userId,
      arg: query,
    },
    { refetchOnMountOrArgChange: true }
  );

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
        <div className="grid place-items-center">
          <div className="mt-5 grid grid-cols-2 gap-0 justify-center items-center mx-auto ">
            <div>
              <p className="mb-5">
                <span className="text-lg text-gray-600 ">University</span>
              </p>
              <p className="mb-5">
                <span className="text-lg text-gray-600 ">Student ID</span>
              </p>
              <p className="mb-5">
                <span className="text-lg text-gray-600 ">Gender</span>
              </p>
            </div>

            <div>
              <p className="mb-5">
                <span className="text-lg font-semibold">
                  {data?.institution}
                </span>
              </p>
              <p className="mb-5">
                <span className="text-lg font-semibold">{data?.studentId}</span>
              </p>
              <p className="mb-5">
                <span className="text-lg font-semibold">{data?.gender}</span>
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Interest Field",
      children: (
        <div className="mt-5 grid grid-cols-2 items-center mx-auto ">
          <div>
            <h2 className="me-4">Field Titles</h2>
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
              <Tabs defaultActiveKey="1" centered onChange={onChange}>
                {items.map((item) => (
                  <TabPane key={item.key} tab={item.label}>
                    <div className="flex justify-center">{item.children}</div>
                  </TabPane>
                ))}
              </Tabs>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
