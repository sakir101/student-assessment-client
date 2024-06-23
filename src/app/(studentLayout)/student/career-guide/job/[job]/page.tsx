"use client";

import Loading from "@/app/loading";
import { useGetCreatedJobForSubFieldQuery } from "@/redux/api/jobApi";
import { useGetAssignJobQuery } from "@/redux/api/subFieldApi";
import { useDebounced } from "@/redux/hooks";
import { Button, Input, Pagination, Select } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import "react-quill/dist/quill.bubble.css";
import dynamic from "next/dynamic";
import "../../../../../../components/QuillCss/page.css";
import Link from "next/link";
import { timeOptions } from "@/constant/global";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const Job = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>();
  const [size, setSize] = useState<number>();
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [subFieldID, setSubFieldID] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    const match = url.match(/\/([^\/?]+)\?$/);
    const extractId = match ? match[1] : null;
    if (extractId !== null) {
      setSubFieldID(extractId);
    }
  }, [pathname, searchParams]);

  query["size"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  useEffect(() => {
    if (searchTerm) {
      setPage(1);
    }
  }, [searchTerm]);

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  if (createdAt?.length > 0) {
    query["createdAt"] = createdAt;
  }
  if (updatedAt?.length > 0) {
    query["updatedAt"] = updatedAt;
  }

  const handleChangeCreatedAt = (value: string) => {
    setPage(1);
    setCreatedAt(value);
  };

  const handleChangeUpdatedAt = (value: string) => {
    setPage(1);
    setUpdatedAt(value);
  };

  const { data, isLoading, refetch } = useGetCreatedJobForSubFieldQuery(
    { id: subFieldID, arg: query },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const assignJobList = data?.job;
  const meta = data?.meta;

  const newAssignJob = assignJobList?.map((jobItem) => ({
    id: jobItem.id ?? "",
    title: jobItem.title ?? "",
    desc: jobItem.desc ?? "",
    jobLink: jobItem.jobLink ?? "",
    companyWebsite: jobItem.companyWebsite ?? "",
    status: jobItem.status ?? "",
  }));

  const handlePageChange = (currentPage: number) => {
    setPage(currentPage);
  };

  const resetFilters = () => {
    setCreatedAt("");
    setUpdatedAt("");
    setSearchTerm("");
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Job List
      </h1>
      <div className="flex justify-center items-center mt-5 lg:mt-7">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {Object.keys(data || {}).length > 0 && (
              <>
                <Input
                  type="text"
                  size="large"
                  placeholder="Search..."
                  className="w-1/2 lg:w-1/3"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
                {(!!createdAt || !!updatedAt || !!searchTerm) && (
                  <Button
                    onClick={resetFilters}
                    type="primary"
                    style={{ margin: "0px 5px" }}
                  >
                    <ReloadOutlined />
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className="flex justify-center items-center mt-5 lg:mt-7">
        <Select
          defaultValue="Filter Created Date"
          className="w-full lg:w-1/4 mr-3"
          onChange={handleChangeCreatedAt}
          options={timeOptions}
          allowClear
        />
        <Select
          defaultValue="Filter Updated Date"
          className="w-full lg:w-1/4"
          onChange={handleChangeUpdatedAt}
          options={timeOptions}
          allowClear
        />
      </div>
      <div className="my-4">
        {newAssignJob?.map((item) => (
          <div
            key={item?.id}
            className="p-3 bg-slate-300 shadow-md my-4 rounded-md"
          >
            <div
              className="my-2 flex justify-between
             items-center"
            >
              <p className="text-lg my-2">Job Title: {item?.title}</p>
              <div
                className={`${
                  item?.status ? "bg-yellow-200" : "bg-red-200"
                } p-2 rounded-md`}
              >
                <p>{item?.status}</p>
              </div>
            </div>
            <ReactQuill value={item?.desc} readOnly={true} theme={"bubble"} />
            <div className="my-2">
              <span className="font-bold">Job Link: </span>
              <span>
                {item?.jobLink ? (
                  <Link href={item.jobLink} legacyBehavior>
                    <a target="_blank" rel="noopener noreferrer">
                      {item.jobLink}
                    </a>
                  </Link>
                ) : (
                  <p>No job link available</p>
                )}
              </span>
            </div>
            <div className="my-2">
              <span className="font-bold">Company Website Link: </span>
              <span>
                {item?.companyWebsite ? (
                  <Link href={item.companyWebsite} legacyBehavior>
                    <a target="_blank" rel="noopener noreferrer">
                      {item.companyWebsite}
                    </a>
                  </Link>
                ) : (
                  <p>No job link available</p>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        current={page}
        defaultCurrent={1}
        total={meta?.total}
        pageSize={size}
        onChange={handlePageChange}
        style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
      />
    </div>
  );
};

export default Job;
