"use client";

import Loading from "@/app/loading";
import { useGetSingleFacultyByFacultyIdQuery } from "@/redux/api/facultyApi";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const FacultyProfile = () => {
  const [id, setId] = useState<string>("");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    const match = url.match(/\/([^\/?]+)\?$/);
    const extractId = match ? match[1] : null;
    if (extractId !== null) {
      setId(extractId);
    }
  }, [pathname, searchParams]);

  const { data, isLoading, refetch } = useGetSingleFacultyByFacultyIdQuery(
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
                    <span className="text-lg text-gray-600 ">Faculty ID</span>
                  </p>
                  <p className="mb-5">
                    <span className="text-lg text-gray-600 ">Institute</span>
                  </p>
                  <p className="mb-5">
                    <span className="text-lg text-gray-600 ">Email</span>
                  </p>
                  <p className="mb-5">
                    <span className="text-lg text-gray-600 ">Gender</span>
                  </p>
                </div>
                <div>
                  <p className="mb-5">
                    <span className="text-lg font-semibold">
                      {data?.facultyId}
                    </span>
                  </p>
                  <p className="mb-5">
                    <span className="text-lg font-semibold">
                      {data?.institution}
                    </span>
                  </p>
                  <p className="mb-5">
                    <span className="text-lg font-semibold">
                      {data?.user?.email}
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

export default FacultyProfile;
