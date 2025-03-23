import { Module } from '@nestjs/common';
import { NinjaController } from './ninja.controller';
import { NinjaService } from './ninja.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ninja, ninjaSchema } from 'src/schema/Ninja.schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Ninja.name, schema: ninjaSchema}])],
  controllers: [NinjaController],
  providers: [NinjaService]
})
export class NinjaModule {}
