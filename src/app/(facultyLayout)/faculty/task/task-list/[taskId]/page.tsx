"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getUserInfo } from "@/services/auth.service";
import { useGetSingleSpecificFacultyTaskQuery } from "@/redux/api/facultyApi";
import Loading from "@/app/loading";
import Link from "next/link";
import DOMPurify from "dompurify";

const SingleTask = () => {
  const query: Record<string, any> = {};
  const [taskId, setTaskId] = useState<string>("");
  const [cont, setCont] = useState<string>("");

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

  const renderHtmlWithCodeBlocks = (htmlContent: string) => {
    if (!htmlContent) {
      return null;
    }

    const parts = htmlContent.split(/(<pre[^>]*>[\s\S]*?<\/pre>)/g);

    return parts.map((part, index) => {
      const sanitizedHtmlContent = DOMPurify.sanitize(part);
      if (sanitizedHtmlContent.startsWith("<pre")) {
        return (
          <div key={index}>
            <div
              className="bg-gray-900 text-white rounded-md overflow-x-auto p-5"
              dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
            />
          </div>
        );
      }
      return (
        <span
          key={index}
          dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
        />
      );
    });
  };

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
                    {renderHtmlWithCodeBlocks(data?.description)}
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
                  {data?.solution?.length > 0 ? (
                    <p>
                      <span className="font-bold">Task Solution: </span>

                      {renderHtmlWithCodeBlocks(data?.solution)}
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
