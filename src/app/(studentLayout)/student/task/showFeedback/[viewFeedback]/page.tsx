"use client";

import Loading from "@/app/loading";
import {
  useGetSingleSpecificStudentTaskQuery,
  useGetSpecificFeedbackTaskQuery,
} from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import DOMPurify from "dompurify";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "code-block"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "link",
  "color",
  "background",
  "align",
];

const ViewFeedback = () => {
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

  const { data, isLoading, refetch } = useGetSpecificFeedbackTaskQuery(
    { id, taskId },
    { refetchOnMountOrArgChange: true }
  );
  const facultyName = `${data?.faculty?.firstName ?? ""} ${
    data?.faculty?.middleName ?? ""
  } ${data?.faculty?.lastName ?? ""}`;

  const taskData = data?.task;

  const { data: taskSolution } = useGetSingleSpecificStudentTaskQuery(
    { id, taskId },
    { refetchOnMountOrArgChange: true }
  );

  const renderHtmlWithCodeBlocks = (htmlContent: string) => {
    if (!htmlContent) {
      return null;
    }

    const parts = htmlContent.split(/(<pre[^>]*>[\s\S]*?<\/pre>)/g);

    return parts.map((part, index) => {
      let sanitizedHtmlContent = DOMPurify.sanitize(part);
      let alignmentClass = "";

      // Check if the content has alignment classes
      const alignmentRegex =
        /class="[^"]*ql-align-(center|left|right|justify)/g;
      const alignmentMatch = sanitizedHtmlContent.match(alignmentRegex);
      if (alignmentMatch) {
        // Get the first alignment class found
        alignmentClass = alignmentMatch[0];
        // Remove the alignment class from the content
        sanitizedHtmlContent = sanitizedHtmlContent.replace(alignmentRegex, "");
      }
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
        <div key={index} className={alignmentClass}>
          <span dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }} />
        </div>
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
            <div className="flex flex-col justify-center items-center">
              <div className="w-full lg:w-3/4">
                <h1
                  className="text-center text-xl text-blue-500 font-semibold"
                  style={{
                    margin: "15px 0px",
                  }}
                >
                  {taskData?.title}
                </h1>

                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  <p>
                    <span className="font-bold">Task Description: </span>
                    <ReactQuill
                      value={taskData?.description}
                      readOnly={true}
                      theme={"bubble"}
                    />
                    {/* {renderHtmlWithCodeBlocks(taskData?.description)} */}
                  </p>
                </div>
                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  <p>
                    <span className="font-bold">Your Solution: </span>
                    <ReactQuill
                      value={taskSolution?.solution}
                      readOnly={true}
                      theme={"bubble"}
                    />
                    {/* {renderHtmlWithCodeBlocks(taskSolution?.solution)} */}
                  </p>
                </div>
                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  <p className="text-center text-lg">
                    Feedback from{" "}
                    <span className="font-bold text-blue-600">
                      {facultyName}
                    </span>
                  </p>
                  <p className="text-center my-3">
                    Your task status:{" "}
                    <span className="font-bold">{data?.status}</span>
                  </p>
                  {data?.comment ? (
                    <div className="bg-stone-300 my-3 p-5">
                      <ReactQuill
                        value={data?.comment}
                        readOnly={true}
                        theme={"bubble"}
                      />
                    </div>
                  ) : (
                    <p className="text-center">No comment added</p>
                  )}
                </div>
                <div className="flex justify-center items-center">
                  <p className="text-blue-400 font-semibold">
                    You can update your task
                  </p>
                  <Link href={`/student/task/update/${taskData?.id}`}>
                    <p className="text-blue-800 font-bold ms-2">Update</p>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ViewFeedback;
