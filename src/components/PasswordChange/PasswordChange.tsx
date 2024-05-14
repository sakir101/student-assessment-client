"use client";

import { usePasswordUpdateMutation } from "@/redux/api/authApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import Form from "../Forms/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passUpdSchema } from "@/schemas/passwordUpdate";
import FormInput from "../Forms/FormInput";

type FormValues = {
  currentPass: string;
  newPass: string;
  confNewPass: string;
};

const PasswordChange = () => {
  const { userId } = getUserInfo() as any;

  const [passwordUpdate] = usePasswordUpdateMutation();

  const onSubmit: SubmitHandler<FormValues> = async (formData: any) => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    const data = {
      currentPass: formData.currentPass,
      newPass: formData.newPass,
    };

    try {
      passwordUpdate({ id: userId, data })
        .unwrap()
        .then(() => {
          message.success("Password updated successfully");
        })
        .catch((err) => {
          message.error("Current password must be correct");
        })
        .finally(() => {
          message.destroy(key);
        });
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="border-[1px] border-solid border-slate-300 p-10">
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(passUpdSchema)}
        formKey="updPass"
      >
        <div
          style={{
            margin: "15px 0px",
          }}
        >
          <FormInput
            name="currentPass"
            type="password"
            size="large"
            label="Current Password"
          />
        </div>
        <div
          style={{
            margin: "15px 0px",
          }}
        >
          <FormInput
            name="newPass"
            type="password"
            size="large"
            label="New Password"
          />
        </div>
        <div
          style={{
            margin: "15px 0px",
          }}
        >
          <FormInput
            name="confNewPass"
            type="password"
            size="large"
            label="Confirm New Password"
          />
        </div>

        <div className="flex justify-center">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PasswordChange;
