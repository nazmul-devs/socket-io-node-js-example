# Real-time Notification System with Socket.IO

A Node.js, Express, TypeScript, and Socket.IO based real-time notification system for ticket booking, refunds, and reissues.

## Features

- Real-time notifications between users and admin
- User roles (user/admin) with different permissions
- Notification types:
  - Ticket booking requests
  - Refund requests
  - Reissue requests
  - Approval/rejection notifications
- Mark notifications as read
- TypeScript support with clean architecture

## Prerequisites

- Node.js (v18+ recommended)
- pnpm (v8+ recommended)
- TypeScript (v4.9+)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/nazmul-devs/socket-io-node-js-example.git
cd socket-io-node-js-example
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm run dev
```

The server will be running at http://localhost:3000

4. Production Build:

```bash
pnpm run build
pnpm run start
```

Project Structure

```bash
src/
├── app.ts
├── server.ts
├── socket.ts
├── types/
│ └── index.ts
└── routes/
└── tickets.ts
```

API Endpoints

```bash
POST /tickets/book - Book a ticket (User only)

POST /tickets/refund - Request refund (User only)

POST /tickets/reissue - Request reissue (User only)

PUT /tickets/:id/status - Approve/reject ticket (Admin only)
```

## WebSocket Events

### register - Register user with Socket.IO

- notification - Receive new notifications

- notifications - Get all notifications

- markAsRead - Mark notification as read
