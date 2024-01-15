import { baseApi } from "./api/baseApi";
import imageReducer from "./slice/imageSlice";
import pageReloadReducer from "./slice/reloadSlice"



export const reducer = {
    imageUrl: imageReducer,
    pageReload: pageReloadReducer,
    [baseApi.reducerPath]: baseApi.reducer,
}

