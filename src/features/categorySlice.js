import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios'


// creating thunk
export const fetchCategoriesAsync = createAsyncThunk('category/fetchCategoriesAsync', async ({ rejectWithValue }) => {
  try {
    const response = await axios.get('/categories');
    if (response.status === 200) {
      const categories = response.data;
      return categories;
    }
  } catch (error) {
    return rejectWithValue(error.response.data)
  }

});



// const buildUpdatedCategoriesList = (categories, newCategory) => {
//   // if what we are adding is itself a parent
//   if (!newCategory.parentId) {
//     return [...categories, {
//       id: newCategory._id,
//       name: newCategory.name, slug: newCategory.slug,
//       children: []
//     }]
//   }
//   let categoryList = []
//   for (let cat of categories) {
//     if (cat.id === newCategory.parentId) {
//       categoryList.push({
//         ...cat, children: buildUpdatedCategoriesList([...cat.children, {
//           id: newCategory._id,
//           name: newCategory.name, slug: newCategory.slug, parentId: newCategory.parentId
//         }], newCategory)
//       })
//     } else {
//       categoryList.push(
//         { ...cat, children: cat.children && cat.children.length > 0 ? buildUpdatedCategoriesList(cat.children, newCategory) : [] }
//       );
//     }
//   }
//   return categoryList;
// }


export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    loading: false,
    error: null,
    message: null
  },
  reducers: {
  },
  extraReducers: {
    [fetchCategoriesAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCategoriesAsync.fulfilled]: (state, action) => {

      state.categories = action.payload;
      state.loading = false;
      state.error = null;

    },
    [fetchCategoriesAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


  }
});





// export const { isUserLoggedIn, logout } = userSlice.actions;

export const selectCategories = state => state.category.categories;

export default categorySlice.reducer;
