import { IFaculty, IInterest, IMeta, ITask } from "@/types";
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
            transformResponse: (response: IInterest[], meta: IMeta) => {
                return {
                    interest: response,
                    meta,
                };
            },
            providesTags: [tagTypes.student],
        }),

        enrollFaculty: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `${Student_URL}/${id}/enroll-faculties`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.student],
        }),

        getEnrollFaculty: build.query({
            query: ({ id, arg }: { id: any, arg: Record<string, any> }) => ({
                url: `${Student_URL}/getEnrolledFaculties/${id}`,
                method: "GET",
                params: arg
            }),
            transformResponse: (response: IFaculty[], meta: IMeta) => {
                return {
                    faculty: response,
                    meta,
                };
            },
            providesTags: [tagTypes.student],
        }),

        getSingleStudentByStudentId: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${Student_URL}/${id}/student-id`,
                method: "GET",
            }),
            providesTags: [tagTypes.student],
        }),

        getAllSpecificIncompleteStudentTask: build.query({
            query: ({ id, arg }: { id: any, arg: Record<string, any> }) => ({
                url: `${Student_URL}/getAllSpecificIncompleteTask/incomplete/${id}`,
                method: "GET",
                params: arg
            }),
            transformResponse: (response: ITask[], meta: IMeta) => {
                return {
                    task: response,
                    meta,
                };
            },
            providesTags: [tagTypes.faculty],
        }),
    }),
})

export const {
    useSignUpStudentMutation,
    useGetSingleStudentQuery,
    useGetAssignInterestQuery,
    useEnrollFacultyMutation,
    useGetEnrollFacultyQuery,
    useGetSingleStudentByStudentIdQuery,
    useGetAllSpecificIncompleteStudentTaskQuery
} = studentApi