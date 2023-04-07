import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsBoolean } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {

    @ApiProperty({ example: "false", description: "Faol/Faol emaslik" })
    @IsBoolean()
    is_active?: true

}