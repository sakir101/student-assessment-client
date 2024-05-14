"use client";

import { Switch, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import dynamic from "next/dynamic";
import { getUserInfo } from "@/services/auth.service";
import {
  useDeleteRelatedWorksFacultyMutation,
  useUpdateRelatedWorksDescFacultyMutation,
} from "@/redux/api/relatedWorksFacultyApi";
import "../../components/QuillCss/page.css";
import { formats, modules } from "../ui/QuillModuleFormat";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const { confirm } = Modal;

interface RelatedWorksProps {
  interestId: string;
  description: string;
  title: string;
  onDeleteSuccess: () => void;
  onUpdateSuccess: () => void;
}

const RelatedWorksFaculty: React.FC<RelatedWorksProps> = ({
  interestId,
  description,
  title,
  onDeleteSuccess,
  onUpdateSuccess,
}) => {
  const [check, setCheck] = useState(false);
  const [workDescription, setWorkDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = getUserInfo() as any;

  useEffect(() => {
    setWorkDescription(description);
  }, [description]);

  const onChange = (checked: boolean) => {
    setCheck(checked);
  };

  const [deleteRelatedWorksFaculty] = useDeleteRelatedWorksFacultyMutation();

  const [updateRelatedWorksDescFaculty] =
    useUpdateRelatedWorksDescFacultyMutation();

  const onUpdate = async () => {
    if (workDescription.length < 100) {
      setError("Required, Add description minimum length 100 characters");
      return;
    }
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    const data = {
      description: workDescription,
    };

    try {
      updateRelatedWorksDescFaculty({ data, id: userId, interestId })
        .unwrap()
        .then(() => {
          message.success("Work updated successfully");
          onUpdateSuccess();
        })
        .catch((err) => {
          message.error("Failed to update work detail");
        })
        .finally(() => {
          message.destroy(key);
          setError("");
        });
    } catch (error) {
      throw error;
    }
  };

  const showModal = async (id: string) => {
    setIsModalOpen(true);
    confirm({
      title: `Delete`,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      content: (
        <p>
          Are you sure you want to delete{" "}
          <span className="font-bold">{title}</span> from your work?
        </p>
      ),
      onOk() {
        handleOk(id);
      },
      onCancel() {
        handleClose();
      },
    });
  };

  const handleOk = async (intId: string) => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    try {
      const { userId: id } = getUserInfo() as any;
      await deleteRelatedWorksFaculty({ id: userId, interestId: intId });
      setIsModalOpen(false);

      message.destroy(key);
      message.success("Work Deleted successfully");
      onDeleteSuccess();
    } catch (err: any) {
      setIsModalOpen(false);
      message.destroy(key);
      message.error("Work deleted failed");
    }
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-center items-center my-2">
        <div>
          <Switch
            defaultChecked={false}
            onChange={onChange}
            checkedChildren="View"
            unCheckedChildren="Edit"
          />
        </div>
        <div>
          <button
            className="btn btn-sm bg-red-600 ms-4"
            onClick={() => showModal(interestId)}
          >
            Delete
          </button>
        </div>
      </div>
      <div>
        {check ? (
          <div>
            <ReactQuill
              value={workDescription}
              onChange={setWorkDescription}
              modules={modules}
              formats={formats}
              placeholder={"Write Feedback"}
              theme={"snow"}
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-center">
              <button
                className="btn btn-sm bg-blue-300  hover:to-blue-600 border-blue-300 my-3"
                onClick={() => onUpdate()}
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <ReactQuill value={description} readOnly={true} theme={"bubble"} />
        )}
      </div>
    </div>
  );
};

export default RelatedWorksFaculty;
