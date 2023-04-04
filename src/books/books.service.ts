import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './models/book.model';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book) private readonly bookRepo: typeof Book) {}

  create(createBookDto: CreateBookDto) {
    return this.bookRepo.create(createBookDto);
  }

  findAll() {
    return this.bookRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.bookRepo.findByPk(id, { include: { all: true } });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepo.update(updateBookDto, { where: { id }, returning: true });
  }

  remove(id: number) {
    return this.bookRepo.destroy({ where: { id } });
  }
}
