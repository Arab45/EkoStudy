import { Module } from '@nestjs/common';
import { AdminsService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admins, adminSchema } from 'src/schema/Admins.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: Admins.name, schema: adminSchema}])],
  providers: [AdminsService],
  exports: [ AdminsService ]
})
export class AdminsModule {}
