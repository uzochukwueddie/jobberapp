import { OrderNotificationModel } from '@order/models/notification.schema';
import { socketIOOrderObject } from '@order/server';
import { IOrderDocument, IOrderNotifcation } from '@uzochukwueddie/jobber-shared';
import { getOrderByOrderId } from '@order/services/order.service';

const createNotification = async (data: IOrderNotifcation): Promise<IOrderNotifcation> => {
  const notification: IOrderNotifcation = await OrderNotificationModel.create(data);
  return notification;
};

const getNotificationsById = async (userToId: string): Promise<IOrderNotifcation[]> => {
  const notifications: IOrderNotifcation[] = await OrderNotificationModel.aggregate([{ $match: { userTo: userToId }}]);
  return notifications;
};

const markNotificationAsRead = async (notificationId: string): Promise<IOrderNotifcation> => {
  const notification: IOrderNotifcation = await OrderNotificationModel.findOneAndUpdate(
    { _id: notificationId },
    {
      $set: {
        isRead: true
      }
    },
    { new: true }
  ) as IOrderNotifcation;
  const order: IOrderDocument = await getOrderByOrderId(notification.orderId);
  socketIOOrderObject.emit('order notification', order, notification);
  return notification;
};

const sendNotification = async (data: IOrderDocument, userToId: string, message: string): Promise<void> => {
  const notification: IOrderNotifcation = {
    userTo: userToId,
    senderUsername: data.sellerUsername,
    senderPicture: data.sellerImage,
    receiverUsername: data.buyerUsername,
    receiverPicture: data.buyerImage,
    message,
    orderId: data.orderId
  } as IOrderNotifcation;
  const orderNotification: IOrderNotifcation = await createNotification(notification);
  socketIOOrderObject.emit('order notification', data, orderNotification);
};

export {
  createNotification,
  getNotificationsById,
  markNotificationAsRead,
  sendNotification
};
