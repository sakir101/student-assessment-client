"use client";

import { Button, Input, message, Modal, Select } from "antd";

import { useState } from "react";
import {
  DeleteOutlined,
  ReloadOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import Loading from "@/app/loading";
import SATable from "@/components/ui/Table";
import { useGetSpecificMatchFacultyQuery } from "@/redux/api/facultyApi";
import faculty from "@/app/(facultyLayout)/faculty/page";
import Image from "next/image";
import FormSelectField from "@/components/Forms/FormSelectField";
import { genderOptions, universityOptions } from "@/constant/global";
import { useGetInterestQuery } from "@/redux/api/interestApi";
import Link from "next/link";

const SuggestedFacultyList = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [InterestFaculty, setInterestFaculty] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  query["size"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;
  console.log(InterestFaculty);
  if (InterestFaculty?.length > 0) {
    query["InterestFaculty"] = InterestFaculty;
  }

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { userId } = getUserInfo() as any;

  const { data: interestData } = useGetInterestQuery({
    refetchOnMountOrArgChange: true,
  });

  const { data, isLoading, refetch } = useGetSpecificMatchFacultyQuery(
    {
      id: userId,
      arg: query,
    },
    { refetchOnMountOrArgChange: true }
  );

  const interests = interestData?.interest;
  const interestOptions = interests?.map((interest) => {
    return {
      label: interest?.title,
      value: interest?.title,
    };
  });

  const facultyList = data?.faculty;

  const newData = facultyList?.map((facultyItem) => ({
    id: facultyItem.id ?? "",
    name: `${facultyItem.firstName ?? ""} ${facultyItem.middleName ?? ""} ${
      facultyItem.lastName ?? ""
    }`,
    institute: facultyItem.institution ?? "",
    profileimg: facultyItem.profileImage ?? "",
  }));

  const meta = data?.meta;
  const handleChange = (value: string) => {
    setInterestFaculty(value);
  };
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
      sorter: true,
    },
    {
      title: "University",
      dataIndex: "institute",
      key: "institute",
      sorter: true,
    },
    {
      title: "Account View",
      render: function (data: any) {
        return (
          <>
            <Link href={`/student/faculty-list/suggested-faculty/${data.id}`}>
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
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Your Suggested Faculty
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
      <div className="flex justify-center items-center mt-5 lg:mt-7">
        <Select
          defaultValue="Filter Interest"
          className="w-full lg:w-1/4 mr-3"
          onChange={handleChange}
          options={interestOptions}
          allowClear
        />
        <Select
          defaultValue="Filter University"
          className="w-full lg:w-1/4"
          options={universityOptions}
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
                Select Interest first
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestedFacultyList;
