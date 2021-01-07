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
            let productDetail = action.payload.productDetail;
            // type tells whether its an addition or subtraction
            let type = action.payload.type;
            let originalPrice = productDetail.originalPrice;
            // if type is null default to adding
            if (!type) {
                type = 1;
            }
            if (state.cart[productDetail._id]) {
                productDetail = {
                    ...productDetail,
                    price: type === 1 ? productDetail.price + originalPrice : productDetail.price - originalPrice
                }
                state.cart[productDetail._id] = { productDetail, qty: state.cart[productDetail._id].qty + type }
                localStorage.setItem('cart', JSON.stringify(state.cart));
            } else {
                state.cart[productDetail._id] = { productDetail, qty: 1 }
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }

        }
        , removeFromCartAction: (state, action) => {
            delete state.cart[action.payload];
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        loadToCart: (state, action) => {
            const cartFromStorage = JSON.parse(localStorage.getItem('cart'));
            if (cartFromStorage) {
                state.cart = cartFromStorage;
            }
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





export const { addToCart, removeFromCartAction, loadToCart } = cartSlice.actions;

export const selectCart = state => state.cart.cart;

export default cartSlice.reducer;
