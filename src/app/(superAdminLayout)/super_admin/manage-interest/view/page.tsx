"use client";

import {
  useGetInterestQuery,
  useGetSingleInterestQuery,
  useUpdateInterestMutation,
} from "@/redux/api/interestApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { Button, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import Loading from "@/app/loading";
import SATable from "@/components/ui/Table";
import { useForm } from "react-hook-form";

const InterestView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>();
  const [size, setSize] = useState<number>();
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [interestID, setInterestID] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const { data, isLoading, refetch } = useGetInterestQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const interestList = data?.interest;
  const meta = data?.meta;

  useEffect(() => {
    setSize(meta?.limit);
    setPage(meta?.page);
  }, [meta]);

  const { data: singleInterestData } = useGetSingleInterestQuery(interestID, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (singleInterestData) {
      setValue("title", singleInterestData?.title);
    }
  });
  const [updateInterest] = useUpdateInterestMutation();

  const showModal = (id: string) => {
    setInterestID(id);
    setIsModalOpen(true);
  };

  const onSubmit = async (data: any) => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    try {
      await updateInterest({ data, id: interestID });
      refetch();
      setIsModalOpen(false);
      message.destroy(key);
      setInterestID("");
      message.success("Interest updated successfully");
    } catch (err: any) {
      setIsModalOpen(false);
      message.destroy(key);
      setInterestID("");
      message.error("Interest update failed");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setInterestID("");
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

  return (
    <div className="p-4">
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Interest List
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
            dataSource={interestList}
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
                No Interest is created
              </p>
            </div>
          </div>
        )}
      </div>
      <Modal
        visible={isModalOpen}
        okText="Update"
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        okButtonProps={{ style: { background: "blue" } }}
      >
        <div className="my-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <label className="font-weight-bold"> Title</label>
              <br />
              <input
                className="input input-bordered w-full h-10"
                type="text"
                {...register("title")}
                placeholder="Title"
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default InterestView;
