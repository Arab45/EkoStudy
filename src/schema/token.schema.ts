import {  Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose"


@Schema({ })
export class Token {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: "User"})
    owner: MongooseSchema.Types.ObjectId;
    @Prop({ require: true })
    token: string;
}

export const tokenSchema = SchemaFactory.createForClass(Token)