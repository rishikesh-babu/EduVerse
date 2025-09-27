import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    classDetails: []
}

const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {
        saveClassDetails: (state, action) => {
            state.classDetails = action.payload
        }
    }
})

export const { saveClassDetails } = classSlice.actions
const classReducer = classSlice.reducer
export default classReducer