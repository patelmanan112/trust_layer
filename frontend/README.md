# 🛡️ TrustLayer Frontend

The frontend of TrustLayer is a premium React-based B2B SaaS dashboard designed for secure escrow payments and dispute management.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file based on `.env.example`:
```env
VITE_API_URL=https://trust-layer-si0i.onrender.com
```

### 3. Run Development Server
```bash
npm run dev
```

## 🎨 Tech Stack
- **Framework:** React 19 (Vite)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS 4
- **Form Handling:** Formik + Yup
- **Icons:** React Icons (Lucide/Feather)

## 📁 Key Directories
- `/src/components`: Reusable UI components (Modals, Cards, Navbar).
- `/src/pages`: Main application views (Dashboard, Dispute, Login).
- `/src/store`: Global state management logic.
- `/src/services`: Axios API client with centralized error handling.
