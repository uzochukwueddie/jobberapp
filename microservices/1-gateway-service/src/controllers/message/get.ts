import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { messageService } from '@gateway/services/api/message.service';

export class Get {
  public async conversation(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await messageService.getConversation(req.params.senderUsername, req.params.receiverUsername);
    res.status(StatusCodes.OK).json({ message: response.data.message, conversations: response.data.conversations });
  }

  public async messages(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await messageService.getMessages(req.params.senderUsername, req.params.receiverUsername);
    res.status(StatusCodes.OK).json({ message: response.data.message, messages: response.data.messages });
  }

  public async conversationList(req: Request, res: Response): Promise<void> {
    const { username } = req.params;
    const response: AxiosResponse = await messageService.getConversationList(username);
    res.status(StatusCodes.OK).json({ message: response.data.message, conversations: response.data.conversations });
  }

  public async userMessages(req: Request, res: Response): Promise<void> {
    const { conversationId } = req.params;
    const response: AxiosResponse = await messageService.getUserMessages(conversationId);
    res.status(StatusCodes.OK).json({ message: response.data.message, messages: response.data.messages });
  }
}
