import axios, { AxiosResponse } from 'axios';
import { AxiosService } from '@gateway/services/axios';
import { config } from '@gateway/config';

export let axiosBuyerInstance: ReturnType<typeof axios.create>;

class BuyerService {
  constructor() {
    const axiosService: AxiosService = new AxiosService(`${config.USERS_BASE_URL}/api/v1/buyer`, 'buyer');
    axiosBuyerInstance = axiosService.axios;
  }

  async getCurrentBuyerByUsername(): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosBuyerInstance.get('/username');
    return response;
  }

  async getBuyerByUsername(username: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosBuyerInstance.get(`/${username}`);
    return response;
  }

  async getBuyerByEmail(): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosBuyerInstance.get('/email');
    return response;
  }
}

export const buyerService: BuyerService = new BuyerService();
