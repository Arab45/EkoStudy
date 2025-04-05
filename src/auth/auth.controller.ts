import { Controller, Post, Body, Res, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    const token = await this.authService.login(user);

    res.cookie('jwt', token.access_token, {
      httpOnly: true, // prevents JS access
      secure: process.env.NODE_ENV === 'production', // send only over HTTPS
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    return user;
  }
}
