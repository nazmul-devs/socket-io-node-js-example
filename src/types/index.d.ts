export interface User {
  id: string;
  name: string;
  role: "user" | "admin";
}

export interface Ticket {
  id: string;
  userId: string;
  status: "pending" | "approved" | "rejected";
  type: "booking" | "refund" | "reissue";
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
