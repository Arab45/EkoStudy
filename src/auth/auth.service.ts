import { Injectable } from "@nestjs/common";
import { AdminService } from "src/admins/admin.service";

Injectable()
export class AuthService{
constructor(
    private readonly adminSvc: AdminService
){}
}