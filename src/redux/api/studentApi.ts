import { IInterest, IMeta } from "@/types";
import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"


const Student_URL = "/students"
export const studentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        signUpStudent: build.mutation({
            query: (data) => ({
                url: '/user/create-student',
                method: "POST",
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: [tagTypes.student]
        }),

        getSingleStudent: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${Student_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.student],
        }),

        getAssignInterest: build.query({
            query: ({ id, arg }: { id: any, arg: Record<string, any> }) => ({
                url: `${Student_URL}/getInterest/${id}`,
                method: "GET",
                params: arg
            }),
            transformResponse: (response: IInterest, meta: IMeta) => {
                return {
                    interest: response,
                    meta,
                };
            },
            providesTags: [tagTypes.student],
        }),
    }),
})

export const { useSignUpStudentMutation, useGetSingleStudentQuery, useGetAssignInterestQuery } = studentApi