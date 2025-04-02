import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateAdminDto } from "./dto/createAdminDto";
import { AdminService } from "./admin.service";
import { UpdateAdminDto } from "./dto/updateAdminDto";


@Controller('admin')
export class AdminController{
    constructor(
        private readonly adminSvc: AdminService
    ){}
    @Post()
    createAdmin(@Body() createAdminDto: CreateAdminDto){
        return this.adminSvc.createAdmin(createAdminDto)
    }

    @Get()
    fetchAll(){
        return this.adminSvc.fetchAll()
    }

    @Get(":id")
    fetchSingle(@Param("id") id: string){
        return this.adminSvc.fetchSingle(id)
    }

    @Put(":id")
    updateAdmin(@Param("id") id: string, @Body() updatAdmineDto: UpdateAdminDto){
        return  this.adminSvc.updateAdmin(id, updatAdmineDto)
    }

    @Delete(":id")
    deleteAdmin(@Param("id") id: string){
        return this.adminSvc.deleteAdmin(id)
    }
}