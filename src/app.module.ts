import { Module } from '@nestjs/common';
import { NinjaModule } from './ninja/ninja.module';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admin.module';
// import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ 
    ConfigModule.forRoot(), //Load environment variable
    MongooseModule.forRoot( process.env.MONGO_URI || "mongodb://localhost:27017" ),
    NinjaModule, 
    // UsersModule, 
    AdminsModule,
    // AuthModule, 
  ],
})
export class AppModule {}
