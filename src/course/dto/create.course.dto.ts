import { IsArray, IsEmpty, IsString } from "class-validator";

export class CreateCourseDto {
    @IsEmpty()
    @IsString()
    courseUnit: string;
    
    @IsEmpty()
    @IsArray()
    courseOutline: string[];

    @IsEmpty()
    @IsString()
    courseContent: string;

    @IsEmpty()
    @IsString()
    pastQuestions: string;
}