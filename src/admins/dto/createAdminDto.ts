import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateAdminDto {
    @IsString()
    @IsNotEmpty()
    fullName: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^[A-Za-z0-9]+$/)
    password: string
}