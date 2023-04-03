import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { StaffModule } from './staff/staff.module';
import { Staff } from './staff/models/staff.model';
import { RegionModule } from './region/region.module';

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
      models: [Staff],
      autoLoadModels: true,
      logging: true
    }),
    StaffModule,
    RegionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
