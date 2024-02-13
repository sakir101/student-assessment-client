"use client";

import Loading from "@/app/loading";
import { useGetSingleStudentQuery } from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import Image from "next/image";
import React from "react";

const AccountStudent = () => {
  const { userId: id } = getUserInfo() as any;

  const { data, isLoading, refetch } = useGetSingleStudentQuery(
    id,

    { refetchOnMountOrArgChange: true }
  );

  console.log(data);
  return (
    <div className="mt-5 lg:mt-7 p-4">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {Object.keys(data || {}).length > 0 && (
            <div className="flex flex-col justify-center items-center">
              <div className="avatar">
                <div className="w-24 lg:w-40 rounded-full">
                  <Image
                    src={data?.profileImage}
                    width={1000}
                    height={1000}
                    layout="fixed"
                    alt="Profile Image"
                  />
                </div>
              </div>
              <div className="text-center text-xl mt-5">
                <span>
                  {data?.firstName} {data?.middleName} {data?.lastName}
                </span>
              </div>
              <div className="divider"></div>
              <div className="mt-1">
                <p className="text-xl text-center">Personal Information</p>
              </div>

              <div className="mt-5 grid grid-cols-2 justify-items-center items-center mx-auto ">
                <div>
                  <p className="mb-5">
                    <span className="text-lg text-gray-600 ">University</span>
                  </p>
                  <p className="mb-5">
                    <span className="text-lg text-gray-600 ">Student ID</span>
                  </p>
                  <p className="mb-5">
                    <span className="text-lg text-gray-600 ">Gender</span>
                  </p>
                </div>
                <div>
                  <p className="mb-5">
                    <span className="text-lg font-semibold">
                      {data?.institution}
                    </span>
                  </p>
                  <p className="mb-5">
                    <span className="text-lg font-semibold">
                      {data?.studentId}
                    </span>
                  </p>
                  <p className="mb-5">
                    <span className="text-lg font-semibold">
                      {data?.gender}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AccountStudent;
