import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Using port 3002 as requested to avoid conflicts
  app.enableCors();
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
