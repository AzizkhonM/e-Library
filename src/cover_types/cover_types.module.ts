import { Module } from '@nestjs/common';
import { CoverTypesService } from './cover_types.service';
import { CoverTypesController } from './cover_types.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoverType } from './models/cover_type.model';

@Module({
  imports: [SequelizeModule.forFeature([CoverType])],
  controllers: [CoverTypesController],
  providers: [CoverTypesService]
})
export class CoverTypesModule {}
