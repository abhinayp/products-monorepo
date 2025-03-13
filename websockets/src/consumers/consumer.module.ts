import { Module } from '@nestjs/common';
import { ConsumerController } from './consumer.controller';
import { CartTopic } from './topics/cart.topic';

@Module({
  imports: [],
  controllers: [ConsumerController],
  providers: [CartTopic],
})
export class ConsumerModule {}
