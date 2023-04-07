import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { IsAdminGuard } from '../guards/is_admin.guard';

@ApiTags("Viloyatlar ustida amallar")
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: "Viloyat qo'shish" })
  @Post("add")
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Barcha viloyatlarni ko'rish" })
  @Get("all")
  findAll() {
    return this.regionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Viloyatlarni ID si bo'yicha ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: "Viloyatlar ma'lumotlarini o'zgaritirish" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: "Viloyatni o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
