import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAuthorDto {

    @ApiProperty({ example: "FirstName", description: "Muallif ismi" })
    @IsString()
    @IsNotEmpty()
    first_name: string

    @ApiProperty({ example: "LastName", description: "Muallif familiyasi" })
    @IsString()
    @IsNotEmpty()
    last_name: string

    @ApiProperty({ example: "2000", description: "Muallif tug'ilgan yili" })
    @IsNumber()
    @IsNotEmpty()
    birth_year: number

    @ApiProperty({ example: "2000", description: "Muallif vafot etgan yili" })
    @IsNumber()
    @IsNotEmpty()
    death_year: number

}