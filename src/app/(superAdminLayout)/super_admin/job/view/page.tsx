"use client";

import Loading from "@/app/loading";
import SATable from "@/components/ui/Table";
import {
  useDeleteJobMutation,
  useGetJobQuery,
  useGetSingleJobQuery,
  useUpdateJobMutation,
} from "@/redux/api/jobApi";
import { useDebounced } from "@/redux/hooks";
import { Button, Input, Modal, Select, message } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { formats, modules } from "@/components/ui/QuillModuleFormat";
import "../../../../../components/QuillCss/page.css";
import { timeOptions } from "@/constant/global";
import Link from "next/link";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ViewJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const query: Record<string, any> = {};
  const [error, setError] = useState<string>("");
  const [statusError, setStatusError] = useState<string>("");
  const [statusChange, setStatusChange] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [page, setPage] = useState<number>();
  const [size, setSize] = useState<number>();
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [jobID, setJobID] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");

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

  const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatusChange(value);
  };

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

  const { data, isLoading, refetch } = useGetJobQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const jobList = data?.job;
  const meta = data?.meta;

  useEffect(() => {
    setSize(meta?.limit);
    setPage(meta?.page);
  }, [meta]);

  let { data: singleJobData, refetch: refetch1 } = useGetSingleJobQuery(jobID, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (singleJobData) {
      setValue("title", singleJobData?.title);
      setValue("jobLink", singleJobData?.jobLink);
      setValue("companyWebsite", singleJobData?.companyWebsite);
      setDescription(singleJobData?.desc);
      setStatusChange(singleJobData?.status);
    }
  }, [singleJobData, setValue]);
  const [updateJob] = useUpdateJobMutation();
  const [deleteJob] = useDeleteJobMutation();

  const showModal = (id: string) => {
    setJobID(id);
    setIsModalOpen(true);
  };

  const onSubmit = async (value: any) => {
    if (statusChange === "") {
      setStatusError("Status is required");
      return;
    }
    if (description.length < 100) {
      setError("Description length needs more than 100");
      return;
    }
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    const data = {
      title: value.title,
      jobLink: value.jobLink,
      desc: description,
      status: statusChange,
      companyWebsite: value.companyWebsite,
    };
    console.log(data);
    setError("");
    setStatusError("");

    try {
      await updateJob({ data, id: jobID });
      refetch();
      refetch1();
      singleJobData = {};
      setIsModalOpen(false);
      message.destroy(key);
      setJobID("");
      message.success("Job updated successfully");
    } catch (err: any) {
      setIsModalOpen(false);
      message.destroy(key);
      setJobID("");
      message.error("Job update failed");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    singleJobData = {};
    setJobID("");
  };

  const showModal1 = async (id: string) => {
    setIsModalOpen1(true);
    singleJobData = {};
    setJobID(id);
  };

  const handleOk1 = async () => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    try {
      await deleteJob({ id: jobID });
      refetch();
      setIsModalOpen1(false);
      message.destroy(key);
      setJobID("");
      message.success("Job Deleted successfully");
    } catch (err: any) {
      setIsModalOpen1(false);
      message.destroy(key);
      setJobID("");
      message.error("Job deleted failed");
    }
  };
  const handleClose1 = () => {
    setIsModalOpen1(false);
    setJobID("");
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        return status === "NotAvailable" ? "Not  Available" : status;
      },
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Button
              type="primary"
              onClick={() => showModal(data?.id)}
              className="ms-3"
            >
              <EditOutlined />
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => showModal1(data?.id)}
              style={{ marginLeft: 3 }}
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
    {
      title: "View",
      render: function (data: any) {
        return (
          <>
            <Link href={`/super_admin/job/${data.id}`}>
              <Button type="primary">View</Button>
            </Link>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
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
      <div className="my-10 lg:my-12 ">
        {isLoading ? (
          <Loading />
        ) : Object.keys(data || {}).length ? (
          <SATable
            loading={isLoading}
            columns={columns}
            dataSource={jobList}
            pageSize={size}
            totalPages={meta?.total}
            showSizeChanger={true}
            onPaginationChange={onPaginationChange}
            onTableChange={onTableChange}
            showPagination={true}
          />
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center my-14 w-full lg:w-1/2">
              <p className="text-center text-red-700 font-bold text-lg">
                No job is created
              </p>
            </div>
          </div>
        )}
      </div>
      <Modal
        visible={isModalOpen}
        title="Update"
        okText="Update"
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        okButtonProps={{ style: { background: "blue" } }}
      >
        <div className="my-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md">
              <label className="font-weight-bold">
                {" "}
                Title <span className="required"> * </span>{" "}
              </label>
              <br />
              <br />
              <input
                className="input input-bordered w-full h-10"
                type="text"
                placeholder="Title"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500">Title is required</p>
              )}
            </div>
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md my-3">
              <label className="font-weight-bold">
                {" "}
                Job Link <span className="required"> * </span>{" "}
              </label>
              <br />
              <br />
              <input
                className="input input-bordered w-full h-10"
                type="text"
                placeholder="Job Link"
                {...register("jobLink", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500">Job Link is required</p>
              )}
            </div>
            <div
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md form-group  row"
              style={{ margin: "15px 0px" }}
            >
              <label className="font-weight-bold">
                {" "}
                Description <span className="required"> * </span>{" "}
              </label>
              <br />
              <br />
              <ReactQuill
                value={description}
                onChange={setDescription}
                modules={modules}
                formats={formats}
                placeholder={"Write Description"}
              />
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md my-3">
              <label className="font-weight-bold">
                {" "}
                Job Status <span className="required"> * </span>{" "}
              </label>
              <br />
              <br />
              <select
                className="select select-secondary w-full h-9 min-h-9"
                onChange={handleChangeStatus}
              >
                <option selected>{statusChange}</option>
                <option value="Available">Available</option>
                <option value="NotAvailable">Not Available</option>
              </select>
              {statusError && <p className="text-red-500">{statusError}</p>}
            </div>
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md my-3">
              <label className="font-weight-bold">
                {" "}
                Company Website Link <span className="required"> * </span>{" "}
              </label>
              <br />
              <br />
              <input
                className="input input-bordered w-full h-10"
                type="text"
                placeholder="Company Website"
                {...register("companyWebsite", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500">Company website link is required</p>
              )}
            </div>
          </form>
        </div>
      </Modal>
      <Modal
        visible={isModalOpen1}
        title={
          <>
            <ExclamationCircleFilled style={{ color: "red" }} />{" "}
            <span className="text-red-600">Delete</span>
          </>
        }
        okText="Delete"
        onOk={() => handleOk1()}
        onCancel={handleClose1}
        okButtonProps={{ style: { background: "red" } }}
      >
        <p>
          Are you sure you want to delete{" "}
          <span className="font-bold">{singleJobData?.title}</span>
        </p>
      </Modal>
    </div>
  );
};

export default ViewJob;
