import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Course } from "src/schema/course.schema";
import { CreateCourseDto } from "./dto/create.course.dto";

@Injectable()
export class CourseService {
    constructor(
        @InjectModel(Course.name) private courseModel: Model<Course>
    ) { }
    async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
        const newCourse = new this.courseModel(createCourseDto);
        return await newCourse.save();

    }

    async getAll(): Promise<Course[]> {
        return await this.courseModel.find();
    }

    async getOne(id: string): Promise<Course | null> {
        if (!id) {
            throw new Error("Id is required");
        }
        return await this.courseModel.findById(id);
    };

    async updateCourse(id: string, updateCourseDto: CreateCourseDto): Promise<Course | null> {
        if (!id) {
            throw new Error("Id is required");
        }
        return await this.courseModel.findByIdAndUpdate(id, updateCourseDto)
    };

    async deleteCourse(id: string): Promise<Course | null> {
        if (!id) {
            throw new Error("Id is required");
        }
        return await this.courseModel.findByIdAndDelete(id);
    }
}