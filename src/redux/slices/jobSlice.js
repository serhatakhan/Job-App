import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs: [],
    isLoading: false,
    error: null
}

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        // setLoading'te actionu kullanmadığımız için almadık
        setLoading: (state)=>{
            state.isLoading = true
        },
        setError: (state, action)=>{
            state.isLoading = false,
            state.error = action.payload
        },
        setJobs: (state, action)=>{
            state.isLoading = false,
            state.error = null,
            state.jobs = action.payload
        },
        // kartları store'dan kaldıran aksiyon
        deleteJob: (state, action)=> {
            // silinecek elemanın id'si üzerinden sırasını bul
            const index = state.jobs.findIndex((i)=> i.id === action.payload)
            // elemanı diziden kaldır, index sırasındaki elemandan itibaren 1 tane sil
            state.jobs.splice(index,1)
        }
    }
})

// aksiyonları export et
export const {setLoading, setError, setJobs, deleteJob} = jobSlice.actions

// reducer'ı export et
export default jobSlice.reducer