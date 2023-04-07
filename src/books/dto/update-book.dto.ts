import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {}