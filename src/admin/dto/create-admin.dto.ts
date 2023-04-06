import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateAdminDto {

    @ApiProperty({ example: "Name", description: "Admin username i" })
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty({ example: "email@mail.com", description: "E-mail" })
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty({ example: "Password", description: "Parol" })
    @IsString()
    @IsStrongPassword()
    @IsNotEmpty()
    @MinLength(8)
    password: string

}