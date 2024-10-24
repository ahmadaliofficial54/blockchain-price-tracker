import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Price } from './entities/price.entity';
import { ApiService } from '../shared/api/api.service';
import { MailerService } from '../shared/mailer/mailer.service';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price) private priceRepository: Repository<Price>,
    private apiService: ApiService,
    private mailerService: MailerService,
  ) {}

  async savePrice(chain: string, price: number) {
    const priceEntity = this.priceRepository.create({ chain, price });
    await this.priceRepository.save(priceEntity);
  }

  async getHourlyPrices(): Promise<Price[]> {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.priceRepository.find({
      where: { timestamp: MoreThan(oneDayAgo) },
    });
  }

  async checkPriceAlerts(chain: string, currentPrice: number) {
    // Check for any alerts and send emails if necessary
  }
}
