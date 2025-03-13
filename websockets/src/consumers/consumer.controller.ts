import { Controller } from "@nestjs/common";
import { Payload, Ctx, KafkaContext, EventPattern } from "@nestjs/microservices";
import { CartDTO } from "./dto/cart.dto";
import { CartTopic } from "./topics/cart.topic";

@Controller('')
export class ConsumerController {

  constructor(private readonly cartTopic: CartTopic) {}

  @EventPattern('cart')
  async cart(@Payload() data: CartDTO, @Ctx() context: KafkaContext) {
    switch (data.event) {
      case 'update_metrics':
        await this.cartTopic.updateMetrics(data, context);
        break;
    }
  }
}
