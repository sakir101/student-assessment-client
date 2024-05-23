"use client";

import { getUserInfo } from "@/services/auth.service";
import { Button, message } from "antd";
import FormInput from "../Forms/FormInput";
import UploadImage from "../ui/UploadImage";
import FormSelectField from "../Forms/FormSelectField";
import { genderOptions } from "@/constant/global";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { setImageUrl } from "@/redux/slice/imageSlice";
import FormUpdate from "../Forms/FormUpdate";
import {
  useGetSingleFacultyQuery,
  useUpdateFacultyProfileMutation,
} from "@/redux/api/facultyApi";

const UpdateProfileFaculty = () => {
  const { userId } = getUserInfo() as any;
  const dispatch = useAppDispatch();

  const [updateFacultyProfile] = useUpdateFacultyProfileMutation();

  const { data, isLoading, refetch } = useGetSingleFacultyQuery(
    userId,

    { refetchOnMountOrArgChange: true }
  );

  console.log(data);

  const onSubmit = async (values: any) => {
    dispatch(setImageUrl(""));
    const obj = { ...values };
    let file = obj["file"];
    delete obj["file"];
    const facultyData = {
      faculty: {
        firstName: obj.firstName,
        middleName: obj.middleName,
        lastName: obj.lastName,
        gender: obj.gender,
        facultyId: obj.facultyId,
        institution: obj.institution,
        contactNum: obj.contactNum,
      },
    };
    const data = JSON.stringify(facultyData);
    const formData = new FormData();

    formData.append("file", file as Blob);
    formData.append("data", data);

    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    try {
      updateFacultyProfile({ data: formData, id: userId })
        .unwrap()
        .then(() => {
          refetch();
          message.success("Profile updated successfully");
        })
        .catch((err) => {
          message.error("Profile updated failed");
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
    firstName: data?.firstName || "",
    middleName: data?.middleName || "",
    lastName: data?.lastName || "",
    gender: data?.gender || "",
    facultyId: data?.facultyId || "",
    institution: data?.institution || "",
    contactNum: data?.contactNum || "",
  };

  return (
    <div className="border-[1px] border-solid border-slate-300 p-3 lg:p-5">
      <FormUpdate
        submitHandler={onSubmit}
        formKey="updProfileFaculty"
        defaultValues={defaultValues}
      >
        <div className="w-full flex justify-center items-center mx-auto text-center">
          <div className="">
            <UploadImage name="file" />
          </div>
          <div>
            <div className="avatar">
              <div className="w-20 lg:w-24">
                <Image
                  src={data?.profileImage}
                  width={100}
                  height={100}
                  layout="fixed"
                  alt="Profile Image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="my-3">
          <FormInput
            name="firstName"
            type="text"
            size="large"
            label="First Name"
          />
        </div>
        <div className="my-3">
          <FormInput
            name="middleName"
            type="text"
            size="large"
            label="Middle Name"
          />
        </div>
        <div className="my-3">
          <FormInput
            name="lastName"
            type="text"
            size="large"
            label="Last Name"
          />
        </div>
        <div className="my-3">
          <FormInput
            name="facultyId"
            type="text"
            size="large"
            label="Faculty ID"
          />
        </div>
        <div className="w-4/5 lg:w-full ">
          <FormSelectField
            size="large"
            name="gender"
            options={genderOptions}
            label="Gender"
            placeholder="Select"
          />
        </div>
        <div className="my-3">
          <FormInput
            name="institution"
            type="text"
            size="large"
            label="Institution"
          />
        </div>
        <div className="my-3">
          <FormInput
            name="contactNum"
            type="text"
            size="large"
            label="Contact Number"
          />
        </div>

        <div className="flex justify-center my-3">
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </div>
      </FormUpdate>
    </div>
  );
};

export default UpdateProfileFaculty;
