import env from "@/util/env.util";
import { Manager, ManagerOptions } from "socket.io-client";

const manager = (options: Partial<ManagerOptions> = {}) => new Manager(env.NEXT_PUBLIC_WEBSOCKETS_HOST, {
  transports: ['websocket'],
  reconnectionDelayMax: 10000,
  ...options
});

export {
  manager
}
