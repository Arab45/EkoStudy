import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admin.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './email/mail.module';
import { TokenModule } from './token/token.module';
import { NotificationModule } from './notification/notification.module';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { CourseModule } from './course/course.module';
@Module({
  imports: [
    MulterModule.register({
      storage: multer.memoryStorage(), // use in-memory buffer
    }),
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ), //Load environment variable
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    UsersModule,
    AdminsModule,
    AuthModule,
    MailModule,
    TokenModule,
    NotificationModule,
    CourseModule
  ],
})
export class AppModule { }
