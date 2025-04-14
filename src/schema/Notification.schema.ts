import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({ timestamps: true })
export class  Notification extends Document {
    @Prop({  })
    heading: string
    @Prop({ })
    message: string
    @Prop({ default: false })
    read: boolean
}

export const notificationSchema = SchemaFactory.createForClass(Notification)