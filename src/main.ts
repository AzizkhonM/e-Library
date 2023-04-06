import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from "cookie-parser"

const start = async () => {

  try {

    const app = await NestFactory.create(AppModule, { bodyParser: true })
    const PORT = process.env.PORT || 4000
    app.setGlobalPrefix("api")

    app.useGlobalPipes(new ValidationPipe())

    const options = {
      "origin":true,
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 200,
      "credentials":true,
      "allowedHeaders": "Content-Type, Accept,Authorization"
    }

    app.enableCors({
      "origin": "*",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      "optionsSuccessStatus": 204
    });

    const config = new DocumentBuilder()
      .setTitle("e-Library Project")
      .setDescription("Project e-Library")
      .setVersion("1.0.0")
      .addTag("NodeJS, NestJS, Postgres, Sequelize")
      .build()
    
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("/api/docs", app, document)

    app.use(cookieParser())

    app.listen(PORT, () => {
      console.log("Server", PORT, "- portda");
    })

  } catch (error) {
    
    console.log(error);

  }

}

start()