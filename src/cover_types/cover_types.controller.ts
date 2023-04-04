import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoverTypesService } from './cover_types.service';
import { CreateCoverTypeDto } from './dto/create-cover_type.dto';
import { UpdateCoverTypeDto } from './dto/update-cover_type.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Muqova turlari ustida amallar")
@Controller('covertypes')
export class CoverTypesController {
  constructor(private readonly coverTypesService: CoverTypesService) {}

  @ApiOperation({ summary: "Muqova turlari qo'shish" })
  @Post("add")
  create(@Body() createCoverTypeDto: CreateCoverTypeDto) {
    return this.coverTypesService.create(createCoverTypeDto);
  }

  @ApiOperation({ summary: "Barcha muqova turlarini ko'rish" })
  @Get("all")
  findAll() {
    return this.coverTypesService.findAll();
  }

  @ApiOperation({ summary: "Muqova turlarilarni ID si bo'yicha ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coverTypesService.findOne(+id);
  }

  @ApiOperation({ summary: "Muqova turlarilar ma'lumotlarini o'zgaritirish" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoverTypeDto: UpdateCoverTypeDto) {
    return this.coverTypesService.update(+id, updateCoverTypeDto);
  }

  @ApiOperation({ summary: "Muqova turlarini o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coverTypesService.remove(+id);
  }
}
