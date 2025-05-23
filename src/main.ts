import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLogger } from '@shared/logger/winston-logger';

async function bootstrap() {
  const logger = WinstonLogger.getInstance();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
}
bootstrap();
