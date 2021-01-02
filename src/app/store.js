import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../features/categorySlice';
import productReducer from '../features/productSlice';
import pageReducer from '../features/pageSlice';



export default configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    page: pageReducer
  },
});
