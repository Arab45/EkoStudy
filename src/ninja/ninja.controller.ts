import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjaService } from './ninja.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('ninja')
export class NinjaController {
    constructor( private readonly ninjaService: NinjaService ){}
    // Get ninja 
    @Get()
    getNinja(@Query("weapon") weapon: 'knife' | 'gun') {
        return this.ninjaService.getNinjas(weapon);
    }

    //Findone by id
    @Get(":id")
    getOneNinja(@Param ("id") id: string){
        return this.ninjaService.getNinja( +id)
    }

    //UpdateOne by id
    @Post()
    createOne(@Body() createNinjaDto: CreateNinjaDto ){
        return this.ninjaService.createNinja(createNinjaDto)
    }

    @Put(":id")
    updateNinja(@Param("id") id: string, @Body() updateNinjaDto: UpdateNinjaDto){
        return this.ninjaService.updateNinja( +id, updateNinjaDto);
    }

    @Delete(":id")
    deleteNinja(@Param("id") id: string){
        return this.ninjaService.removeNinja( +id)
    }
    //for query in nest js
    // @Get()
    // getQuery(@Query('type') type: string){
    //     return [{ type }]
    // }
}
