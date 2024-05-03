"use client";

import Loading from "@/app/loading";
import { useGetSingleSpecificStudentTaskQuery } from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import DOMPurify from "dompurify";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Collapse } from "antd";
import "react-quill/dist/quill.bubble.css";
import dynamic from "next/dynamic";

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

const SingleTaskStudent = () => {
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

  const { data, isLoading, refetch } = useGetSingleSpecificStudentTaskQuery(
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
            <div className="flex flex-col justify-center">
              <div className="w-full lg:w-3/4">
                <Link href={`/student/task/update/${data?.task?.id}`}>
                  <button className="btn btn-sm bg-blue-300  hover:to-blue-600 border-blue-300">
                    Add Solution
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
                  {data?.task?.title}
                </h1>

                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  <p>
                    <span className="font-bold">Task Description: </span>
                    <ReactQuill
                      value={data?.task?.description}
                      readOnly={true}
                      theme={"bubble"}
                    />
                    {/* {renderHtmlWithCodeBlocks(data?.task?.description)} */}
                  </p>
                </div>
                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  {data?.task?.hint?.length > 0 ? (
                    data?.task?.hint.map((hintItem: any, index: number) => (
                      <Collapse
                        key={hintItem.id}
                        items={[
                          {
                            key: index.toString(),
                            label: `Hint ${index + 1}`,
                            children: <p>{hintItem?.description}</p>,
                          },
                        ]}
                      />
                    ))
                  ) : (
                    <p className="font-bold">Task Hint Not Assigned</p>
                  )}
                </div>
                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  {data?.task?.solution?.length > 0 ? (
                    <Collapse
                      items={[
                        {
                          key: "1",
                          label: (
                            <span className="font-bold">Task Solution:</span>
                          ),
                          children: (
                            <ReactQuill
                              value={data?.task?.solution}
                              readOnly={true}
                              theme={"bubble"}
                            />
                          ),
                        },
                      ]}
                    />
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

export default SingleTaskStudent;