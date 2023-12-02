import { Create } from '@gateway/controllers/gig/create';
import { Delete } from '@gateway/controllers/gig/delete';
import { Get } from '@gateway/controllers/gig/get';
import { Search } from '@gateway/controllers/gig/search';
import { GigSeed } from '@gateway/controllers/gig/seed';
import { Update } from '@gateway/controllers/gig/update';
import { authMiddleware } from '@gateway/services/auth-middleware';
import express, { Router } from 'express';

class GigRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/gig/:gigId', authMiddleware.checkAuthentication, Get.prototype.gigById);
    this.router.get('/gig/seller/:sellerId', authMiddleware.checkAuthentication, Get.prototype.getSellerGigs);
    this.router.get('/gig/seller/pause/:sellerId', authMiddleware.checkAuthentication, Get.prototype.getSellerPauedGigs);
    this.router.get('/gig/search/:from/:size/:type', authMiddleware.checkAuthentication, Search.prototype.gigs);
    this.router.get('/gig/category/:username', authMiddleware.checkAuthentication, Get.prototype.getGigsByCategory);
    this.router.get('/gig/top/:username', authMiddleware.checkAuthentication, Get.prototype.getTopRatedGigsByCategory);
    this.router.get('/gig/similar/:gigId', authMiddleware.checkAuthentication, Get.prototype.getMoreGigsLikeThis);
    this.router.post('/gig/create', authMiddleware.checkAuthentication, Create.prototype.gig);
    this.router.put('/gig/:gigId', authMiddleware.checkAuthentication, Update.prototype.gig);
    this.router.put('/gig/active/:gigId', authMiddleware.checkAuthentication, Update.prototype.gigActive);
    this.router.put('/gig/seed/:count', authMiddleware.checkAuthentication, GigSeed.prototype.gig);
    this.router.delete('/gig/:gigId/:sellerId', authMiddleware.checkAuthentication, Delete.prototype.gig);
    return this.router;
  }
}

export const gigRoutes: GigRoutes = new GigRoutes();
