import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios'

// creating thunk
export const fetchCartAsync = createAsyncThunk('cart/fetchCartAsync', async ({ rejectWithValue }) => {
    try {
        const response = await axios.get(`/user/cart`);
        const cartItems = response.data;
        return cartItems;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const addToCartAsync = createAsyncThunk('cart/addToCartAsync', async ({ productDetail, type }, { rejectWithValue, getState }) => {


    // type tells whether its an addition or subtraction
    let originalPrice = productDetail.originalPrice;
    // if type is null default to adding
    const state = getState().cart;

    if (!type) {
        type = 1;
    }
    let item = {};
    if (state.cart[productDetail._id]) {
        productDetail = {
            ...productDetail,
            price: type === 1 ? productDetail.price + originalPrice : productDetail.price - originalPrice
        }
        // state.cart[productDetail._id] = { productDetail, quantity: state.cart[productDetail._id].quantity + type }
        item = { [productDetail._id]: { product: productDetail._id, quantity: type } }

    } else {
        // state.cart[productDetail._id] = { productDetail, quantity: 1 }
        item = { [productDetail._id]: { product: productDetail._id, quantity: 1 } }
    }


    const cartItem = {
        cartItems: {
            ...item
        }
    }
    try {
        const response = await axios.post(`/user/cart`
            , cartItem);
        const cart = response.data;
        return cart;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const updateCartAsync = createAsyncThunk('cart/updateCartAsync', async ({ rejectWithValue }) => {
    const cartFromStorage = JSON.parse(localStorage.getItem('cart'));
    if (cartFromStorage) {
        let cartItems = {};
        Object.keys(cartFromStorage).forEach(key => {
            cartItems[key] = {
                product: key, quantity: cartFromStorage[key].quantity
            }
        })
        try {

            const response = await axios.post(`/user/cart`
                , { cartItems });
            const cart = response.data;
            return cart;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    } else {
        return rejectWithValue('No cartItem in local storage ')
    }
})

export const removeFromCartAsync = createAsyncThunk('cart/removeFromCartAsync', async (productId, { rejectWithValue }) => {

    try {
        const response = await axios.delete(`/user/cart/${productId}`);
        const cart = response.data;
        return cart;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


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
                state.cart[productDetail._id] = { productDetail, quantity: state.cart[productDetail._id].quantity + type }
                localStorage.setItem('cart', JSON.stringify(state.cart));
            } else {
                state.cart[productDetail._id] = { productDetail, quantity: 1 }
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
        },
        clearCart: state => {
            state.cart = {};
            state.error = null;
            state.loading = false;
            state.message = null

        }
    },
    extraReducers: {
        [fetchCartAsync.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchCartAsync.fulfilled]: (state, action) => {
            makeCartState(state, action)
        },
        [fetchCartAsync.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        [addToCartAsync.pending]: (state, action) => {
            state.loading = true;
        },
        [addToCartAsync.fulfilled]: (state, action) => {
            makeCartState(state, action)
        },
        [addToCartAsync.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updateCartAsync.pending]: (state, action) => {
            state.loading = true;
        },
        [updateCartAsync.fulfilled]: (state, action) => {
            localStorage.removeItem('cart')
            makeCartState(state, action);
        },
        [updateCartAsync.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [removeFromCartAsync.pending]: (state, action) => {
            state.loading = true;
        },
        [removeFromCartAsync.fulfilled]: (state, action) => {
            makeCartState(state, action)
        },
        [removeFromCartAsync.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


    }
});


const makeCartState = (state, action) => {
    let cartList = []
    action.payload.forEach(cartItem => {
        cartList.push(
            {
                [cartItem.product?._id]: {
                    productDetail: {
                        ...cartItem.product,
                        originalPrice: cartItem.product?.price,
                        price: cartItem.product?.price * cartItem.quantity
                    },
                    quantity: cartItem.quantity

                }
            }
        )
    })
    let tempCart = {}
    cartList.forEach(item => Object.keys(item).forEach(key => tempCart[key] = item[key]));
    state.cart = { ...tempCart };
    state.loading = false;
    state.error = null;
}


export const { addToCart, removeFromCartAction, loadToCart, clearCart } = cartSlice.actions;

export const selectCart = state => state.cart.cart;

export default cartSlice.reducer;
