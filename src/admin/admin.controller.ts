import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Response } from "express"
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminSelfGuard } from '../guards/admin-self.guard';
import { OnlyOwnerGuard } from '../guards/only-owner.guard';
import { ActiveAdminGuard } from '../guards/active_admin.guard';

@ApiTags("Admin ustida amallar")
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: "Ro'yxatdan o'tish" })
  @Post("register")
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @Post("login")
  login(@Body() loginAdminDto: LoginAdminDto, @Res({ passthrough: true }) res: Response) {
    return this.adminService.login(loginAdminDto, res)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(ActiveAdminGuard)
  @ApiOperation({ summary: "Barcha adminlarni ko'rish" })
  @Get("all")
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(OnlyOwnerGuard)
  @ApiOperation({ summary: "Loyiha egasi qilish" })
  @Get("makeowner/:id")
  makeOwner(@Param("id") id: string) {
    return this.adminService.makeowner(+id);
  }

  @UseGuards(OnlyOwnerGuard)
  @ApiOperation({ summary: "Loyiha egasiligidan mahrum qilish" })
  @Get("notmakeowner/:id")
  notMakeOwner(@Param("id") id: string) {
    return this.adminService.notmakeowner(+id);
  }

  @UseGuards(OnlyOwnerGuard)
  @ApiOperation({ summary: "Faollashtirish" })
  @Post("activate/:id")
  activate(@Param("id") id: string) {
    return this.adminService.activate(+id);
  }

  @UseGuards(OnlyOwnerGuard)
  @ApiOperation({ summary: "Faolsizlashtirish" })
  @Post("deactivate/:id")
  deactivate(@Param("id") id: string) {
    return this.adminService.deactivate(+id); 
  }


  @UseGuards(JwtAuthGuard)
  @UseGuards(ActiveAdminGuard)
  @UseGuards(AdminSelfGuard)
  @ApiOperation({ summary: "Adminlarni ID si bo'yicha ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(ActiveAdminGuard)
  @UseGuards(AdminSelfGuard)
  @ApiOperation({ summary: "Adminlar ma'lumotlarini o'zgartirish" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminSelfGuard)
  @ApiOperation({ summary: "Adminni o'chirib tashlash" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
