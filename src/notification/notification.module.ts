import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Notification, notificationSchema } from "src/schema/Notification.schema";
import { NotificationControlller } from "./notification.controller";
import { NotificationService } from "./notification.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Notification.name, schema: notificationSchema}])],
    controllers: [NotificationControlller],
    providers: [NotificationService]
})

export class NotificationModule { }