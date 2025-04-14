import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admin.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './email/mail.module';
import { TokenModule } from './token/token.module';
@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ), //Load environment variable
    MongooseModule.forRoot(process.env.MONGO_URI || "mongodb://localhost:27017CRUD"),
    UsersModule,
    AdminsModule,
    AuthModule,
    MailModule,
    TokenModule
  ],
})
export class AppModule { }
