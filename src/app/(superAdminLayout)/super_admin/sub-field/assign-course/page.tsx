"use client";

import Loading from "@/app/loading";
import SATable from "@/components/ui/Table";
import {
  useAssignCourseMutation,
  useGetAssignCourseQuery,
  useGetSingleSubFieldQuery,
  useGetSubFieldQuery,
  useGetUnassignCourseQuery,
  useUnassignCourseMutation,
} from "@/redux/api/subFieldApi";
import { useDebounced } from "@/redux/hooks";
import { Button, Checkbox, Form, Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";

const AssignCourse = () => {
  const query: Record<string, any> = {};
  const query1: Record<string, any> = {};

  const [page, setPage] = useState<number>();
  const [size, setSize] = useState<number>();
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchTerm1, setSearchTerm1] = useState<string>("");
  const [subFieldID, setSubFieldID] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
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

  const { data, isLoading, refetch } = useGetSubFieldQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const subFieldList = data?.subField;
  const meta = data?.meta;

  useEffect(() => {
    setSize(meta?.limit);
    setPage(meta?.page);
  }, [meta]);

  const { data: singleSubFieldData } = useGetSingleSubFieldQuery(subFieldID, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: unassignCourseData,
    isLoading: loading,
    refetch: refetch1,
  } = useGetUnassignCourseQuery(
    { id: subFieldID, arg: query1 },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const unassignCourseList = unassignCourseData?.course;

  const newUnassignCourse = unassignCourseList?.map((courseItem) => ({
    id: courseItem.id ?? "",
    title: courseItem.title ?? "",
  }));

  const {
    data: assignCourseData,
    isLoading: loading1,
    refetch: refetch2,
  } = useGetAssignCourseQuery(
    { id: subFieldID, arg: query1 },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const assignCourseList = assignCourseData?.course;

  const newAssignCourse = assignCourseList?.map((courseItem) => ({
    id: courseItem.id ?? "",
    title: courseItem.title ?? "",
  }));

  const [assignCourse] = useAssignCourseMutation();
  const [unassignCourse] = useUnassignCourseMutation();

  const showModal = (id: string) => {
    setSubFieldID(id);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    form
      .validateFields()
      .then((values: any) => {
        const checkedIds = Object.keys(values)
          .filter((key) => values[key])
          .map((key) => key);

        const data = { course: checkedIds };
        assignCourse({ data, id: subFieldID })
          .unwrap()
          .then(() => {
            message.success("Course assigned successfully");
            refetch1();
          })
          .catch((err) => {
            message.error("Failed to assign course");
          })
          .finally(() => {
            message.destroy(key);
          });
        form.resetFields();
        setSearchTerm1("");
        setIsModalOpen(false);
        setSubFieldID("");
      })
      .catch((errorInfo: any) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setSubFieldID("");
    setIsModalOpen(false);
    setSearchTerm1("");
  };

  const showModal1 = (id: string) => {
    refetch1();
    setSubFieldID(id);
    setIsModalOpen1(true);
  };

  const handleOk1 = async () => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    form
      .validateFields()
      .then((values: any) => {
        const checkedIds = Object.keys(values)
          .filter((key) => values[key])
          .map((key) => key);

        const data = { course: checkedIds };
        unassignCourse({ data, id: subFieldID })
          .unwrap()
          .then(() => {
            message.success("Course unassigned successfully");
            refetch2();
          })
          .catch((err) => {
            message.error("Failed to unassign course");
          })
          .finally(() => {
            message.destroy(key);
          });
        form.resetFields();
        setSearchTerm1("");
        setIsModalOpen1(false);
        setSubFieldID("");
      })
      .catch((errorInfo: any) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel1 = () => {
    setSubFieldID("");
    refetch1();
    setIsModalOpen1(false);
    setSearchTerm1("");
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
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
              Assign
            </Button>
            <Button
              type="primary"
              onClick={() => showModal1(data?.id)}
              className="ms-3"
            >
              Unassign
            </Button>
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

  return (
    <div className="p-4">
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Assign Course
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
              </>
            )}
          </>
        )}
      </div>
      <div className="my-10 lg:my-12 ">
        {isLoading ? (
          <Loading />
        ) : Object.keys(data || {}).length ? (
          <SATable
            loading={isLoading}
            columns={columns}
            dataSource={subFieldList}
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
                No sub field is created
              </p>
            </div>
          </div>
        )}
      </div>
      <Modal
        visible={isModalOpen}
        okText="Assign"
        onOk={() => handleOk()}
        onCancel={handleCancel}
      >
        <h1 className="text-center font-bold text-blue-400 text-lg">
          {singleSubFieldData?.title}
        </h1>
        <div className="flex justify-center items-center mt-5 lg:mt-7">
          {loading ? (
            <Loading />
          ) : (
            <>
              {Object.keys(unassignCourseData || {}).length > 0 && (
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
                </>
              )}
            </>
          )}
        </div>
        <Form form={form} layout="vertical">
          {newUnassignCourse?.map((item: any) => (
            <Form.Item key={item.id} name={item.id} valuePropName="checked">
              <Checkbox>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p>{item?.title}</p>
                </div>
              </Checkbox>
            </Form.Item>
          ))}
        </Form>
      </Modal>
      <Modal
        visible={isModalOpen1}
        okText="Assign"
        onOk={() => handleOk1()}
        onCancel={handleCancel1}
      >
        <h1 className="text-center font-bold text-blue-400 text-lg">
          {singleSubFieldData?.title}
        </h1>
        <div className="flex justify-center items-center mt-5 lg:mt-7">
          {loading1 ? (
            <Loading />
          ) : (
            <>
              {Object.keys(assignCourseData || {}).length > 0 && (
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
                </>
              )}
            </>
          )}
        </div>
        <Form form={form} layout="vertical">
          {newAssignCourse?.map((item: any) => (
            <Form.Item key={item.id} name={item.id} valuePropName="checked">
              <Checkbox>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p>{item?.title}</p>
                </div>
              </Checkbox>
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  );
};

export default AssignCourse;
