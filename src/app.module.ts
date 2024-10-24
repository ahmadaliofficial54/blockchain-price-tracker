import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceModule } from './prices/prices.module';
import { AlertModule } from './alert/alert.module';
import { MailerService } from './shared/mailer/mailer.service';
import { ApiService } from './shared/api/api.service';
import { CronService } from './shared/cron/cron.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'price_tracker',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PriceModule,
    AlertModule,
  ],
  providers: [MailerService, ApiService, CronService],
})
export class AppModule {}
