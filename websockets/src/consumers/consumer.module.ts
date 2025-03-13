import { Module } from '@nestjs/common';
import { ConsumerController } from './consumer.controller';
import { CartTopic } from './topics/cart.topic';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [GatewayModule],
  controllers: [ConsumerController],
  providers: [CartTopic],
})
export class ConsumerModule {}
