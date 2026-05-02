<img width="1866" height="997" alt="image" src="https://github.com/user-attachments/assets/571bd34b-d069-43ee-bc83-a7e269ea8ce6" /><div align="center">

# 🛡️ TrustLayer: The Future of Outcome-Based B2B Payments

### *A successful payment does not guarantee a successful service — TrustLayer ensures both.*

**A B2B SaaS Fintech Platform for Secure Escrow Payments, Dispute Resolution, and Trust Verification.**

<br/>

| **Resource** | **Link** |
|:---:|:---:|
| 🎨 **Figma Design** | [View Design](https://www.figma.com/proto/xpWC4tlj3KSbLjvKCF4ceZ/untitled?node-id=817-4&t=9b6ygc3JUveGCtmS-1) |
| 🌐 **Live Project** | [Visit Website](https://trust-layer-rouge.vercel.app/) |
| 🚀 **Postman Docs** | [API Documentation](https://documenter.getpostman.com/view/50840763/2sBXqKoKkc) |
| ⚙️ **Backend API** | [API Server](https://trust-layer-si0i.onrender.com/) |
| 📺 **YouTube Demo** | [Watch Video](https://youtu.be/c4lx7Xz6oao) |

<br/>

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

## 🛑 The Problem: The Trust Gap in B2B Services

In the current global digital economy, B2B service transactions (freelance, consulting, software development) are plagued by a fundamental lack of security:

1.  **Payment Risks:** Clients are often forced to pay 50-100% upfront to "lock in" a provider, with no guarantee of quality.
2.  **Delivery Risks:** Providers often complete work only to face "scope creep" or clients who vanish without paying the final invoice.
3.  **Complex Disputes:** When things go wrong, there is no centralized, evidence-based system to resolve issues fairly.
4.  **Opaque Reliability:** General review systems are easily manipulated; there is no data-driven "Trust Score" linked to actual financial outcomes.

## ✅ The Solution: TrustLayer's Outcome-Based Escrow

**TrustLayer** redefines how businesses interact by acting as a neutral, automated intermediary. Our platform ensures that **trust is built into the protocol**, not just the contract.

### How it Works:
1.  **Smart Escrow:** When a contract starts, the client's funds are moved into a secure "Held" state.
2.  **Verified Delivery:** The provider submits their work through the platform.
3.  **Outcome Verification:** The client reviews the output. Only upon explicit verification are the funds released.
4.  **Automated Arbitration:** If a dispute arises, the funds remain locked until a resolution is reached based on submitted evidence.

---

## ✨ Core Features

### 🔐 Enterprise-Grade Security
- **Multi-Factor Authentication:** Secure login using JWT and Google OAuth 2.0.
- **Role-Based Access Control (RBAC):** Distinct interfaces and permissions for 'Clients', 'Freelancers', and 'Admins'.

### 💰 Escrow & Financial Lifecycle
- **Escrow-as-a-Service:** Automated holding and releasing of funds based on milestone verification.
- **Transaction History:** Immutable record of all financial movements for auditing and tax purposes.

### ⚖️ Dispute Resolution Center
- **Evidence Vault:** Securely upload screenshots, contracts, and documents as proof during a dispute.
- **Resolution Tracking:** Transparency into the status of active disputes and historical outcomes.

### 📊 Dynamic Trust Engine
- **Trust Scores:** A mathematical reliability score calculated from successful project completion rates and dispute history.
- **Service Marketplace:** A curated directory where providers can list specialized services and clients can initiate secure contracts instantly.

### 🎨 Premium User Experience
- **Sleek UI/UX:** A modern, dark-themed interface built for professionals.
- **Real-time Notifications:** Stay updated on escrow status, new messages, and dispute updates.

---

## 🛠️ Detailed Tech Stack

| Layer | Technologies Used | Key Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19, Redux Toolkit, Tailwind CSS 4 | Core UI, State Management, Styling |
| **Backend** | Node.js, Express.js | API Architecture, Business Logic |
| **Database** | MongoDB Atlas, Mongoose | NoSQL Data Persistence |
| **Auth** | JWT, Bcrypt.js, Passport.js | Secure Sessions & Hashing |
| **Storage** | Multer | File Handling for Evidence |
| **DevOps** | Vercel (Frontend), Render (Backend) | CI/CD and Hosting |

---

## 📁 Project Architecture & Folder Structure

We follow a modular, scalable architecture to ensure the codebase remains maintainable as the platform grows.

```text
TrustLayer/
├── 📂 frontend/               # React + Vite Application
│   ├── 📂 src/
│   │   ├── 📂 components/     # UI Atoms (Navbar, Cards, Modals, Buttons)
│   │   ├── 📂 pages/          # Main Views (Dashboard, Escrow, Dispute, Settings)
│   │   ├── 📂 store/          # Redux Slices (authSlice, transactionSlice)
│   │   ├── 📂 services/       # API Interceptors & Axios Instance
│   │   ├── 📂 hooks/          # Custom Hooks (useAuth, useEscrow)
│   │   ├── 📂 layouts/        # Shared Layout Wrappers
│   │   └── App.jsx            # Routing & Global Providers
│   └── index.html             # Entry Point & SEO Meta Tags
│
├── 📂 backend/                # Node.js + Express API
│   ├── 📂 src/
│   │   ├── 📂 controllers/    # Route Handlers (Auth, Escrow, Dispute logic)
│   │   ├── 📂 models/         # Mongoose Data Schemas
│   │   ├── 📂 routes/         # API Endpoint Definitions
│   │   ├── 📂 middleware/     # Auth Protection & Error Handlers
│   │   ├── 📂 config/         # MongoDB Connection & Env Validation
│   │   └── app.js             # Middleware Orchestration
│   └── index.js               # Entry Point (Server Startup)
│
├── 📂 uploads/                # Local Storage for Dispute Evidence
├── .gitignore                 # Root Git Ignore Rules
├── LICENSE                    # MIT License Terms
└── README.md                  # Comprehensive Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- Google Cloud Console Project (for OAuth)

### 1. Installation
```bash
git clone https://github.com/patelmanan112/TrustLayer.git
cd TrustLayer
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_signing_key
CLIENT_ORIGIN=http://localhost:5173
```
Run development server: `npm run dev`

### 3. Frontend Setup
```bash
cd frontend
npm install
# Create a .env file:
VITE_API_URL=http://localhost:5000
```
Run development server: `npm run dev`

---

## 🔍 SEO & Visibility

TrustLayer is built with SEO best practices:
- **Semantic HTML5:** Using `<header>`, `<main>`, `<footer>`, and `<section>` tags.
- **Meta Tags:** Optimized descriptions and keywords for indexing.
- **Open Graph:** Professional sharing previews for LinkedIn and Twitter.
- **Performance:** Optimized asset delivery for fast initial load times.

---

## 📸 Project Gallery

<div align="center">

### Professional Landing Page
*First impression for potential B2B partners.*
<img width="1866" height="997" alt="image" src="https://res.cloudinary.com/dxzo7jfbn/image/upload/v1777719294/Screenshot_2026-05-02_162008_jwazvk.png" />

### Unified Dashboard
*One view for all your active escrows and trust metrics.*
<img width="1866" height="997" alt="image" src="https://res.cloudinary.com/dxzo7jfbn/image/upload/v1777719294/Screenshot_2026-05-02_162125_y7uozd.png" />

### Dispute Evidence Upload
*Transparent and secure evidence submission.*
<img width="1866" height="997" alt="image" src="[https://res.cloudinary.com/dxzo7jfbn/image/upload/v1777719294/Screenshot_2026-05-02_162008_jwazvk.png](https://res.cloudinary.com/dxzo7jfbn/image/upload/v1777719294/Screenshot_2026-05-02_162142_btogbn.png)" />

</div>

---

## 🗺️ Roadmap & Future Enhancements
- [ ] **Smart Contract Integration:** Moving escrow logic to Ethereum/Solana for decentralization.
- [ ] **Multi-Currency Support:** Allowing payments in USD, EUR, and Crypto.
- [ ] **AI-Assisted Arbitration:** Using AI to analyze evidence and suggest resolution paths.
- [ ] **Mobile App:** Dedicated iOS and Android applications.

---

## 👤 Built By

**Manan Patel**
- 📧 [manan.patel.cg@gmail.com](mailto:manan.patel.cg@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/manan-patel-557535390/)
- 💻 [GitHub](https://github.com/patelmanan112)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ Star this repo if you find it useful!**

</div>
