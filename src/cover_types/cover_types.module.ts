import { Module } from '@nestjs/common';
import { CoverTypesService } from './cover_types.service';
import { CoverTypesController } from './cover_types.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoverType } from './models/cover_type.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([CoverType]), JwtModule.register({})],
  controllers: [CoverTypesController],
  providers: [CoverTypesService]
})
export class CoverTypesModule {}
