import { createSlice } from "@reduxjs/toolkit";

export const page = createSlice({
    name: 'page',
    initialState: {
        value: 1,
    },
    reducers: {
        changePage: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { changePage } = page.actions
export default page.reducer