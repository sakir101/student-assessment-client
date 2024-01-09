"use client";
import React, { useState } from "react";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPasswordSchema } from "@/schemas/forgetPassword";
import { Button, message } from "antd";
import { useForgetPasswordMutation } from "@/redux/api/authApi";

const ForgetPassword = () => {
  const [forgetPassword] = useForgetPasswordMutation();
  const [success, setSuccess] = useState(false);
  const [validation, setValidation] = useState(false);

  const onSubmit = async (data: any) => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    console.log({ ...data });
    forgetPassword({ ...data })
      .unwrap()
      .then(() => {
        message.success("Check your email");
        setValidation(false);
        setSuccess(true);
      })
      .catch((err) => {
        message.error(
          "User email verification Failed! You must provide appropriate email"
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
      className="flex flex-col justify-center items-center p-5"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="my-5">
        {success === true ? (
          <p className="text-red-500 text-xl text-center">
            Check your email for login
          </p>
        ) : (
          <p></p>
        )}
        {validation ? (
          <p className="text-red-500 text-xl">Must provide appropriate email</p>
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
          Forget Password?
        </h1>
        <p className="text-center text-yellow-500 text-lg">Type your email</p>
      </div>
      <div>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(forgetPasswordSchema)}
        >
          <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md">
            <FormInput
              name="email"
              type="email"
              size="large"
              placeholder="Sabbir15-3862@diu.edu.bd"
              required
            />
          </div>
          <div className="flex justify-center items-center mt-4">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
