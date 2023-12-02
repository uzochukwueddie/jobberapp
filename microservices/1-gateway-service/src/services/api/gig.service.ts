import axios, { AxiosResponse } from 'axios';
import { AxiosService } from '@gateway/services/axios';
import { config } from '@gateway/config';
import { ISellerGig } from '@uzochukwueddie/jobber-shared';

export let axiosGigInstance: ReturnType<typeof axios.create>;

class GigService {
  constructor() {
    const axiosService: AxiosService = new AxiosService(`${config.GIG_BASE_URL}/api/v1/gig`, 'gig');
    axiosGigInstance = axiosService.axios;
  }

  async getGigById(gigId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosGigInstance.get(`/${gigId}`);
    return response;
  }

  async getSellerGigs(sellerId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosGigInstance.get(`/seller/${sellerId}`);
    return response;
  }

  async getSellerPausedGigs(sellerId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosGigInstance.get(`/seller/pause/${sellerId}`);
    return response;
  }

  async getGigsByCategory(username: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosGigInstance.get(`/category/${username}`);
    return response;
  }

  async getMoreGigsLikeThis(gigId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosGigInstance.get(`/similar/${gigId}`);
    return response;
  }

  async getTopRatedGigsByCategory(username: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosGigInstance.get(`/top/${username}`);
    return response;
  }

  async searchGigs(query: string, from: string, size: string, type: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosGigInstance.get(`/search/${from}/${size}/${type}?${query}`);
    return response;
  }

  async createGig(body: ISellerGig): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosGigInstance.post('/create', body);
    return response;
  }

  async updateGig(gigId: string, body: ISellerGig): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosGigInstance.put(`/${gigId}`, body);
    return response;
  }

  async deleteGig(gigId: string, sellerId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosGigInstance.delete(`/${gigId}/${sellerId}`);
    return response;
  }

  async updateActiveGigProp(gigId: string, active: boolean): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosGigInstance.put(`/active/${gigId}`, { active });
    return response;
  }

  async seed(count: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosGigInstance.put(`/seed/${count}`);
    return response;
  }
}

export const gigService: GigService = new GigService();
