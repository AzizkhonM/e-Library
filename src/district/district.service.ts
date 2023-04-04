import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './models/district.model';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private readonly districtRepo: typeof District) {}

  create(createDistrictDto: CreateDistrictDto) {
    return this.districtRepo.create(createDistrictDto);
  }

  findAll() {
    return this.districtRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.districtRepo.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return this.districtRepo.update(updateDistrictDto, { where: { id }, returning: true });
  }

  remove(id: number) {
    return this.districtRepo.destroy({ where: { id } });
  }
}
