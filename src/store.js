import { configureStore } from "@reduxjs/toolkit";

import pageReducer from './stores/page'

export default configureStore({
    reducer: {
        page: pageReducer,
    },
})