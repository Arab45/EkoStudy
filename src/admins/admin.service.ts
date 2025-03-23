import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admins } from 'src/schema/Admins.schema';
import { CreateAdminDto } from './dto/createAdminDto';
import { UpdateAdminDto } from './dto/updateAdminDto';



@Injectable()
export class AdminsService {
    constructor(
        @InjectModel(Admins.name) private adminModel: Model<Admins>
    ){}

    async createAdmin( createAdminDto: CreateAdminDto){
        const newAdmin = new this.adminModel(createAdminDto);
        await newAdmin.save()
    }

    async fetchAll (){
        return this.adminModel.find()
    }

    async fetchSingle(id: string){
        return this.adminModel.findById(id);
    }

    async updateAdmin(id: string, updateAdminDto: UpdateAdminDto){
        return this.adminModel.findByIdAndUpdate(id, updateAdminDto)
    }

    async deleteAdmin(id: string){
        return this.adminModel.findByIdAndDelete(id)
    }
}
