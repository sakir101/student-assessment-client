"use client";

import Loading from "@/app/loading";
import {
  useGetAssignExpertiseQuery,
  useGetAssignRelatedWorksFacultyQuery,
  useGetSingleFacultyByFacultyIdQuery,
} from "@/redux/api/facultyApi";
import { Tabs } from "antd";
import { TabsProps } from "antd/lib/tabs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import type { RadioChangeEvent } from "antd";
import React from "react";
import "react-quill/dist/quill.bubble.css";
import dynamic from "next/dynamic";
import "../../../../../../components/QuillCss/page.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const { TabPane } = Tabs;
type TabPosition = "top";

const Page = () => {
  const query: Record<string, any> = {};
  const [id, setId] = useState<string>("");

  const [mode, setMode] = useState<TabPosition>("top");
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

  const { data: data1, isLoading: loading2 } = useGetAssignExpertiseQuery(
    {
      id: userId,
      arg: query,
    },
    { refetchOnMountOrArgChange: true }
  );

  const interestData = data1?.interest;
  const meta = data1?.meta;

  const { data: data2, isLoading: loading3 } =
    useGetAssignRelatedWorksFacultyQuery(
      {
        id: userId,
        arg: query,
      },
      { refetchOnMountOrArgChange: true }
    );

  const onChange = (key: string) => {};

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Personal Information",
      children: (
        <div>
          <div className="mt-5 grid grid-cols-2 items-center mx-auto ">
            <div>
              <p className="mb-5">
                <span className="text-base lg:text-lg text-gray-600 ">
                  University
                </span>
              </p>
              <p className="mb-5">
                <span className="text-base lg:text-lg text-gray-600 ">
                  Employee ID
                </span>
              </p>
              <p className="mb-5">
                <span className="text-base lg:text-lg text-gray-600 ">
                  Contact Number
                </span>
              </p>
              <p className="mb-5">
                <span className="text-base lg:text-lg text-gray-600 ">
                  Email
                </span>
              </p>
            </div>

            <div>
              <p className="mb-5">
                <span className="text-base lg:text-lg font-semibold">
                  {data?.institution}
                </span>
              </p>
              <p className="mb-5">
                <span className="text-base lg:text-lg font-semibold">
                  {data?.facultyId}
                </span>
              </p>
              <p className="mb-5">
                <span className="text-base lg:text-lg font-semibold">
                  {data?.contactNum}
                </span>
              </p>
              <p className="mb-5">
                <span className="text-base lg:text-lg font-semibold">
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
        <div className="mt-5">
          <div>
            {loading2 ? (
              <Loading />
            ) : (
              <>
                {Object.keys(data1 || {}).length > 0 ? (
                  <div className="grid grid-cols-2 items-center mx-auto">
                    <div>
                      <h2 className="me-4">Expertise Titles</h2>
                    </div>
                    <div>
                      {data1?.interest.map((interest, index) => (
                        <p key={index}>{interest.title}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>No Expertise to show</div>
                )}
              </>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: "Work Field",
      children: (
        <div className="mt-5 flex justify-center items-center mx-auto ">
          <div>
            {loading3 ? (
              <Loading />
            ) : (
              <>
                {Object.keys(data2 || {}).length > 0 ? (
                  <div>
                    {data2?.relatedWorks.map((relatedWork, index) => {
                      const matchedFaculty =
                        relatedWork.RelatedWorksFaculty.find(
                          (faculty) => faculty.facultyId === id
                        );

                      const description = matchedFaculty
                        ? matchedFaculty.description
                        : "Not Available";

                      return (
                        <div key={index}>
                          <p className="text-center font-bold text-lg mb-2">
                            {relatedWork.title}
                          </p>
                          <ReactQuill
                            value={description}
                            readOnly={true}
                            theme={"bubble"}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>No Work Field to show</div>
                )}
              </>
            )}
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
              <div className="text-center text-lg lg:text-xl mt-5">
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
