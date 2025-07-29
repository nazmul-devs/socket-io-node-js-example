import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { User, Notification } from "./types";

// In-memory storage for demo purposes
const users: Record<string, User> = {};
const notifications: Record<string, Notification[]> = {};

export const initializeSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Register user
    socket.on("register", (user: User) => {
      users[socket.id] = user;
      console.log(`User registered: ${user.name} (${user.role})`);

      // Send any pending notifications
      if (notifications[user.id]) {
        socket.emit("notifications", notifications[user.id]);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      delete users[socket.id];
    });

    // Notification read
    socket.on("markAsRead", (notificationId: string) => {
      const user = Object.values(users).find((u) => u.id === socket.id);
      if (user && notifications[user.id]) {
        const notification = notifications[user.id].find(
          (n) => n.id === notificationId
        );
        if (notification) {
          notification.read = true;
        }
      }
    });
  });

  return {
    io,
    sendNotification: (userId: string, message: string) => {
      const notification: Notification = {
        id: Date.now().toString(),
        userId,
        message,
        read: false,
        createdAt: new Date(),
      };

      if (!notifications[userId]) {
        notifications[userId] = [];
      }

      notifications[userId].push(notification);

      // Find socket for the user
      const socketId = Object.keys(users).find((id) => users[id].id === userId);
      if (socketId) {
        io.to(socketId).emit("notification", notification);
      }
    },
  };
};
