import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookDto {

    @ApiProperty({ example: "Name", description: "Kitob nomi" })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: "1", description: "Muallif ID raqami" })
    @IsNumber()
    @IsNotEmpty()
    author_id: number

    @ApiProperty({ example: "100", description: "Kitob betlari soni" })
    @IsNumber()
    @IsNotEmpty()
    pages: number

    @ApiProperty({ example: "Publisher", description: "Nashriyotchi nomi" })
    @IsString()
    @IsNotEmpty()
    publisher: string

    @ApiProperty({ example: "2000", description: "Nashr etilgan yil" })
    @IsNumber()
    @IsNotEmpty()
    publication_year: number

    @ApiProperty({ example: "1", description: "Fillial ID raqami" })
    @IsNumber()
    @IsNotEmpty()
    branch_id: number

}