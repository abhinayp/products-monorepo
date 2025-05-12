import { Controller, Logger } from "@nestjs/common";
import { Payload, Ctx, KafkaContext } from "@nestjs/microservices";
import { CartDTO } from "./dto/cart.dto";
import { CartTopic } from "./topics/cart.topic";
import { SubscribeTopic } from "src/decorators/topic.decorator";
import { OrdersTopic } from "./topics/orders.topic";
import { OrdersDTO } from "./dto/orders.dto";
@Controller('')
export class ConsumerController {

  constructor(
    private readonly cartTopic: CartTopic,
    private readonly ordersTopic: OrdersTopic
  ) {}

  @SubscribeTopic('cart')
  async cart(@Payload() data: CartDTO, @Ctx() context: KafkaContext) {
    const logger = new Logger("CartTopic");
    logger.log(`Received cart event: '${data.event}', data: ${JSON.stringify(data)}`);
    switch (data.event) {
      case 'update_metrics':
        await this.cartTopic.updateMetrics(data, context);
        break;
    }
  }


  @SubscribeTopic('orders')
  async orders(@Payload() data: OrdersDTO, @Ctx() context: KafkaContext) {
    const logger = new Logger("OrdersTopic");
    logger.log(`Received orders event: '${data.event}', data: ${JSON.stringify(data)}`);
    switch (data.event) {
      case 'order_updated':
        await this.ordersTopic.orderUpdated(data, context);
        break;
    }
  }
}
