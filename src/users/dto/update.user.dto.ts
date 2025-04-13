import { IsEmail, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    fullName?: string

    @IsString()
    @IsOptional()
    username?: string

    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string

    @IsString()
    @IsEmail()
    @IsOptional()
    forgetPassword?: string

    @IsString()
    @MinLength(8)
    @IsOptional()
    @Matches(/^[A-Za-z0-9]+$/)
    password?: string
}