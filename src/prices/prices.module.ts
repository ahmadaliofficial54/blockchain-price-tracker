import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceService } from './prices.service';
import { PriceController } from './prices.controller';
import { Price } from './entities/price.entity';
import { ApiService } from '../shared/api/api.service';
import { MailerService } from '../shared/mailer/mailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Price])],
  controllers: [PriceController],
  providers: [PriceService, ApiService, MailerService],
})
export class PriceModule {}
