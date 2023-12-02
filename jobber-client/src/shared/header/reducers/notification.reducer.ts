import { createSlice, Slice } from '@reduxjs/toolkit';
import { INotification, IReduxNotification } from 'src/shared/header/interfaces/header.interface';

const initialValue: INotification = {
  hasUnreadMessage: false,
  hasUnreadNotification: false
};

const notificationSlice: Slice = createSlice({
  name: 'notification',
  initialState: initialValue,
  reducers: {
    updateNotification: (state: INotification, action: IReduxNotification): INotification => {
      state = { ...state, ...action.payload };
      return state;
    }
  }
});

export const { updateNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
