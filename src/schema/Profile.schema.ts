import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({ timestamps: true })
export class  Profile extends Document {
    @Prop({  })
    fullName: string
    @Prop({  })
    username: string
    @Prop({  })
    description: string
    @Prop({  })
    avatar_img: string
}

export const profileSchema = SchemaFactory.createForClass(Profile)