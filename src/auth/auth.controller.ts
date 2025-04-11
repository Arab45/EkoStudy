import { Controller, Post, Body, Res, HttpCode, Param, Get } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    // const token = await this.authService.login(user);
    const token = await this.authService.generateToken(user)
    console.log("My token details", token);
    return user;
  }

  @Post('verify-login/:userId')
  async verifyLogin(
    @Body() otp: string,
    @Param('userId') userId: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.authService.verifyLoginToken(otp, userId)
    const token = await this.authService.login(userId);
    res.cookie('jwt', token.access_token, {
      httpOnly: true, // prevents JS access
      secure: process.env.NODE_ENV === 'production', // send only over HTTPS
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60, // 1 hour
    });
  }

  @Get('logout')
  async logout (@Res() res: Response){
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,        // true if using HTTPS
      sameSite: 'lax',  // adjust if needed
    })

    return await this.authService.logout(res)
  }
}
