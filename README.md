# Tattavakala – Artisan Marketplace & Creative Hub

![Tattavakala Banner](path-to-your-image) <!-- optional banner image -->

Tattavakala is a **Next.js + Firebase-based platform** designed to empower artisans and creative communities by providing a marketplace to showcase, share, and sell their products. The platform also integrates AI-powered features for content management and smooth user experience.

---

## 🌟 Features

- **User Authentication** – Secure login/signup powered by Firebase Authentication.
- **Product Marketplace** – Artisans can upload, manage, and sell products.
- **Image Upload & Storage** – Images stored securely on Firebase Storage with proper CORS configuration.
- **AI Assistance** – Integration with AI tools for content suggestions and smart categorization.
- **Responsive UI** – Built using **Next.js** and **Tailwind CSS** for seamless performance across devices.
- **Discussion Forum** – Community interaction space for artisans and enthusiasts.
- **PDF Reports** – Auto-generated reports for marketplace activities and product insights.
- **Real-time Updates** – Data updates in real-time via Firebase Firestore.

---

## 🛠 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS  
- **Backend:** Firebase Functions, Firebase Firestore  
- **Storage:** Firebase Storage (with CORS configuration)  
- **AI Integration:** Gemini AI (for smart content analysis)  
- **Deployment:** Firebase Hosting

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)  
- npm or yarn  
- Firebase CLI installed (`npm install -g firebase-tools`)  
- Access to Firebase project (credentials or `.env.local` setup)

---

### Installation

1. Clone the repository:

```bash
git clone https://github.com/pankajbhattacharjee/Tattavakala2.git
cd Tattavakala2
npm install
# or
yarn install
Set up environment variables:

Create a .env.local file in the root directory with:

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket_name
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id


Run the development server:

npm run dev
# or
yarn dev


Open http://localhost:3000
 to see your app in action.

Deployment

Deploy to Firebase Hosting:

npm run build
firebase deploy --only hosting

📁 Project Structure
Tattavakala2/
├─ public/                 # Static assets
├─ app/                    # Next.js app pages & components
├─ components/             # Reusable React components
├─ firebase/               # Firebase configuration & functions
├─ utils/                  # Utility scripts (e.g., image upload, AI integration)
├─ .env.local              # Environment variables
├─ package.json            # Node dependencies
├─ README.md               # Project documentation
