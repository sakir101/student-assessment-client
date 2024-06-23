import { ICourse, IJob, IMeta, ISubField } from "@/types";
import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"


const SubField_URL = "/subField"
export const subFieldApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        subFieldCreate: build.mutation({
            query: ({ data }) => ({
                url: `${SubField_URL}/create-subField`,
                method: "POST",
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: [tagTypes.subField],
        }),

        getSubField: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: SubField_URL,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: ISubField[], meta: IMeta) => {
                return {
                    subField: response,
                    meta,
                };
            },
            providesTags: [tagTypes.subField]
        }),

        getSingleSubField: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${SubField_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.subField],
        }),

        getAssignJob: build.query({
            query: ({ id, arg }: { id: any, arg: Record<string, any> }) => {
                return {
                    url: `${SubField_URL}/${id}/get-assign-job`,
                    method: "GET",
                    params: arg
                };
            },
            transformResponse: (response: IJob[], meta: IMeta) => {
                return {
                    job: response,
                    meta,
                };
            },
            providesTags: [tagTypes.subField],
        }),

        getUnassignJob: build.query({
            query: ({ id, arg }: { id: any, arg: Record<string, any> }) => {
                return {
                    url: `${SubField_URL}/${id}/get-unassign-job`,
                    method: "GET",
                    params: arg
                };
            },
            transformResponse: (response: IJob[], meta: IMeta) => {
                return {
                    job: response,
                    meta,
                };
            },
            providesTags: [tagTypes.subField],
        }),

        getAssignCourse: build.query({
            query: ({ id, arg }: { id: any, arg: Record<string, any> }) => {
                return {
                    url: `${SubField_URL}/${id}/get-assign-course`,
                    method: "GET",
                    params: arg
                };
            },
            transformResponse: (response: ICourse[], meta: IMeta) => {
                return {
                    course: response,
                    meta,
                };
            },
            providesTags: [tagTypes.subField],
        }),

        getUnassignCourse: build.query({
            query: ({ id, arg }: { id: any, arg: Record<string, any> }) => {
                return {
                    url: `${SubField_URL}/${id}/get-unassign-course`,
                    method: "GET",
                    params: arg
                };
            },
            transformResponse: (response: ICourse[], meta: IMeta) => {
                return {
                    course: response,
                    meta,
                };
            },
            providesTags: [tagTypes.subField],
        }),

        updateSubField: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `${SubField_URL}/${id}/update-subField`,
                method: 'PATCH',
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: [tagTypes.subField],
        }),

        assignJob: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `${SubField_URL}/${id}/assign-job`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.masterField],
        }),

        unassignJob: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `${SubField_URL}/${id}/unassign-job`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.masterField],
        }),

        assignCourse: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `${SubField_URL}/${id}/assign-course`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.masterField],
        }),

        unassignCourse: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `${SubField_URL}/${id}/unassign-course`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.masterField],
        }),
    })

})

export const {
    useGetSubFieldQuery,
    useGetSingleSubFieldQuery,
    useSubFieldCreateMutation,
    useUpdateSubFieldMutation,
    useAssignJobMutation,
    useUnassignJobMutation,
    useAssignCourseMutation,
    useUnassignCourseMutation,
    useGetAssignJobQuery,
    useGetUnassignJobQuery,
    useGetAssignCourseQuery,
    useGetUnassignCourseQuery
} = subFieldApi