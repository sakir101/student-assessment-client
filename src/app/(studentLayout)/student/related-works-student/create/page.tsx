"use client";

import { Button, Select, message } from "antd";
import { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import "../../../../../components/QuillCss/page.css";
import { formats, modules } from "@/components/ui/QuillModuleFormat";
import { useAssignRelatedWorksMutation } from "@/redux/api/relatedWorksStudentApi";
import { getUserInfo } from "@/services/auth.service";
import { useDebounced } from "@/redux/hooks";
import { useGetAssignSkillQuery } from "@/redux/api/studentApi";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const RelatedWorksCreate = () => {
  const query: Record<string, any> = {};

  const [skillSelect, setSkillSelect] = useState(false);
  const [english, setEnglish] = useState(true);
  const [bangla, setBangla] = useState(false);
  const [interests, setInterests] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isError, setError] = useState<string>("");
  const [isErrorOption, setErrorOption] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { userId } = getUserInfo() as any;
  const [size, setSize] = useState<number>(100);

  query["size"] = size;

  query["searchTerm"] = searchTerm;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading, refetch } = useGetAssignSkillQuery(
    {
      id: userId,
      arg: query,
    },
    { refetchOnMountOrArgChange: true }
  );

  const interestData = data?.skill;

  const interestOptions = interestData?.map((interest: any) => {
    return {
      label: interest?.title,
      value: interest?.id,
    };
  });

  const [assignRelatedWorks] = useAssignRelatedWorksMutation();

  const onSelect = () => {
    setSkillSelect(!skillSelect);
  };

  const selectLanguageEnglish = () => {
    setEnglish(true);
    setBangla(false);
  };

  const selectLanguageBangla = () => {
    setBangla(true);
    setEnglish(false);
  };

  const handleChange = (value: string) => {
    setInterests(value);
  };

  const onSubmit = async () => {
    if (interests === undefined || interests === "") {
      setErrorOption("Set work field first");
      return;
    }

    if (description.length < 100) {
      setError("Required, Add description minimum length 100 characters");
      return;
    }

    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    const data = {
      description,
    };

    try {
      assignRelatedWorks({ data, id: userId, interestId: interests })
        .unwrap()
        .then(() => {
          message.success("Work detail added successfully");
        })
        .catch((err) => {
          message.error("Failed to add work detail");
        })
        .finally(() => {
          message.destroy(key);
          setInterests("");
          setDescription("");
          setError("");
          setErrorOption("");
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Add your skill related work
      </h1>
      <div className="flex flex-col justify-center mx-auto items-center my-10 w-full">
        <div className="w-full flex justify-center">
          <div className="w-4/5 lg:w-1/4 ">
            <Select
              defaultValue="Set Working Field"
              className="w-full mr-3"
              onChange={handleChange}
              options={interestOptions}
              allowClear
            />
            {isErrorOption && <p className="text-red-500">{isErrorOption}</p>}
          </div>
        </div>

        <div className="w-4/5 lg:w-1/2 my-3">
          <div
            className="p-3 bg-slate-300 shadow-md shadow-slate-600 rounded-md form-group  row w-full"
            style={{ margin: "15px 0px" }}
          >
            <label className="font-weight-bold">
              {" "}
              Description <span className="required"> * </span>{" "}
            </label>
            <ReactQuill
              value={description}
              onChange={setDescription}
              modules={modules}
              formats={formats}
              placeholder={"Write Description..."}
            />
            {isError && <p className="text-red-500">{isError}</p>}
          </div>
        </div>
        <div className="flex justify-center">
          <button className="btn btn-primary" onClick={() => onSubmit()}>
            Submit
          </button>
        </div>
      </div>
      <div>
        <button
          className="border-none bg-transparent mx-5 text-lg font-semibold text-red-500 cursor-pointer hover:text-red-800"
          onClick={onSelect}
        >
          <InfoCircleOutlined /> About Interest Select
        </button>

        <div>
          {skillSelect ? (
            <div className="my-5">
              <div className="flex justify-center items-center text-center mx-auto">
                <Button
                  className="btn bg-blue-600 btn-sm text-white"
                  onClick={selectLanguageEnglish}
                >
                  English
                </Button>
                <Button
                  className="btn bg-green-600 btn-sm text-white ms-4"
                  onClick={selectLanguageBangla}
                >
                  Bangla
                </Button>
              </div>
              {english ? (
                <div className="my-4">
                  <p className="text-center text-lg font-medium">
                    Why you chose select
                  </p>
                </div>
              ) : (
                <div className="my-4">
                  <p className="text-center text-lg font-medium">
                    কেন তুমি তমার ইন্তেরেস্ত সিলেক্ট করবা
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedWorksCreate;
