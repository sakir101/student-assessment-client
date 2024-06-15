"use client";

import Loading from "@/app/loading";
import { useGetSingleSuperAdminQuery } from "@/redux/api/superAdmin";
import { getUserInfo } from "@/services/auth.service";
import Image from "next/image";
import React from "react";

const AccountSuperAdmin = () => {
  const { userId: id } = getUserInfo() as any;

  const { data, isLoading, refetch } = useGetSingleSuperAdminQuery(
    id,

    { refetchOnMountOrArgChange: true }
  );
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
                    <span className="text-lg text-gray-600 ">
                      Super Admin ID
                    </span>
                  </p>
                  <p className="mb-5">
                    <span className="text-lg text-gray-600 ">
                      Contact Number
                    </span>
                  </p>
                  <p className="mb-5">
                    <span className="text-lg text-gray-600 ">Email</span>
                  </p>
                  <p className="mb-5">
                    <span className="text-lg text-gray-600 ">Address</span>
                  </p>
                </div>
                <div>
                  <p className="mb-5">
                    <span className="text-lg font-semibold">
                      {data?.superAdminId}
                    </span>
                  </p>
                  <p className="mb-5">
                    <span className="text-lg font-semibold">
                      {data?.contactNum}
                    </span>
                  </p>
                  <p className="mb-5">
                    <span className="text-lg font-semibold">
                      {data?.user?.email}
                    </span>
                  </p>
                  <p className="mb-5">
                    <span className="text-lg font-semibold">
                      {data?.address}
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

export default AccountSuperAdmin;
