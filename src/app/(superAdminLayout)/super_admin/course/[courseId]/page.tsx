"use client";

import "react-quill/dist/quill.bubble.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useGetSingleCourseQuery } from "@/redux/api/courseApi";
import Loading from "@/app/loading";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const SingleCourse = () => {
  const query: Record<string, any> = {};
  const [courseId, setCourseId] = useState<string>("");
  const [cont, setCont] = useState<string>("");

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    const match = url.match(/\/([^\/?]+)\?$/);
    const extractId = match ? match[1] : null;
    if (extractId !== null) {
      setCourseId(extractId);
    }
  }, [pathname, searchParams]);

  const { data, refetch, isLoading } = useGetSingleCourseQuery(courseId, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="mt-3 lg:mt-3 p-5">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {Object.keys(data || {}).length > 0 && (
            <div className="flex flex-col justify-center items-center">
              <div className="w-full lg:w-3/4">
                <h1
                  className="text-center text-xl text-blue-500 font-semibold"
                  style={{
                    margin: "15px 0px",
                  }}
                >
                  {data?.title}
                </h1>

                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  <span className="font-bold">Course Description: </span>
                  <br />
                  <ReactQuill
                    value={data?.desc}
                    readOnly={true}
                    theme={"bubble"}
                  />
                </div>
                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  <span className="font-bold">Course Link: </span>
                  <br />
                  {data?.courseLink ? (
                    <Link href={data.courseLink} legacyBehavior>
                      <a target="_blank" rel="noopener noreferrer">
                        {data.courseLink}
                      </a>
                    </Link>
                  ) : (
                    <p>No course link available</p>
                  )}
                </div>
                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  <span className="font-bold">Course Price: </span>
                  <span>{data?.price}</span>
                </div>
                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  <span className="font-bold">Course Status: </span>
                  <span>{data?.status}</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SingleCourse;
