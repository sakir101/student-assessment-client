"use client";

import { useMasterFieldCreateMutation } from "@/redux/api/masterFieldApi";
import { getUserInfo } from "@/services/auth.service";
import { message } from "antd";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

const CreateMasterField = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [categoryChange, setCategoryChange] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { userId } = getUserInfo() as any;
  const [masterFieldCreate, { isSuccess, isError: err, isLoading }] =
    useMasterFieldCreateMutation();

  const handleChangeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCategoryChange(value);
  };

  const addDetails = async (value: any) => {
    if (categoryChange === "") {
      setError("Set Category first");
      return;
    }
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    const data = {
      title: value.title,
      category: categoryChange,
    };

    setError("");

    try {
      masterFieldCreate({ data })
        .unwrap()
        .then(() => {
          message.success("Master Field added successfully");
          reset();
        })
        .catch((err) => {
          message.error("Failed to add master field");
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
          Create Master Field
        </h1>
        <div>
          <form onSubmit={handleSubmit(addDetails)}>
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md">
              <label className="font-weight-bold mb-1">
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
                Category <span className="required"> * </span>{" "}
              </label>
              <br />
              <br />
              <select
                className="select select-secondary w-full h-9 min-h-9"
                onChange={handleChangeCategory}
              >
                <option disabled selected>
                  Select Status
                </option>
                <option value="CategoryA">Category A</option>
                <option value="CategoryB">Category B</option>
                <option value="CategoryC">Category C</option>
                <option value="CategoryD">Category D</option>
                <option value="CategoryE">Category E</option>
                <option value="CategoryF">Category F</option>
              </select>
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="flex justify-center my-3">
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

export default CreateMasterField;
