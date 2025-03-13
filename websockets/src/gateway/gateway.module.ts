import { Module } from "@nestjs/common";
import { ProductssGateway } from "./products.gateway";

@Module({
  imports: [],
  providers: [ProductssGateway],
  exports: [ProductssGateway]
})
export class GatewayModule {}
