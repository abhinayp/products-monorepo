import { Module } from "@nestjs/common";
import { ProductsGateway } from "./products.gateway";
import { OrdersGateway } from "./orders.gateway";
@Module({
  imports: [],
  providers: [ProductsGateway, OrdersGateway],
  exports: [ProductsGateway, OrdersGateway]
})
export class GatewayModule {}
