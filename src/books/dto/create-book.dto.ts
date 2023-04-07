import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Max } from "sequelize-typescript";

const a = 2023

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
    @IsNotEmpty()/* 
    @Min(1300)
    @Max(2023) */
    publication_year: number

    @ApiProperty({ example: "1", description: "Fillial ID raqami" })
    @IsNumber()
    @IsNotEmpty()
    branch_id: number

    @ApiProperty({ example: "1", description: "Kategoriya ID raqami" })
    @IsNumber()
    @IsNotEmpty()
    category_id: number

    @ApiProperty({ example: "1", description: "Muqova turi ID raqami" })
    @IsNumber()
    @IsNotEmpty()
    cover_id: number

    @ApiProperty({ example: "https://image.png", description: "Muqova rasmi" })
    @IsString()
    @IsNotEmpty()
    cover_image_link: string

}