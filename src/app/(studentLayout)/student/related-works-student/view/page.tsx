"use client";

import Loading from "@/app/loading";
import { useGetAssignRelatedWorksQuery } from "@/redux/api/studentApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { ReloadOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Switch } from "antd";
import RelatedWorks from "@/components/RelatedWorks/RelatedWorks";

const RelatedWorksView = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>();
  const [size, setSize] = useState<number>();
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["size"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;

  useEffect(() => {
    if (searchTerm) {
      setPage(1);
    }
  }, [searchTerm]);

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { userId } = getUserInfo() as any;

  const { data, isLoading, refetch } = useGetAssignRelatedWorksQuery(
    {
      id: userId,
      arg: query,
    },
    { refetchOnMountOrArgChange: true }
  );

  const relatedWorksData = data?.relatedWorks;
  const meta = data?.meta;

  const handleDeleteSuccess = () => {
    refetch();
  };

  useEffect(() => {
    setSize(meta?.limit);
    setPage(meta?.page);
  }, [meta]);

  const resetFilters = () => {
    setSearchTerm("");
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Your work list
      </h1>
      <div className="flex justify-center items-center mt-5 lg:mt-7">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {Object.keys(data || {}).length > 0 && (
              <>
                <Input
                  type="text"
                  size="large"
                  placeholder="Search..."
                  className="w-1/2 lg:w-1/3"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />

                {!!searchTerm && (
                  <Button
                    onClick={resetFilters}
                    type="primary"
                    style={{ margin: "0px 5px" }}
                  >
                    <ReloadOutlined />
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className="my-4">
        {relatedWorksData?.map((item) => (
          <div
            key={item?.id}
            className="p-3 bg-slate-300 shadow-md my-4 rounded-md"
          >
            <div className="bg-stone-400 font-semibold p-3 rounded-md inline-block">
              <p className="inline-block">{item?.title}</p>
            </div>

            <div>
              <RelatedWorks
                key={item.id}
                interestId={item?.RelatedWorksStudent[0]?.interestId}
                description={item?.RelatedWorksStudent[0]?.description}
                title={item?.title}
                onDeleteSuccess={handleDeleteSuccess}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedWorksView;
