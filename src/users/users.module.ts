import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schema/User.schema';
import { MailModule } from 'src/email/mail.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
// import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [ MongooseModule.forFeature([{ name: User.name, schema: userSchema}]), MailModule, CloudinaryModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule]
})
export class UsersModule {}
