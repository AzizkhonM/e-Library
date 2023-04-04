import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { StaffModule } from './staff/staff.module';
import { Staff } from './staff/models/staff.model';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { AuthorsModule } from './authors/authors.module';
import { Region } from './region/models/region.model';
import { District } from './district/models/district.model';
import { Author } from './authors/models/author.model';
import { BooksModule } from './books/books.module';
import { CoverTypesModule } from './cover_types/cover_types.module';
import { Book } from './books/models/book.model';
import { CoverType } from './cover_types/models/cover_type.model';
import { BranchesModule } from './branches/branches.module';
import { Branch } from './branches/models/branch.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Staff,
        Region,
        District,
        Author,
        Book,
        CoverType,
        Branch
      ],
      autoLoadModels: true,
      logging: true
    }),
    StaffModule,
    RegionModule,
    DistrictModule,
    AuthorsModule,
    BooksModule,
    CoverTypesModule,
    BranchesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
