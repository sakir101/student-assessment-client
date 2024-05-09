import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"



export const relatedWorksStudentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        assignRelatedWorks: build.mutation({
            query: ({ data, id, interestId }: { data: any; id: string; interestId: string }) => ({
                url: `/students/${id}/${interestId}/assign-related-works`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.relatedWorksStudent],
        }),

        deleteRelatedWorks: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `/students/${id}/related-works`,
                method: 'DELETE',
                data
            }),
            invalidatesTags: [tagTypes.relatedWorksStudent],
        }),
    }),
});

export const { useAssignRelatedWorksMutation, useDeleteRelatedWorksMutation } = relatedWorksStudentApi;