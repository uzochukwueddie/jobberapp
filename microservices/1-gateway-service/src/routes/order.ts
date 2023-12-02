import { Create } from '@gateway/controllers/order/create';
import { Get } from '@gateway/controllers/order/get';
import { Update } from '@gateway/controllers/order/update';
import express, { Router } from 'express';

class OrderRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/order/notification/:userTo', Get.prototype.notifications);
    this.router.get('/order/:orderId', Get.prototype.orderId);
    this.router.get('/order/seller/:sellerId', Get.prototype.sellerOrders);
    this.router.get('/order/buyer/:buyerId', Get.prototype.buyerOrders);
    this.router.post('/order', Create.prototype.order);
    this.router.post('/order/create-payment-intent', Create.prototype.intent);
    this.router.put('/order/cancel/:orderId', Update.prototype.cancel);
    this.router.put('/order/extension/:orderId', Update.prototype.requestExtension);
    this.router.put('/order/deliver-order/:orderId', Update.prototype.deliverOrder);
    this.router.put('/order/approve-order/:orderId', Update.prototype.approveOrder);
    this.router.put('/order/gig/:type/:orderId', Update.prototype.deliveryDate);
    this.router.put('/order/notification/mark-as-read', Update.prototype.markNotificationAsRead);

    return this.router;
  }
}

export const orderRoutes: OrderRoutes = new OrderRoutes();
