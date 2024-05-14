"use client";

import { Button, Col, Row, message } from "antd";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import FormSelectField from "../Forms/FormSelectField";
import { genderOptions } from "@/constant/global";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupStudentSchema } from "@/schemas/signup";
import UploadImage from "../ui/UploadImage";
import { useSignUpStudentMutation } from "@/redux/api/studentApi";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setImageUrl } from "@/redux/slice/imageSlice";

const SignUpStudent = () => {
  const dispatch = useAppDispatch();
  const [success, setSuccess] = useState(false);
  const [signUpStudent, { isSuccess, isError, isLoading }] =
    useSignUpStudentMutation();
  const [validation, setValidation] = useState(false);

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

    signUpStudent(formData)
      .unwrap()
      .then(() => {
        message.success("Check your email");
        setValidation(false);
        setSuccess(true);
      })
      .catch((err) => {
        message.error(
          "User Registration Failed! You must provide appropriate university name and email"
        );
        setSuccess(false);
        setValidation(true);
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
          <p className="text-red-500 text-xl text-center">
            Check your email for creating account
          </p>
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
            resolver={yupResolver(signupStudentSchema)}
            formKey="signupStudent"
          >
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md">
              <FormInput
                name="student.firstName"
                type="text"
                size="large"
                label="First Name"
                placeholder="Sabbir"
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
                name="student.middleName"
                type="text"
                size="large"
                label="Middle Name"
                placeholder="Ahmed"
              />
            </div>
            <div
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md"
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="student.lastName"
                type="text"
                size="large"
                label="Last Name"
                placeholder="Niloy"
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
                name="student.studentId"
                type="text"
                size="large"
                label="Student ID"
                placeholder="203-15-3862"
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
                name="student.gender"
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
                name="student.institution"
                type="text"
                size="large"
                label="University Name"
                placeholder="Daffodil International University"
                required
              />
            </div>
            {validation ? (
              <p className="text-red-500 text-xl">
                Must provide appropriate university name
              </p>
            ) : (
              <p></p>
            )}
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
                label="Student Email"
                placeholder="sabbir15-3862@diu.edu.bd"
                required
              />
            </div>
            {validation ? (
              <p className="text-red-500 text-xl">
                Must provide appropriate email
              </p>
            ) : (
              <p></p>
            )}
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

export default SignUpStudent;
