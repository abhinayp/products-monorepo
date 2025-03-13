import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConsumerModule } from './consumers/consumer.module';
import { RedisIoAdapter } from './adaptor/redis-io.adaptor';

async function bootstrap() {
  const app = await NestFactory.create(ConsumerModule);

  // Uncomment these lines to use the Redis adapter:
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
        clientId: 'websockets-client',
      }
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
