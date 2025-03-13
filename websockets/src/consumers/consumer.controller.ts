import { Controller, Logger } from "@nestjs/common";
import { Payload, Ctx, KafkaContext, EventPattern } from "@nestjs/microservices";
import { CartDTO } from "./dto/cart.dto";
import { CartTopic } from "./topics/cart.topic";

@Controller('')
export class ConsumerController {

  constructor(private readonly cartTopic: CartTopic) {}

  @EventPattern('cart')
  async cart(@Payload() data: CartDTO, @Ctx() context: KafkaContext) {
    const logger = new Logger("CartTopic");
    logger.log(`Received cart event: '${data.event}', data: ${JSON.stringify(data)}`);
    switch (data.event) {
      case 'update_metrics':
        await this.cartTopic.updateMetrics(data, context);
        break;
    }
  }
}
