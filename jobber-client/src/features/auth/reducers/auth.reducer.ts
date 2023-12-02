import { createSlice, Slice } from '@reduxjs/toolkit';
import { initialAuthUserValues } from 'src/shared/utils/static-data';

import { IAuthUser, IReduxAddAuthUser } from '../interfaces/auth.interface';

const initialValue: IAuthUser = initialAuthUserValues as IAuthUser;

const authSlice: Slice = createSlice({
  name: 'auth',
  initialState: initialValue,
  reducers: {
    addAuthUser: (state: IAuthUser, action: IReduxAddAuthUser): IAuthUser => {
      const { authInfo } = action.payload;
      state = { ...authInfo } as unknown as IAuthUser;
      return state;
    },
    clearAuthUser: (): IAuthUser => {
      return initialAuthUserValues;
    }
  }
});

export const { addAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
