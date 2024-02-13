"use client";

import Form from "@/components/Forms/Form";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";

import { useGetInterestQuery } from "@/redux/api/interestApi";
import { Button, message } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAssignInterestMutation } from "@/redux/api/interestStudentApi";
import { getUserInfo } from "@/services/auth.service";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";

const InterestCreate = () => {
  const [interestSelect, setInterestSelect] = useState(false);
  const [english, setEnglish] = useState(true);
  const [bangla, setBangla] = useState(false);
  const { data, isLoading } = useGetInterestQuery(
    { limit: 10, page: 1 },
    { refetchOnMountOrArgChange: true }
  );
  const [assignInterest, { isSuccess, isError }] = useAssignInterestMutation();

  const interests = data?.interest;
  const interestOptions = interests?.map((interest) => {
    return {
      label: interest?.title,
      value: interest?.id,
    };
  });
  const onSelect = () => {
    setInterestSelect(!interestSelect);
  };

  const selectLanguageEnglish = () => {
    setEnglish(true);
    setBangla(false);
  };

  const selectLanguageBangla = () => {
    setBangla(true);
    setEnglish(false);
  };
  const onSubmit = async (data: any) => {
    console.log(data);
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    const { userId } = getUserInfo() as any;

    assignInterest({ data, id: userId })
      .unwrap()
      .then(() => {
        message.success("Successfully Interest Added");
      })
      .catch((err) => {
        message.error("Failed to Add Interest");
      })
      .finally(() => {
        message.destroy(key);
      });
  };
  return (
    <div>
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Add your Interest
      </h1>
      <div className="flex-col justify-center mx-auto items-center my-10 w-full h-full text-center">
        <Form submitHandler={onSubmit}>
          <div style={{ margin: "10px 0px" }}>
            <FormMultiSelectField
              options={interestOptions as SelectOptions[]}
              name="interest"
              placeholder="Select Interest"
            />
          </div>
          <div className="flex-col justify-center mx-auto items-center my-4 text-center">
            <Button type="primary" htmlType="submit" className="w-1/4">
              Submit
            </Button>
          </div>
        </Form>
      </div>
      <div>
        <button
          className="border-none bg-transparent mx-5 text-lg font-semibold text-red-500 cursor-pointer hover:text-red-800"
          onClick={onSelect}
        >
          <InfoCircleOutlined /> About Interest Select
        </button>

        <div>
          {interestSelect ? (
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

export default InterestCreate;
