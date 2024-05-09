"use client";

import Loading from "@/app/loading";
import {
  useGetSingleSpecificStudentTaskQuery,
  useUpdateSingleStudentTaskMutation,
} from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import { message } from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { formats, modules } from "@/components/ui/QuillModuleFormat";
import "../../../../../../components/QuillCss/page.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TaskAddSolution = () => {
  const query: Record<string, any> = {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [taskId, setTaskId] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  const [error, setError] = useState<string>("");

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

  useEffect(() => {
    if (data?.solution !== undefined || data?.solution !== null) {
      setSolution(data?.solution);
    }
  }, [data]);

  const [updateSingleStudentTask, { isSuccess, isError }] =
    useUpdateSingleStudentTaskMutation();

  const addSolution = async (value: any) => {
    if (solution.length <= 0) {
      setError("Required, to add character");
      return;
    }

    setError("");
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    const { userId } = getUserInfo() as any;

    const data = {
      solution,
    };
    try {
      updateSingleStudentTask({ data, id, taskId })
        .unwrap()
        .then(() => {
          message.success("Task solution added successfully");
        })
        .catch((err) => {
          message.error("Failed to add solution");
        })
        .finally(() => {
          message.destroy(key);
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="mt-3 lg:mt-3 p-5">
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Add your solution
      </h1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {Object.keys(data || {}).length > 0 && (
            <div>
              <div className="flex justify-center">
                <Link href={`/student/task/${data?.id}`}>
                  <button className="btn btn-sm bg-blue-300  hover:to-blue-600 border-blue-300">
                    View
                  </button>
                </Link>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="w-full lg:w-3/4">
                  <h1
                    className="text-center text-lg text-blue-500 font-semibold"
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
                    </p>
                  </div>
                  <form onSubmit={handleSubmit(addSolution)}>
                    <div
                      className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md form-group  row"
                      style={{ margin: "15px 0px" }}
                    >
                      <label className="font-weight-bold">Solution</label>
                      <ReactQuill
                        value={solution}
                        onChange={setSolution}
                        modules={modules}
                        formats={formats}
                        placeholder={"Write Solution"}
                      />
                      {error && <p className="text-red-500">{error}</p>}
                    </div>
                    <div className="flex justify-center">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskAddSolution;
