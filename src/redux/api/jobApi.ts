import { IJob, IMeta } from "@/types";
import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"


const Job_URL = "/job"
export const jobApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        jobCreate: build.mutation({
            query: ({ data }: { data: any }) => ({
                url: `${Job_URL}/create-job`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.job],
        }),

        getJob: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: Job_URL,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: IJob[], meta: IMeta) => {
                return {
                    job: response,
                    meta,
                };
            },
            providesTags: [tagTypes.job]
        }),

        getSingleJob: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${Job_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.job],
        }),

        updateJob: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `${Job_URL}/${id}/update-job`,
                method: 'PATCH',
                data
            }),
            invalidatesTags: [tagTypes.job],
        }),

        deleteJob: build.mutation({
            query: ({ id }: { id: string }) => ({
                url: `${Job_URL}/${id}/delete-job`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.job],
        }),
    })

})

export const {
    useGetJobQuery,
    useGetSingleJobQuery,
    useJobCreateMutation,
    useUpdateJobMutation,
    useDeleteJobMutation
} = jobApi