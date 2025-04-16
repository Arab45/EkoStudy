import { IsOptional, IsString } from "class-validator";

export class UpdateNotificationDto {
    @IsString()
    @IsOptional()
    heading?: string;

    @IsString()
    @IsOptional()
    message?: string;

    @IsOptional()
    read?: boolean;
}