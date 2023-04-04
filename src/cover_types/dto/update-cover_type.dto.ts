import { PartialType } from '@nestjs/swagger';
import { CreateCoverTypeDto } from './create-cover_type.dto';

export class UpdateCoverTypeDto extends PartialType(CreateCoverTypeDto) {}
