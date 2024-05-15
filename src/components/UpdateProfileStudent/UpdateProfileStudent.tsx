"use client";

import { getUserInfo } from "@/services/auth.service";
import { Button, message } from "antd";
import FormInput from "../Forms/FormInput";
import UploadImage from "../ui/UploadImage";
import FormSelectField from "../Forms/FormSelectField";
import { genderOptions } from "@/constant/global";
import {
  useGetSingleStudentQuery,
  useUpdateStudentProfileMutation,
} from "@/redux/api/studentApi";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { setImageUrl } from "@/redux/slice/imageSlice";
import FormUpdate from "../Forms/FormUpdate";

const UpdateProfileStudent = () => {
  const { userId } = getUserInfo() as any;
  const dispatch = useAppDispatch();

  const [updateStudentProfile] = useUpdateStudentProfileMutation();

  const { data, isLoading, refetch } = useGetSingleStudentQuery(
    userId,

    { refetchOnMountOrArgChange: true }
  );

  const onSubmit = async (values: any) => {
    dispatch(setImageUrl(""));
    const obj = { ...values };
    let file = obj["file"];
    delete obj["file"];
    const studentData = {
      student: {
        firstName: obj.firstName,
        middleName: obj.middleName,
        lastName: obj.lastName,
        gender: obj.gender,
        studentId: obj.studentId,
      },
    };
    const data = JSON.stringify(studentData);
    const formData = new FormData();

    formData.append("file", file as Blob);
    formData.append("data", data);
    console.log(formData);
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    try {
      updateStudentProfile({ data: formData, id: userId })
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
    studentId: data?.studentId || "",
    gender: data?.gender || "",
  };

  return (
    <div className="border-[1px] border-solid border-slate-300 p-3 lg:p-5">
      <FormUpdate
        submitHandler={onSubmit}
        formKey="updProfileStudent"
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
            name="studentId"
            type="text"
            size="large"
            label="Student ID"
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

        <div className="flex justify-center my-3">
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </div>
      </FormUpdate>
    </div>
  );
};

export default UpdateProfileStudent;
