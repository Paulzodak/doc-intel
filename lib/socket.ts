import { io, Socket } from "socket.io-client";

// Get socket server URL from environment or use API base URL
const getSocketUrl = (): string => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  // Extract host from API URL (socket.io typically uses the same host)
  try {
    const url = new URL(apiBaseUrl);
    return url.origin;
  } catch {
    return apiBaseUrl;
  }
};

// Create and manage socket connection
export const createSocketConnection = (jobId: string): Socket => {
  const socketUrl = getSocketUrl();

  const socket = io(socketUrl, {
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
  });

  // Join the analysis room when connected
  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
    socket.emit("join-job", jobId);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  // socket.on("connect_error", (error) => {
  //   console.error("Socket connection error:", error);
  // });

  return socket;
};

// Cleanup socket connection
export const disconnectSocket = (socket: Socket | null): void => {
  if (socket) {
    socket.disconnect();
    socket.removeAllListeners();
  }
};
