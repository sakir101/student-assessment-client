"use client";

import Loading from "@/app/loading";
import { useGetAllCompleteStudentTasksQuery } from "@/redux/api/facultyApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { Button, Input, Pagination } from "antd";
import { useEffect, useState } from "react";
import { ReloadOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import Link from "next/link";

const CompleteTask = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>();
  const [size, setSize] = useState<number>();
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { userId } = getUserInfo() as any;

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

  const { data, isLoading, refetch } = useGetAllCompleteStudentTasksQuery(
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

  const handlePageChange = (currentPage: number) => {
    setPage(currentPage);
  };
  const resetFilters = () => {
    setSearchTerm("");
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Your complete task list
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
                {!!searchTerm && (
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
      <div className="my-4">
        {taskData?.map((item) => (
          <div
            key={item?.id}
            className="p-3 bg-slate-300 shadow-md my-4 rounded-md"
          >
            <p className="text-lg">Task Title: {item?.title}</p>
            <div className="flex justify-center items-center my-3">
              <Link href={`/faculty/student-list/complete-task/${item?.id}`}>
                <button className="btn btn-sm bg-blue-300  hover:to-blue-600 border-blue-300">
                  View Students
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

export default CompleteTask;
