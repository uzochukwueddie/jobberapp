import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { AxiosResponse } from 'axios';
import { orderService } from '@gateway/services/api/order.service';

export class Update {
  public async cancel(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;
    const { orderData, paymentIntentId } = req.body;
    const response: AxiosResponse = await orderService.cancelOrder(paymentIntentId, orderId, orderData);
    res.status(StatusCodes.CREATED).json({ message: response.data.message });
  }

  public async requestExtension(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;
    const response: AxiosResponse = await orderService.requestDeliveryDateExtension(orderId, req.body);
    res.status(StatusCodes.OK).json({ message: response.data.message, order: response.data.order });
  }

  public async deliveryDate(req: Request, res: Response): Promise<void> {
    const { orderId, type } = req.params;
    const response: AxiosResponse = await orderService.updateDeliveryDate(orderId, type, req.body);
    res.status(StatusCodes.OK).json({ message: response.data.message, order: response.data.order });
  }

  public async deliverOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;
    const response: AxiosResponse = await orderService.deliverOrder(orderId, req.body);
    res.status(StatusCodes.OK).json({ message: response.data.message, order: response.data.order });
  }

  public async approveOrder(req: Request, res: Response): Promise<void> {
    const { orderId } = req.params;
    const response: AxiosResponse = await orderService.approveOrder(orderId, req.body);
    res.status(StatusCodes.OK).json({ message: response.data.message, order: response.data.order });
  }

  public async markNotificationAsRead(req: Request, res: Response): Promise<void> {
    const { notificationId } = req.body;
    const response: AxiosResponse = await orderService.markNotificationAsRead(notificationId);
    res.status(StatusCodes.OK).json({ message: response.data.message, notification: response.data.notification });
  }
}
