"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import { createAdminSchema } from "@/schemas/signup";
import FormSelectField from "../Forms/FormSelectField";
import { genderOptions } from "@/constant/global";
import UploadImage from "../ui/UploadImage";
import { Button, message } from "antd";
import { useCreateAdminMutation } from "@/redux/api/superAdmin";
import { setImageUrl } from "@/redux/slice/imageSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";

const CreateAdmin = () => {
  const dispatch = useAppDispatch();
  const [success, setSuccess] = useState(false);
  const [createAdmin, { isSuccess, isError, isLoading }] =
    useCreateAdminMutation();

  const onSubmit = async (values: any) => {
    dispatch(setImageUrl(""));
    const obj = { ...values };
    delete obj["confPassword"];
    let file = obj["file"];
    delete obj["file"];

    const data = JSON.stringify(obj);
    const formData = new FormData();

    formData.append("file", file as Blob);
    formData.append("data", data);
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    createAdmin(formData)
      .unwrap()
      .then(() => {
        message.success("Admin created successfully");
        setSuccess(true);
      })
      .catch((err) => {
        message.error("Admin created failed!");
        setSuccess(false);
      })
      .finally(() => {
        message.destroy(key);
      });
  };
  return (
    <div
      className="flex justify-center items-center border-[1px] border-solid border-slate-300 p-3 lg:p-5"
      style={{
        minHeight: "100vh",
      }}
    >
      <div>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(createAdminSchema)}
          formKey="createAdmin"
        >
          <div className="my-3">
            <FormInput
              name="admin.firstName"
              type="text"
              size="large"
              label="First Name"
              placeholder="Tanvir"
              required
            />
          </div>
          <div
            className="my-3"
            style={{
              margin: "15px 0px",
            }}
          >
            <FormInput
              name="admin.middleName"
              type="text"
              size="large"
              label="Middle Name"
              placeholder="Siddik"
            />
          </div>
          <div
            className="my-3"
            style={{
              margin: "15px 0px",
            }}
          >
            <FormInput
              name="admin.lastName"
              type="text"
              size="large"
              label="Last Name"
              placeholder="Abir"
              required
            />
          </div>
          <div
            className="my-3"
            style={{
              margin: "15px 0px",
            }}
          >
            <FormSelectField
              size="large"
              name="admin.gender"
              options={genderOptions}
              label="Gender"
              placeholder="Select"
              required
            />
          </div>
          <div
            className="my-3"
            style={{
              margin: "15px 0px",
            }}
          >
            <FormInput
              name="admin.contactNum"
              type="text"
              size="large"
              label="Contact Number"
              placeholder="01716757672"
              required
            />
          </div>
          <div
            className="my-3"
            style={{
              margin: "15px 0px",
            }}
          >
            <FormInput
              name="admin.address"
              type="text"
              size="large"
              label="Address"
              placeholder="9/ Tejgaoh Dhaka"
              required
            />
          </div>
          <div
            className="my-3"
            style={{
              margin: "15px 0px",
            }}
          >
            <FormInput
              name="email"
              type="email"
              size="large"
              label="Admin Email"
              placeholder="admin@gmail.com"
              required
            />
          </div>
          <div
            className="my-3"
            style={{
              margin: "15px 0px",
            }}
          >
            <FormInput
              name="password"
              type="password"
              size="large"
              label="Password"
              required
            />
          </div>
          <div
            className="my-3"
            style={{
              margin: "15px 0px",
            }}
          >
            <FormInput
              name="confPassword"
              type="password"
              size="large"
              label="Confirm Password"
              required
            />
          </div>
          <div className="my-3">
            <UploadImage name="file" />
          </div>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateAdmin;
