"use client";

import {
  useGetSingleSuperAdminQuery,
  useUpdateSuperAdminProfileMutation,
} from "@/redux/api/superAdmin";
import { useAppDispatch } from "@/redux/hooks";
import { setImageUrl } from "@/redux/slice/imageSlice";
import { getUserInfo } from "@/services/auth.service";
import { Button, message } from "antd";
import FormUpdate from "../Forms/FormUpdate";
import UploadImage from "../ui/UploadImage";
import Image from "next/image";
import FormInput from "../Forms/FormInput";
import FormSelectField from "../Forms/FormSelectField";
import { genderOptions } from "@/constant/global";

const UpdateProfileSuperAdmin = () => {
  const { userId } = getUserInfo() as any;
  const dispatch = useAppDispatch();

  const [updateSuperAdminProfile] = useUpdateSuperAdminProfileMutation();

  const { data, isLoading, refetch } = useGetSingleSuperAdminQuery(
    userId,

    { refetchOnMountOrArgChange: true }
  );

  const onSubmit = async (values: any) => {
    dispatch(setImageUrl(""));
    const obj = { ...values };
    let file = obj["file"];
    delete obj["file"];
    const superAdminData = {
      superAdmin: {
        firstName: obj.firstName,
        middleName: obj.middleName,
        lastName: obj.lastName,
        gender: obj.gender,
        superAdminId: obj.superAdminId,
        contactNum: obj.contactNum,
        address: obj.address,
      },
    };
    const data = JSON.stringify(superAdminData);
    const formData = new FormData();

    formData.append("file", file as Blob);
    formData.append("data", data);

    const key = "loadingKey";
    message.loading({ content: "Loading...", key });

    try {
      updateSuperAdminProfile({ data: formData, id: userId })
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
    superAdminId: data?.superAdminId || "",
    contactNum: data?.contactNum || "",
    address: data?.address || "",
  };
  return (
    <div className="border-[1px] border-solid border-slate-300 p-3 lg:p-5">
      <FormUpdate
        submitHandler={onSubmit}
        formKey="updProfileSuperAdmin"
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
            name="superAdminId"
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
            name="contactNum"
            type="text"
            size="large"
            label="Contact Number"
          />
        </div>
        <div className="my-3">
          <FormInput
            name="address"
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

export default UpdateProfileSuperAdmin;
