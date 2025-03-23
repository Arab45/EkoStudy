import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class  Admins {
    @Prop({ required: true, unique: true })
    fullName: string
    @Prop({ required: true, unique: true })
    email: string
    @Prop({ required: true })
    password: string
}

export const adminSchema = SchemaFactory.createForClass(Admins)