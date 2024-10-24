import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Alert } from './entities/alert.entity';
import { MailerService } from '../shared/mailer/mailer.service';

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
    private mailerService: MailerService,
  ) {}

  async createAlert(chain: string, targetPrice: number, email: string) {
    const alert = this.alertRepository.create({ chain, targetPrice, email });
    return this.alertRepository.save(alert);
  }

  async checkAlerts(chain: string, currentPrice: number) {
    const alerts = await this.alertRepository.find({
      where: {
        chain,
        targetPrice: LessThanOrEqual(currentPrice),
      },
    });

    for (const alert of alerts) {
      await this.mailerService.sendAlertEmail(
        alert.chain,
        currentPrice,
        alert.email,
      );
    }
  }
}
