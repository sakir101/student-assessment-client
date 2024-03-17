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
        useGetCreatedTasksQuery
    } = facultyApi