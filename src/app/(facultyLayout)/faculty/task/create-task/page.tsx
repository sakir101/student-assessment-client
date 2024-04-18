"use client";

import { useState } from "react";

import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useTaskCreateMutation } from "@/redux/api/taskApi";
import { message } from "antd";
import { getUserInfo } from "@/services/auth.service";

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
  "color", // Add color option
  "background", // Add background color option
  "align", // Add text alignment option
];

const CreateTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [description, setDescription] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  const [isError, setError] = useState<string>("");

  const [taskCreate, { isSuccess, isError: err, isLoading }] =
    useTaskCreateMutation();

  const addDetails = async (value: any) => {
    if (description.length < 100) {
      setError("Required, Add description minimum length 100 characters");
      return;
    }
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    const { userId } = getUserInfo() as any;
    const data = {
      title: value.title,
      description,
      solution,
    };
    setError("");
    try {
      taskCreate({ data, id: userId })
        .unwrap()
        .then(() => {
          message.success("Task added successfully");
        })
        .catch((err) => {
          message.error("Failed to add task");
        })
        .finally(() => {
          message.destroy(key);
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-4/5 lg:w-1/2">
        <h1
          className="text-center text-xl text-blue-500 font-semibold"
          style={{ margin: "15px 0px" }}
        >
          Create your task
        </h1>
        <div>
          <form onSubmit={handleSubmit(addDetails)}>
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md">
              <label className="font-weight-bold">
                {" "}
                Title <span className="required"> * </span>{" "}
              </label>
              <br />
              <input
                className="input input-bordered w-full h-10"
                type="text"
                {...register("title", { required: true })}
                placeholder="Title"
              />
              {errors.title && (
                <p className="text-red-500">Title is required</p>
              )}
            </div>
            <div
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md form-group  row"
              style={{ margin: "15px 0px" }}
            >
              <label className="font-weight-bold">
                {" "}
                Description <span className="required"> * </span>{" "}
              </label>
              <ReactQuill
                className="bg-white rounded-md"
                value={description}
                onChange={setDescription}
                modules={modules}
                formats={formats}
                placeholder={"Write something awesome..."}
              />
              {isError && <p className="text-red-500">{isError}</p>}
            </div>
            <div
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md form-group  row"
              style={{ margin: "15px 0px" }}
            >
              <label className="font-weight-bold">Solution</label>
              <ReactQuill
                className="bg-white rounded-md"
                value={solution}
                onChange={setSolution}
                modules={modules}
                formats={formats}
                placeholder={"Write something awesome..."}
              />
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
  );
};

export default CreateTask;
