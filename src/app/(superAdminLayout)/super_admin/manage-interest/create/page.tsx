"use client";

import { useInterestCreateMutation } from "@/redux/api/interestApi";
import { getUserInfo } from "@/services/auth.service";
import { message } from "antd";
import { useForm } from "react-hook-form";

const CreateInterest = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [interestCreate, { isSuccess, isError: err, isLoading }] =
    useInterestCreateMutation();
  const addDetails = async (value: any) => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    const data = {
      title: value.title,
    };

    try {
      interestCreate({ data })
        .unwrap()
        .then(() => {
          message.success("Interest added successfully");
          reset();
        })
        .catch((err) => {
          message.error("Failed to add interest");
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
          Create Interest
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

export default CreateInterest;
