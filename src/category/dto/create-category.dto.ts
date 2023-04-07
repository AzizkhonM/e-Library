import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {

    @ApiProperty({ example: "category", description: "Kitoblar kategoriyasi nomi" })
    name: string

}