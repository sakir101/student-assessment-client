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

        updateRelatedWorksDesc: build.mutation({
            query: ({ data, id, interestId }: { data: any; id: string, interestId: string }) => ({
                url: `/students/${id}/${interestId}/related-works`,
                method: 'PATCH',
                data
            }),
            invalidatesTags: [tagTypes.student],
        }),

        deleteRelatedWorks: build.mutation({
            query: ({ id, interestId }: { id: string; interestId: string }) => ({
                url: `/students/${id}/${interestId}/related-works`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.relatedWorksStudent],
        }),
    }),
});

export const { useAssignRelatedWorksMutation, useDeleteRelatedWorksMutation, useUpdateRelatedWorksDescMutation } = relatedWorksStudentApi;