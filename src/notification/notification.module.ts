import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Notification, notificationSchema } from "src/schema/Notification.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Notification.name, schema: notificationSchema}])],
    controllers: [],
    providers: []
})

export class NotificationModule { }