"use client";

import "react-quill/dist/quill.bubble.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useGetSingleJobQuery } from "@/redux/api/jobApi";
import Loading from "@/app/loading";
import "../../../../../components/QuillCss/page.css";
import Link from "next/link";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const SingleJob = () => {
  const query: Record<string, any> = {};
  const [jobId, setJobId] = useState<string>("");
  const [cont, setCont] = useState<string>("");

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    const match = url.match(/\/([^\/?]+)\?$/);
    const extractId = match ? match[1] : null;
    if (extractId !== null) {
      setJobId(extractId);
    }
  }, [pathname, searchParams]);

  const { data, refetch, isLoading } = useGetSingleJobQuery(jobId, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="mt-3 lg:mt-3 p-5">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {Object.keys(data || {}).length > 0 && (
            <div className="flex flex-col justify-center items-center">
              <div className="w-full lg:w-3/4">
                <h1
                  className="text-center text-xl text-blue-500 font-semibold"
                  style={{
                    margin: "15px 0px",
                  }}
                >
                  {data?.title}
                </h1>

                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  <span className="font-bold">Job Description: </span>
                  <br />
                  <ReactQuill
                    value={data?.desc}
                    readOnly={true}
                    theme={"bubble"}
                  />
                </div>
                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  <span className="font-bold">Job Link: </span>
                  <br />
                  {data?.jobLink ? (
                    <Link href={data.jobLink} legacyBehavior>
                      <a target="_blank" rel="noopener noreferrer">
                        {data.jobLink}
                      </a>
                    </Link>
                  ) : (
                    <p>No job link available</p>
                  )}
                </div>
                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  <span className="font-bold">Job Status: </span>
                  <span>{data?.status}</span>
                </div>
                <div className="p-5 bg-slate-300 rounded-md mb-4">
                  <span className="font-bold">Company Website Link: </span>
                  <br />
                  {data?.companyWebsite ? (
                    <Link href={data.companyWebsite} legacyBehavior>
                      <a target="_blank" rel="noopener noreferrer">
                        {data.companyWebsite}
                      </a>
                    </Link>
                  ) : (
                    <p>No job link available</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SingleJob;
