import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsDateString } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

    @ApiProperty({ example: "1111.11.11", description: "Kitob qaytariladigan sana" })
    @IsDateString()
    return_date?: string

}