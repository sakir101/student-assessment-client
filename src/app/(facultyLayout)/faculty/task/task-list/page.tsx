"use client";

import Loading from "@/app/loading";
import { ReloadOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import {
  useDeleteSpecificTaskMutation,
  useGetCreatedTasksQuery,
} from "@/redux/api/facultyApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { Button, Input, Modal, Pagination, Select, message } from "antd";
import { useEffect, useState } from "react";
import { timeOptions } from "@/constant/global";
import Link from "next/link";

const { confirm } = Modal;

const TaskList = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>();
  const [size, setSize] = useState<number>();
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  if (createdAt?.length > 0) {
    query["createdAt"] = createdAt;
  }
  if (updatedAt?.length > 0) {
    query["updatedAt"] = updatedAt;
  }

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const handleChangeCreatedAt = (value: string) => {
    setPage(1);
    setCreatedAt(value);
  };

  const handleChangeUpdatedAt = (value: string) => {
    setPage(1);
    setUpdatedAt(value);
  };

  const { data, isLoading, refetch } = useGetCreatedTasksQuery(
    {
      id: userId,
      arg: query,
    },
    { refetchOnMountOrArgChange: true }
  );

  const taskData = data?.task;
  const meta = data?.meta;

  const [deleteSpecificTask] = useDeleteSpecificTaskMutation();

  useEffect(() => {
    setSize(meta?.limit);
    setPage(meta?.page);
  }, [meta]);

  const handlePageChange = (currentPage: number) => {
    setPage(currentPage);
  };

  const showModal = async (taskId: string) => {
    setIsModalOpen(true);
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleOk(taskId);
      },
      onCancel() {
        handleClose();
      },
    });
  };
  const handleOk = async (taskId: string) => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    try {
      await deleteSpecificTask({ id: userId, taskId });
      refetch();
      setIsModalOpen(false);
      message.destroy(key);
      message.success("Task Deleted successfully");
    } catch (err: any) {
      setIsModalOpen(false);
      message.destroy(key);
      message.error("Task Deleted failed");
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const resetFilters = () => {
    setCreatedAt("");
    setUpdatedAt("");
    setSearchTerm("");
  };
  return (
    <div className="p-4">
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Your task list
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
        {taskData?.map((item) => (
          <div
            key={item?.id}
            className="p-3 bg-slate-300 shadow-md my-4 rounded-md"
          >
            <p className="text-lg">Task Title: {item?.title}</p>
            <div className="flex justify-center items-center my-3">
              <Link href={`/faculty/task/task-list/update/${item?.id}`}>
                <button className="btn btn-sm bg-blue-300  hover:to-blue-600 border-blue-300">
                  Update
                </button>
              </Link>
              <button
                className="btn btn-sm mx-4 bg-red-500"
                onClick={() => showModal(item?.id)}
              >
                Delete
              </button>
              <Link href={`/faculty/task/task-list/${item?.id}`}>
                <button className="btn btn-sm bg-white-400">View</button>
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

export default TaskList;
