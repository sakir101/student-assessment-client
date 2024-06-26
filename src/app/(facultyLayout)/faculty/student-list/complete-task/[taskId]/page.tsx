"use client";

import Loading from "@/app/loading";
import Feedback from "@/components/Feedback/Feedback";
import { useGetAllCompleteTaskStudentsQuery } from "@/redux/api/facultyApi";
import DOMPurify from "dompurify";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import "../../../../../../components/QuillCss/page.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CompleteTaskStudent = () => {
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

  const { data, isLoading, refetch } = useGetAllCompleteTaskStudentsQuery(
    taskId,
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
              <div className="flex flex-col justify-center items-center">
                <h1
                  className="text-center text-xl text-blue-500 font-semibold"
                  style={{
                    margin: "15px 0px",
                  }}
                >
                  {data[0]?.task.title}
                </h1>

                <div className="p-2 lg:p-5 bg-slate-300 rounded-md mb-4">
                  <p>
                    <span className="font-bold">Task Description: </span>
                    <ReactQuill
                      className="mt-3"
                      value={data[0]?.task.description}
                      readOnly={true}
                      theme={"bubble"}
                    />
                  </p>
                </div>
              </div>
              <div className="my-4 flex justify-center items-center w-full">
                <div className="w-full lg:w-3/4">
                  {data?.map((item: any) => (
                    <div
                      key={item?.id}
                      className="p-2 lg:p-5 bg-slate-300 shadow-md my-4 rounded-md"
                    >
                      <div className="flex items-center">
                        <div className="avatar mr-3">
                          <div className="w-10 rounded-full">
                            <Image
                              src={item?.student?.profileImage}
                              width={50}
                              height={50}
                              alt="Profile Image"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-lg">
                            {item?.student?.firstName}{" "}
                            {item?.student?.middleName}{" "}
                            {item?.student?.lastName}
                          </p>
                        </div>
                      </div>
                      <p className="text-lg">{item?.student?.studentId}</p>
                      <div className="p-2 lg:p-5 my-4">
                        <p>
                          <span className="font-bold">Task Solution: </span>
                          <br />
                          <ReactQuill
                            className="mt-3"
                            value={item?.solution}
                            readOnly={true}
                            theme={"bubble"}
                          />
                        </p>
                      </div>
                      <div className="bg-gray-300 my-3">
                        <h1 className="text-center text-lg text-blue-500 font-semibold mb-3">
                          Throw your feedback
                        </h1>
                        <Feedback
                          studentUserId={item?.student?.userId}
                          studentId={item?.student?.id}
                          taskId={taskId}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CompleteTaskStudent;
