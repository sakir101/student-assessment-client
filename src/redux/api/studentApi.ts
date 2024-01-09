import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"


const Student_URL = ""
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
    }),
})

export const { useSignUpStudentMutation } = studentApi