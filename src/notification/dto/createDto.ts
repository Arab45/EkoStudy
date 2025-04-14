import { IsOptional, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsString()
    @IsOptional()
    heading: string;

    @IsString()
    @IsOptional()
    message: string;

    @IsString()
    @IsOptional()
    read: boolean;
}