import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { Token } from 'src/schema/token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from 'src/schema/User.schema';
import { MailService } from 'src/email/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService,
    private mailService: MailService,
    @InjectModel(Token.name) private tokenModel: Model<Token>,
     @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      // const { password, ...result } = user.toObject();
      console.log("password has been extracted", user);
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }


  async generateToken(user: any) {
    const token = await this.tokenService.generateToken(6);
    const hashToken = await bcrypt.hash(token, 10);

    console.log('my token =', token);
    const checkExistence = await this.tokenModel.findOne({ owner: user._id })

    if (checkExistence) {
      await this.tokenModel.findByIdAndDelete(checkExistence._id)
    } else {
      console.log("Unable to delete the token existed inide the database");
    }
    const newToken = new this.tokenModel({
      owner: user._id,
      token: hashToken
    })

    await this.mailService.sendOtp(user.email, user.username, token)

    await newToken.save();
    return newToken;
  };

  async verifyLoginToken(otp: string, userId: string) {
    if(!isValidObjectId(userId)){
      return UnauthorizedException
    }

    const userToken = await this.tokenModel.findOne({owner: userId});
    if(!userToken){
      return UnauthorizedException
    }

    const hashToken = userToken.token;
    const isTokenCorrect = bcrypt.compare(otp.toString(), hashToken);
    if(!isTokenCorrect){
      return BadRequestException
    }
  }

  async login(userId: any) {
    // const user = await this.userModel.findById({userId})
    // email: user.email,
    const payload = {  sub: userId._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(res){
    return res.status(200).json({ message: "logout successful!"})
  }

  async forgetPassword ({email: string, req}){
    const { email } = req.body;

    const user = await this.userModel.findOne({email})
    if(!user){
      throw new UnauthorizedException("No user data detected, signup instead");
    }
  }
}
