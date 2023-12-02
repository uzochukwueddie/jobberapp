import { Create } from '@gateway/controllers/message/create';
import { Get } from '@gateway/controllers/message/get';
import { Update } from '@gateway/controllers/message/update';
import express, { Router } from 'express';

class MessageRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get('/message/conversation/:senderUsername/:receiverUsername', Get.prototype.conversation);
    this.router.get('/message/conversations/:username', Get.prototype.conversationList);
    this.router.get('/message/:senderUsername/:receiverUsername', Get.prototype.messages);
    this.router.get('/message/:conversationId', Get.prototype.userMessages);
    this.router.post('/message', Create.prototype.message);
    this.router.put('/message/offer', Update.prototype.offer);
    this.router.put('/message/mark-as-read', Update.prototype.markSingleMessage);
    this.router.put('/message/mark-multiple-as-read', Update.prototype.markMultipleMessages);
    return this.router;
  }
}

export const messageRoutes: MessageRoutes = new MessageRoutes();
