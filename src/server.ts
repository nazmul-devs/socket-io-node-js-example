import { createServer } from "http";
import { createApp } from "./app";
import { initializeSocket } from "./socket";
import { createTicketRoutes } from "./routes/ticket.routes";

const app = createApp();
const server = createServer(app);
const { io, sendNotification } = initializeSocket(server);

// Setup routes
app.use("/tickets", createTicketRoutes({ sendNotification }));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
