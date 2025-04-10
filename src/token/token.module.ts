import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { tokenSchema } from 'src/schema/token.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Token', schema: tokenSchema }])
    ],
  providers: [TokenService],
  exports: [TokenService, MongooseModule], // export it so AuthModule can use it
})
export class TokenModule {}
