# ⚙️ TrustLayer Backend

The backend of TrustLayer is a modular, high-performance Node.js API built with Express 5 and MongoDB. It handles secure escrow logic, JWT authentication, and file-based dispute evidence.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file based on `.env.example`:
```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
CLIENT_ORIGIN=https://trust-layer-rouge.vercel.app
```

### 3. Run Server
```bash
# Development
npm run dev

# Production
npm start
```

## 🛠️ Architecture
- **`/src/controllers`**: Business logic and database interactions.
- **`/src/routes`**: API endpoint definitions.
- **`/src/models`**: Mongoose schemas (User, Transaction, Dispute, Escrow).
- **`/src/app.js`**: Middleware setup (CORS, Morgan, JSON parsing).
- **`/src/index.js`**: Entry point (DB connection and server startup).

## 🛡️ Security
- **JWT Authentication:** All protected routes require a Bearer token.
- **CORS Management:** Restricts access to authorized frontend origins.
- **Defensive Auth:** Bcrypt-based password hashing with safe comparison logic.
