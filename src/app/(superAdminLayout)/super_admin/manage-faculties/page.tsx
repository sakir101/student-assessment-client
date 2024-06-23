"use client";

import Loading from "@/app/loading";
import SATable from "@/components/ui/Table";
import {
  useGetAllFacultiesQuery,
  useUpdateUserVerificationMutation,
} from "@/redux/api/superAdmin";
import { useDebounced } from "@/redux/hooks";
import { Button, Input, Switch, message, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ManageFaculties = () => {
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

  const { data, isLoading, refetch } = useGetAllFacultiesQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const [updateUserVerification] = useUpdateUserVerificationMutation();

  const facultyList = data?.faculty;

  const newData = facultyList?.map((facultyItem) => ({
    id: facultyItem.id ?? "",
    userId: facultyItem.userId ?? "",
    verifiedUser: facultyItem.user.verifiedUser ?? "",
    name: `${facultyItem.firstName ?? ""} ${facultyItem.middleName ?? ""} ${
      facultyItem.lastName ?? ""
    }`,
    facultyId: facultyItem.facultyId ?? "",
    profileimg: facultyItem.profileImage ?? "",
  }));

  const meta = data?.meta;

  const handleVerifiedChange = (userId: string, checked: boolean) => {
    Modal.confirm({
      title: "Change Verified Status",
      content: `Are you sure you want to ${
        checked ? "verify" : "unverify"
      } this user?`,
      onOk: () => {
        updateUser(userId, checked);
      },
      onCancel: () => {
        console.log(`Change of verified status for ${userId} cancelled`);
      },
    });
  };

  const updateUser = async (userId: string, checked: boolean) => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    const data = {
      verifiedUser: checked,
    };

    try {
      await updateUserVerification({ data, id: userId });
      refetch();
      message.destroy(key);
      message.success("User verification updated successfully");
    } catch (err: any) {
      message.destroy(key);
      message.error("User verification updated failed");
    }
  };

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
      dataIndex: "facultyId",
      key: "facultyId",
    },
    {
      title: "Verified User",
      dataIndex: "verifiedUser",
      key: "verifiedUser",
      render: (verifiedUser: boolean, record: any) => (
        <Switch
          checked={verifiedUser}
          onChange={(checked) => handleVerifiedChange(record.userId, checked)}
        />
      ),
    },
    {
      title: "Account View",
      render: function (data: any) {
        return (
          <>
            <Link href={`/super_faculty/manage-faculty/${data.id}`}>
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
        Faculty List
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
                No faculty is signed up
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFaculties;
