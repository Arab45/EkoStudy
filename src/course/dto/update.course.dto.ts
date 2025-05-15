import { IsArray, IsEmpty, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {
    @IsEmpty()
    @IsString()
    @IsOptional()
    courseUnit: string;
    
    @IsEmpty()
    @IsArray()
    @IsOptional()
    courseOutline: string[];

    @IsEmpty()
    @IsString()
    @IsOptional()
    courseContent: string;

    @IsEmpty()
    @IsString()
    @IsOptional()
    pastQuestions: string;
}