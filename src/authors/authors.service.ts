import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './models/author.model';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author) private readonly authorRepo: typeof Author) {}

  create(createAuthorDto: CreateAuthorDto) {
    return this.authorRepo.create(createAuthorDto);
  }

  findAll() {
    return this.authorRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.authorRepo.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.authorRepo.update(updateAuthorDto, { where: { id }, returning: true });
  }

  remove(id: number) {
    return this.authorRepo.destroy({ where: { id } });
  }
}
