import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';

@Injectable()
export class StaffService {
  constructor(@InjectModel(Staff) private readonly staffRepo: typeof Staff) {}

  create(createStaffDto: CreateStaffDto) {
    return this.staffRepo.create(createStaffDto);
  }

  findAll() {
    return this.staffRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.staffRepo.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.staffRepo.update(updateStaffDto, { where: { id }, returning: true });
  }

  remove(id: number) {
    return this.staffRepo.destroy({ where: { id } });
  }
}
