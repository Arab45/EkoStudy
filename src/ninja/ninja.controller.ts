import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { NinjaService } from './ninja.service';
import { CreateNinjaDto } from './dto/create.dto';
import { UpdateNinjaDto } from './dto/update.dto';

@Controller('ninja')
export class NinjaController {
    constructor(private readonly ninjaService: NinjaService) { }
    @Post()
    createNinja(@Body() createDto: CreateNinjaDto) {
        return this.ninjaService.createNinja(createDto)
    }

    @Get(":id")
    singleNinja(@Param("id") id: string) {
        return this.ninjaService.singleNinja(id)
    }

    @Get()
    allNinja() {
        return this.ninjaService.allNinja();
    }

    @Delete(":id")
    deleteNinja(@Param("id") id: string) {
        return this.ninjaService.deleteNinja(id)
    }

    @Put(":id")
    updateNinja(@Param("id") id: string, @Body() updateDto: UpdateNinjaDto) {
        return this.ninjaService.updateNinja(id, updateDto);
    }
}
