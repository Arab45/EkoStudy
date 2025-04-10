import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService{
    async generateToken(length: number): Promise<string> {
        let otp: string = '';
      
        for (let i = 0; i < length; i++) {
          let generatotp = Math.round(Math.random() * 9);
          otp += generatotp.toString();  // Make sure it’s a string
        }
      
        return otp;
      }
}