import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ninja } from 'src/schema/Ninja.schema';
import { CreateNinjaDto } from './dto/create.dto';
import { UpdateNinjaDto } from './dto/update.dto';

@Injectable()
export class NinjaService {
    constructor(
        @InjectModel(Ninja.name) private ninjaModel: Model<Ninja>,
    ) { }
  createNinja(createDto: CreateNinjaDto) {
        const newUser = new this.ninjaModel(createDto)
        return newUser.save()
    }

    allNinja() {
        return this.ninjaModel.find();
    }

   async  singleNinja(id: string) {
        return this.ninjaModel.findById(id);
    }


     async updateNinja(id: string, updateDto: UpdateNinjaDto) {
        return this.ninjaModel.findByIdAndUpdate(id, updateDto)
    }

    async deleteNinja(id: string) {
        return this.ninjaModel.findByIdAndDelete(id)
    }
}
