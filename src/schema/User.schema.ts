import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class  User {
    @Prop({ required: true })
    fullName: string
    @Prop({ required: true })
    email: string
    @Prop({ required: true })
    password: string
}

export const userSchema = SchemaFactory.createForClass(User)