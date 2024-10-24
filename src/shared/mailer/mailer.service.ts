import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  async sendAlertEmail(chain: string, price: number, email: string) {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: `${chain} Price Alert`,
      text: `The price of ${chain} has hit $${price}.`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
