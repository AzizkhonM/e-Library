import { ExecutionContext, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private readonly orderRepo: typeof Order,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async create(createOrderDto: CreateOrderDto) {

    let time = String(new Date()).split(" ")
    let given_date = time[0] + " " + time[1] + " " + time[2] + " " + time[3]
    let new_date = new Date()
    new_date.setTime(new_date.getTime() + (10 * 24 * 60 * 60 * 1000));
    let newTime = String(new_date).split(" ")
    let return_date = newTime[0] + " " + newTime[1] + " " + newTime[2] + " " + newTime[3]

    return this.orderRepo.create({ ...createOrderDto, given_date, return_date })
  }

  findAll() {
    return this.orderRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.orderRepo.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    
    if(updateOrderDto.return_date){
      let date = String(new Date(updateOrderDto.return_date)).split(" ")
      let return_date = date[0] + " " + date[1] + " " + date[2] + " " + date[3]
      return this.orderRepo.update({ return_date }, { where: { id } })
    }

    return this.orderRepo.update(updateOrderDto, { where: { id }, returning: true })
  }

  remove(id: number) {
    return this.orderRepo.destroy({ where: { id } });
  }

  findOneCustomers(id: number){
    return this.orderRepo.findAll({where: { user_id: id }})
  }
}
