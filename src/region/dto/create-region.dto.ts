import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRegionDto {

    @ApiProperty({ example: "Region", description: "Viloyat nomi" })
    @IsString()
    @IsNotEmpty()
    name: string

}