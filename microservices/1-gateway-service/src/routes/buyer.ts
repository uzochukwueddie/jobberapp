import { Get } from '@gateway/controllers/users/buyer/get';
import { authMiddleware } from '@gateway/services/auth-middleware';
import express, { Router } from 'express';

class BuyerRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/buyer/email', authMiddleware.checkAuthentication, Get.prototype.email);
    this.router.get('/buyer/username', authMiddleware.checkAuthentication, Get.prototype.currentUsername);
    this.router.get('/buyer/:username', authMiddleware.checkAuthentication, Get.prototype.username);
    return this.router;
  }
}

export const buyerRoutes: BuyerRoutes = new BuyerRoutes();
