import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {

    @ApiProperty({ example: "1", description: "Muqova turi ID raqami" })
    @IsNumber()
    cover_id: number
    
}