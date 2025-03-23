// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AdminsService } from 'src/admins/admin.service';

// type AuthInput = { username: string; password: string }
// type SignInData = { adminId: number, username: string}
// type AuthResult = { accessToken: string, adminId: number, username: string }


// @Injectable()
// export class AuthService {
//     constructor(
//         private adminSvc: AdminsService
//     ){}

//     // async authenticateAdmin(  input: AuthInput ): Promise< AuthResult >{
//     //     const admin = await this.validateAdmin(input);

//     //     if(!admin){
//     //         throw new UnauthorizedException()
//     //     }

//     //     return{
//     //         accessToken: "fake-token",
//     //         adminId: admin.adminId,
//     //         username: admin.username
//     //     }
//     // }


//     // async validateAdmin( input: AuthInput ): Promise< SignInData | undefined >{
//     //     const admin = await this.adminSvc.findAdminByName( input.username )

//     //     if(admin && admin.password === input.password ){
//     //         return {
//     //             adminId: admin.adminId,
//     //             username: admin.username
//     //         }
//     //     }

//     //     return undefined
//     // }
// }
