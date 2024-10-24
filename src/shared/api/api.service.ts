import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
  async getEthereumPrice(): Promise<number> {
    const response = await axios.get('https://api.moralis.io/eth-price');
    return response.data.price;
  }

  async getPolygonPrice(): Promise<number> {
    const response = await axios.get('https://api.solscan.io/polygon-price');
    return response.data.price;
  }
}
