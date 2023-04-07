import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsAdminGuard } from '../guards/is_admin.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags("Kitoblar ustida amallar")
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: "Kitob qo'shish" })
  @Post("add")
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Barcha kitoblarni ko'rish" })
  @Get("all")
  findAll() {
    return this.booksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Kitoblarni ID si bo'yicha ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: "Kitoblar ma'lumotlarini o'zgaritirish" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: "Kitobni o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
