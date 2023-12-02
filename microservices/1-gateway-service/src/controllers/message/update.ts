import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { messageService } from '@gateway/services/api/message.service';

export class Update {
  public async offer(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await messageService.updateOffer(req.body.messageId, req.body.type);
    res.status(StatusCodes.OK).json({ message: response.data.message, singleMessage: response.data.singleMessage });
  }

  public async markMultipleMessages(req: Request, res: Response): Promise<void> {
    const { messageId, senderUsername, receiverUsername } = req.body;
    const response: AxiosResponse = await messageService.markMultipleMessagesAsRead(receiverUsername, senderUsername, messageId);
    res.status(StatusCodes.OK).json({ message: response.data.message });
  }

  public async markSingleMessage(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await messageService.markMessageAsRead(req.body.messageId);
    res.status(StatusCodes.OK).json({ message: response.data.message, singleMessage: response.data.singleMessage });
  }
}
