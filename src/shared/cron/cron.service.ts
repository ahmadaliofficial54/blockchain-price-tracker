import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PriceService } from '../../prices/prices.service';
import { ApiService } from '../api/api.service';

@Injectable()
export class CronService {
  constructor(
    private priceService: PriceService,
    private apiService: ApiService,
  ) {}

  @Cron('*/5 * * * *')
  async handleCron() {
    const ethPrice = await this.apiService.getEthereumPrice();
    const polygonPrice = await this.apiService.getPolygonPrice();
    await this.priceService.savePrice('ethereum', ethPrice);
    await this.priceService.savePrice('polygon', polygonPrice);

    await this.priceService.checkPriceAlerts('ethereum', ethPrice);
    await this.priceService.checkPriceAlerts('polygon', polygonPrice);
  }
}
