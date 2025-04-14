import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { CreateNotificationDto } from "./dto/createDto";
import { UpdateNotificationDto } from "./dto/updateDto";

@Controller("notification")
export class NotificationControlller{
    constructor(
        private readonly notificationSvc: NotificationService
    ){}

    @Post()
    createNotification(@Body() createNotificationDto: CreateNotificationDto ){
        return this.notificationSvc.createNotification(createNotificationDto);
    }

    @Get()
    fetchAllNotification(){
        return this.notificationSvc.fetchAllNotification()
    }

    @Get(":id")
    fetchSingleNotification(@Param("id") id: string){
        return this.notificationSvc.fetchSingleNotification(id);
    }

    @Put(":id")
    async updateNotification(@Param("id") id: string, @Body() updateNotificationDto: UpdateNotificationDto){
        return this.notificationSvc.updateNotification(id, updateNotificationDto)
    }

    @Delete(":id")
    async deleteNotification(@Param("id") id: string){
        return this.notificationSvc.deleteNotification(id)
    }
} 