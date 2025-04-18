import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Patch(':id')
  @UseInterceptors(FileInterceptor('profileImg'))
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (user.profileImgId) {
      await this.cloudinaryService.deleteImage(user.profileImgId);
    }

    const uploaded = await this.cloudinaryService.uploadImage(file, `users/${id}`);

    const updatedUser = await this.usersService.update(id, {
      profileImg: uploaded.secure_url,
      profileImgId: uploaded.public_id,
    });

    console.log(updatedUser);

    return {
      message: 'Profile image updated successfully',
      data: {
        // profileImg: updatedUser.profileImg,
      },
    };
    // return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
