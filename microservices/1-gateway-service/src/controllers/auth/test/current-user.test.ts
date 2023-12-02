import { Request, Response } from 'express';
import { authMock, authMockRequest, authMockResponse, authUserPayload } from '@gateway/controllers/auth/test/mocks/auth.mock';
import * as socketServer from '@gateway/server';
import { authService } from '@gateway/services/api/auth.service';
import { Server } from 'socket.io';
import { AxiosResponse } from 'axios';
import { CurrentUser } from '@gateway/controllers/auth/current-user';
import { GatewayCache } from '@gateway/redis/gateway.cache';

jest.mock('@uzochukwueddie/jobber-shared');
jest.mock('@gateway/services/api/auth.service');
jest.mock('@gateway/redis/gateway.cache');
jest.mock('@gateway/server');
jest.mock('@elastic/elasticsearch');

const USERNAME = 'Manny';
const PASSWORD = 'manny1';

Object.defineProperties(socketServer, {
  socketIO: {
    value: new Server(),
    writable: true
  }
});

describe('CurrentUser', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('read method', () => {
    it('should return authenticated user', async () => {
      const req: Request = authMockRequest({}, { username: USERNAME, password: PASSWORD }, authUserPayload) as unknown as Request;
      const res: Response = authMockResponse();
      jest.spyOn(authService, 'getCurrentUser').mockResolvedValue({data: { message: 'Current user data', user: authMock }} as unknown as AxiosResponse);

      await CurrentUser.prototype.read(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Current user data',
        user: authMock
      });
    });
  });

  describe('resendEmail method', () => {
    it('should return correct response', async () => {
      const req: Request = authMockRequest({}, { username: USERNAME, password: PASSWORD }, authUserPayload) as unknown as Request;
      const res: Response = authMockResponse();
      jest.spyOn(authService, 'resendEmail').mockResolvedValue({data: { message: 'Email sent successfully.', user: authMock }} as unknown as AxiosResponse);

      await CurrentUser.prototype.resendEmail(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Email sent successfully.',
        user: authMock
      });
    });
  });

  describe('getLoggedInUsers method', () => {
    it('should return correct response', async () => {
      const req: Request = authMockRequest({}, { username: USERNAME, password: PASSWORD }, authUserPayload) as unknown as Request;
      const res: Response = authMockResponse();
      jest.spyOn(GatewayCache.prototype, 'getLoggedInUsersFromCache').mockResolvedValue(['Manny', 'Danny']);
      jest.spyOn(socketServer.socketIO, 'emit');

      await CurrentUser.prototype.getLoggedInUsers(req, res);
      expect(socketServer.socketIO.emit).toHaveBeenCalledWith('online', ['Manny', 'Danny']);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User is online' });
    });
  });

  describe('removeLoggedInUser method', () => {
    it('should return correct response', async () => {
      const req: Request = authMockRequest({}, { username: USERNAME, password: PASSWORD }, authUserPayload, { username: 'Manny' }) as unknown as Request;
      const res: Response = authMockResponse();
      jest.spyOn(GatewayCache.prototype, 'removeLoggedInUserFromCache').mockResolvedValue(['Manny']);
      jest.spyOn(socketServer.socketIO, 'emit');

      await CurrentUser.prototype.removeLoggedInUser(req, res);
      expect(socketServer.socketIO.emit).toHaveBeenCalledWith('online', ['Manny']);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User is offline' });
    });
  });
});
