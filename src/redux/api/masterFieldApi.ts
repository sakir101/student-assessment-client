import { IMasterField, IMeta } from "@/types";
import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"


const MasterField_URL = "/masterField"
export const masterFieldApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        masterFieldCreate: build.mutation({
            query: ({ data }: { data: any }) => ({
                url: `${MasterField_URL}/create-masterField`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.masterField],
        }),

        getMasterField: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: MasterField_URL,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: IMasterField[], meta: IMeta) => {
                return {
                    masterField: response,
                    meta,
                };
            },
            providesTags: [tagTypes.masterField]
        }),

        getSingleMasterField: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${MasterField_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.masterField],
        }),

        updateMasterField: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `${MasterField_URL}/${id}/update-masterField`,
                method: 'PATCH',
                data
            }),
            invalidatesTags: [tagTypes.masterField],
        }),
    })

})

export const {
    useGetMasterFieldQuery,
    useGetSingleMasterFieldQuery,
    useMasterFieldCreateMutation,
    useUpdateMasterFieldMutation
} = masterFieldApi