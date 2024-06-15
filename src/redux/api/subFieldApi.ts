import { IMeta, ISubField } from "@/types";
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

        updateSubField: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `${SubField_URL}/${id}/update-subField`,
                method: 'PATCH',
                data,
                contentType: "multipart/form-data",
            }),
            invalidatesTags: [tagTypes.subField],
        }),
    })

})

export const {
    useGetSubFieldQuery,
    useGetSingleSubFieldQuery,
    useSubFieldCreateMutation,
    useUpdateSubFieldMutation
} = subFieldApi