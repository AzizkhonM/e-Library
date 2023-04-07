import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../users/models/user.model';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [SequelizeModule.forFeature([Order, User]), JwtModule.register({})],
  controllers: [OrdersController],
  providers: [OrdersService, UsersService, MailService]
})
export class OrdersModule {}
