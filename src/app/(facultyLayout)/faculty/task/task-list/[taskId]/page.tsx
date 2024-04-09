"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getUserInfo } from "@/services/auth.service";
import { useGetSingleSpecificFacultyTaskQuery } from "@/redux/api/facultyApi";
import Loading from "@/app/loading";
import Link from "next/link";

const SingleTask = () => {
  const query: Record<string, any> = {};
  const [taskId, setTaskId] = useState<string>("");

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    const match = url.match(/\/([^\/?]+)\?$/);
    const extractId = match ? match[1] : null;
    if (extractId !== null) {
      setTaskId(extractId);
    }
  }, [pathname, searchParams]);

  const { userId: id } = getUserInfo() as any;

  const { data, isLoading, refetch } = useGetSingleSpecificFacultyTaskQuery(
    { id, taskId },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <div className="mt-3 lg:mt-3 p-5">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {Object.keys(data || {}).length > 0 && (
            <div>
              <div className="flex justify-end">
                <Link href={`/faculty/task/task-list/update/${data?.id}`}>
                  <button className="btn btn-sm bg-blue-300  hover:to-blue-600 border-blue-300">
                    Update
                  </button>
                </Link>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1
                  className="text-center text-xl text-blue-500 font-semibold"
                  style={{
                    margin: "15px 0px",
                  }}
                >
                  {data?.title}
                </h1>

                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  <p>
                    <span className="font-bold">Task Description: </span>
                    <span>{data?.description}</span>
                  </p>
                </div>
                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  {data?.hint?.length > 0 ? (
                    data?.hint.map((hintItem: any, index: number) => (
                      <p key={index}>
                        <span>Hint {index + 1}: </span>
                        <span>{hintItem?.description}</span>
                      </p>
                    ))
                  ) : (
                    <p className="font-bold">Task Hint Not Assigned</p>
                  )}
                </div>
                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  {data?.solution !== null ? (
                    <p>
                      <span className="font-bold">Task Solution: </span>
                      <span>{data?.solution}</span>
                    </p>
                  ) : (
                    <p className="font-bold">Task Solution Not Assigned</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SingleTask;
