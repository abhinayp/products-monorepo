import { Controller, Get } from "@nestjs/common";

@Controller()
export class HomeController {
  @Get("/healthcheck")
  async healthcheck() {
    return "OK";
  }
}
