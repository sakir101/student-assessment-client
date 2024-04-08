"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getUserInfo } from "@/services/auth.service";
import {
  useGetSingleSpecificFacultyTaskQuery,
  useUpdateSingleFacultyTaskMutation,
} from "@/redux/api/facultyApi";
import CForm from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import { Button, message, Modal, Form, Input } from "antd";

const TaskUpdate = () => {
  const query: Record<string, any> = {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskId, setTaskId] = useState<string>("");

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    const match = url.match(/\/([^\/?]+)\?$/);
    const extractId = match ? match[1] : null;
    if (extractId !== null) {
      setTaskId(extractId);
    }
  }, [pathname, searchParams]);

  const [form] = Form.useForm();

  const { userId: id } = getUserInfo() as any;

  const { data, isLoading, refetch } = useGetSingleSpecificFacultyTaskQuery(
    { id, taskId },
    { refetchOnMountOrArgChange: true }
  );

  const [updateSingleFacultyTask, { isSuccess, isError }] =
    useUpdateSingleFacultyTaskMutation();

  const updateTask = async (data: any) => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    updateSingleFacultyTask({ data, id, taskId })
      .unwrap()
      .then(() => {
        message.success("Task updated successfully");
      })
      .catch((err) => {
        message.error("Failed to update task");
      })
      .finally(() => {
        message.destroy(key);
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (taskId: any) => {
    console.log(taskId);
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values);
        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const defaultValues = {
    title: data?.title,
    description: data?.description,
    solution: data?.solution || "",
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
          Update your task
        </h1>
        <div>
          <CForm submitHandler={updateTask} defaultValues={defaultValues}>
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
                Update
              </Button>
            </div>
          </CForm>
        </div>
        <div className="border-solid border-2  border-slate-500 p-5 my-4">
          <h1 className="text-center text-xl text-blue-500 font-semibold">
            Hint Section
          </h1>
          <div className="mb-4">
            {data?.hint?.length > 0 &&
              data.hint.map((hintItem: any, index: number) => (
                <div key={index} className="p-3 bg-slate-300 rounded-md mb-2">
                  <p>
                    <span>Hint {index + 1}: </span>
                    <span>{hintItem}</span>
                  </p>
                  <div>
                    <button>Update</button>
                    <button>Delete</button>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center items-center">
            <Button type="primary" onClick={() => showModal()}>
              Add Hint
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title="Add Hint"
        visible={isModalOpen}
        okText="Add"
        onOk={() => handleOk(data?.id)}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Hint"
            name="description"
            rules={[
              { required: true, message: "Please enter the hint description" },
            ]}
          >
            <Input.TextArea rows={7} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskUpdate;
