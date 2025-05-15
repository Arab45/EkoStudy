import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Course } from "src/schema/course.schema";
import { CreateCourseDto } from "./dto/create.course.dto";

@Injectable()
export class CourseService{
constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>
){}
    async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
        const newCourse = new this.courseModel(createCourseDto);
        return await newCourse.save();{
       
    }
}}