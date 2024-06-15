import { IInterest, IMeta } from "@/types";
import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"


const Interest_URL = "/interest"
export const interestApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        interestCreate: build.mutation({
            query: ({ data }: { data: any }) => ({
                url: `${Interest_URL}/create-interest`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.interest],
        }),

        getInterest: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: Interest_URL,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: IInterest[], meta: IMeta) => {
                return {
                    interest: response,
                    meta,
                };
            },
            providesTags: [tagTypes.interest]
        }),

        getSingleInterest: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${Interest_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.interest],
        }),

        updateInterest: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `${Interest_URL}/${id}/update-interest`,
                method: 'PATCH',
                data
            }),
            invalidatesTags: [tagTypes.interest],
        }),
    }),
})

export const {
    useGetInterestQuery,
    useGetSingleInterestQuery,
    useInterestCreateMutation,
    useUpdateInterestMutation
} = interestApi