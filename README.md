# 🏠 RealHomes - South African Luxury Real Estate Platform

A modern, responsive real estate platform showcasing premium properties across South Africa. Built with React, Node.js, and MongoDB, featuring Auth0 authentication and interactive maps.

## ✨ Features

### 🏘️ **Property Management**
- **Browse Properties**: View curated luxury properties across South Africa
- **Property Details**: Detailed property pages with images, amenities, and location
- **Interactive Maps**: Google Maps integration for property locations
- **Search & Filter**: Advanced filtering by location, price, and amenities
- **Favorites System**: Save and manage favorite properties
- **Property Booking**: Schedule property visits with booking system

### 👤 **User Experience**
- **Authentication**: Secure login with Auth0 integration
- **User Profiles**: Personalized dashboard with favorites and bookings
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Live notifications and status updates
- **Modern UI/UX**: Beautiful, intuitive interface with smooth animations

### 🎨 **Design & UX**
- **Premium Aesthetic**: Luxury-focused design with premium color scheme
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Mobile Responsive**: Optimized for all screen sizes
- **Accessibility**: WCAG compliant design elements
- **Loading States**: Elegant loading animations and skeleton screens

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **React Query** - Data fetching and caching
- **React Router DOM** - Client-side routing
- **Auth0** - Authentication and authorization
- **Mantine** - UI component library
- **React Icons** - Icon library
- **React Spinners** - Loading animations

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Prisma** - Database ORM
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Tokens for authentication
- **Nodemon** - Development server with auto-restart

### **Deployment & Tools**
- **Vercel** - Frontend deployment platform
- **GitHub** - Version control and collaboration
- **Postman** - API testing and documentation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB database
- Auth0 account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NickiMash17/RealHomes.git
   cd RealHomes
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**
   - Create `.env` file in backend directory
   - Add your MongoDB connection string
   - Configure Auth0 credentials

5. **Start the development servers**
   ```bash
   # Start backend (from backend directory)
   npm start
   
   # Start frontend (from frontend directory)
   npm run dev
   ```

## 📱 Mobile Responsive Features

- **Touch-Friendly**: Optimized touch targets for mobile devices
- **Responsive Grid**: Adaptive property grid layouts
- **Mobile Navigation**: Collapsible navigation menu
- **Optimized Images**: Responsive image loading
- **Gesture Support**: Swipe and touch gestures
- **Performance**: Optimized for mobile performance

## 🎯 Key Components

### **Frontend Structure**
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── context/       # React Context providers
│   ├── utils/         # Utility functions
│   ├── assets/        # Images and static files
│   └── constant/      # Constants and data
```

### **Backend Structure**
```
backend/
├── controllers/       # Route controllers
├── routes/           # API routes
├── config/           # Configuration files
├── prisma/           # Database schema
└── data/             # Mock data
```

## 🔧 API Endpoints

### **Properties**
- `GET /api/residency` - Get all properties
- `GET /api/residency/:id` - Get property by ID
- `POST /api/residency/create` - Create new property

### **User Management**
- `POST /api/user/register` - Register user
- `POST /api/user/toFav/:id` - Add to favorites
- `POST /api/user/allFav` - Get user favorites
- `POST /api/user/bookVisit/:id` - Book property visit
- `POST /api/user/allBookings` - Get user bookings

## 🎨 Design System

### **Color Palette**
- **Primary**: Deep blue (#1a365d)
- **Secondary**: Amber (#fbbf24)
- **Accent**: Red (#dc2626)
- **Neutral**: Gray scale (#f8f9fa to #1f2937)

### **Typography**
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700
- **Responsive**: Scales from mobile to desktop

## 🌟 Features in Detail

### **Property Showcase**
- High-quality property images
- Detailed property information
- Interactive location maps
- Amenity icons and descriptions
- Price formatting and currency display

### **User Authentication**
- Secure Auth0 integration
- Social login options
- Protected routes
- User profile management
- Session management

### **Booking System**
- Property visit scheduling
- Booking management
- Calendar integration
- Email notifications
- Booking history

### **Favorites System**
- Add/remove favorites
- Favorites list view
- Sync across devices
- Quick access from navigation

## 📊 Performance Optimizations

- **Lazy Loading**: Images and components
- **Code Splitting**: Route-based splitting
- **Caching**: React Query for data caching
- **Bundle Optimization**: Vite build optimization
- **Image Optimization**: Responsive images
- **Mobile First**: Performance-focused mobile design

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **CORS Protection**: Cross-origin request handling
- **Input Validation**: Server-side validation
- **Rate Limiting**: API rate limiting
- **Environment Variables**: Secure configuration

## 🚀 Deployment

### **Frontend (Vercel)**
- Automatic deployments from GitHub
- Preview deployments for PRs
- Environment variable configuration
- Custom domain support

### **Backend (Railway/Render)**
- Node.js deployment
- MongoDB Atlas integration
- Environment variable management
- Automatic restarts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nicolette Mashaba**
- GitHub: [@NickiMash17](https://github.com/NickiMash17)
- LinkedIn: [Nicolette Mashaba](https://www.linkedin.com/in/nicolette-mashaba/)

## 🙏 Acknowledgments

- **Auth0** for authentication services
- **Unsplash** for high-quality images
- **React Community** for excellent documentation
- **Tailwind CSS** for the utility-first framework
- **Vercel** for seamless deployment

---

**RealHomes** - Connecting discerning buyers with exceptional properties across South Africa's most prestigious locations. 🏠✨