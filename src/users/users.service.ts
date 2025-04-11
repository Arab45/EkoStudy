import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import * as bcrypt from "bcryptjs"
import { Model } from 'mongoose';
import { User } from 'src/schema/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { MailService } from 'src/email/mail.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailService: MailService,
  ){}
  async create(password: string, createUserDto: CreateUserDto) {
   
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
   
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashPassword
    });
    await this.mailService.sendSignupConfirmation(newUser.email, newUser.username);
    return newUser.save()
  }

  //user validation middleware
  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
