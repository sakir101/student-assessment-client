import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const Task_URL = "/tasks"

export const taskApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        taskCreate: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `${Task_URL}/${id}`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.task],
        }),

    })

})

export const
    {

        useTaskCreateMutation


    } = taskApi