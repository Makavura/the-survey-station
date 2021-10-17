import { NestFactory, } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    "origin": ["*", "http://localhost:4200"],
    "allowedHeaders": ['Access-Control-Allow-Origin', '*'],
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
  await app.listen(3000, () =>{
    console.log('\x1b[33m%s\x1b[0m', `Survey Station REST API Running on PORT: ${3000}`)
  });
}
bootstrap();
