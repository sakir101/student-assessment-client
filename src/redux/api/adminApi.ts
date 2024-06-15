import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"


const Admin_URL = "/admin"

export const adminApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSingleAdmin: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${Admin_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.admin],
        }),

        getSingleAdminByAdminId: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${Admin_URL}/${id}/admin-id`,
                method: "GET",
            }),
            providesTags: [tagTypes.admin],
        }),


    })

})

export const {
    useGetSingleAdminByAdminIdQuery,
    useGetSingleAdminQuery

} = adminApi