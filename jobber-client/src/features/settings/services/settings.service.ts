import { IResponse } from 'src/shared/shared.interface';
import { api } from 'src/store/api';

export const settingsApi = api.injectEndpoints({
  endpoints: (build) => ({
    changePassword: build.mutation<IResponse, { currentPassword: string; newPassword: string }>({
      query({ currentPassword, newPassword }) {
        return {
          url: '/auth/change-password',
          method: 'PUT',
          body: { currentPassword, newPassword }
        };
      },
      invalidatesTags: ['Auth']
    })
  })
});

export const { useChangePasswordMutation } = settingsApi;
