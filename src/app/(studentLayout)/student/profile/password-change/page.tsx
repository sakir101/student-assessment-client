"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { getUserInfo } from "@/services/auth.service";
import { SubmitHandler } from "react-hook-form";
import { Button, message } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { passUpdSchema } from "@/schemas/passwordUpdate";
import { usePasswordUpdateMutation } from "@/redux/api/authApi";

type FormValues = {
  currentPass: string;
  newPass: string;
  confNewPass: string;
};

const PasswordChangeStudent = () => {
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
    <div>
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Update password
      </h1>

      <div className="flex justify-center margin-auto my-4">
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
      </div>
    </div>
  );
};

export default PasswordChangeStudent;
