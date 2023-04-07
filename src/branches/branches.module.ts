import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Branch } from './models/branch.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Branch]), JwtModule.register({})],
  controllers: [BranchesController],
  providers: [BranchesService]
})
export class BranchesModule {}
