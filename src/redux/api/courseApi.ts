import { ICourse, IMeta } from "@/types";
import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"


const Course_URL = "/course"
export const courseApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        courseCreate: build.mutation({
            query: ({ data }: { data: any }) => ({
                url: `${Course_URL}/create-course`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.course],
        }),

        getCourse: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: Course_URL,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: ICourse[], meta: IMeta) => {
                return {
                    course: response,
                    meta,
                };
            },
            providesTags: [tagTypes.course]
        }),

        getSingleCourse: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${Course_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.course],
        }),

        getCreatedCourseForSubField: build.query({
            query: ({ id, arg }: { id: any, arg: Record<string, any> }) => ({
                url: `${Course_URL}/${id}/getSpecificCourse`,
                method: "GET",
                params: arg
            }),
            transformResponse: (response: ICourse[], meta: IMeta) => {
                return {
                    course: response,
                    meta,
                };
            },
            providesTags: [tagTypes.job],
        }),

        updateCourse: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `${Course_URL}/${id}/update-course`,
                method: 'PATCH',
                data
            }),
            invalidatesTags: [tagTypes.course],
        }),

        deleteCourse: build.mutation({
            query: ({ id }: { id: string }) => ({
                url: `${Course_URL}/${id}/delete-course`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.course],
        }),
    })

})

export const {
    useGetCourseQuery,
    useGetSingleCourseQuery,
    useCourseCreateMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useGetCreatedCourseForSubFieldQuery
} = courseApi