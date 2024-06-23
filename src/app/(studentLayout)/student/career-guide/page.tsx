"use client";

import { useGetCareerQuery } from "@/redux/api/careerGuideApi";
import { getUserInfo } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";
import Loading from "@/app/loading";
import { useGetSingleStudentQuery } from "@/redux/api/studentApi";
import { useGetMasterFieldQuery } from "@/redux/api/masterFieldApi";
import { useState } from "react";
import { ISubField } from "@/types";

const CareerGuidePage: React.FC = () => {
  const query: Record<string, any> = {};
  const [size, setSize] = useState<number>(100);
  const { userId: id } = getUserInfo() as any;

  query["size"] = size;
  const { data: studentData, isLoading: studentDataIsLoading } =
    useGetSingleStudentQuery(id);
  const { data, isLoading } = useGetCareerQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const {
    data: masterFields,
    isLoading: loadingMasterField,
    refetch,
  } = useGetMasterFieldQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const masterFieldList = masterFields?.masterField;
  const meta = masterFields?.meta;

  // console.log(masterFields);

  const categoryNames: string[] = [
    "CategoryA",
    "CategoryB",
    "CategoryC",
    "CategoryD",
    "CategoryE",
    "CategoryF",
  ];

  // Map the data to the new structure
  const mappedData = {
    class_probabilities: Object.fromEntries(
      Object.entries(data?.class_probabilities || {}).map(
        ([key, value], index) => [
          categoryNames[index],
          Math.round(value as number),
        ]
      )
    ),
  };

  const getTopTwoCategories = (classProbabilities: Record<string, number>) => {
    const classProbabilitiesArray = Object.entries(classProbabilities);
    classProbabilitiesArray.sort((a, b) => b[1] - a[1]);
    const topTwoClassProbabilities = classProbabilitiesArray.slice(0, 2);
    return Object.fromEntries(topTwoClassProbabilities);
  };

  // Assuming mappedData is available and contains class_probabilities
  const topTwoCategories = getTopTwoCategories(mappedData.class_probabilities);

  const primaryCategory = Object.keys(topTwoCategories)[0];
  const secondaryCategory = Object.keys(topTwoCategories)[1];

  let primaryField = null;
  let secondaryField = null;

  // Match the categories with masterFields
  if (masterFieldList && masterFieldList.length > 0) {
    primaryField = masterFieldList.find(
      (field) => field.category === primaryCategory
    );
    secondaryField = masterFieldList.find(
      (field) => field.category === secondaryCategory
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Your Career Guide
      </h1>
      {isLoading ? (
        <Loading />
      ) : Object.keys(data || {}).length ? (
        <div>
          <p className="text-center font-semibold text-lg my-7">
            Hi! <span className="text-blue-700">{studentData?.firstName}</span>{" "}
            system analyzed your data. After analyzing your data it is found
            that
          </p>
          <div className="divider"></div>
          <div>
            <p className="text-center text-blue-600 font-bold text-lg my-7">
              Your primary goal should be
            </p>
            <div className="grid gap-[34px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto mt-5 lg:w-3/4">
              {primaryField?.subFields && primaryField.subFields.length > 0
                ? primaryField.subFields.map(
                    (primaryObj: ISubField, index: number) => (
                      <div
                        key={primaryObj.id}
                        className="card bg-base-100 shadow-xl transition-transform transform hover:scale-110 cursor-pointer"
                      >
                        <figure className="px-10 pt-10">
                          <Image
                            src={primaryObj.img}
                            width={500}
                            height={200}
                            layout="responsive"
                            alt="login image"
                          />
                        </figure>
                        <div className="card-body items-center text-center">
                          <h2 className="card-title">{primaryObj.title}</h2>
                          <p>{primaryObj.desc}</p>
                          <div className="divider"></div>

                          <div>
                            <Link
                              href={`/student/career-guide/job/${primaryObj?.id}`}
                              className="flex justify-center items-center no-underline"
                            >
                              <p className="text-sm text-blue-600 hover:text-blue-800 font-semibold">
                                Go to Job
                              </p>
                              <ArrowRightOutlined className="ms-3 text-sm text-blue-600 hover:text-blue-800 font-semibold" />
                            </Link>
                          </div>
                          <div>
                            <Link
                              href={`/student/career-guide/course/${primaryObj?.id}`}
                              className="flex justify-center items-center no-underline"
                            >
                              <p className="text-sm text-blue-600 hover:text-blue-800 font-semibold">
                                Go to Course
                              </p>
                              <ArrowRightOutlined className="ms-3 text-sm text-blue-600 hover:text-blue-800 font-semibold" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  )
                : "No primary goal found"}
            </div>
            <div className="mt-5 lg:mt-20">
              <p className="text-center text-blue-600 font-bold text-lg my-7">
                Your secondary goal should be
              </p>
              <div className="grid gap-[34px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto mt-5 lg:w-3/4">
                {secondaryField?.subFields &&
                secondaryField.subFields.length > 0
                  ? secondaryField.subFields.map(
                      (secondaryObj: ISubField, index: number) => (
                        <div
                          key={secondaryObj.id}
                          className="card bg-base-100 shadow-xl transition-transform transform hover:scale-110 cursor-pointer"
                        >
                          <figure className="px-10 pt-10">
                            <Image
                              src={secondaryObj.img}
                              width={500}
                              height={200}
                              layout="responsive"
                              alt="login image"
                            />
                          </figure>
                          <div className="card-body items-center text-center">
                            <h2 className="card-title">{secondaryObj.title}</h2>
                            <p>{secondaryObj.desc}</p>
                            <div className="divider"></div>
                            <div>
                              <Link
                                href={`/student/career-guide/job/${secondaryObj?.id}`}
                                className="flex justify-center items-center no-underline"
                              >
                                <p className="text-sm text-blue-600 hover:text-blue-800 font-semibold">
                                  Go to Job
                                </p>
                                <ArrowRightOutlined className="ms-3 text-sm text-blue-600 hover:text-blue-800 font-semibold" />
                              </Link>
                            </div>
                            <div>
                              <Link
                                href={`/student/career-guide/course/${secondaryObj?.id}`}
                                className="flex justify-center items-center no-underline"
                              >
                                <p className="text-sm text-blue-600 hover:text-blue-800 font-semibold">
                                  Go to Course
                                </p>
                                <ArrowRightOutlined className="ms-3 text-sm text-blue-600 hover:text-blue-800 font-semibold" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  : "No primary goal found"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center my-24 w-full lg:w-1/2">
            <p className="text-center text-red-700 font-bold text-lg">
              It is recommended that if you can not view your career goal then
              you must have to select your skill, related works and interest.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerGuidePage;
