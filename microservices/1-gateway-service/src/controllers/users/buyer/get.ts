import { buyerService } from '@gateway/services/api/buyer.service';
import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export class Get {
  public async email(_req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await buyerService.getBuyerByEmail();
    res.status(StatusCodes.OK).json({ message: response.data.message, buyer: response.data.buyer });
  }

  public async currentUsername(_req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await buyerService.getCurrentBuyerByUsername();
    res.status(StatusCodes.OK).json({ message: response.data.message, buyer: response.data.buyer });
  }

  public async username(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await buyerService.getBuyerByUsername(req.params.username);
    res.status(StatusCodes.OK).json({ message: response.data.message, buyer: response.data.buyer });
  }
}
