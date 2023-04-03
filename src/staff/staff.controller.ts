import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Xodimlar ustida amallar")
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @ApiOperation({ summary: "Xodim qo'shish" })
  @Post("add")
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @ApiOperation({ summary: "Barcha xodimlarni ko'rish" })
  @Get("all")
  findAll() {
    return this.staffService.findAll();
  }

  @ApiOperation({ summary: "Xodimlarni ID si bo'yicha ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(+id);
  }

  @ApiOperation({ summary: "Xodimlar ma'lumotlarini o'zgartirish" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @ApiOperation({ summary: "Xodimni o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }
}
