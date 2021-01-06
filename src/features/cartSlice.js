import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios'

// creating thunk
// export const fetchCart = createAsyncThunk('cart/fetchCart', async ({ productId}, { rejectWithValue }) => {
//     try {
//         const response = await axios.get(`/products/${productId}`);
//         const product = response.data;
//         return product;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// })


export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {},
        loading: false,
        error: null,
        message: null
    },
    reducers: {
        addToCart: (state, action) => {
            state.cart[action.payload.productDetail._id] = action.payload.productDetail
        }
    },
    extraReducers: {
        // [fetchcartById.pending]: (state, action) => {
        //     state.loading = true;
        // },
        // [fetchcartById.fulfilled]: (state, action) => {
        //     state.cartDetail = action.payload;
        //     state.loading = false;
        //     state.error = null;
        // },
        // [fetchcartById.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },


    }
});





export const { addToCart } = cartSlice.actions;

export const selectCart = state => state.cart.cart;

export default cartSlice.reducer;
