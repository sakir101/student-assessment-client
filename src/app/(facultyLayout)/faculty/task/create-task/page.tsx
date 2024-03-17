"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import { useTaskCreateMutation } from "@/redux/api/taskApi";
import { createTaskSchema } from "@/schemas/createTask";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";

import { useState } from "react";

const CreateTask = () => {
  const [taskCreate, { isSuccess, isError, isLoading }] =
    useTaskCreateMutation();
  const onSubmit = async (data: any) => {
    console.log(data);
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    const { userId } = getUserInfo() as any;

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
  };
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-4/5 lg:w-1/2">
        <h1
          className="text-center text-xl text-blue-500 font-semibold"
          style={{
            margin: "15px 0px",
          }}
        >
          Create your task
        </h1>
        <div>
          <Form
            submitHandler={onSubmit}
            resolver={yupResolver(createTaskSchema)}
          >
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md">
              <FormInput
                name="title"
                type="text"
                size="large"
                label="Title"
                required
              />
            </div>
            <div
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md"
              style={{
                margin: "15px 0px",
              }}
            >
              <FormTextArea
                name="description"
                rows={7}
                label="Description"
                required
              />
            </div>
            <div
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md"
              style={{
                margin: "15px 0px",
              }}
            >
              <FormTextArea name="solution" rows={4} label="Solution" />
            </div>
            <div className="flex justify-center">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
