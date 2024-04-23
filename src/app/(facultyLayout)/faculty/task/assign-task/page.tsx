"use client";

import Loading from "@/app/loading";
import { ReloadOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/auth.service";
import { useDebounced } from "@/redux/hooks";
import {
  useAssignTaskStudentMutation,
  useGetAssignTaskStudentListQuery,
  useGetCreatedTasksQuery,
  useGetSingleSpecificFacultyTaskQuery,
  useGetUnassignTaskStudentListQuery,
  useUnassignTaskStudentMutation,
} from "@/redux/api/facultyApi";
import { timeOptions, universityOptions } from "@/constant/global";
import { useGetInterestQuery } from "@/redux/api/interestApi";
import Image from "next/image";

const TaskList = () => {
  const query: Record<string, any> = {};
  const query1: Record<string, any> = {};

  const [page, setPage] = useState<number>();
  const [size, setSize] = useState<number>();
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchTerm1, setSearchTerm1] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [taskId, setTaskId] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [institution, setInstitution] = useState<string>("");
  const { userId } = getUserInfo() as any;
  const [form] = Form.useForm();

  query["size"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;
  query1["searchTerm"] = searchTerm1;

  useEffect(() => {
    if (searchTerm) {
      setPage(1);
    }
  }, [searchTerm]);

  if (interests?.length > 0) {
    query1["interests"] = interests;
  }
  if (institution?.length > 0) {
    query1["institution"] = institution;
  }

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

  const debouncedTerm1 = useDebounced({
    searchQuery: searchTerm1,
    delay: 600,
  });

  if (!!debouncedTerm1) {
    query1["searchTerm"] = debouncedTerm1;
  }

  const handleChangeCreatedAt = (value: string) => {
    setPage(1);
    setCreatedAt(value);
  };

  const handleChangeUpdatedAt = (value: string) => {
    setPage(1);
    setUpdatedAt(value);
  };

  const handlePageChange = (currentPage: number) => {
    setPage(currentPage);
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

  useEffect(() => {
    setSize(meta?.limit);
    setPage(meta?.page);
  }, [meta]);

  const { data: studentData, isLoading: loading } =
    useGetUnassignTaskStudentListQuery(
      {
        id: userId,
        taskId,
        arg: query1,
      },
      { refetchOnMountOrArgChange: true }
    );
  const studentList = studentData?.student;

  const newDataStudent = studentList?.map((studentItem) => ({
    id: studentItem.id ?? "",
    name: `${studentItem.firstName ?? ""} ${studentItem.middleName ?? ""} ${
      studentItem.lastName ?? ""
    }`,
    institute: studentItem.institution ?? "",
    profileimg: studentItem.profileImage ?? "",
  }));
  const studentMeta = studentData?.meta;

  const { data: studentData1, isLoading: loading1 } =
    useGetAssignTaskStudentListQuery(
      {
        id: userId,
        taskId,
        arg: query1,
      },
      { refetchOnMountOrArgChange: true }
    );
  const studentList1 = studentData1?.student;

  const newDataStudent1 = studentList1?.map((studentItem) => ({
    id: studentItem.id ?? "",
    name: `${studentItem.firstName ?? ""} ${studentItem.middleName ?? ""} ${
      studentItem.lastName ?? ""
    }`,
    institute: studentItem.institution ?? "",
    profileimg: studentItem.profileImage ?? "",
  }));

  const { data: interestData } = useGetInterestQuery({
    refetchOnMountOrArgChange: true,
  });

  const newInterestData = interestData?.interest;
  const interestOptions = newInterestData?.map((interest) => {
    return {
      label: interest?.title,
      value: interest?.title,
    };
  });

  const [assignTaskStudent, { isSuccess, isError }] =
    useAssignTaskStudentMutation();

  const [unassignTaskStudent] = useUnassignTaskStudentMutation();

  const { data: singleTaskData } = useGetSingleSpecificFacultyTaskQuery(
    { id: userId, taskId },
    { refetchOnMountOrArgChange: true }
  );

  const handleChange = (value: string) => {
    setInterests(value);
  };

  const handleChangeUniversity = (value: string) => {
    setInstitution(value);
  };

  const showModal = (id: string) => {
    setTaskId(id);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    form
      .validateFields()
      .then((values: any) => {
        const checkedIds = Object.keys(values)
          .filter((key) => values[key])
          .map((key) => key);

        const data = { student: checkedIds };
        assignTaskStudent({ data, id: userId, taskId })
          .unwrap()
          .then(() => {
            message.success("Task assigned successfully");
          })
          .catch((err) => {
            message.error("Failed to assign task");
          })
          .finally(() => {
            message.destroy(key);
          });
        form.resetFields();
        setSearchTerm1("");
        setInterests("");
        setInstitution("");
        setIsModalOpen(false);
      })
      .catch((errorInfo: any) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setInterests("");
    setInstitution("");
    setSearchTerm1("");
    setIsModalOpen(false);
  };

  const showModal1 = (id: string) => {
    setTaskId(id);
    setIsModalOpen1(true);
  };

  const handleOk1 = () => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    form
      .validateFields()
      .then((values: any) => {
        const checkedIds = Object.keys(values)
          .filter((key) => values[key])
          .map((key) => key);

        const data = { student: checkedIds };
        unassignTaskStudent({ data, id: userId, taskId })
          .unwrap()
          .then(() => {
            message.success("Task unassigned successfully");
          })
          .catch((err) => {
            message.error("Failed to unassign task");
          })
          .finally(() => {
            message.destroy(key);
          });
        form.resetFields();
        setSearchTerm1("");
        setInterests("");
        setInstitution("");
        setIsModalOpen1(false);
      })
      .catch((errorInfo: any) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel1 = () => {
    setInterests("");
    setInstitution("");
    setSearchTerm1("");
    setIsModalOpen1(false);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setInterests("");
    setInstitution("");
    setSearchTerm1("");
    setCreatedAt("");
    setUpdatedAt("");
  };
  return (
    <div className="p-4">
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Maintain your task
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
              <button
                className="btn btn-sm bg-blue-300  hover:to-blue-600 border-blue-300"
                onClick={() => showModal(item?.id)}
              >
                Assign Task
              </button>

              <button
                className="btn btn-sm mx-4 bg-red-500 border-red-500"
                onClick={() => showModal1(item?.id)}
              >
                Unassign Task
              </button>
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
      <Modal
        visible={isModalOpen}
        okText="Assign"
        onOk={() => handleOk()}
        onCancel={handleCancel}
      >
        <h1 className="text-center font-bold text-blue-400 text-lg">
          {singleTaskData?.title}
        </h1>
        <div className="flex justify-center items-center mt-5 lg:mt-7">
          {loading ? (
            <Loading />
          ) : (
            <>
              {Object.keys(studentData || {}).length > 0 && (
                <>
                  <Input
                    type="text"
                    size="large"
                    placeholder="Search..."
                    className="w-1/2 lg:w-1/3"
                    onChange={(ev) => {
                      setSearchTerm1(ev.target.value);
                    }}
                  />
                  {!!searchTerm1 && (
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
        <div className="flex justify-center items-center mt-5 lg:mt-7 mb-5">
          <Select
            defaultValue="Filter Created Date"
            className="w-full lg:w-1/4 mr-3"
            onChange={handleChange}
            options={interestOptions}
            allowClear
          />
          <Select
            defaultValue="Filter Updated Date"
            className="w-full lg:w-1/4"
            onChange={handleChangeUniversity}
            options={universityOptions}
            allowClear
          />
        </div>
        <Form form={form} layout="vertical">
          {newDataStudent?.map((item) => (
            <Form.Item key={item.id} name={item.id} valuePropName="checked">
              <Checkbox>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src={item?.profileimg}
                    width={40}
                    height={40}
                    alt="Profile"
                    style={{ borderRadius: "50%", marginRight: "10px" }}
                  />
                  <p>{item?.name}</p>
                </div>
              </Checkbox>
            </Form.Item>
          ))}
        </Form>
      </Modal>
      <Modal
        visible={isModalOpen1}
        okText="Unassign"
        onOk={() => handleOk1()}
        onCancel={handleCancel1}
        okButtonProps={{ style: { background: "red" } }}
      >
        <h1 className="text-center font-bold text-blue-400 text-lg">
          {singleTaskData?.title}
        </h1>
        <div className="flex justify-center items-center mt-5 lg:mt-7">
          {loading1 ? (
            <Loading />
          ) : (
            <>
              {Object.keys(studentData1 || {}).length > 0 && (
                <>
                  <Input
                    type="text"
                    size="large"
                    placeholder="Search..."
                    className="w-1/2 lg:w-1/3"
                    onChange={(ev) => {
                      setSearchTerm1(ev.target.value);
                    }}
                  />
                  {!!searchTerm1 && (
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
        <div className="flex justify-center items-center mt-5 lg:mt-7 mb-5">
          <Select
            defaultValue="Filter Created Date"
            className="w-full lg:w-1/4 mr-3"
            onChange={handleChange}
            options={interestOptions}
            allowClear
          />
          <Select
            defaultValue="Filter Updated Date"
            className="w-full lg:w-1/4"
            onChange={handleChangeUniversity}
            options={universityOptions}
            allowClear
          />
        </div>
        <Form form={form} layout="vertical">
          {newDataStudent1?.map((item) => (
            <Form.Item key={item.id} name={item.id} valuePropName="checked">
              <Checkbox>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Image
                    src={item?.profileimg}
                    width={40}
                    height={40}
                    alt="Profile"
                    style={{ borderRadius: "50%", marginRight: "10px" }}
                  />
                  <p>{item?.name}</p>
                </div>
              </Checkbox>
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
};

export default TaskList;
