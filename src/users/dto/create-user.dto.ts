import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: "username", description: "username" })
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty({ example: "password", description: "Parol" })
    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string

    @ApiProperty({ example: "mail.@mail.uz", description: "E-mail" })
    @IsString()
    @IsNotEmpty()
    email: string

}