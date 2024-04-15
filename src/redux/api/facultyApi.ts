import { IFaculty, IInterest, IMeta, IStudent, ITask } from "@/types";
import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"

const Faculty_URL = "/faculties"

export const facultyApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        signUpFaculty: build.mutation({
            query: (data) => ({
                url: '/user/create-faculty',
                method: "POST",
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: [tagTypes.faculty]
        }),

        getSingleFaculty: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${Faculty_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.faculty],
        }),

        getSingleFacultyByFacultyId: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${Faculty_URL}/${id}/faculty-id`,
                method: "GET",
            }),
            providesTags: [tagTypes.faculty],
        }),

        assignExpertiseFaculty: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `${Faculty_URL}/${id}/assign-interests-faculty`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.faculty],
        }),

        getAssignExpertise: build.query({
            query: ({ id, arg }: { id: any, arg: Record<string, any> }) => ({
                url: `${Faculty_URL}/getExpertise/${id}`,
                method: "GET",
                params: arg
            }),
            transformResponse: (response: IInterest[], meta: IMeta) => {
                return {
                    interest: response,
                    meta,
                };
            },
            providesTags: [tagTypes.faculty],
        }),

        deleteExpertise: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `${Faculty_URL}/${id}/delete-expertise`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.faculty],
        }),

        getSpecificMatchFaculty: build.query({
            query: ({ id, arg }: { id: any, arg: Record<string, any> }) => ({
                url: `${Faculty_URL}/${id}/getSpecificFaculty`,
                method: "GET",
                params: arg
            }),
            transformResponse: (response: IFaculty[], meta: IMeta) => {
                return {
                    faculty: response,
                    meta,
                };
            },
            providesTags: [tagTypes.faculty],
        }),

        getEnrolledStudentList: build.query({
            query: ({ id, arg }: { id: any, arg: Record<string, any> }) => ({
                url: `${Faculty_URL}/getEnrolledStudents/${id}`,
                method: "GET",
                params: arg
            }),
            transformResponse: (response: IStudent[], meta: IMeta) => {
                return {
                    student: response,
                    meta,
                };
            },
            providesTags: [tagTypes.faculty],
        }),

        getCreatedTasks: build.query({
            query: ({ id, arg }: { id: any, arg: Record<string, any> }) => ({
                url: `${Faculty_URL}/${id}/getSpecificFacultyTask`,
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

        getSingleSpecificFacultyTask: build.query({
            query: ({ id, taskId }: { id: any, taskId: string }) => ({
                url: `${Faculty_URL}/${id}/${taskId}`,
                method: "GET",
            }),
            providesTags: [tagTypes.faculty],
        }),

        getSingleTaskHint: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${Faculty_URL}/task/hint/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.faculty],
        }),

        getAssignTaskStudentList: build.query({
            query: ({ id, taskId, arg }: { id: any, taskId: any, arg: Record<string, any> }) => ({
                url: `${Faculty_URL}/getAssignTaskStudents/${id}/${taskId}`,
                method: "GET",
                params: arg
            }),
            transformResponse: (response: IStudent[], meta: IMeta) => {
                return {
                    student: response,
                    meta,
                };
            },
            providesTags: [tagTypes.faculty],
        }),

        getUnassignTaskStudentList: build.query({
            query: ({ id, taskId, arg }: { id: any, taskId: any, arg: Record<string, any> }) => ({
                url: `${Faculty_URL}/getUnassignTaskStudents/${id}/${taskId}`,
                method: "GET",
                params: arg
            }),
            transformResponse: (response: IStudent[], meta: IMeta) => {
                return {
                    student: response,
                    meta,
                };
            },
            providesTags: [tagTypes.faculty],
        }),

        assignTaskStudent: build.mutation({
            query: ({ data, id, taskId }: { data: any; id: string, taskId: string }) => ({
                url: `${Faculty_URL}/assignTask/${id}/${taskId}`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.faculty],
        }),

        unassignTaskStudent: build.mutation({
            query: ({ data, id, taskId }: { data: any; id: string, taskId: string }) => ({
                url: `${Faculty_URL}/unassignTask/${id}/${taskId}`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.faculty],
        }),

        updateSingleFacultyTask: build.mutation({
            query: ({ data, id, taskId }: { data: any; id: string, taskId: string }) => ({
                url: `${Faculty_URL}/${id}/${taskId}`,
                method: 'PATCH',
                data
            }),
            invalidatesTags: [tagTypes.faculty],
        }),

        updateSingleTaskHint: build.mutation({
            query: ({ data, taskId, hintId }: { data: any; taskId: string, hintId: string }) => ({
                url: `${Faculty_URL}/updateHint/${taskId}/${hintId}`,
                method: 'PATCH',
                data
            }),
            invalidatesTags: [tagTypes.faculty],
        }),

        taskHintCreate: build.mutation({
            query: ({ data, id, taskId }: { data: any; id: string, taskId: string }) => ({
                url: `${Faculty_URL}/${id}/${taskId}`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.faculty],
        }),

        deleteTaskHint: build.mutation({
            query: ({ taskId, hintId }: { taskId: string, hintId: string }) => ({
                url: `${Faculty_URL}/${taskId}/${hintId}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.faculty],
        }),

    })

})

export const
    {
        useSignUpFacultyMutation,
        useGetSingleFacultyQuery,
        useGetSingleFacultyByFacultyIdQuery,
        useAssignExpertiseFacultyMutation,
        useGetAssignExpertiseQuery,
        useDeleteExpertiseMutation,
        useGetSpecificMatchFacultyQuery,
        useGetEnrolledStudentListQuery,
        useGetCreatedTasksQuery,
        useGetSingleSpecificFacultyTaskQuery,
        useUpdateSingleFacultyTaskMutation,
        useTaskHintCreateMutation,
        useGetSingleTaskHintQuery,
        useUpdateSingleTaskHintMutation,
        useDeleteTaskHintMutation,
        useGetUnassignTaskStudentListQuery,
        useAssignTaskStudentMutation,
        useGetAssignTaskStudentListQuery,
        useUnassignTaskStudentMutation
    } = facultyApi