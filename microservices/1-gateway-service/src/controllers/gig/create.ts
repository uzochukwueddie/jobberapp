import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { gigService } from '@gateway/services/api/gig.service';

export class Create {
  public async gig(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await gigService.createGig(req.body);
    res.status(StatusCodes.CREATED).json({ message: response.data.message, gig: response.data.gig });
  }
}
