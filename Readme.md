# Brandflex - Admin/Client Portal  

⚠️ **Private Project**  
*Developed under Upwork contract for Brianna Coyle. Unauthorized distribution or reuse is prohibited.*  

---

## 📌 Description  
A private admin/client portal web application with API integrations (similar to GoHighLevel). Features include:  
- User authentication (Firebase) with RBAC. 
- Database management (MongoDB)  
- API-driven backend (Node.js/Express)  
- Responsive frontend (React.js)  

---

## 🛠️ Configuration  

### **Frontend (React) Environment Variables**  
Create a `.env` file in the frontend root with:  
```env
REACT_APP_BASE_URL=https://api.example.com          # Backend API URL  
REACT_APP_FIREBASE_API_KEY=your_firebase_key        # From Firebase Console  
REACT_APP_FIREBASE_AUTH_DOMAIN=project-id.firebaseapp.com  
REACT_APP_FIREBASE_PROJECT_ID=your_project_id  
REACT_APP_FIREBASE_STORAGE_BUCKET=project-id.appspot.com  
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=1234567890  
REACT_APP_FIREBASE_APP_ID=1:1234567890:web:abc123  
REACT_APP_FIREBASE_MEASUREMENT_ID=G-ABC123  

### **Backend (Node.js) Environment Variables** 
PORT=5000  (Not needed for Vercel deployment)

# Firebase Admin SDK  
FIREBASE_PROJECT_ID=your_project_id  
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc@project-id.iam.gserviceaccount.com  
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n<multiline_key_from_firebase_console>\n-----END PRIVATE KEY-----\n"  

# MongoDB  
MONGO_URL=mongodb+srv://admin:password@cluster0.mongodb.net/dbname?retryWrites=true&w=majority   

🚀 Usage
Frontend - 
cd frontend  
npm install  
npm start  # Runs on http://localhost:3000  

Backend - 
cd backend  
npm install  
node server.js  # Runs on http://localhost:5000  

⚙️ Technologies
Frontend - React.js, Redux (State), Material-UI (MUI) , RTK Query (API)

Backend - Node.js, Express.js

Database/Auth - Firebase Auth, MongoDB

☁️ Deployment
Automatically deployed on Vercel via Git push.

📜 Ownership & Licensing
© [Client Name]
All rights reserved. This codebase is proprietary and confidential. Unauthorized copying, distribution, or modification is strictly prohibited without written permission.

📞 Support
For issues or questions:
Upwork
Email: vertigo1112@gmail.com


