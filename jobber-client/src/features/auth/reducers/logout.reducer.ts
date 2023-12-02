import { createSlice, Slice } from '@reduxjs/toolkit';

import { IReduxLogout } from '../interfaces/auth.interface';

const initialValue = true;

const logoutSlice: Slice = createSlice({
  name: 'logout',
  initialState: initialValue,
  reducers: {
    updateLogout: (state: boolean, action: IReduxLogout): boolean => {
      state = action.payload;
      return state;
    },
    logout: (state: boolean): boolean => {
      return state;
    }
  }
});

export const { updateLogout, logout } = logoutSlice.actions;
export default logoutSlice.reducer;
