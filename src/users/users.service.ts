import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Response } from 'express'
import * as bcrypt from "bcrypt"
import { v4 as uuidv4, v4 } from "uuid"
import * as crypto from "crypto"
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login_user.dto';
import { idText } from 'typescript';
import { where } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService
) {}

  async registration(createUserDto: CreateUserDto, res: Response){
    const user = await this.userRepo.findOne({
      where: {
        username: createUserDto.username
      }
    })
    if(user){
      throw new BadRequestException("Ushbu username band")
    }

    console.log("Salom");
    

    const hashed_password = await bcrypt.hash(createUserDto.password, 7)
    console.log("Salom1");
    
    const activation_link: string = uuidv4()

    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password: hashed_password,
      activation_link
    })
    console.log("Salom2");
    
    const tokens = await this.getTokens(newUser)
    console.log("Salom3");

    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7)

    console.log(newUser);

    const updatedUser = await this.userRepo.update({
      hashed_token: hashed_token
    },
    {
      where: {
        id: newUser.dataValues.id
      },
      returning: true
    })

    console.log(newUser.dataValues);

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    await this.mailService.sendUserConfirmation(newUser.dataValues)

    const response = {
      message: "Foydalanuvchining elektron pochta manziliga faollashtiruvchi havolali xat yuborildi",
      user: updatedUser.entries,
      tokens
    }

    return response
  }

  async activate(link: string){
    if(!link){
      throw new BadRequestException("Faollashtiruvchi havola topilmadi")
    }
    const updatedUser = await this.userRepo.update({is_active: true}, {where: { activation_link: link, is_active: false }, returning: true})

    if(!updatedUser[1][0]){
      throw new BadRequestException("Foydalanuvchi allaqachon faollashtirilgan")
    }

    const response = {
      message: "Foydalanuvchi muvaffaqiyatli faollashtirildi",
      user: updatedUser
    }

    return response
  }

  async logout(refreshToken: string, res: Response){
    const userData = await this.jwtService.verify(refreshToken,{
      secret: process.env.PRIVATE_KEY
    })
    console.log(userData);
    if(!userData){
      throw new ForbiddenException("Foydalanuvchi topilmadi")
    }
    const updatedUser = await this.userRepo.update({ hashed_token: null }, {where: {id: userData.id}, returning: true})

    res.clearCookie("refresh_token")

    const response = {
      message: "Foydalanuvchi tizimdan muvaffaiyatli chiqarildi",
      user: updatedUser[1][0]
    }

  }

  async login(loginUserDto: LoginUserDto, res: Response){
    const { username, password } = loginUserDto
    const user = await this.userRepo.findOne({ where: {username} })
    if(!user){
      throw new UnauthorizedException("Foydalanuvchi ro'yxatdan o'tmagan")
    }
    const IsPassTrue = await bcrypt.compare(password, user.hashed_password)
    if(!IsPassTrue){
      throw new UnauthorizedException("Parol noto'g'ri")
    }

    const tokens = await this.getTokens(user)

    const hashed_token = await bcrypt.hash(tokens.refresh_token, 7)

    const updatedUser = await this.userRepo.update({ hashed_token }, { where: { id: user.id }, returning: true })

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    const response = {
      message: "Foydalanuvchi tizimga muvaffaqiyatli kirdi",
      user: updatedUser[1][0],
      tokens
    }

    return response

  }

  findAll() {
    return this.userRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.userRepo.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(updateUserDto, { where: { id }, returning: true });
  }

  remove(id: number) {
    return this.userRepo.destroy({ where: { id } });
  }

  async getTokens(user: User){
    const jwtPayload = {
      id: user.id,
      is_active: user.is_active,
      is_admin: false
    }

    const [ accessToken, refreshToken ] = await Promise.all([
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
