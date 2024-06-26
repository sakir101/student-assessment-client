import { IFaculty, IInterest, IMeta, IRelatedWork, ISkill, ITask } from "@/types";
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

        getAssignSkill: build.query({
            query: ({ id, arg }: { id: any, arg: Record<string, any> }) => ({
                url: `${Student_URL}/getSkill/${id}`,
                method: "GET",
                params: arg
            }),
            transformResponse: (response: ISkill[], meta: IMeta) => {
                return {
                    skill: response,
                    meta,
                };
            },
            providesTags: [tagTypes.student],
        }),

        getSingleSkill: build.query({
            query: ({ id, interestId }: { id: string, interestId: string }) => ({
                url: `${Student_URL}/getSingleSkill/${id}/${interestId}`,
                method: "GET",
            }),
            providesTags: [tagTypes.student],
        }),

        getAssignRelatedWorks: build.query({
            query: ({ id, arg }: { id: any, arg: Record<string, any> }) => ({
                url: `${Student_URL}/getRelatedWorks/${id}`,
                method: "GET",
                params: arg
            }),
            transformResponse: (response: IRelatedWork[], meta: IMeta) => {
                return {
                    relatedWorks: response,
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

        unenrollFaculty: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `${Student_URL}/${id}/unenroll-faculty`,
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
            providesTags: [tagTypes.student],
        }),

        getSingleSpecificStudentTask: build.query({
            query: ({ id, taskId }: { id: any, taskId: string }) => ({
                url: `${Student_URL}/${id}/${taskId}`,
                method: "GET",
            }),
            providesTags: [tagTypes.student],
        }),

        getSpecificFeedbackTask: build.query({
            query: ({ id, taskId }: { id: string, taskId: string }) => ({
                url: `${Student_URL}/getSpecificTaskFeedback/taskFeedback/${id}/${taskId}`,
                method: "GET",
            }),
            providesTags: [tagTypes.student],
        }),

        getAllFeedbackTask: build.query({
            query: ({ id, arg }: { id: any, arg: Record<string, any> }) => ({
                url: `${Student_URL}/getAllTaskFeedback/taskFeedback/${id}`,
                method: "GET",
                params: arg
            }),
            transformResponse: (response: ITask[], meta: IMeta) => {
                return {
                    task: response,
                    meta,
                };
            },
            providesTags: [tagTypes.student],
        }),

        updateStudentProfile: build.mutation({
            query: ({ data, id }) => ({
                url: `/user/update-student/${id}`,
                method: "PATCH",
                data,
                contentType: "multipart/form-data"
            }),
            invalidatesTags: [tagTypes.student],
        }),

        updateSingleStudentTask: build.mutation({
            query: ({ data, id, taskId }: { data: any; id: string, taskId: string }) => ({
                url: `${Student_URL}/${id}/${taskId}`,
                method: 'PATCH',
                data
            }),
            invalidatesTags: [tagTypes.student],
        }),

        getAllSpecificCompleteStudentTask: build.query({
            query: ({ id, arg }: { id: any, arg: Record<string, any> }) => ({
                url: `${Student_URL}/getAllSpecificCompleteTask/complete/${id}`,
                method: "GET",
                params: arg
            }),
            transformResponse: (response: ITask[], meta: IMeta) => {
                return {
                    task: response,
                    meta,
                };
            },
            providesTags: [tagTypes.student],
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
    useGetAllSpecificIncompleteStudentTaskQuery,
    useGetSingleSpecificStudentTaskQuery,
    useUpdateSingleStudentTaskMutation,
    useGetAllSpecificCompleteStudentTaskQuery,
    useGetSpecificFeedbackTaskQuery,
    useGetAllFeedbackTaskQuery,
    useGetAssignSkillQuery,
    useGetAssignRelatedWorksQuery,
    useUpdateStudentProfileMutation,
    useGetSingleSkillQuery,
    useUnenrollFacultyMutation
} = studentApi