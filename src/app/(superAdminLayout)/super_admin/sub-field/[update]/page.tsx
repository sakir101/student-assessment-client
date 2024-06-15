"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormUpdate from "@/components/Forms/FormUpdate";
import UploadImage from "@/components/ui/UploadImage";
import {
  useGetSingleSubFieldQuery,
  useUpdateSubFieldMutation,
} from "@/redux/api/subFieldApi";
import { useAppDispatch } from "@/redux/hooks";
import { setImageUrl } from "@/redux/slice/imageSlice";
import { Button, message } from "antd";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdateSubField = () => {
  const [subFieldId, setSubFieldId] = useState<string>("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    const match = url.match(/\/([^\/?]+)\?$/);
    const extractId = match ? match[1] : null;
    if (extractId !== null) {
      setSubFieldId(extractId);
    }
  }, [pathname, searchParams]);

  const { data, isLoading, refetch } = useGetSingleSubFieldQuery(subFieldId, {
    refetchOnMountOrArgChange: true,
  });

  const [updateSubField] = useUpdateSubFieldMutation();

  const addDetails = async (values: any) => {
    console.log(values);
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
      updateSubField({ data: formData, id: subFieldId })
        .unwrap()
        .then(() => {
          message.success("SubField updated successfully");
        })
        .catch((err) => {
          message.error("Failed to update subField");
        })
        .finally(() => {
          message.destroy(key);
        });
    } catch (error) {
      throw error;
    }
  };

  // @ts-ignore
  const defaultValues = {
    title: data?.title || "",
    desc: data?.desc || "",
  };

  return (
    <div className="p-3 lg:p-5">
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Update Sub Field
      </h1>
      <div>
        {defaultValues.title && defaultValues.desc ? (
          <FormUpdate
            submitHandler={addDetails}
            formKey="updateSubField"
            defaultValues={defaultValues}
          >
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
            <div className="w-full flex justify-center items-center mx-auto text-center">
              <div className="">
                <UploadImage name="file" />
              </div>
              <div>
                <div className="avatar">
                  <div className="w-20 lg:w-24">
                    <Image
                      src={data?.img}
                      width={100}
                      height={100}
                      layout="fixed"
                      alt="Profile Image"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </FormUpdate>
        ) : (
          <div>No data available to update</div>
        )}
      </div>
    </div>
  );
};

export default UpdateSubField;
