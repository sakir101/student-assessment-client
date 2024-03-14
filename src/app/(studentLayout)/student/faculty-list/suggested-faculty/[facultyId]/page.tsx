"use client";

import Loading from "@/app/loading";
import { useGetSingleFacultyByFacultyIdQuery } from "@/redux/api/facultyApi";
import { Tabs } from "antd";
import { TabsProps } from "antd/lib/tabs";
import Image from "next/image";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import React from "react";

const { TabPane } = Tabs;

const Page = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log(url);
    // You can now use the current URL
    // ...
  }, [pathname, searchParams]);
  const id = 32543;
  const { data, isLoading, refetch } = useGetSingleFacultyByFacultyIdQuery(
    id,

    { refetchOnMountOrArgChange: true }
  );
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tab 1",
      children: (
        <div>
          <h2>Content of Tab Pane 1</h2>
          <p>This is some HTML content for Tab 1.</p>
        </div>
      ),
    },
    {
      key: "2",
      label: "Tab 2",
      children: (
        <div>
          <h2>Content of Tab Pane 2</h2>
          <p>This is some HTML content for Tab 2.</p>
        </div>
      ),
    },
    {
      key: "3",
      label: "Tab 3",
      children: (
        <div>
          <h2>Content of Tab Pane 3</h2>
          <p>This is some HTML content for Tab 3.</p>
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
              <Tabs defaultActiveKey="1" onChange={onChange}>
                {items.map((item) => (
                  <TabPane key={item.key} tab={item.label}>
                    {item.children}
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
