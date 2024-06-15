"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import UploadImage from "@/components/ui/UploadImage";
import { useSubFieldCreateMutation } from "@/redux/api/subFieldApi";
import { useAppDispatch } from "@/redux/hooks";
import { setImageUrl } from "@/redux/slice/imageSlice";
import { getUserInfo } from "@/services/auth.service";
import { Button, message } from "antd";

const CreateSubField = () => {
  const { userId } = getUserInfo() as any;
  const dispatch = useAppDispatch();
  const [subFieldCreate, { isSuccess, isError: err, isLoading }] =
    useSubFieldCreateMutation();

  const addDetails = async (values: any) => {
    dispatch(setImageUrl(""));
    const obj = { ...values };
    let file = obj["file"];
    delete obj["file"];

    const subFieldData = {
      subField: {
        title: obj.title,
        desc: obj.desc,
      },
    };
    const data = JSON.stringify(subFieldData);

    const formData = new FormData();

    formData.append("file", file as Blob);
    formData.append("data", data);
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    try {
      subFieldCreate({ data: formData })
        .unwrap()
        .then(() => {
          message.success("SubField added successfully");
        })
        .catch((err) => {
          message.error("Failed to add subField");
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
          Create Sub Field
        </h1>
        <div>
          <Form submitHandler={addDetails} formKey="createSubField">
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md my-3">
              <FormInput
                name="title"
                type="text"
                size="large"
                label="Title"
                required
              />
            </div>

            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md my-3">
              <FormTextArea name="desc" label="Description" required />
            </div>
            <div className="w-full flex justify-center">
              <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md mb-4 w-min">
                <UploadImage name="file" />
              </div>
            </div>
            <div className="w-full flex justify-center">
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

export default CreateSubField;
