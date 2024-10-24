import { Controller, Post, Body } from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateAlertDto } from '../prices/dtos/create-alert.dto';

@Controller('alerts')
export class AlertController {
  constructor(private alertService: AlertService) {}

  @Post()
  async setAlert(@Body() createAlertDto: CreateAlertDto) {
    const { chain, dollar, email } = createAlertDto;
    return this.alertService.createAlert(chain, dollar, email);
  }
}
