import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as bcrypt from "bcrypt"
import { LoginAdminDto } from './dto/login-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly adminRepo: typeof Admin, private readonly jwtService: JwtService) {}

  async create(createAdminDto: CreateAdminDto) {
    let candid = await this.getUserByEmail(createAdminDto.email)
    if(candid){      
      throw new BadRequestException("Bunday foydalanuvchi tizimda mavjud!")
    }

    let admin = this.adminRepo.create(createAdminDto)

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7)
    
    return await this.adminRepo.update({ hashed_password, is_active: true }, { where: { id: (await admin).dataValues.id }, returning: true })

  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {

    let candid = await this.adminRepo.findOne({ where: { username: loginAdminDto.username } })
    if(!candid){
      throw new UnauthorizedException("Bunday foydalanuvchi tizimda mavjud emas!")
    }

    const isPassCorrect = await bcrypt.compare(loginAdminDto.password, candid.dataValues.hashed_password)
    if(!isPassCorrect){
      throw new UnauthorizedException("Parol noto'g'ri")
    }

    const tokens = await this.getTokens(candid)

    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7)

    const updatedAdmin = await this.adminRepo.update(
      { hashed_token },
      { where: { id: candid.id }, returning: true }
    )

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true 
    })

    return {
      message: "Tizimga muvaffaqiyatli kirdingiz",
      admin: updatedAdmin,
      tokens
    }
  }

  findAll() {
    return this.adminRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.adminRepo.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepo.update(updateAdminDto, { where: { id }, returning: true });
  }

  remove(id: number) {
    return this.adminRepo.destroy({ where: { id } });
  }

  async activate(id: number) {
    
    console.log(await this.adminRepo.findAll({ include: { all: true } }));

    let admin = await this.adminRepo.findByPk(id, { include: { all: true } })
    console.log(admin, id);
    
    if(!admin){
      throw new HttpException("Bunday admin topilmadi", HttpStatus.NOT_FOUND)
    }

    return this.adminRepo.update({ is_active: true }, { where: { id: admin.dataValues.id }, returning: true });
  }

  async deactivate(id: number) {
    
    console.log(await this.adminRepo.findAll({ include: { all: true } }));

    let admin = await this.adminRepo.findByPk(id, { include: { all: true } })
    console.log(admin, id);
    
    if(!admin){
      throw new HttpException("Bunday admin topilmadi", HttpStatus.NOT_FOUND)
    }

    return this.adminRepo.update({ is_active: false }, { where: { id: admin.dataValues.id }, returning: true });
  }

  async makeowner(id: number) {
    
    console.log(await this.adminRepo.findAll({ include: { all: true } }));

    let admin = await this.adminRepo.findByPk(id, { include: { all: true } })
    console.log(admin, id);
    
    if(!admin){
      throw new HttpException("Bunday admin topilmadi", HttpStatus.NOT_FOUND)
    }

    return this.adminRepo.update({ is_owner: true }, { where: { id: admin.dataValues.id }, returning: true });
  }

  async notmakeowner(id: number) {
    
    console.log(await this.adminRepo.findAll({ include: { all: true } }));

    let admin = await this.adminRepo.findByPk(id, { include: { all: true } })
    console.log(admin, id);
    
    if(!admin){
      throw new HttpException("Bunday admin topilmadi", HttpStatus.NOT_FOUND)
    }

    return this.adminRepo.update({ is_owner: false }, { where: { id: admin.dataValues.id }, returning: true });
  }

  private async getUserByEmail(email: string){
    const admin = await this.adminRepo.findOne({ where: { email }, include: { all: true }})
    return admin
  }

  async getTokens(admin: Admin) {
    const jwtPayload = {
      id: admin.id,
      is_active: admin.is_active,
      is_owner: admin.is_owner,
      is_admin: true
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.PRIVATE_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.PRIVATE_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      })
    ])

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }
  }

}
