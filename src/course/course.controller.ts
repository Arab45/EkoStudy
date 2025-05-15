import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create.course.dto";

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Post('createCourse')
    async createCourse(@Body() createCourseDto: CreateCourseDto) {
        return this.courseService.createCourse(createCourseDto);
    };

    @Get('getAll')
    async getAll() {
        return this.courseService.getAll();
    };

    @Get('getOne/:id')
    async getOne(@Param('id') id: string) {
        return this.courseService.getOne(id);
    };

    @Put('updateCourse/:id')
    async updateCourse(@Param('id') id: string, @Body() updateCourseDto: CreateCourseDto) {
        return this.courseService.updateCourse(id, updateCourseDto);
    };

    @Delete('deleteCourse/:id')
    async deleteCourse(@Param('id') id: string) {
        return this.courseService.deleteCourse(id);
    }
}