import { IResponse } from 'src/shared/shared.interface';
import { api } from 'src/store/api';

import { ISignInPayload, ISignUpPayload } from '../interfaces/auth.interface';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<IResponse, ISignUpPayload>({
      query(body: ISignUpPayload) {
        return {
          url: '/auth/signup',
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Auth']
    }),
    signIn: build.mutation<IResponse, ISignInPayload>({
      query(body: ISignInPayload) {
        return {
          url: '/auth/signin',
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Auth']
    }),
    logout: build.mutation<IResponse, void>({
      query() {
        return {
          url: 'auth/signout',
          method: 'POST',
          body: {}
        };
      },
      invalidatesTags: ['Auth']
    }),
    resendEmail: build.mutation<IResponse, { userId: number; email: string }>({
      query(data) {
        return {
          url: 'auth/resend-email',
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['Auth']
    }),
    verifyEmail: build.mutation<IResponse, string>({
      query(token: string) {
        return {
          url: 'auth/verify-email',
          method: 'PUT',
          body: { token }
        };
      },
      invalidatesTags: ['Auth']
    }),
    verifyOTP: build.mutation<IResponse, { otp: string; browserName: string; deviceType: string }>({
      query(data) {
        return {
          url: `auth/verify-otp/${data.otp}`,
          method: 'PUT',
          body: {
            browserName: data.browserName,
            deviceType: data.deviceType
          }
        };
      },
      invalidatesTags: ['Auth']
    }),
    forgotPassword: build.mutation<IResponse, string>({
      query(email: string) {
        return {
          url: 'auth/forgot-password',
          method: 'PUT',
          body: { email }
        };
      },
      invalidatesTags: ['Auth']
    }),
    resetPassword: build.mutation<IResponse, { password: string; confirmPassword: string; token: string }>({
      query(data) {
        return {
          url: `auth/reset-password/${data.token}`,
          method: 'PUT',
          body: data
        };
      },
      invalidatesTags: ['Auth']
    }),
    checkCurrentUser: build.query<IResponse, void>({
      query: () => 'auth/currentuser',
      providesTags: ['Currentuser']
    }),
    getLoggedInUser: build.query<IResponse, void>({
      query: () => 'auth/logged-in-user',
      providesTags: ['Auth']
    }),
    removeLoggedInUser: build.mutation<IResponse, string>({
      query(username: string) {
        return {
          url: `auth/logged-in-user/${username}`,
          method: 'DELETE'
        };
      }
    }),
    getAuthGigsByCategory: build.query<IResponse, { query: string; from: string; size: string; type: string }>({
      query: ({ query, from, size, type }) => `auth/search/gig/${from}/${size}/${type}?${query}`,
      providesTags: ['Auth']
    }),
    getAuthGigById: build.query<IResponse, string>({
      query: (gigId: string) => `auth/search/gig/${gigId}`,
      providesTags: ['Auth']
    })
  })
});

export const {
  useGetAuthGigsByCategoryQuery,
  useCheckCurrentUserQuery,
  useGetLoggedInUserQuery,
  useGetAuthGigByIdQuery,
  useSignUpMutation,
  useSignInMutation,
  useRemoveLoggedInUserMutation,
  useLogoutMutation,
  useResendEmailMutation,
  useVerifyEmailMutation,
  useVerifyOTPMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
