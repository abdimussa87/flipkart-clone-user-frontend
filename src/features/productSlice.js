import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios'

// creating thunk
// export const fetchProductsAsync = createAsyncThunk('product/fetchProductsAsync', async ({ rejectWithValue }) => {
//     try {
//         const response = await axios.get('/products');
//         if (response.status === 200) {
//             const products = response.data;
//             return products;
//         }
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }

// });

export const fetchProductsBySlug = createAsyncThunk('product/fetchProductsBySlug', async ({ slug }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/products/${slug}`);
        const products = response.data;
        return products;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const fetchProductById = createAsyncThunk('product/fetchProductById', async ({ productId, productSlug }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/products/${productSlug}/${productId}`);
        const product = response.data;
        return product;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        productsByPrice: {
            under5k: [],
            under10k: [],
            under15k: [],
            under20k: [],
            under30k: []
        },
        productDetail: {},
        loading: false,
        error: null,
        message: null
    },
    reducers: {
    },
    extraReducers: {
        [fetchProductById.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchProductById.fulfilled]: (state, action) => {
            state.productDetail = action.payload;
            state.loading = false;
            state.error = null;
        },
        [fetchProductById.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [fetchProductsBySlug.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchProductsBySlug.fulfilled]: (state, action) => {
            state.products = action.payload.products;
            state.productsByPrice = { ...action.payload.productsByPrice }
            state.loading = false;
            state.error = null;
        },
        [fetchProductsBySlug.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

    }
});





// export const { isUserLoggedIn, logout } = userSlice.actions;

export const selectProducts = state => state.product.products;

export default productSlice.reducer;
