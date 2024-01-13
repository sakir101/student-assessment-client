import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"



export const careerGuideApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCareer: build.query({
            query: (id: string | string[] | undefined) => {
                return {
                    url: `/career-predict/${id}`,
                    method: "GET",
                };
            },
            providesTags: [tagTypes.careerGuide]
        }),
    }),
})

export const { useGetCareerQuery } = careerGuideApi