# 🏡 Luxora – Hospitality Booking Platform

> **Luxora** is a premium full-stack hospitality booking platform that redefines the way users discover, book, and host stays across the globe. With a sleek interface, seamless user experience, and powerful backend, Luxora is crafted to deliver elegance, performance, and ease – all in one platform.

🔗 **Live Site**: [https://luxora-frontend.onrender.com](https://luxora-frontend.onrender.com)

---

## 📸 Showcase

<p align="center">
  <img src="https://github.com/user-attachments/assets/001b7779-1a0e-4e40-a0eb-7d2fdd7471b3" width="45%" />
  &nbsp; &nbsp;
  <img src="https://github.com/user-attachments/assets/1489f07f-70f4-4c58-8314-22b950666ae4" width="45%" />
</p>

<br/>

<p align="center">
  <img src="https://github.com/user-attachments/assets/fbc8a4ec-7301-42d5-be12-a0995f448aae" width="45%" />
  &nbsp; &nbsp;
  <img src="https://github.com/user-attachments/assets/fda8afdb-c3d4-460d-bc98-422a1b804e06" width="45%" />
</p>

---

## 🚀 Key Features

### 🔐 Secure Authentication  
Register, login, and stay authenticated with JWT.  
<p align="center">
  <img src="https://github.com/user-attachments/assets/c8267abb-a50f-41c6-be9c-f358c1777a44" width="70%" />
</p>

---

### 🏠 Host Listings  
Users can create, edit, and manage their property listings.  
<p align="center">
  <img src="https://github.com/user-attachments/assets/6aff2b29-d25e-4697-892d-4f14ca78fd0c" width="70%" />
</p>

---

### 🌍 Location Search  
Real-time search with smart location filtering.

---

### 🧭 Interactive Maps  
View listings on a map with geolocation features.  
<p align="center">
  <img src="https://github.com/user-attachments/assets/d613aee2-f6bb-4299-8874-473cecd07c76" width="70%" />
</p>

---

### 📸 Image Uploads  
Upload high-quality listing images (Cloudinary integration optional).

---

### 👤 User Profile Pages  
Personalized dashboard showing user info and listings.  
<p align="center">
  <img src="https://github.com/user-attachments/assets/08407c2a-9669-4261-868d-f66653e65f11" width="45%" />
  &nbsp; &nbsp;
  <img src="https://github.com/user-attachments/assets/13140c42-b816-4b25-9d6c-ca758bd85c8d" width="45%" />
</p>

---

### 💳 Integrated Payments  
Razorpay (test mode) payment flow for smooth transactions.  
<p align="center">
  <img src="https://github.com/user-attachments/assets/869d7cf0-c94e-42fd-99ce-229cf43b894d" width="70%" />
</p>

---

### 📱 Responsive UI  
Fully mobile-optimized with a luxurious, minimal aesthetic.

---

### 🧱 Modular Codebase  
Clean folder structure and reusable components for scalability.

---

### 📅 Booking System (Coming Soon)  
Full-featured booking calendar and availability logic.  
<p align="center">
  <img src="https://github.com/user-attachments/assets/66fbd379-5408-41f8-808b-c83f4bdb1be3" width="70%" />
</p>

---

## 🧰 Tech Stack

- **Frontend**: React, TailwindCSS, Axios, React Router  
- **Backend**: Node.js, Express.js, MongoDB, Mongoose  
- **Authentication**: JWT (Stored in Local Storage)  
- **Deployment**: Vercel (Frontend), Render/Heroku (Backend), MongoDB Atlas  
- **Dev Tools**: Postman, Git, VSCode  

---

## 📁 Folder Structure

```bash
luxora/
├── frontend/         # React frontend
│   ├── components/   # Reusable UI Components
│   └── pages/        # Core app pages (Home, Listings, Profile, etc.)
├── backend/          # Node.js backend
│   ├── routes/       # API endpoints
│   ├── controllers/  # Business logic
│   └── models/       # Mongoose schemas
└── README.md

# Clone the repository
git clone https://github.com/yourusername/luxora.git

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Run both client and server (use concurrently or in two terminals)
npm run dev
