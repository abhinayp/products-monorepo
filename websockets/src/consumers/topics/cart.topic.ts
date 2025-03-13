import { Injectable, Logger } from "@nestjs/common";
import { CartDTO } from "../dto/cart.dto";
import { KafkaContext } from "@nestjs/microservices";
import { ProductssGateway } from "src/gateway/products.gateway";
@Injectable()
export class CartTopic {
  private readonly logger = new Logger("CartTopic");

  constructor(private readonly productsGateway: ProductssGateway) {}

  async updateMetrics(data: CartDTO, context: KafkaContext) {
    this.logger.log(data.user_count);
    this.productsGateway.server.to(data.product_id).emit('update_metrics', {
      user_count: data.user_count,
      product_id: data.product_id,
    });
  }
}
