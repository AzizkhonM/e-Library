import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class PhoneUserDto{
    @ApiProperty({ example: "9989999999", description: "Telefon raqami" })
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string
}