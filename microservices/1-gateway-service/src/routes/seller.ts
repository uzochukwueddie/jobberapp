import { Create } from '@gateway/controllers/users/seller/create';
import { Get } from '@gateway/controllers/users/seller/get';
import { SellerSeed } from '@gateway/controllers/users/seller/seed';
import { Update } from '@gateway/controllers/users/seller/update';
import { authMiddleware } from '@gateway/services/auth-middleware';
import express, { Router } from 'express';

class SellerRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/seller/id/:sellerId', authMiddleware.checkAuthentication, Get.prototype.id);
    this.router.get('/seller/username/:username', authMiddleware.checkAuthentication, Get.prototype.username);
    this.router.get('/seller/random/:size', authMiddleware.checkAuthentication, Get.prototype.random);
    this.router.post('/seller/create', authMiddleware.checkAuthentication, Create.prototype.seller);
    this.router.put('/seller/:sellerId', authMiddleware.checkAuthentication, Update.prototype.seller);
    this.router.put('/seller/seed/:count', authMiddleware.checkAuthentication, SellerSeed.prototype.seller);

    return this.router;
  }
}

export const sellerRoutes: SellerRoutes = new SellerRoutes();
