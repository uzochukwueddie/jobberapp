import { getConversation, getMessages, getUserConversationList, getUserMessages } from '@chat/services/message.service';
import { IConversationDocument, IMessageDocument } from '@uzochukwueddie/jobber-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const conversation = async (req: Request, res: Response): Promise<void> => {
  const { senderUsername, receiverUsername } = req.params;
  const conversations: IConversationDocument[] = await getConversation(senderUsername, receiverUsername);
  res.status(StatusCodes.OK).json({ message: 'Chat conversation', conversations });
};

const messages = async (req: Request, res: Response): Promise<void> => {
  const { senderUsername, receiverUsername } = req.params;
  const messages: IMessageDocument[] = await getMessages(senderUsername, receiverUsername);
  res.status(StatusCodes.OK).json({ message: 'Chat messages', messages });
};

const conversationList = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;
  const messages: IMessageDocument[] = await getUserConversationList(username);
  res.status(StatusCodes.OK).json({ message: 'Conversation list', conversations: messages });
};

const userMessages = async (req: Request, res: Response): Promise<void> => {
  const { conversationId } = req.params;
  const messages: IMessageDocument[] = await getUserMessages(conversationId);
  res.status(StatusCodes.OK).json({ message: 'Chat messages', messages });
};

export {
  conversation,
  messages,
  conversationList,
  userMessages
};
