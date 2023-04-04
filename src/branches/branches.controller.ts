import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Filliallar ustida amallar")
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @ApiOperation({ summary: "Fillial qo'shish" })
  @Post("add")
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }

  @ApiOperation({ summary: "Barcha filliallarni ko'rish" })
  @Get("all")
  findAll() {
    return this.branchesService.findAll();
  }

  @ApiOperation({ summary: "Filliallarni ID si bo'yicha ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchesService.findOne(+id);
  }

  @ApiOperation({ summary: "Filliallar ma'lumotlarini o'zgaritirish" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchesService.update(+id, updateBranchDto);
  }

  @ApiOperation({ summary: "Fillialni o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchesService.remove(+id);
  }
}
