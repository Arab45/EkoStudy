import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ })
export class Ninja {
    @Prop({unique: true, require: true})
    userName: string;
    @Prop({unique: true, require: true})
    capacity: string;
    @Prop({unique: true, require: true})
    status: string;
}

export const ninjaSchema = SchemaFactory.createForClass(Ninja)