"use client";

import { useDeleteSkillMutation } from "@/redux/api/skillStudentApi";
import { useGetAssignSkillQuery } from "@/redux/api/studentApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { useEffect, useState } from "react";
import {
  DeleteOutlined,
  ReloadOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Button, Input, Modal, Select, message } from "antd";
import Loading from "@/app/loading";
import SATable from "@/components/ui/Table";
import { useGetSingleInterestQuery } from "@/redux/api/interestApi";
import { skillStatus } from "@/constant/global";
import { useUpdateSkillStatusMutation } from "@/redux/api/interestStudentApi";

const { confirm } = Modal;
const SkillView = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>();
  const [size, setSize] = useState<number>();
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [interestID, setInterestID] = useState<string>("");
  const [statusChange, setStatusChange] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState(undefined);

  const [deleteSkill, { isSuccess, isError }] = useDeleteSkillMutation();

  const [updateSkillStatus] = useUpdateSkillStatusMutation();

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

  const { userId } = getUserInfo() as any;

  const { data, isLoading, refetch } = useGetAssignSkillQuery(
    {
      id: userId,
      arg: query,
    },
    { refetchOnMountOrArgChange: true }
  );

  const interestData = data?.interest;
  const meta = data?.meta;

  const { data: singleInterestData } = useGetSingleInterestQuery(interestID, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    setSize(meta?.limit);
    setPage(meta?.page);
  }, [meta]);

  const showModal = async (id: string) => {
    setIsModalOpen(true);
    confirm({
      title: `Delete`,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      content: (
        <p>
          Are you sure you want to delete{" "}
          <span className="font-bold">{singleInterestData?.title}</span> from
          your skill?
        </p>
      ),
      onOk() {
        handleOk(id);
      },
      onCancel() {
        handleClose();
      },
    });
  };

  const handleOk = async (id: string) => {
    const deleteData = { interest: [id] };
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    try {
      const { userId: id } = getUserInfo() as any;
      await deleteSkill({ data: deleteData, id: userId });
      refetch();
      setIsModalOpen(false);

      message.destroy(key);
      message.success("Interest Deleted successfully");

      //@ts-ignore
      if ((data?.interest ?? []).length === 1) {
        window.location.reload();
      }
    } catch (err: any) {
      setIsModalOpen(false);
      message.destroy(key);
      message.error(err.message);
    }
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const showModal1 = (id: string) => {
    setInterestID(id);
    setIsModalOpen1(true);
  };

  const handleOk1 = async () => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    if (statusChange === "") {
      message.destroy(key);
      setError("Set status first");
      return;
    }

    const data = {
      status: statusChange,
    };

    try {
      const { userId: id } = getUserInfo() as any;
      await updateSkillStatus({ data, id: userId, interestId: interestID });
      refetch();
      setIsModalOpen(false);

      message.destroy(key);
      message.success("Skill status updated successfully");
      setError("");
      setStatusChange("");
    } catch (err: any) {
      setIsModalOpen(false);
      message.destroy(key);
      message.error("Skill status updated failed");
    }
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const handleChangeStatus = (value: string) => {
    setStatusChange(value);
  };

  const handleDropdownVisibleChange = (open: boolean) => {
    if (!open) {
      // Dropdown is closed, reset the selected value
      setSelectedValue(undefined);
    }
  };

  const columns = [
    {
      title: "Skill",
      dataIndex: "title",
      sorter: true,
    },
    {
      title: "Status",
      render: function (data: any) {
        if (data.SkillStudent && data.SkillStudent.length > 0) {
          const status = data.SkillStudent[0].status;
          return status === "NotSet" ? "Not Set" : status;
        } else {
          return status;
        }
      },
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Button type="primary" danger onClick={() => showModal(data?.id)}>
              <DeleteOutlined />
            </Button>
            <Button
              type="primary"
              onClick={() => showModal1(data?.id)}
              className="ms-3"
            >
              <EditOutlined />
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

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
  return (
    <div className="p-4">
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Your Skill List
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
                {(!!sortBy || !!sortOrder || !!searchTerm) && (
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
      <div className="my-10 lg:my-12 ">
        {isLoading ? (
          <Loading />
        ) : Object.keys(data || {}).length ? (
          <SATable
            loading={isLoading}
            columns={columns}
            dataSource={interestData}
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
                Select Skill first
              </p>
            </div>
          </div>
        )}
      </div>
      <Modal
        visible={isModalOpen1}
        okText="Update"
        onOk={() => handleOk1()}
        onCancel={handleCancel1}
        okButtonProps={{ style: { background: "blue" } }}
      >
        <p className="my-3">Update status of {singleInterestData?.title}</p>
        <Select
          placeholder="Select Status"
          options={skillStatus}
          className="w-full"
          onChange={handleChangeStatus}
          allowClear
          onDropdownVisibleChange={handleDropdownVisibleChange}
        />
        <p className="text-red-600 mt-1 mb-4">{error}</p>
      </Modal>
    </div>
  );
};

export default SkillView;
