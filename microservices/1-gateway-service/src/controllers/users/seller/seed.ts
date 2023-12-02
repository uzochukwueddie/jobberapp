import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { sellerService } from '@gateway/services/api/seller.service';

export class SellerSeed {
  public async seller(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await sellerService.seed(req.params.count);
    res.status(StatusCodes.OK).json({ message: response.data.message });
  }
}
