import { IInterest, IMeta } from "@/types";
import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"


const Interest_URL = "/interest"
export const interestApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
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
    }),
})

export const { useGetInterestQuery, useGetSingleInterestQuery } = interestApi