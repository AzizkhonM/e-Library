import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCoverTypeDto {

    @ApiProperty({ example: "Type", description: "Muqova turi" })
    @IsString()
    @IsNotEmpty()
    name: string

}