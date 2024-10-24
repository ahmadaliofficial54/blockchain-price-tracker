import { Controller, Get, Post, Body } from '@nestjs/common';
import { PriceService } from './prices.service';
import { CreateAlertDto } from './dtos/create-alert.dto';

@Controller('prices')
export class PriceController {
  constructor(private priceService: PriceService) {}

  @Get('/hourly')
  async getHourlyPrices() {
    return this.priceService.getHourlyPrices();
  }

  @Post('/set-alert')
  async setPriceAlert(@Body() createAlertDto: CreateAlertDto) {
    // Logic to handle setting the price alert
  }
}
