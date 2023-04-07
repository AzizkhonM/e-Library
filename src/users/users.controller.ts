import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { PhoneUserDto } from './dto/phone-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginAdminDto } from '../admin/dto/login-admin.dto';
import { LoginUserDto } from './dto/login_user.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { ActiveAdminGuard } from '../guards/active_admin.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminSelfGuard } from '../guards/admin-self.guard';

@ApiTags("Foydalanuvchilar ustida amallar")
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Ro'yxatdan o'tish" })
  @Post("register")
  create(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    return this.usersService.registration(createUserDto, res);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @Post("login")
  login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    return this.usersService.login(loginUserDto, res);
  }

  @ApiOperation({ summary: "Foydalanuvchini faollashtirish" })
  @Get("activate/:link")
  activate(@Param("link") link: string){
    return this.usersService.activate(link)
  }

  @ApiOperation({ summary: "Tizimdan chiqish" })
  @Post("signout")
  logout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ){
    return this.usersService.logout(refreshToken, res)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(ActiveAdminGuard)
  @Get("all")
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(ActiveAdminGuard)
  @UseGuards(AdminSelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(ActiveAdminGuard)
  @UseGuards(AdminSelfGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @UseGuards(ActiveAdminGuard)
  @UseGuards(AdminSelfGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
