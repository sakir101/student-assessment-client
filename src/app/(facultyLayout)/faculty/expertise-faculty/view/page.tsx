"use client";

import { Button, Input, message, Modal } from "antd";

import { useEffect, useState } from "react";
import {
  DeleteOutlined,
  ReloadOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useDebounced } from "@/redux/hooks";
import Loading from "@/app/loading";
import SATable from "@/components/ui/Table";
import { getUserInfo } from "@/services/auth.service";
import {
  useDeleteExpertiseMutation,
  useGetAssignExpertiseQuery,
} from "@/redux/api/facultyApi";

const { confirm } = Modal;

const AssignExpertiseView = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>();
  const [size, setSize] = useState<number>();
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteExpertise, { isSuccess, isError }] =
    useDeleteExpertiseMutation();

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

  const { data, isLoading, refetch } = useGetAssignExpertiseQuery(
    {
      id: userId,
      arg: query,
    },
    { refetchOnMountOrArgChange: true }
  );

  const interestData = data?.interest;
  const meta = data?.meta;

  useEffect(() => {
    setSize(meta?.limit);
    setPage(meta?.page);
  }, [meta]);

  const showModal = async (id: string) => {
    setIsModalOpen(true);
    confirm({
      title: "Are you sure delete this expertise?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
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
      await deleteExpertise({ data: deleteData, id: userId });
      refetch();
      setIsModalOpen(false);

      message.destroy(key);
      message.success("Expertise Deleted successfully");

      //@ts-ignore
      if ((data?.interest ?? []).length === 1) {
        window.location.reload();
      }
    } catch (err: any) {
      //   console.error(err.message);
      setIsModalOpen(false);
      message.destroy(key);
      message.error(err.message);
    }
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Interest",
      dataIndex: "title",
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Button type="primary" danger onClick={() => showModal(data?.id)}>
              <DeleteOutlined />
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
        Your Interest List
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
            dataSource={data?.interest}
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
                Select Interest first
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignExpertiseView;
