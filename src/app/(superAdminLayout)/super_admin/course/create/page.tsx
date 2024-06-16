"use client";

import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import "../../../../../components/QuillCss/page.css";
import { ChangeEvent, useState } from "react";
import { useCourseCreateMutation } from "@/redux/api/courseApi";
import { message } from "antd";
import { formats, modules } from "@/components/ui/QuillModuleFormat";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const CreateCourse = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState<string>("");
  const [statusError, setStatusError] = useState<string>("");
  const [statusChange, setStatusChange] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatusChange(value);
  };

  const [courseCreate, { isSuccess, isError: err, isLoading }] =
    useCourseCreateMutation();

  const addDetails = async (value: any) => {
    console.log(description.length);
    if (statusChange === "") {
      setStatusError("Status is required");
      return;
    }
    if (description.length < 100) {
      setError("Description length needs more than 100");
      return;
    }
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    const data = {
      title: value.title,
      courseLink: value.courseLink,
      desc: description,
      price: value.price,
      status: statusChange,
    };

    setError("");
    setStatusError("");

    try {
      courseCreate({ data })
        .unwrap()
        .then(() => {
          message.success("Course added successfully");
          setDescription("");
          reset();
        })
        .catch((err) => {
          message.error("Failed to add course");
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
          Create Course
        </h1>
        <div>
          <form onSubmit={handleSubmit(addDetails)}>
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md">
              <label className="font-weight-bold">
                {" "}
                Title <span className="required"> * </span>{" "}
              </label>
              <br />
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
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md my-3">
              <label className="font-weight-bold">
                {" "}
                Course Link <span className="required"> * </span>{" "}
              </label>
              <br />
              <br />
              <input
                className="input input-bordered w-full h-10"
                type="text"
                {...register("courseLink", { required: true })}
                placeholder="Course Link"
              />
              {errors.title && (
                <p className="text-red-500">Course Link is required</p>
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
              <br />
              <br />
              <ReactQuill
                value={description}
                onChange={setDescription}
                modules={modules}
                formats={formats}
                placeholder={"Write Description"}
              />
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md my-3">
              <label className="font-weight-bold">
                {" "}
                Course Price <span className="required"> * </span>{" "}
              </label>
              <br />
              <br />
              <input
                className="input input-bordered w-full h-10"
                type="text"
                {...register("price", { required: true })}
                placeholder="Course Price"
              />
              {errors.title && (
                <p className="text-red-500">Course Price is required</p>
              )}
            </div>
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md my-3">
              <label className="font-weight-bold">
                {" "}
                Course Status <span className="required"> * </span>{" "}
              </label>
              <br />
              <br />
              <select
                className="select select-secondary w-full h-9 min-h-9"
                onChange={handleChangeStatus}
              >
                <option disabled selected>
                  Select Status
                </option>
                <option value="Available">Available</option>
                <option value="NotAvailable">Not Available</option>
              </select>
              {statusError && <p className="text-red-500">{statusError}</p>}
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

export default CreateCourse;
