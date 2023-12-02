import { IResponse } from 'src/shared/shared.interface';
import { api } from 'src/store/api';

export const notificationsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getNotificationsById: build.query<IResponse, string>({
      query: (userTo: string) => `order/notification/${userTo}`,
      providesTags: ['Notification']
    }),
    markUnreadNotification: build.mutation<IResponse, string>({
      query(notificationId: string) {
        return {
          url: 'order/notification/mark-as-read',
          method: 'PUT',
          body: { notificationId }
        };
      },
      invalidatesTags: ['Notification']
    })
  })
});

export const { useGetNotificationsByIdQuery, useMarkUnreadNotificationMutation } = notificationsApi;
