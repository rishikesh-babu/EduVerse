import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    classDetails: []
}

const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {
        saveClassDetails: (state, action) => {
            state.foodDetails = action.payload
        }
    }
})

export const {saveClassDetails, clearClassDetails } = classSlice.actions
const classReducer = classSlice.reducer
export default classReducer