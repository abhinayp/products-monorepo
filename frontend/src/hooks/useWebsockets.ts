import { manager } from "@/lib/websockets";
import { useEffect, useRef } from "react";
import { Socket, SocketOptions, ManagerOptions } from "socket.io-client";

const useWebsockets = ({
  path,
  socketOptions,
  managerOptions
}: {
  path: string
  socketOptions?: Partial<SocketOptions>
  managerOptions?: Partial<ManagerOptions>
}) => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    const _socket = manager(managerOptions).socket(path, socketOptions);

    _socket.on("connect", () => {
      console.log(`connected to websocket: ${path}`);
    });

    _socket.on("disconnect", () => {
      console.log(`disconnected from websocket: ${path}`);
    });

    _socket.on("update_metrics", () => {
      console.log("refetching products...");
    })

    socket.current = _socket;

    return () => {
      socket.current = null;
      _socket.disconnect();
    }
  }, [path, socketOptions, managerOptions]);

  return {
    socket
  }
}

export default useWebsockets
