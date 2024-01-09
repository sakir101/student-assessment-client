import { baseApi } from "./api/baseApi";
import imageReducer from "./slice/imageSlice";

export const reducer = {
    imageUrl: imageReducer,
    [baseApi.reducerPath]: baseApi.reducer,
}

