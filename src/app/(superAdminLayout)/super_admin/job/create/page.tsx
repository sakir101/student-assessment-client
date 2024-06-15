"use client";

import { ChangeEvent, useState } from "react";

import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useJobCreateMutation } from "@/redux/api/jobApi";
import { message } from "antd";
import { formats, modules } from "@/components/ui/QuillModuleFormat";
import "../../../../../components/QuillCss/page.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateJob = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState<string>("");
  const [statusChange, setStatusChange] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatusChange(value);
  };

  const [jobCreate, { isSuccess, isError: err, isLoading }] =
    useJobCreateMutation();

  const addDetails = async (value: any) => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    const data = {
      title: value.title,
    };

    try {
      jobCreate({ data })
        .unwrap()
        .then(() => {
          message.success("Job added successfully");
          reset();
        })
        .catch((err) => {
          message.error("Failed to add job");
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
          Create Job
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
                Job Link <span className="required"> * </span>{" "}
              </label>
              <br />
              <br />
              <input
                className="input input-bordered w-full h-10"
                type="text"
                {...register("jobLink", { required: true })}
                placeholder="Title"
              />
              {errors.title && (
                <p className="text-red-500">Job Link is required</p>
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
                Job Status <span className="required"> * </span>{" "}
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
                <option value="CategoryA">Available</option>
                <option value="CategoryB">Not Available</option>
              </select>
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md my-3">
              <label className="font-weight-bold">
                {" "}
                Company Website Link <span className="required"> * </span>{" "}
              </label>
              <br />
              <br />
              <input
                className="input input-bordered w-full h-10"
                type="text"
                {...register("companyWebsite", { required: true })}
                placeholder="Title"
              />
              {errors.title && (
                <p className="text-red-500">Company website link is required</p>
              )}
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

export default CreateJob;
