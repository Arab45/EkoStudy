import { IsEmail, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class UpdateAdminDto {
    @IsString()
    @IsOptional()
    fullName?: string

    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string

    @IsString()
    @MinLength(8)
    @IsOptional()
    @Matches(/^[A-Za-z0-9]+$/)
    password?: string
}