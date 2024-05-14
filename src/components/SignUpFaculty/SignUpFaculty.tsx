"use client";

import { Button, message } from "antd";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import FormSelectField from "../Forms/FormSelectField";
import UploadImage from "../ui/UploadImage";
import { yupResolver } from "@hookform/resolvers/yup";
import { genderOptions } from "@/constant/global";
import { signupFacultySchema } from "@/schemas/signup";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { setImageUrl } from "@/redux/slice/imageSlice";
import { useSignUpFacultyMutation } from "@/redux/api/facultyApi";

const SignUpFaculty = () => {
  const dispatch = useAppDispatch();
  const [success, setSuccess] = useState(false);
  const [signUpFaculty, { isSuccess, isError, isLoading }] =
    useSignUpFacultyMutation();

  const onSubmit = async (values: any) => {
    dispatch(setImageUrl(""));
    const obj = { ...values };
    delete obj["confPassword"];
    let file = obj["file"];
    delete obj["file"];

    const data = JSON.stringify(obj);
    console.log(data);
    const formData = new FormData();

    formData.append("file", file as Blob);
    formData.append("data", data);
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    signUpFaculty(formData)
      .unwrap()
      .then(() => {
        message.success("Please wait some days");
        setSuccess(true);
      })
      .catch((err) => {
        message.error("User Registration Failed!");
        setSuccess(false);
      })
      .finally(() => {
        message.destroy(key);
      });
  };
  return (
    <div
      className="flex justify-center items-center p-5"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="my-5">
        {success === true ? (
          <div>
            <p className="text-blue-500 text-xl text-center">
              Thank you for registration
            </p>
            <p className="text-blue-500 text-xl text-center font-bold">
              We will send you email when verification complete
            </p>
          </div>
        ) : (
          <p></p>
        )}
        <h1
          className="text-center"
          style={{
            margin: "15px 0px",
            color: "#CC9DF1",
          }}
        >
          Create your account
        </h1>
        <div>
          <Form
            submitHandler={onSubmit}
            resolver={yupResolver(signupFacultySchema)}
            formKey="signupFaculty"
          >
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md">
              <FormInput
                name="faculty.firstName"
                type="text"
                size="large"
                label="First Name"
                placeholder="Amit"
                required
              />
            </div>
            <div
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md"
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="faculty.middleName"
                type="text"
                size="large"
                label="Middle Name"
                placeholder="Chakraborty"
              />
            </div>
            <div
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md"
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="faculty.lastName"
                type="text"
                size="large"
                label="Last Name"
                placeholder="Chhoton"
                required
              />
            </div>
            <div
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md"
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="faculty.facultyId"
                type="text"
                size="large"
                label="Employee ID"
                placeholder="710702346"
                required
              />
            </div>
            <div
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md"
              style={{
                margin: "15px 0px",
              }}
            >
              <FormSelectField
                size="large"
                name="faculty.gender"
                options={genderOptions}
                label="Gender"
                placeholder="Select"
                required
              />
            </div>
            <div
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md"
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="faculty.institution"
                type="text"
                size="large"
                label="University Name"
                placeholder="Daffodil International University"
                required
              />
            </div>
            <div
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md"
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="faculty.contactNum"
                type="text"
                size="large"
                label="Contact Number"
                placeholder="01716757672"
                required
              />
            </div>
            <div
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md"
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="email"
                type="email"
                size="large"
                label="Faculty Email"
                placeholder="amit.cse@diu.edu.bd"
                required
              />
            </div>
            <div
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md"
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
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md"
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
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md mb-4">
              <UploadImage name="file" />
            </div>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpFaculty;
