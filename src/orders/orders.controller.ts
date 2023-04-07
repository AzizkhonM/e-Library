import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsCustomerGuard } from '../guards/is_customer.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { IsAdminGuard } from '../guards/is_admin.guard';

@ApiTags("Buyurtmalar ustida amallar")
@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Buyurtma qo'shish" })
  @Post("add")
  create(
    @Body() createOrderDto: CreateOrderDto
    ) {
    return this.ordersService.create(createOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: "Barcha buyurtmalarni ko'rish" })
  @Get("all")
  findAll() {
    return this.ordersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Bir foydalanuvchiga tegishli buyurtmalarni ko'rish ko'rish" })
  @Get("customer/:id")
  findOneCustomers(@Param("id") id: string) {
    return this.ordersService.findOneCustomers(+id);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(IsAdminGuard)
  @ApiOperation({ summary: "Buyurtmalarni id bo'yicha ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Buyurtmani o'zgartirish" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Buyurtmani o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
