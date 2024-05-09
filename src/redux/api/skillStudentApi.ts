import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"



export const skillStudentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        assignSkill: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `/students/${id}/assign-skills`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.skillStudent],
        }),

        deleteSkill: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `/students/${id}/delete-skills`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.skillStudent],
        }),
    }),
});

export const { useAssignSkillMutation, useDeleteSkillMutation } = skillStudentApi;

