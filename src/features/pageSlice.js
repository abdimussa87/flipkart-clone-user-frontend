import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios'
// creating thunk
export const fetchPageAsync = createAsyncThunk('page/fetchPageAsync', async ({ type, cid }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/pages/${cid}/${type}`);
        if (response.status === 200) {
            const page = response.data;
            return page;
        }
    } catch (error) {
        return rejectWithValue(error.response.data)
    }

});

// const generateOneWayCategoriesList = (categories, oneWayCategorieslist = []) => {
//     for (let cat of categories) {
//         oneWayCategorieslist.push({ id: cat.id, name: cat.name });
//         if (cat.children.length > 0) {
//             generateOneWayCategoriesList(cat.children, oneWayCategorieslist);
//         }
//     }
//     return oneWayCategorieslist;
// }








export const pageSlice = createSlice({
    name: 'Page',
    initialState: {
        page: {},
        loading: false,
        error: null,
        message: null
    },
    reducers: {
        clearMessage: state => {
            state.message = null
        }
    },
    extraReducers: {
        [fetchPageAsync.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchPageAsync.fulfilled]: (state, action) => {
            state.page = action.payload;
            state.loading = false;
            state.error = null;
        },
        [fetchPageAsync.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


    }
});





export const { clearMessage } = pageSlice.actions;

export const selectPage = state => state.page.page;

export default pageSlice.reducer;
