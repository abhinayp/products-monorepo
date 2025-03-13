import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { HomeController } from './api/home.controller';

@Module({
  imports: [GatewayModule],
  controllers: [HomeController],
  providers: [],
})
export class AppModule {}
