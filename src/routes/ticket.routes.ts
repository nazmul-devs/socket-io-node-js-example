import { Request, Response, Router } from "express";
import { Ticket, User } from "../types";

// In-memory storage for demo purposes
const tickets: Record<string, Ticket> = {};

export const createTicketRoutes = (io: any) => {
  const router = Router();

  // User books a ticket
  router.post("/book", (req: Request, res: Response) => {
    const user = req.user as User;
    const ticket: Ticket = {
      id: Date.now().toString(),
      userId: user.id,
      status: "pending",
      type: "booking",
      createdAt: new Date(),
    };

    tickets[ticket.id] = ticket;

    // Notify admin
    io.sendNotification(
      "admin",
      `New ticket booking request from ${user.name}`
    );

    res.status(201).json(ticket);
  });

  // User requests refund
  router.post("/refund", (req: Request, res: Response) => {
    const user = req.user as User;
    const ticket: Ticket = {
      id: Date.now().toString(),
      userId: user.id,
      status: "pending",
      type: "refund",
      createdAt: new Date(),
    };

    tickets[ticket.id] = ticket;

    // Notify admin
    io.sendNotification("admin", `New refund request from ${user.name}`);

    res.status(201).json(ticket);
  });

  // User requests reissue
  router.post("/reissue", (req: Request, res: Response) => {
    const user = req.user as User;
    const ticket: Ticket = {
      id: Date.now().toString(),
      userId: user.id,
      status: "pending",
      type: "reissue",
      createdAt: new Date(),
    };

    tickets[ticket.id] = ticket;

    // Notify admin
    io.sendNotification(
      "admin",
      `New ticket reissue request from ${user.name}`
    );

    res.status(201).json(ticket);
  });

  // Admin approves/rejects a ticket
  router.put("/:id/status", (req: Request, res: Response) => {
    if (req?.user && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const ticketId = req.params.id;
    const { status } = req.body;

    if (!ticketId || !status || !["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const ticket = tickets[ticketId];
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    ticket.status = status;

    // Notify user
    let message = "";
    if (ticket.type === "booking") {
      message = `Your ticket booking has been ${status}`;
    } else if (ticket.type === "refund") {
      message = `Your refund request has been ${status}`;
    } else if (ticket.type === "reissue") {
      message = `Your reissue request has been ${status}`;
    }

    io.sendNotification(ticket.userId, message);

    res.json(ticket);
  });

  return router;
};
