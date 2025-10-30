'use client'
import { createSlice } from "@reduxjs/toolkit"

const counterSlice = createSlice({
    name: 'reducers',
    initialState: {
        modalOpenStatus: null,
    },
    reducers: {

        setModalOpenStatus: (state, action) => {
            state.modalOpenStatus = action.payload
        },
    },
})

export const {
    setModalOpenStatus
} = counterSlice.actions

export default counterSlice.reducer