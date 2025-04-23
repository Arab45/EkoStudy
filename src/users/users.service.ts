import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import * as bcrypt from "bcryptjs"
import { Model } from 'mongoose';
import { User } from 'src/schema/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { MailService } from 'src/email/mail.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
// import { v2 as CloudinaryType } from 'cloudinary';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailService: MailService,
    private cloudinaryService: CloudinaryService
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

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async updatePassword(userId: string, newHashedPassword: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');
    user.forgetPassword = '',
    user.password = newHashedPassword;
    await user.save();
  }

  async updateProfile (){

  }
  
}
