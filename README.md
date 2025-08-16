# Live Bidding Web Application
A real-time auction platform where users can participate in time-boxed auctions with live bidding, chat functionality, and instant updates across all connected clients.

## Features
- Real-time auction rooms with WebSocket-powered instant updates
- Time-boxed auctions with server-authoritative timing
- Live bidding that instantly appears for all participants
- In-room chat functionality during active auctions
- Virtual currency system for secure bidding transactions
- User analytics with built-in graphs for tracking bidding patterns
- Automatic auction finalization and winner determination

## Tech Stack

### Frontend
- React with Vite for fast development and builds
- TanStack Query for efficient REST API data management
- Socket.IO Client for real-time WebSocket communication

### Backend
- Node.js + Express.js for REST API endpoints
- Socket.IO for real-time bidding and chat functionality
- Prisma as PostgreSQL ORM for database operations
- PostgreSQL for data persistence
- node-cron for scheduled auction finalization
- **Temporal API for UTC time handling across global time zones**

### Authentication & Security
- JWT tokens stored in httpOnly cookies
- bcrypt for secure password hashing
- **Server-controlled auction timing to prevent client-side manipulation and ensure fair bidding**
- **UTC time synchronization prevents malicious clients from exploiting device clock modifications**

## Architecture

### Client (Single Page Application)
- React SPA with Vite bundling
- TanStack Query handles REST API calls for data fetching
- Socket.IO client manages real-time auction room interactions

### Server (Monolithic Design)
- REST API Layer: Handles authentication, auction creation/viewing, and financial transactions
- WebSocket Layer: Manages real-time bidding and chat through Socket.IO rooms
- Scheduler: node-cron automatically finalizes expired auctions
- Database Layer: Prisma ORM with PostgreSQL for data persistence
  
### Error Handling
The application implements centralized error handling middleware for consistent error responses across all endpoints:

- Global error handler catches and standardizes all application errors
- Async error wrapper eliminates repetitive try-catch blocks in route handlers
- Structured error responses with consistent status codes and messages

## Core Auction Flow

### Joining an Auction Room
- Client navigates to auction via unique bid ID URL
- Server validates JWT authentication for monolithic security
- Initial HTTP request fetches current auction state (highest bid, chat history)
- WebSocket connection established for real-time updates

### Placing Bids
- Client submits bid amount through WebSocket
- Server validates user's available currency balance
- Server confirms auction is currently active (within start/end time window)
- Atomic database update of auction's highest bid
- Real-time broadcast to all connected clients in the room

### Chat System
- Messages stored in database for persistence across sessions
- Real-time broadcast to all active room participants
- Chat history available when new users join the room

### Automated Finalization
- Cron scheduler periodically scans for expired auctions
- Determines auction winner based on highest valid bid
- Atomic transactions handle:
  - Currency transfer from winner to seller
  - Item transfer to winner's collection
  - Auction status update to completed

### Time Management & Synchronization
- **UTC Time Standardization**: Utilizes the Temporal API instead of JavaScript's standard Date API to ensure consistent UTC time handling across all global time zones
- **Server-Authoritative Timing**: All auction timing is controlled server-side to prevent client manipulation
- **Time Synchronization**: When users join auction rooms, the server sends current UTC time to clients for accurate countdown calculations
- Real-time countdown updates based on stored auction end times in the database


## Current Limitations

### Database Scaling
- Chat messages persist indefinitely after auctions end
- Potential for database bloat over time
- Future improvement: Automated cleanup of old chat data via scheduled tasks

### Feature Completeness
- No bid editing functionality (users cannot modify placed bids)
- Limited user profile system (viewing other users' profiles not yet implemented)
- Basic user interaction features compared to full social auction platforms

## Planned Improvements
- Implement chat data retention policies
- Add bid modification capabilities within time constraints
- Expand user profile and social features
- Database optimization for long-term scalability
