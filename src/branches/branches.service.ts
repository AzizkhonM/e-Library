import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Branch } from './models/branch.model';

@Injectable()
export class BranchesService {
  constructor(@InjectModel(Branch) private readonly branchRepo: typeof Branch) {}

  create(createBranchDto: CreateBranchDto) {
    return this.branchRepo.create(createBranchDto);
  }

  findAll() {
    return this.branchRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.branchRepo.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateBranchDto: UpdateBranchDto) {
    return this.branchRepo.update(updateBranchDto, { where: { id }, returning: true });
  }

  remove(id: number) {
    return this.branchRepo.destroy({ where: { id } });
  }
}
