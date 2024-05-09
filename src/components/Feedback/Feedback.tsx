"use client";

import React, { ChangeEvent } from "react";
import { status } from "@/constant/global";
import {
  useAssignTaskFeedbackMutation,
  useGetSingleFacultyQuery,
  useUpdateTaskFeedbackMutation,
} from "@/redux/api/facultyApi";
import { useGetSpecificFeedbackTaskQuery } from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import { Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import "../QuillCss/page.css";
import { formats, modules } from "../ui/QuillModuleFormat";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Feedback = ({
  studentUserId,
  studentId,
  taskId,
}: {
  studentUserId: any;
  studentId: any;
  taskId: any;
}) => {
  const [statusChange, setStatusChange] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [facultyId, setFacultyId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { userId: id } = getUserInfo() as any;

  const [updateTaskFeedback] = useUpdateTaskFeedbackMutation();

  const [assignTaskFeedback] = useAssignTaskFeedbackMutation();

  const { data: facultyData } = useGetSingleFacultyQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const { data: taskFeedback, refetch } = useGetSpecificFeedbackTaskQuery(
    { id: studentUserId, taskId },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    setComment(taskFeedback?.comment);
  }, [taskFeedback]);

  useEffect(() => {
    setFacultyId(facultyData?.id);
  }, [facultyData]);

  const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatusChange(value);
  };

  const handleChangeStatus1 = (value: string) => {
    setStatusChange(value);
  };

  const onSubmit = async () => {
    if (statusChange === undefined || statusChange === "") {
      setError("Set status first");
      return;
    }

    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    const data = {
      comment,
      status: statusChange,
    };

    try {
      assignTaskFeedback({ data, taskId, facultyId, studentId })
        .unwrap()
        .then(() => {
          message.success("Feedback added successfully");
        })
        .catch((err) => {
          message.error("Failed to add feedback");
        })
        .finally(() => {
          message.destroy(key);
          setStatusChange("");
          setComment("");
          setError("");
          refetch();
        });
    } catch (error) {
      throw error;
    }
  };

  const onEdit = async () => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    if (statusChange === "" && comment === "") {
      message.destroy(key);
      return;
    } else if (statusChange === "") {
      const data = {
        comment,
      };

      try {
        updateTaskFeedback({ data, taskId, facultyId, studentId })
          .unwrap()
          .then(() => {
            message.success("Feedback updated successfully");
          })
          .catch((err) => {
            message.error("Failed to update feedback");
          })
          .finally(() => {
            message.destroy(key);
            setStatusChange("");
            setComment("");
            setError("");
            refetch();
          });
      } catch (error) {
        throw error;
      }
    } else if (comment === "") {
      const data = {
        status: statusChange,
      };

      try {
        updateTaskFeedback({ data, taskId, facultyId, studentId })
          .unwrap()
          .then(() => {
            message.success("Feedback updated successfully");
          })
          .catch((err) => {
            message.error("Failed to update feedback");
          })
          .finally(() => {
            message.destroy(key);
            setStatusChange("");
            setComment("");
            setError("");
            refetch();
          });
      } catch (error) {
        throw error;
      }
    } else {
      const data = {
        comment,
        status: statusChange,
      };

      try {
        updateTaskFeedback({ data, taskId, facultyId, studentId })
          .unwrap()
          .then(() => {
            message.success("Feedback updated successfully");
          })
          .catch((err) => {
            message.error("Failed to update feedback");
          })
          .finally(() => {
            message.destroy(key);
            setStatusChange("");
            setComment("");
            setError("");
            refetch();
          });
      } catch (error) {
        throw error;
      }
    }
  };

  return (
    <div>
      {taskFeedback ? (
        <>
          <div className="w-full flex justify-center">
            <div className="w-1/4">
              <select
                className="select select-secondary w-full h-9 min-h-9"
                defaultValue={
                  taskFeedback?.status === "Correct"
                    ? "Correct"
                    : taskFeedback?.status === "Wrong"
                    ? "Wrong"
                    : taskFeedback?.status === "PartiallyCorrect"
                    ? "Partially Correct"
                    : taskFeedback?.status === "PartiallyWrong"
                    ? "Partially Wrong"
                    : "Not Set"
                }
                onChange={handleChangeStatus}
              >
                <option disabled selected>
                  Select Status
                </option>
                <option value="Correct">Correct</option>
                <option value="Wrong">Wrong</option>
                <option value="PartiallyCorrect">Partially Correct</option>
                <option value="PartiallyWrong">Partially Wrong</option>
              </select>
            </div>
          </div>
          <div className="w-full flex justify-center my-3">
            <div className="w-1/2">
              <ReactQuill
                value={comment}
                onChange={setComment}
                modules={modules}
                formats={formats}
                placeholder={"Write Feedback"}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="btn btn-primary" onClick={() => onEdit()}>
              Resubmit
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex justify-center">
            <div className="w-1/4">
              <Select
                placeholder="Select Status"
                options={status}
                className="w-full"
                onChange={handleChangeStatus1}
              />
              <p className="text-red-600 my-1">{error}</p>
            </div>
          </div>
          <div className="w-full flex justify-center my-3">
            <div className="w-1/2">
              <ReactQuill
                value={comment}
                onChange={setComment}
                modules={modules}
                formats={formats}
                placeholder={"Write Feedback"}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="btn btn-primary" onClick={() => onSubmit()}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Feedback;
