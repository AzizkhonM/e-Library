import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class LoginAdminDto {

    @ApiProperty({ example: "Name", description: "Admin usernamei" })
    username: string

    @ApiProperty({ example: "Password", description: "Parol" })
    password: string

}