import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AdminService } from "src/admins/admin.service";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';


Injectable()
export class AuthService{
constructor(
    private readonly adminSvc: AdminService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
){}

async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.find(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}