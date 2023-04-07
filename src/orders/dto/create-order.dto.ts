import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
    
    @ApiProperty({ example: "1", description: "Kitob ID raqami" })
    @IsNumber()
    @IsNotEmpty()
    book_id: number

    @ApiProperty({ example: "1", description: "Foydalanuvchi ID raqami" })
    @IsNumber()
    @IsNotEmpty()
    user_id: number

}