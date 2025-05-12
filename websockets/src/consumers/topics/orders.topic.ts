import { Injectable, Logger } from "@nestjs/common";
import { OrdersDTO } from "../dto/orders.dto";
import { KafkaContext } from "@nestjs/microservices";
import { OrdersGateway } from "src/gateway/orders.gateway";
@Injectable()
export class OrdersTopic {
  private readonly logger = new Logger("OrdersTopic");

  constructor(private readonly ordersGateway: OrdersGateway) {}

  async orderUpdated(data: OrdersDTO, context: KafkaContext) {
    this.logger.log(data.order_id);
    this.ordersGateway.server.to(String(data.order_id)).emit('update', {
      order_id: data.order_id,
    });
  }
}
