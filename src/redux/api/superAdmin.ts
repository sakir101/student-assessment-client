import { IAdmin, IFaculty, IMeta, IStudent } from "@/types";
import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"


const SuperAdmin_URL = "/superAdmin"

export const superAdminApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getSingleSuperAdmin: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${SuperAdmin_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.superAdmin],
        }),

        getSingleSuperAdminBySuperAdminId: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${SuperAdmin_URL}/${id}/superAdmin-id`,
                method: "GET",
            }),
            providesTags: [tagTypes.superAdmin],
        }),

        updateSuperAdminProfile: build.mutation({
            query: ({ data, id }) => ({
                url: `/user/update-superAdmin/${id}`,
                method: "PATCH",
                data,
                contentType: "multipart/form-data"
            }),
            invalidatesTags: [tagTypes.superAdmin],
        }),

        updateUserVerification: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `/user/${id}/update-user`,
                method: 'PATCH',
                data
            }),
            invalidatesTags: [tagTypes.superAdmin],
        }),

        createAdmin: build.mutation({
            query: (data) => ({
                url: '/user/create-admin',
                method: "POST",
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: [tagTypes.superAdmin]
        }),

        getAllAdmins: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `${SuperAdmin_URL}/get-admins`,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: IAdmin[], meta: IMeta) => {
                return {
                    admin: response,
                    meta,
                };
            },
            providesTags: [tagTypes.superAdmin]
        }),

        getAllFaculties: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `${SuperAdmin_URL}/get-faculties`,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: IFaculty[], meta: IMeta) => {
                return {
                    faculty: response,
                    meta,
                };
            },
            providesTags: [tagTypes.superAdmin]
        }),

        getAllStudents: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `${SuperAdmin_URL}/get-students`,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: IStudent[], meta: IMeta) => {
                return {
                    student: response,
                    meta,
                };
            },
            providesTags: [tagTypes.superAdmin]
        }),

    })

})

export const {
    useGetSingleSuperAdminQuery,
    useGetSingleSuperAdminBySuperAdminIdQuery,
    useUpdateSuperAdminProfileMutation,
    useCreateAdminMutation,
    useGetAllAdminsQuery,
    useGetAllFacultiesQuery,
    useGetAllStudentsQuery,
    useUpdateUserVerificationMutation
} = superAdminApi