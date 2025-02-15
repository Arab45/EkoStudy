import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjaModule } from './ninja/ninja.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [NinjaModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
