<div align="center">

<img src="https://img.shields.io/badge/TrustLayer-B2B%20SaaS%20Fintech%20Platform-blueviolet?style=for-the-badge&logo=shield&logoColor=white" alt="TrustLayer Banner" />

# 🛡️ TrustLayer

### *A successful payment does not guarantee a successful service — TrustLayer ensures both.*

**A B2B SaaS Fintech Platform for Outcome-Based Escrow Payments & Trust Verification**

<br/>

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redux](https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

<br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Open Source](https://img.shields.io/badge/Open%20Source-❤️-red?style=flat-square)](https://github.com/)
[![Contributions](https://img.shields.io/badge/Contributions-Welcome-orange?style=flat-square)](CONTRIBUTING.md)

</div>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|-------|------------|
| 🎨 **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=flat-square) ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-593D88?logo=redux&logoColor=white&style=flat-square) ![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white&style=flat-square) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square) |
| ⚙️ **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=flat-square) ![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=flat-square) |
| 🗄️ **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white&style=flat-square) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white&style=flat-square) |

</div>

<div align="center">

### 🎨 Frontend &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ⚙️ Backend &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 🗄️ Database

<img src="https://skillicons.dev/icons?i=react,redux,tailwind,js,html,css" height="50" alt="Frontend Stack" />
&nbsp;&nbsp;&nbsp;
<img src="https://skillicons.dev/icons?i=nodejs,express,jwt" height="50" alt="Backend Stack" />
&nbsp;&nbsp;&nbsp;
<img src="https://skillicons.dev/icons?i=mongodb" height="50" alt="Database Stack" />

</div>

---

## 📖 About the Project

**TrustLayer** is a full-stack B2B SaaS Fintech platform that reimagines how digital payments work. It introduces a powerful **Outcome-Based Escrow & Trust Verification** mechanism — ensuring that money is only released when the promised service is actually delivered and verified.

Unlike traditional payment platforms that treat a successful payment as the final step, TrustLayer treats payment as the *beginning* of a verified service lifecycle. The platform is applicable across industries like **Healthcare**, **Hospitality**, and **Freelancing** — anywhere trust and accountability between payers and providers matter.

> This project is heavily **frontend-focused**, built with React, Redux Toolkit, and a component-driven architecture — with a supporting Node.js + MongoDB backend for real-world functionality.

### *Figma Prototype Link*
- 💼 **Figma:** [Figma Link](https://www.figma.com/proto/xpWC4tlj3KSbLjvKCF4ceZ/untitled?node-id=817-4&t=9b6ygc3JUveGCtmS-1)
---

## ❗ Problem Statement

In today's digital payment ecosystem, the flow ends at:

```
💳 Payment → ✅ Done
```

But this creates a massive **trust gap**:

- 🏥 **Healthcare** — patients are overbilled or receive unnecessary treatments
- 🏨 **Hospitality** — hotel services don't match what customers paid for
- 💼 **Freelancing** — freelancers ghost clients after partial payments or vice versa

There is **no system** that links a payment to the actual outcome of the service. Once money is transferred, there's no recourse, no verification, and no accountability.

---

## 💡 Solution

TrustLayer transforms the payment lifecycle into:

```
💳 Payment → 🔒 Escrow (Hold) → 🛠️ Service Delivery → 🔍 Verification → ✅ Payment Release
```

Instead of directly transferring funds, the platform:

1. **Holds the payment** in a secure escrow state
2. **Provider delivers** the service and submits proof (reports, confirmations, evidence)
3. **Client verifies** whether the service meets expectations
4. **Payment is released** — or a dispute is raised if expectations aren't met

This creates a **fair, transparent, and accountable** ecosystem for both service users and service providers.

---

## ✨ Features

### 🔐 Core Platform Features

- **Escrow Payment System** — Funds held securely until verified service delivery
- **Service Management** — Providers create, manage, and update service listings
- **Transaction Tracker** — Real-time status of payments (held / released / disputed)
- **Verification Module** — Clients approve or reject service delivery
- **Proof Submission** — Providers upload documents/images as delivery evidence
- **Dispute Resolution System** — Structured conflict handling between clients & providers
- **Trust Score Engine** — Reliability scoring based on history, ratings & disputes
- **Review & Rating System** — Post-service feedback mechanism
- **File Upload System** — Supports document and image uploads

### 👥 Role-Based System

| Role | Capabilities |
|------|-------------|
| 🧑‍💼 **Client** | Browse services, make payments, verify delivery, raise disputes |
| 🏢 **Provider** | Manage listings, mark completion, upload proof, respond to disputes |
| 🛡️ **Admin** | Monitor transactions, resolve disputes, verify claims, manage platform |

### 🎨 Frontend-Focused Features

- ⚡ **Redux Toolkit** — Centralized state management with slices and async thunks
- 🌙 **Theme System** — Light / Dark mode toggle with persistence
- 📱 **Responsive Design** — Fully mobile-friendly across all screen sizes
- ✅ **Form Validation** — Formik + Yup for robust client-side validation
- 🔗 **Axios with Interceptors** — Centralized API integration with error handling
- 🛑 **Global Error Handling** — UI-level and global error boundary support
- 💾 **LocalStorage / SessionStorage** — Auth tokens, themes, and temp data
- 🔍 **SEO Optimization** — Meta tags, sitemap, and robots.txt
- 📊 **Analytics Tracking** — Basic user activity tracking
- 🔔 **Notification System** — Real-time alerts for key actions

---

## 🛠️ Tech Stack In Detail

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | ^18.x | Core UI library |
| **Redux Toolkit** | ^2.x | Global state management |
| **React Router DOM** | ^6.x | Client-side routing |
| **Formik** | ^2.x | Form state management |
| **Yup** | ^1.x | Schema-based validation |
| **Tailwind CSS** | ^3.x | Utility-first styling |
| **React Icons** | ^4.x | Icon library |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | ^20.x | Runtime environment |
| **Express.js** | ^4.x | REST API framework |
| **Mongoose** | ^8.x | MongoDB ODM |
| **JWT** | ^9.x | Authentication tokens |
| **Bcrypt.js** | ^2.x | Password hashing |
| **Multer** | ^1.x | File upload handling |
| **Dotenv** | ^16.x | Environment configuration |
| **CORS** | ^2.x | Cross-origin resource sharing |

### Database

| Technology | Purpose |
|---|---|
| **MongoDB** | NoSQL document storage |
| **MongoDB Atlas** | Cloud-hosted production DB |

---

## 📁 Project Structure

```
TrustLayer/
│
├── 📂 client/                          # 🎨 FRONTEND (Main Focus)
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   ├── sitemap.xml
│   │   └── robots.txt
│   │
│   └── src/
│       ├── 📂 assets/                  # Images, icons, fonts
│       │   └── images/
│       │
│       ├── 📂 components/              # Reusable UI components
│       │   ├── common/
│       │   │   ├── Button.jsx
│       │   │   ├── Modal.jsx
│       │   │   ├── Loader.jsx
│       │   │   ├── Badge.jsx
│       │   │   └── FileUpload.jsx
│       │   ├── layout/
│       │   │   ├── Navbar.jsx
│       │   │   ├── Sidebar.jsx
│       │   │   └── Footer.jsx
│       │   └── charts/
│       │       ├── TransactionChart.jsx
│       │       └── TrustScoreChart.jsx
│       │
│       ├── 📂 pages/                   # Page-level components
│       │   ├── auth/
│       │   │   ├── Login.jsx
│       │   │   └── Register.jsx
│       │   ├── client/
│       │   │   ├── ClientDashboard.jsx
│       │   │   ├── BrowseServices.jsx
│       │   │   ├── MakePayment.jsx
│       │   │   ├── VerifyService.jsx
│       │   │   └── RaiseDispute.jsx
│       │   ├── provider/
│       │   │   ├── ProviderDashboard.jsx
│       │   │   ├── ManageServices.jsx
│       │   │   ├── SubmitProof.jsx
│       │   │   └── DisputeResponse.jsx
│       │   ├── admin/
│       │   │   ├── AdminDashboard.jsx
│       │   │   ├── ManageUsers.jsx
│       │   │   ├── DisputePanel.jsx
│       │   │   └── TransactionMonitor.jsx
│       │   └── shared/
│       │       ├── Home.jsx
│       │       ├── NotFound.jsx
│       │       └── Unauthorized.jsx
│       │
│       ├── 📂 features/                # Redux Toolkit slices
│       │   ├── auth/
│       │   │   └── authSlice.js
│       │   ├── escrow/
│       │   │   └── escrowSlice.js
│       │   ├── services/
│       │   │   └── servicesSlice.js
│       │   ├── disputes/
│       │   │   └── disputeSlice.js
│       │   └── notifications/
│       │       └── notificationSlice.js
│       │
│       ├── 📂 store/                   # Redux store config
│       │   └── store.js
│       │
│       ├── 📂 hooks/                   # Custom React hooks
│       │   ├── useAuth.js
│       │   ├── useTheme.js
│       │   └── useNotification.js
│       │
│       ├── 📂 services/                # Axios API calls
│       │   ├── api.js                  # Axios instance + interceptors
│       │   ├── authService.js
│       │   ├── escrowService.js
│       │   ├── serviceListingService.js
│       │   └── disputeService.js
│       │
│       ├── 📂 routes/                  # App routing
│       │   ├── AppRouter.jsx
│       │   ├── PrivateRoute.jsx
│       │   └── RoleRoute.jsx
│       │
│       ├── 📂 context/                 # React context
│       │   └── ThemeContext.jsx
│       │
│       ├── 📂 utils/                   # Helper utilities
│       │   ├── formatCurrency.js
│       │   ├── formatDate.js
│       │   ├── validators.js
│       │   └── storage.js
│       │
│       ├── 📂 constants/               # App-wide constants
│       │   ├── roles.js
│       │   └── statusCodes.js
│       │
│       ├── 📂 styles/                  # Global styles
│       │   ├── index.css
│       │   └── themes.css
│       │
│       ├── App.jsx
│       └── main.jsx
│
├── 📂 server/                          # ⚙️ BACKEND
│   ├── 📂 config/
│   │   └── db.js
│   ├── 📂 controllers/
│   │   ├── authController.js
│   │   ├── escrowController.js
│   │   ├── serviceController.js
│   │   └── disputeController.js
│   ├── 📂 middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── errorMiddleware.js
│   ├── 📂 models/
│   │   ├── User.js
│   │   ├── Service.js
│   │   ├── Transaction.js
│   │   ├── Dispute.js
│   │   └── TrustScore.js
│   ├── 📂 routes/
│   │   ├── authRoutes.js
│   │   ├── escrowRoutes.js
│   │   ├── serviceRoutes.js
│   │   └── disputeRoutes.js
│   ├── 📂 utils/
│   │   └── generateToken.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+ 
- [MongoDB](https://www.mongodb.com/) (local) or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) URI
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/patelmanan112/trustlayer.git
cd trustlayer
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Configure your `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=development
```

```bash
# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to client directory (from root)
cd client

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Configure your `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=TrustLayer
```

```bash
# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Run Both Simultaneously (from root)

```bash
# Install concurrently
npm install

# Run both frontend and backend
npm run dev
```

---

## 🚀 Usage Instructions

### As a Client (Customer/Patient)

1. **Register** an account and select the **Client** role
2. **Browse Services** from registered providers
3. **Make a Payment** — funds go into escrow (not directly to provider)
4. **Receive the Service** — provider marks it as complete and submits proof
5. **Verify Delivery** — approve the service to release payment, or raise a dispute if unsatisfied

### As a Provider (Business/Freelancer)

1. **Register** and select the **Provider** role
2. **Create Service Listings** with pricing and descriptions
3. **Accept Escrow Payments** from clients
4. **Mark Service Complete** and upload proof of delivery
5. **Receive Payment** once client approves the verification

### As an Admin

1. **Log in** with admin credentials
2. **Monitor Transactions** and escrow statuses across the platform
3. **Resolve Disputes** by reviewing proof from both parties
4. **Manage Users** and oversee platform health

---

## 🗺️ Roadmap

| Phase | Feature | Status |
|---|---|---|
| ✅ Phase 1 | Auth system (Login, Register, JWT, Role-based routes) | In Progress  |
| ✅ Phase 2 | Escrow payment flow (Hold → Verify → Release) | In Progress  |
| ✅ Phase 3 | Role-based dashboards (Client, Provider, Admin) | In Progress  |
| ✅ Phase 4 | Dispute resolution module | Planned|
| ✅ Phase 5 | Trust Score Engine & Reviews |Planned |
| 🔄 Phase 6 | Real-time notifications (Socket.io) |Planned |
| 🔄 Phase 7 | Analytics dashboard with charts | Planned |
| 📋 Phase 8 | Payment gateway integration (Razorpay/Stripe) | Planned |
| 📋 Phase 9 | Email notifications (Nodemailer) | Planned |
| 📋 Phase 10 | Multi-language support (i18n) | Planned |
| 📋 Phase 11 | Mobile app (React Native) | Planned |
| 📋 Phase 12 | AI-based fraud detection | Planned |

---

## 🌍 Real-World Applications

```
🏥 Healthcare        → Prevents overbilling & ensures treatments are delivered
🏨 Hospitality       → Verifies hotel services match what was paid for
💼 Freelancing       → Protects both clients and freelancers from fraud
🛒 E-commerce        → Outcome-based delivery confirmation before payment release
```

---

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## 👤 About the Author

<div align="center">

**Built with ❤️ by a passionate frontend developer focused on solving real-world fintech problems through clean UI, scalable architecture, and outcome-driven design.**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/patelmanan112)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/manan-patel-557535390/)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://manan-patel-portfolio.vercel.app/)

</div>

---

## 📬 Contact

Have questions, suggestions, or want to collaborate?

- 📧 **Email:** manan.patel.cg@gmail.com
- 💼 **LinkedIn:** [linkedin.com/in/Manan-Patel](https://www.linkedin.com/in/manan-patel-557535390/)

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

**⭐ Star this repo if you found it helpful! It motivates open source contributors like me.**

<img src="https://img.shields.io/github/stars/your-username/trustlayer?style=social" alt="Stars" />
&nbsp;
<img src="https://img.shields.io/github/forks/your-username/trustlayer?style=social" alt="Forks" />

*Made with Love *

</div>
