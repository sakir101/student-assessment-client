"use client";

import Loading from "@/app/loading";
import {
  useGetAllFeedbackTaskQuery,
  useGetEnrollFacultyQuery,
} from "@/redux/api/studentApi";
import { ReloadOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { Button, Input, Pagination, Select } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";

const TaskFeedback = () => {
  const query: Record<string, any> = {};
  const query1: Record<string, any> = {};

  const [page, setPage] = useState<number>();
  const [size, setSize] = useState<number>();
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [facultyOption, setFacultyOption] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  if (facultyOption?.length > 0) {
    query["facultyId"] = facultyOption;
  }

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { userId } = getUserInfo() as any;

  const { data, isLoading, refetch } = useGetAllFeedbackTaskQuery(
    {
      id: userId,
      arg: query,
    },
    { refetchOnMountOrArgChange: true }
  );

  const taskData = data?.task;
  const meta = data?.meta;

  useEffect(() => {
    setSize(meta?.limit);
    setPage(meta?.page);
  }, [meta]);

  const { data: facultyData, isLoading: loadFaculty } =
    useGetEnrollFacultyQuery(
      {
        id: userId,
        arg: query1,
      },
      { refetchOnMountOrArgChange: true }
    );

  const facultyList = facultyData?.faculty;

  const facultyNewData = facultyList?.map((facultyItem: any) => ({
    id: facultyItem.id ?? "",
    name: `${facultyItem.firstName ?? ""} ${facultyItem.middleName ?? ""} ${
      facultyItem.lastName ?? ""
    }`,
  }));

  const facultyOptions = facultyNewData?.map((faculty: any) => {
    return {
      label: faculty?.name,
      value: faculty?.id,
    };
  });

  const handleFacultyChange = (value: string) => {
    setPage(1);
    setFacultyOption(value);
  };
  const handlePageChange = (currentPage: number) => {
    setPage(currentPage);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setFacultyOption("");
    setSearchTerm("");
  };
  return (
    <div className="p-4">
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Your task feedback
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
                {!!searchTerm ||
                  (!!facultyOption && (
                    <Button
                      onClick={resetFilters}
                      type="primary"
                      style={{ margin: "0px 5px" }}
                    >
                      <ReloadOutlined />
                    </Button>
                  ))}
              </>
            )}
          </>
        )}
      </div>
      <div className="flex justify-center items-center mt-5 lg:mt-7">
        <Select
          showSearch
          loading={loadFaculty}
          defaultValue="Filter Faculty"
          className="w-full lg:w-1/4 mr-3"
          optionFilterProp="children"
          onChange={handleFacultyChange}
          options={facultyOptions}
          filterOption={filterOption}
          allowClear
        />
      </div>
      <div className="my-4">
        {taskData?.map((item) => (
          <div
            key={item?.id}
            className="p-3 bg-slate-300 shadow-md my-4 rounded-md"
          >
            <p className="text-lg">Task Title: {item?.title}</p>
            <div className="my-3 bg-cyan-600 text-yellow-300 rounded-lg inline-block p-3">
              <p className="inline-block">
                Assigned By:{" "}
                <span className="font-bold">
                  {item?.faculty?.firstName} {item?.faculty?.middleName ?? ""}{" "}
                  {item?.faculty?.lastName}
                </span>
              </p>
            </div>
            <div className="flex justify-center items-center my-3">
              <Link href={`/student/task/showFeedback/${item?.id}`}>
                <button className="btn btn-sm bg-blue-300  hover:to-blue-600 border-blue-300 mr-4">
                  View Feedback
                </button>
              </Link>
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
export default TaskFeedback;
