import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"



export const interestStudentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        assignInterest: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `/students/${id}/assign-interests`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.interestStudent],
        }),

        updateSkillStatus: build.mutation({
            query: ({ data, id, interestId }: { data: any; id: string, interestId: string }) => ({
                url: `/students/${id}/${interestId}/skill-status`,
                method: 'PATCH',
                data
            }),
            invalidatesTags: [tagTypes.student],
        }),

        deleteInterest: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `/students/${id}/delete-interests`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.interestStudent],
        }),
    }),
});

export const { useAssignInterestMutation, useUpdateSkillStatusMutation, useDeleteInterestMutation } = interestStudentApi;

