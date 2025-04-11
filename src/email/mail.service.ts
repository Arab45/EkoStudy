import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}


  async sendSignupConfirmation(to: string, username: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to ziPay!',
      template: './signup',
      context: { username },
    });
  }

  async sendOtp(to: string, username: string, token: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Your One-Time Password (OTP)',
      template: './verificationEmailToken',
      context: { username, token },
    });
  }

  async sendForgotPassword(to: string, resetLink: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Reset Your Password',
      template: 'forgot-password',
      context: { resetLink },
    });
  }
}
