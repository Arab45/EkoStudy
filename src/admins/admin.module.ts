import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admins, adminSchema } from 'src/schema/Admins.schema';
import { AdminController } from './admin.controller';

@Module({
  imports:[MongooseModule.forFeature([{name: Admins.name, schema: adminSchema}])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminsModule {}
