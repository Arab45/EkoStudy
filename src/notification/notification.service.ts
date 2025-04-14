import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Notification } from "src/schema/Notification.schema";
import { CreateNotificationDto } from "./dto/createDto";
import { UpdateNotificationDto } from "./dto/updateDto";

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Notification.name) private noticationModel: Model<Notification>
    ) {}

    async createNotification (createNotificationDto: CreateNotificationDto){
        const newNotification = new this.noticationModel(createNotificationDto)
        return await newNotification.save();
    }

    async fetchAllNotification(){
        return this.noticationModel.find();
    }

    async fetchSingleNotification(id: string){
        return this.noticationModel.findById(id)
    }

    async updateNotification(id: string, updateNotificationDto: UpdateNotificationDto){
        return this.noticationModel.findByIdAndUpdate(id, updateNotificationDto);
    }

    async deleteNotification(id: string){
        return this.noticationModel.findByIdAndDelete(id)
    }
}