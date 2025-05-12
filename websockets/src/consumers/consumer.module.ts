import { Module } from '@nestjs/common';
import { ConsumerController } from './consumer.controller';
import { CartTopic } from './topics/cart.topic';
import { GatewayModule } from 'src/gateway/gateway.module';
import { OrdersTopic } from './topics/orders.topic';
@Module({
  imports: [GatewayModule],
  controllers: [ConsumerController],
  providers: [CartTopic, OrdersTopic],
})
export class ConsumerModule {}
