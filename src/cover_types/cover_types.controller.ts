import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CoverTypesService } from './cover_types.service';
import { CreateCoverTypeDto } from './dto/create-cover_type.dto';
import { UpdateCoverTypeDto } from './dto/update-cover_type.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { IsAdminGuard } from '../guards/is_admin.guard';

@ApiTags("Muqova turlari ustida amallar")
@Controller('covertypes')
export class CoverTypesController {
  constructor(private readonly coverTypesService: CoverTypesService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: "Muqova turlari qo'shish" })
  @Post("add")
  create(@Body() createCoverTypeDto: CreateCoverTypeDto) {
    return this.coverTypesService.create(createCoverTypeDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Barcha muqova turlarini ko'rish" })
  @Get("all")
  findAll() {
    return this.coverTypesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Muqova turlarilarni ID si bo'yicha ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coverTypesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: "Muqova turlarilar ma'lumotlarini o'zgaritirish" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoverTypeDto: UpdateCoverTypeDto) {
    return this.coverTypesService.update(+id, updateCoverTypeDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: "Muqova turlarini o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coverTypesService.remove(+id);
  }
}
