import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/categorySlice';
import productReducer from '../features/productSlice';
import pageReducer from '../features/pageSlice';
import userReducer from '../features/userSlice';




export default configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    page: pageReducer,
    user: userReducer
  },
});
