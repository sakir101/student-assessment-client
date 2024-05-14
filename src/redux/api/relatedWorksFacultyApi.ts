import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"



export const relatedWorksFacultyApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        assignRelatedWorksFaculty: build.mutation({
            query: ({ data, id, interestId }: { data: any; id: string; interestId: string }) => ({
                url: `/faculties/${id}/${interestId}/assign-related-works-faculty`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.relatedWorksFacultyApi],
        }),

        updateRelatedWorksDescFaculty: build.mutation({
            query: ({ data, id, interestId }: { data: any; id: string, interestId: string }) => ({
                url: `/faculties/${id}/${interestId}/related-works-faculty`,
                method: 'PATCH',
                data
            }),
            invalidatesTags: [tagTypes.relatedWorksFacultyApi],
        }),

        deleteRelatedWorksFaculty: build.mutation({
            query: ({ id, interestId }: { id: string; interestId: string }) => ({
                url: `/faculties/${id}/${interestId}/related-works`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.relatedWorksFacultyApi],
        }),
    }),
});

export const { useAssignRelatedWorksFacultyMutation, useDeleteRelatedWorksFacultyMutation, useUpdateRelatedWorksDescFacultyMutation } = relatedWorksFacultyApi;