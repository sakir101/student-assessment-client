"use client";

import { useGetInterestQuery } from "@/redux/api/interestApi";
import { Button, Select } from "antd";
import { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
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
  "list",
  "link",
  "color",
  "background",
  "align",
];

const RelatedWorksCreate = () => {
  const [skillSelect, setSkillSelect] = useState(false);
  const [english, setEnglish] = useState(true);
  const [bangla, setBangla] = useState(false);
  const [interests, setInterests] = useState<string>("");

  const { data: interestData, isLoading } = useGetInterestQuery({
    refetchOnMountOrArgChange: true,
  });

  const newInterestData = interestData?.interest;
  const interestOptions = newInterestData?.map((interest) => {
    return {
      label: interest?.title,
      value: interest?.title,
    };
  });

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

  return (
    <div>
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Add your skill related work
      </h1>
      <div className="flex-col justify-center mx-auto items-center my-10 w-full h-full text-center">
        <Select
          defaultValue="Set Working Field"
          className="w-full lg:w-1/2 mr-3"
          onChange={handleChange}
          options={interestOptions}
          allowClear
        />
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
