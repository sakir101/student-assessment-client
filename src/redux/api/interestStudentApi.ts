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

export const { useAssignInterestMutation, useDeleteInterestMutation } = interestStudentApi;

