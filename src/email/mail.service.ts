import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}


  async sendSignupConfirmation(to: string, name: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to MyApp!',
      template: './signup',
      context: { name },
    });
  }

  async sendOtp(to: string, otp: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Your One-Time Password (OTP)',
      template: 'otp',
      context: { otp },
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
