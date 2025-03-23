import { IsOptional, IsString } from "class-validator"

export class UpdateNinjaDto {
        @IsOptional()
        @IsString()
        userName?: string
    
        @IsOptional()
        @IsString()
        capacity?: string 
    
        @IsOptional()
        @IsString()
        status?: string
}