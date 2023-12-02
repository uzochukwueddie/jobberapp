import { filter, orderBy } from 'lodash';
import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { FaCheck, FaCheckDouble, FaCircle } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Location, NavigateFunction, useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateNotification } from 'src/shared/header/reducers/notification.reducer';
import { TimeAgo } from 'src/shared/utils/timeago.utils';
import { isFetchBaseQueryError, lowerCase, showErrorToast } from 'src/shared/utils/utils.service';
import { socket } from 'src/sockets/socket.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { v4 as uuidv4 } from 'uuid';

import { IMessageDocument } from '../../interfaces/chat.interface';
import { useGetConversationListQuery, useMarkMultipleMessagesAsReadMutation } from '../../services/chat.service';
import { chatListMessageReceived, chatListMessageUpdated } from '../../services/chat.utils';

const ChatList: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const [selectedUser, setSelectedUser] = useState<IMessageDocument>();
  const conversationsListRef = useRef<IMessageDocument[]>([]);
  const [chatList, setChatList] = useState<IMessageDocument[]>([]);
  const { username, conversationId } = useParams<string>();
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const dispatch = useAppDispatch();
  const { data, isSuccess } = useGetConversationListQuery(`${authUser.username}`);
  const [markMultipleMessagesAsRead] = useMarkMultipleMessagesAsReadMutation();

  const selectUserFromList = async (user: IMessageDocument): Promise<void> => {
    try {
      setSelectedUser(user);
      const pathList: string[] = location.pathname.split('/');
      pathList.splice(-2, 2);
      const locationPathname: string = !pathList.join('/') ? location.pathname : pathList.join('/');
      const chatUsername: string = (user.receiverUsername !== authUser?.username ? user.receiverUsername : user.senderUsername) as string;
      navigate(`${locationPathname}/${lowerCase(chatUsername)}/${user.conversationId}`);
      socket.emit('getLoggedInUsers', '');
      if (user.receiverUsername === authUser?.username && lowerCase(`${user.senderUsername}`) === username && !user.isRead) {
        const list: IMessageDocument[] = filter(
          chatList,
          (item: IMessageDocument) => !item.isRead && item.receiverUsername === authUser?.username
        );
        if (list.length > 0) {
          await markMultipleMessagesAsRead({
            receiverUsername: `${user.receiverUsername}`,
            senderUsername: `${user.senderUsername}`,
            messageId: `${user._id}`
          });
        }
      }
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        showErrorToast(error?.data?.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const sortedConversations: IMessageDocument[] = orderBy(data.conversations, ['createdAt'], ['desc']) as IMessageDocument[];
      setChatList(sortedConversations);
      if (!sortedConversations.length) {
        dispatch(updateNotification({ hasUnreadMessage: false }));
      }
    }
  }, [isSuccess, username, data?.conversations, dispatch]);

  useEffect(() => {
    chatListMessageReceived(`${authUser.username}`, chatList, conversationsListRef.current, dispatch, setChatList);
    chatListMessageUpdated(`${authUser.username}`, chatList, conversationsListRef.current, dispatch, setChatList);
  }, [authUser.username, conversationId, chatList, dispatch]);

  return (
    <>
      <div className="border-grey truncate border-b px-5 py-3 text-base font-medium">
        <h2 className="w-6/12 truncate text-sm md:text-base lg:text-lg">All Conversations</h2>
      </div>
      <div className="absolute h-full w-full overflow-scroll pb-14">
        {chatList.map((data: IMessageDocument, index: number) => (
          <div
            key={uuidv4()}
            onClick={() => selectUserFromList(data)}
            className={`flex w-full cursor-pointer items-center space-x-4 px-5 py-4 hover:bg-gray-50 ${
              index !== chatList.length - 1 ? 'border-grey border-b' : ''
            } ${!data.isRead ? 'bg-[#f5fbff]' : ''} ${data.conversationId === conversationId ? 'bg-[#f5fbff]' : ''}`}
          >
            <LazyLoadImage
              src={data.receiverUsername !== authUser?.username ? data.receiverPicture : data.senderPicture}
              alt="profile image"
              className="h-10 w-10 object-cover rounded-full"
              placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
              effect="blur"
              wrapperClassName="h-10 w-10 object-cover rounded-full"
            />
            <div className="w-full text-sm dark:text-white">
              <div className="flex justify-between pb-1 font-bold text-[#777d74]">
                <span className={`${selectedUser && !data.body ? 'flex items-center' : ''}`}>
                  {data.receiverUsername !== authUser?.username ? data.receiverUsername : data.senderUsername}
                </span>
                {data.createdAt && <span className="font-normal">{TimeAgo.transform(`${data.createdAt}`)}</span>}
              </div>
              <div className="flex justify-between text-[#777d74]">
                <span>
                  {data.receiverUsername === authUser.username ? '' : 'Me: '}
                  {data.body}
                </span>
                {!data.isRead ? (
                  <>
                    {data.receiverUsername === authUser.username ? (
                      <FaCircle className="mt-2 text-sky-500" size={8} />
                    ) : (
                      <FaCheck className="mt-2" size={8} />
                    )}
                  </>
                ) : (
                  <FaCheckDouble className="mt-2 text-sky-500" size={8} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatList;
