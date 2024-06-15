"use client";

import Loading from "@/app/loading";
import SATable from "@/components/ui/Table";
import { useGetAllAdminsQuery } from "@/redux/api/superAdmin";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { Button, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminView = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>();
  const [size, setSize] = useState<number>();
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
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

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { userId } = getUserInfo() as any;

  const { data, isLoading, refetch } = useGetAllAdminsQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const adminList = data?.admin;

  const newData = adminList?.map((adminItem) => ({
    id: adminItem.id ?? "",
    name: `${adminItem.firstName ?? ""} ${adminItem.middleName ?? ""} ${
      adminItem.lastName ?? ""
    }`,
    adminId: adminItem.adminId ?? "",
    profileimg: adminItem.profileImage ?? "",
  }));

  const meta = data?.meta;

  useEffect(() => {
    setSize(meta?.limit);
    setPage(meta?.page);
  }, [meta]);

  const columns = [
    {
      title: "Profile Image",
      dataIndex: "profileimg",
      key: "profileimg",
      render: (profileimg: string) => (
        <Image
          src={profileimg}
          width={70}
          height={70}
          alt="Profile"
          style={{ borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ID",
      dataIndex: "adminId",
      key: "adminId",
    },
    {
      title: "Account View",
      render: function (data: any) {
        return (
          <>
            <Link href={`/super_admin/manage-admin/${data.id}`}>
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

  return (
    <div className="p-4">
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Admin List
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
            dataSource={newData}
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
                No Admin is created
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminView;
