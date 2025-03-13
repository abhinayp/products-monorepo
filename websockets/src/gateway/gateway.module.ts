import { Module } from "@nestjs/common";
import { ProductsGateway } from "./products.gateway";

@Module({
  imports: [],
  providers: [ProductsGateway],
  exports: [ProductsGateway]
})
export class GatewayModule {}
