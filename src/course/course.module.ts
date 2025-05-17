export { Module } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, courseSchema } from 'src/schema/course.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Course.name, schema: courseSchema}])], // Assuming you have a CourseSchema defined
    controllers: [CourseController],
    providers: [CourseService],
})

export class CourseModule {}