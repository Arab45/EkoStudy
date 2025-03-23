import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateNinjaDto {
    @IsNotEmpty()
    @IsString()
    userName: string

    @IsNotEmpty()
    @IsString()
    capacity: string 

    @IsNotEmpty()
    @IsString()
    status: string
}