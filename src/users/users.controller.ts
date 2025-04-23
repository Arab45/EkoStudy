import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Request, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/common/multer.config';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('createUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto.password, createUserDto)
  }

  @Get('findAllUser')
  findAll() {
    return this.usersService.findAll();
  }

    // 🔐 New protected route: /users/profile
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user; // req.user is populated by JwtStrategy
    }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('profileImg', multerConfig))
  async updateProfile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedData: any = { ...updateUserDto };

    if (file) {
      const imageUrl = await this.cloudinaryService.uploadImage(file);
      updatedData.profileImg = imageUrl.url;
      updatedData.profileImgId = imageUrl.public_id
    };
    
    return this.usersService.update(id, updatedData);
    
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
