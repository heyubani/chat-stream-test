import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = +process.env.APP_PORT || 3000;

  app.setGlobalPrefix('/api/v1');
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
