import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateStaffDto {

    @ApiProperty({ example: "FirstName", description: "Xodimning ismi" })
    @IsString()
    @IsNotEmpty()
    first_name: string

    @ApiProperty({ example: "LastName", description: "Xodimning familiyasi" })
    @IsString()
    @IsNotEmpty()
    last_name: string

}