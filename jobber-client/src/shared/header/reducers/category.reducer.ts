import { createSlice, Slice } from '@reduxjs/toolkit';

import { IReduxShowCategory } from '../interfaces/header.interface';

const initialValue = true;

const categoryContainerSlice: Slice = createSlice({
  name: 'showCategoryContainer',
  initialState: initialValue,
  reducers: {
    updateCategoryContainer: (state: boolean, action: IReduxShowCategory): boolean => {
      state = action.payload;
      return state;
    }
  }
});

export const { updateCategoryContainer } = categoryContainerSlice.actions;
export default categoryContainerSlice.reducer;
