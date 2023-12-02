import axios, { AxiosResponse } from 'axios';
import { AxiosService } from '@gateway/services/axios';
import { config } from '@gateway/config';
import { ISellerDocument } from '@uzochukwueddie/jobber-shared';

export let axiosSellerInstance: ReturnType<typeof axios.create>;

class SellerService {
  constructor() {
    const axiosService: AxiosService = new AxiosService(`${config.USERS_BASE_URL}/api/v1/seller`, 'seller');
    axiosSellerInstance = axiosService.axios;
  }

  async getSellerById(sellerId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosSellerInstance.get(`/id/${sellerId}`);
    return response;
  }

  async getSellerByUsername(username: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosSellerInstance.get(`/username/${username}`);
    return response;
  }

  async getRandomSellers(size: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosSellerInstance.get(`/random/${size}`);
    return response;
  }

  async createSeller(body: ISellerDocument): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosSellerInstance.post('/create', body);
    return response;
  }

  async updateSeller(sellerId: string, body: ISellerDocument): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosSellerInstance.put(`/${sellerId}`, body);
    return response;
  }

  async seed(count: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosSellerInstance.put(`/seed/${count}`);
    return response;
  }
}

export const sellerService: SellerService = new SellerService();
