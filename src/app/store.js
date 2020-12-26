import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/categorySlice';
import productReducer from '../features/productSlice';


export default configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer
  },
});
