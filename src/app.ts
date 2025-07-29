import cors from "cors";
import express, { Request, Response } from "express";
import { Ticket } from "./types";

// In-memory storage for demo purposes
const tickets: Record<string, Ticket> = {};

export const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Mock authentication middleware
  app.use((req: Request, res: Response, next) => {
    // In a real app, you would verify JWT or session here
    const userId = req.headers["user-id"] as string;
    const userName = req.headers["user-name"] as string;
    const userRole = req.headers["user-role"] as "user" | "admin";

    if (!userId || !userName || !userRole) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = { id: userId, name: userName, role: userRole };
    next();
  });

  return app;
};
