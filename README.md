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

<br/>

**🌐 Deployed App:** [trust-layer-rouge.vercel.app](https://trust-layer-rouge.vercel.app/)  
**⚙️ Backend API:** [trust-layer-si0i.onrender.com](https://trust-layer-si0i.onrender.com/)

</div>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|-------|------------|
| 🎨 **Frontend** | React 19, Redux Toolkit, Tailwind CSS 4, Formik/Yup, Axios |
| ⚙️ **Backend** | Node.js, Express 5, JWT, Bcrypt.js, Multer, Morgan |
| 🗄️ **Database** | MongoDB Atlas, Mongoose 9 |

</div>

---

## 📖 About the Project

**TrustLayer** is a professional B2B SaaS platform that secures digital service transactions using an **Outcome-Based Escrow** mechanism. It ensures that funds are only released to a provider once the service is verified and any potential disputes are resolved.

### *Project Assets*
- 💼 **Figma Prototype:** [Figma Link](https://www.figma.com/proto/xpWC4tlj3KSbLjvKCF4ceZ/untitled?node-id=817-4&t=9b6ygc3JUveGCtmS-1)

---

## ✨ Features (Implemented)

- ✅ **Modular Backend Architecture** — Separation of concerns between `app.js` and `index.js`.
- ✅ **Secure Escrow Flow** — Funds held in `held` state until client verification.
- ✅ **Dispute Resolution Center** — Full evidence upload support (Multer) and administrative resolution.
- ✅ **Role-Based Dashboards** — Personalized views for Clients and Providers.
- ✅ **Trust Score Engine** — Reliability tracking for marketplace users.
- ✅ **Marketplace Services** — Freelancers can list services; Clients can initiate custom contracts.
- ✅ **Global Middleware** — Professional logging (Morgan), CORS handling, and centralized error handling.

---

## 📁 Project Structure

```
TrustLayer/
│
├── 📂 frontend/                        # 🎨 React + Vite Frontend
│   ├── src/
│   │   ├── 📂 components/              # UI Components (Navbar, Dashboard, etc.)
│   │   ├── 📂 store/                   # Redux Toolkit (auth, ui slices)
│   │   ├── 📂 services/                # Axios API instance & Interceptors
│   │   ├── 📂 hooks/                   # Custom hooks (useAuth)
│   │   └── 📂 pages/                   # Main Views (Login, Dispute, Landing)
│
├── 📂 backend/                         # ⚙️ Node.js + Express Backend
│   ├── 📂 src/
│   │   ├── 📂 controllers/             # Business Logic (Auth, Escrow, Dispute)
│   │   ├── 📂 models/                  # Mongoose Schemas (User, Transaction)
│   │   ├── 📂 routes/                  # Express Router definitions
│   │   ├── 📂 config/                  # DB Connection (MongoDB Atlas)
│   │   ├── app.js                      # Middleware & Route Registration
│   │   └── index.js                    # Server Startup & Error Catching
│   ├── 📂 uploads/                     # Storage for Dispute Evidence
│   └── .env                            # Sensitive Configurations
```

---

## ⚙️ Installation & Setup

### 1. Backend Setup
```bash
cd backend
npm install
# Configure .env with MONGO_URI, JWT_SECRET, and CLIENT_ORIGIN
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
# Configure .env with VITE_API_URL
npm run dev
```

---

## 🚀 Postman Documentation
A comprehensive Postman collection for testing all endpoints is available in the root as `postman_documentation.md`. 

**Key Endpoints:**
- `POST /api/auth/login` — Get your JWT Token.
- `GET /api/dashboard` — View role-specific statistics.
- `POST /api/disputes/:id/proof` — Upload evidentiary files (form-data).

---

## 👤 About the Author

**Built by Manan Patel**
- 📧 **Email:** manan.patel.cg@gmail.com
- 💼 **LinkedIn:** [Manan Patel](https://www.linkedin.com/in/manan-patel-557535390/)
- 💻 **GitHub:** [patelmanan112](https://github.com/patelmanan112)

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

</div>

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
