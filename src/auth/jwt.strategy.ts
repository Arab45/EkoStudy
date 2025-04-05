import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          // Extract token from cookies
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['jwt'];
            return token;
          }
          return null; // If no token in cookies, return null
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: 'supersecretkey', // same as in auth.module
    });
  }

  async validate(payload: any) {
    console.log('error payload or success', payload)
    return { userId: payload.sub, email: payload.email };
  }
}
