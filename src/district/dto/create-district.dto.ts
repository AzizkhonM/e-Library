import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateDistrictDto {

    @ApiProperty({ example: "District", description: "Tuman nomi" })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: "1", description: "Viloyat ID raqami" })
    @IsNumber()
    @IsNotEmpty()
    region_id: number

}