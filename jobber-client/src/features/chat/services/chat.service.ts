import { IResponse } from 'src/shared/shared.interface';
import { api } from 'src/store/api';

import { IMessageDocument } from '../interfaces/chat.interface';

export const chatApi = api.injectEndpoints({
  endpoints: (build) => ({
    getConversation: build.query<IResponse, { senderUsername: string; receiverUsername: string }>({
      query: ({ senderUsername, receiverUsername }) => `message/conversation/${senderUsername}/${receiverUsername}`,
      providesTags: ['Chat']
    }),
    getMessages: build.query<IResponse, { senderUsername: string; receiverUsername: string }>({
      query: ({ senderUsername, receiverUsername }) => `message/${senderUsername}/${receiverUsername}`,
      providesTags: ['Chat']
    }),
    getConversationList: build.query<IResponse, string>({
      query: (username: string) => `message/conversations/${username}`,
      providesTags: ['Chat']
    }),
    getUserMessages: build.query<IResponse, string>({
      query: (conversationId: string) => `message/${conversationId}`,
      providesTags: ['Chat']
    }),
    saveChatMessage: build.mutation<IResponse, IMessageDocument>({
      query(body: IMessageDocument) {
        return {
          url: 'message',
          method: 'POST',
          body
        };
      },
      invalidatesTags: ['Chat']
    }),
    updateOffer: build.mutation<IResponse, { messageId: string; type: string }>({
      query({ messageId, type }) {
        return {
          url: 'message/offer',
          method: 'PUT',
          body: { messageId, type }
        };
      },
      invalidatesTags: ['Chat']
    }),
    markMessagesAsRead: build.mutation<IResponse, string>({
      query(messageId: string) {
        return {
          url: 'message/mark-as-read',
          method: 'PUT',
          body: { messageId }
        };
      },
      invalidatesTags: ['Chat']
    }),
    markMultipleMessagesAsRead: build.mutation<IResponse, { receiverUsername: string; senderUsername: string; messageId: string }>({
      query({ receiverUsername, senderUsername, messageId }) {
        return {
          url: 'message/mark-multiple-as-read',
          method: 'PUT',
          body: { receiverUsername, senderUsername, messageId }
        };
      },
      invalidatesTags: ['Chat']
    })
  })
});

export const {
  useGetConversationQuery,
  useGetMessagesQuery,
  useGetConversationListQuery,
  useGetUserMessagesQuery,
  useSaveChatMessageMutation,
  useUpdateOfferMutation,
  useMarkMessagesAsReadMutation,
  useMarkMultipleMessagesAsReadMutation
} = chatApi;
