import { Injectable } from '@nestjs/common';
import { CreateCoverTypeDto } from './dto/create-cover_type.dto';
import { UpdateCoverTypeDto } from './dto/update-cover_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CoverType } from './models/cover_type.model';

@Injectable()
export class CoverTypesService {
  constructor(@InjectModel(CoverType) private readonly coverTypeRepo: typeof CoverType) {}

  create(createCoverTypeDto: CreateCoverTypeDto) {
    return this.coverTypeRepo.create(createCoverTypeDto);
  }

  findAll() {
    return this.coverTypeRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.coverTypeRepo.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateCoverTypeDto: UpdateCoverTypeDto) {
    return this.coverTypeRepo.update(updateCoverTypeDto, { where: { id }, returning: true });
  }

  remove(id: number) {
    return this.coverTypeRepo.destroy({ where: { id } });
  }
}
