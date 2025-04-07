import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schema/User.schema';
import { MailModule } from 'src/email/mail.module';

@Module({
  imports: [ MongooseModule.forFeature([{ name: User.name, schema: userSchema}]), MailModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
