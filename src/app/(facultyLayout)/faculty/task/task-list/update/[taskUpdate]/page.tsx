"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getUserInfo } from "@/services/auth.service";
import {
  useDeleteTaskHintMutation,
  useGetSingleSpecificFacultyTaskQuery,
  useGetSingleTaskHintQuery,
  useTaskHintCreateMutation,
  useUpdateSingleFacultyTaskMutation,
  useUpdateSingleTaskHintMutation,
} from "@/redux/api/facultyApi";
import CForm from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import { Button, message, Modal, Form, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "code-block"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "link",
  "color", // Add color option
  "background", // Add background color option
  "align", // Add text alignment option
];

const { confirm } = Modal;
const TaskUpdate = () => {
  const query: Record<string, any> = {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [taskId, setTaskId] = useState<string>("");
  const [hintId, setHintId] = useState<string>("");
  const [form1] = Form.useForm();
  const [form] = Form.useForm();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [description, setDescription] = useState("");
  const [solution, setSolution] = useState("");
  const [formError, setError] = useState<string>("");

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    const match = url.match(/\/([^\/?]+)\?$/);
    const extractId = match ? match[1] : null;
    if (extractId !== null) {
      setTaskId(extractId);
    }
  }, [pathname, searchParams]);

  const { userId: id } = getUserInfo() as any;

  const { data, isLoading, refetch } = useGetSingleSpecificFacultyTaskQuery(
    { id, taskId },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    setDescription(data?.description);
    setSolution(data?.solution);
  }, [data]);

  const { data: hintData } = useGetSingleTaskHintQuery(hintId, {
    refetchOnMountOrArgChange: true,
  });

  const [taskHintCreate] = useTaskHintCreateMutation();

  const [updateSingleFacultyTask, { isSuccess, isError }] =
    useUpdateSingleFacultyTaskMutation();

  const [updateSingleTaskHint] = useUpdateSingleTaskHintMutation();

  const [deleteTaskHint] = useDeleteTaskHintMutation();

  useEffect(() => {
    form1.setFieldsValue({ description: hintData?.description });
  }, [form1, hintData]);

  const updateTask = async (value: any) => {
    if (description.length < 100) {
      setError("Required, Add description minimum length 100 characters");
      return;
    }
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    const data = {
      title: value.title,
      description,
      solution,
    };
    setError("");
    try {
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
    } catch (error) {
      throw error;
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (taskId: any) => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    form
      .validateFields()
      .then((values) => {
        taskHintCreate({ data: values, id, taskId })
          .unwrap()
          .then(() => {
            message.success("Hint added successfully");
          })
          .catch((err) => {
            console.log(err);
            message.error("Failed to add hint");
          })
          .finally(() => {
            message.destroy(key);
          });
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

  const showModal1 = (id: any) => {
    setHintId(id);
    setIsModalOpen1(true);
  };

  const handleOk1 = (hintId: any) => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    form1
      .validateFields()
      .then((values) => {
        updateSingleTaskHint({ data: values, taskId, hintId })
          .unwrap()
          .then(() => {
            message.success("Hint updated successfully");
          })
          .catch((err) => {
            message.error("Failed to update hint");
          })
          .finally(() => {
            message.destroy(key);
          });
        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const showModal2 = async (id: string) => {
    setIsModalOpen2(true);
    confirm({
      title: "Are you sure delete this hint?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleOk2(id);
      },
      onCancel() {
        handleClose2();
      },
    });
  };
  const handleOk2 = async (hintId: string) => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    try {
      await deleteTaskHint({ taskId, hintId });
      refetch();
      setIsModalOpen(false);
      message.destroy(key);
      message.success("Hint Deleted successfully");
    } catch (err: any) {
      //   console.error(err.message);
      setIsModalOpen2(false);
      message.destroy(key);
      message.error(err.message);
    }
  };

  const handleClose2 = () => {
    setIsModalOpen2(false);
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
          <form onSubmit={handleSubmit(updateTask)}>
            <div className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md">
              <label className="font-weight-bold"> Title</label>
              <br />
              <input
                className="input input-bordered w-full h-10"
                type="text"
                defaultValue={data?.title}
                disabled
              />
            </div>
            <div
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md form-group  row"
              style={{ margin: "15px 0px" }}
            >
              <label className="font-weight-bold">Description</label>
              <ReactQuill
                className="bg-white rounded-md"
                value={description}
                onChange={setDescription}
                modules={modules}
                formats={formats}
                placeholder={"Write something awesome..."}
              />
              {formError && <p className="text-red-500">{formError}</p>}
            </div>
            <div
              className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md form-group  row"
              style={{ margin: "15px 0px" }}
            >
              <label className="font-weight-bold">Solution</label>
              <ReactQuill
                className="bg-white rounded-md"
                value={solution}
                onChange={setSolution}
                modules={modules}
                formats={formats}
                placeholder={"Write something awesome..."}
              />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
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
                    <span>{hintItem?.description}</span>
                  </p>
                  <div className="flex justify-center items-center mt-3">
                    <Button
                      type="primary"
                      onClick={() => showModal1(hintItem?.id)}
                      style={{ marginRight: 10 }}
                    >
                      <EditOutlined />
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={() => showModal2(hintItem?.id)}
                    >
                      <DeleteOutlined />
                    </Button>
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
      <Modal
        title="Hint Update"
        visible={isModalOpen1}
        okText="Update"
        onOk={() => handleOk1(hintId)}
        onCancel={handleCancel1}
      >
        <Form form={form1} layout="vertical">
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
