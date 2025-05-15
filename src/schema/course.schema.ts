import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Course extends Document {
    @Prop({ required: true })
    courseUnit: string;
    @Prop({type: [String], required: true })
    courseOutline: string[];
    @Prop({ required: true })
    courseContent: number;
    @Prop({ required: true })
    patQuestion: string;
};

export const courseSchema = SchemaFactory.createForClass(Course);