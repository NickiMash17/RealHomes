<div align="center">

# 🏡 RealHomes South Africa

### *Where Luxury Meets Technology*

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

**Discover Your Dream Home Across South Africa's Most Prestigious Locations**

[Live Demo](https://real-homes.vercel.app) • [Documentation](#-documentation) • [Features](#-feature-showcase) • [Tech Stack](#-technology-stack)

---

</div>

## 🌟 Welcome to RealHomes

RealHomes isn't just another real estate platform—it's a **revolutionary experience** that transforms how you discover, explore, and fall in love with properties across South Africa. From the vibrant streets of Cape Town to the bustling energy of Johannesburg, we bring luxury properties to your fingertips with cutting-edge technology and stunning design.

### ✨ What Makes Us Special?

- 🎨 **Breathtaking UI/UX** - Every pixel crafted for perfection
- ⚡ **Lightning Fast** - Optimized for speed and performance
- 📱 **Fully Responsive** - Seamless experience on any device
- 🔒 **Secure & Reliable** - Built with security best practices
- 🚀 **Modern Stack** - Latest technologies and best practices

---

## 🎯 Feature Showcase

### 🔍 **Intelligent Property Discovery**

- **Advanced Search & Filters** - Find your perfect property with precision
  - Price range, bedrooms, bathrooms, area filters
  - Location-based search with city selection
  - Property type filtering (Houses, Apartments, Estates)
  - Featured properties highlighting
  
- **Saved Searches** - Never miss a match
  - Save complex search criteria
  - Quick access to your favorite searches
  - Load searches from URL parameters
  
- **Property Alerts** - Stay ahead of the market
  - Create custom alerts based on search criteria
  - Get notified when new properties match
  - Manage and customize your alerts

### 💎 **Premium User Experience**

- **Property Comparison** - Compare up to 4 properties side-by-side
  - Side-by-side feature comparison
  - Quick add/remove from comparison
  - Visual comparison interface
  
- **Recently Viewed** - Pick up where you left off
  - Automatic tracking of viewed properties
  - Quick access to your browsing history
  - Easy removal and management
  
- **Favorites System** - Build your dream collection
  - Save properties to favorites
  - Sync across devices
  - Quick access from header

### 🧮 **Smart Tools**

- **Mortgage Calculator** - Plan your investment
  - Calculate monthly payments
  - Adjustable interest rates and loan terms
  - Additional costs estimation
  - Real-time calculations
  
- **Property Sharing** - Share the love
  - Native share API support
  - WhatsApp, Email, Facebook, Twitter, LinkedIn
  - Clipboard fallback for easy sharing

### 📅 **Booking & Management**

- **Viewing Bookings** - Schedule property visits
  - Easy booking interface
  - Manage your appointments
  - Cancel bookings when needed
  
- **User Dashboard** - Everything in one place
  - View all your favorites
  - Manage bookings
  - Track your activity

### 🎨 **Design Excellence**

- **Smooth Animations** - Powered by Framer Motion
  - Page transitions
  - Hover effects
  - Loading states
  - Micro-interactions
  
- **Accessibility First** - Built for everyone
  - WCAG 2.1 compliant
  - Keyboard navigation
  - Screen reader support
  - Skip-to-content links
  - Enhanced focus styles

### ⚡ **Performance Optimized**

- **Service Worker** - Offline support & caching
- **Code Splitting** - Faster initial load
- **Image Optimization** - Lazy loading & blur placeholders
- **Resource Hints** - Preconnect & DNS prefetch
- **Performance Monitoring** - Track and optimize

---

## 🚀 Technology Stack

### Frontend Architecture

```
✨ Modern React Ecosystem
├── React 18.2.0          → Latest React with hooks & concurrent features
├── Vite 5.2.0            → Lightning-fast build tool
├── React Router 6.23     → Client-side routing
├── React Query 3.39      → Powerful data fetching & caching
└── Framer Motion 12.23   → Production-ready animations
```

```
🎨 Styling & Design
├── Tailwind CSS 3.4      → Utility-first CSS framework
├── Custom Design System   → Premium color palette & typography
├── Responsive Design      → Mobile-first approach
└── Dark Mode Ready       → (Light mode enforced)
```

```
🗺️ Interactive Features
├── Leaflet               → Interactive maps
├── React Leaflet         → React integration
├── ESRI Geocoder         → Location search
└── Optimized Images      → Performance-focused image handling
```

### Backend Architecture

```
⚙️ Server Infrastructure
├── Node.js               → JavaScript runtime
├── Express.js            → Web framework
├── Prisma                → Modern ORM
└── MongoDB               → Flexible database
```

```
🔐 Security & Auth
├── JWT Authentication     → Secure token-based auth
├── CORS Configuration     → Cross-origin security
├── Error Handling         → Comprehensive error management
└── Input Validation       → Data sanitization
```

### Development Tools

```
🛠️ Code Quality
├── ESLint                → Linting & code quality
├── Prettier              → Code formatting
└── Git                   → Version control
```

```
🚀 Deployment
├── Vercel                → Frontend hosting
├── Render                → Backend hosting
└── GitHub Actions        → CI/CD (optional)
```

---

## 📦 Installation & Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Git** - Version control
- **MongoDB** - Database (or MongoDB Atlas account)

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/NickiMash17/RealHomes.git
cd RealHomes

# 2. Install frontend dependencies
cd frontend
npm install

# 3. Install backend dependencies
cd ../backend
npm install

# 4. Set up environment variables
# Create .env file in backend directory
cp .env.example .env
# Edit .env with your MongoDB connection string

# 5. Start development servers

# Terminal 1 - Frontend (runs on http://localhost:5173)
cd frontend
npm run dev

# Terminal 2 - Backend (runs on http://localhost:5000)
cd backend
npm run dev
```

### Environment Variables

**Backend (.env)**
```env
DATABASE_URL="mongodb://localhost:27017/realhomes"
# or
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/realhomes"
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-secret-key-here
```

**Frontend**
- No environment variables required for basic setup
- API calls default to `http://localhost:5000`

---

## 📁 Project Structure

```
RealHomes/
│
├── frontend/                    # React frontend application
│   ├── public/                 # Static assets
│   │   ├── sw.js              # Service worker
│   │   ├── favicon.svg        # App icon
│   │   └── ...
│   │
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Header.jsx     # Navigation header
│   │   │   ├── Footer.jsx     # Site footer
│   │   │   ├── Item.jsx       # Property card
│   │   │   ├── Properties.jsx # Property listing
│   │   │   ├── PropertyComparison.jsx
│   │   │   ├── PropertyAlerts.jsx
│   │   │   ├── MortgageCalculator.jsx
│   │   │   └── ...
│   │   │
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── Listing.jsx    # Property listings
│   │   │   ├── Property.jsx   # Property details
│   │   │   ├── Favourites.jsx # User favorites
│   │   │   ├── Bookings.jsx     # Viewing bookings
│   │   │   └── Contact.jsx    # Contact page
│   │   │
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── usePropertyComparison.js
│   │   │   ├── usePropertyAlerts.js
│   │   │   ├── useSavedSearches.js
│   │   │   ├── useRecentlyViewed.js
│   │   │   └── ...
│   │   │
│   │   ├── context/            # React context providers
│   │   │   ├── MockAuthContext.jsx
│   │   │   └── UserDetailContext.jsx
│   │   │
│   │   ├── utils/              # Utility functions
│   │   │   ├── api.js         # API client
│   │   │   ├── shareProperty.js
│   │   │   ├── errorHandler.js
│   │   │   └── performance.js
│   │   │
│   │   ├── assets/            # Images, icons, etc.
│   │   ├── constant/          # Constants & data
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   │
│   ├── package.json
│   ├── vite.config.js         # Vite configuration
│   └── tailwind.config.js     # Tailwind configuration
│
├── backend/                    # Node.js backend
│   ├── controllers/           # Route controllers
│   │   ├── userCntrl.js      # User operations
│   │   └── ...
│   ├── routes/                # API routes
│   ├── prisma/                # Database schema
│   │   └── schema.prisma
│   ├── data/                  # Sample data
│   ├── index.js               # Server entry point
│   └── package.json
│
└── README.md                   # This file
```

---

## 🎨 Design System

### Color Palette

Our design uses a sophisticated color scheme that reflects luxury and professionalism:

```css
/* Primary Colors */
--amber-500: #f59e0b;    /* Primary accent */
--amber-600: #d97706;    /* Hover states */
--gray-900: #111827;     /* Text primary */
--gray-50: #f9fafb;      /* Backgrounds */

/* Luxury Accents */
--gold: #d4af37;         /* Premium highlights */
--platinum: #e5e4e2;     /* Subtle accents */
```

### Typography

- **Primary**: Inter - Modern, clean, highly readable
- **Display**: Playfair Display - Elegant headings for luxury feel
- **Monospace**: DM Sans - For technical elements

### Animations

- **Framer Motion** for smooth, performant animations
- **Custom keyframes** for unique loading states
- **Hover effects** with scale and glow
- **Page transitions** for seamless navigation

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Build for production
cd frontend
npm run build

# Deploy to Vercel (if using Vercel CLI)
vercel --prod

# Or connect your GitHub repo to Vercel for automatic deployments
```

### Backend (Render/Railway)

```bash
# Set environment variables in your hosting platform
DATABASE_URL=your-mongodb-connection-string
FRONTEND_URL=https://your-frontend-url.vercel.app
PORT=5000
JWT_SECRET=your-secret-key

# Deploy to Render
# 1. Connect your GitHub repo
# 2. Set build command: npm install
# 3. Set start command: npm start
# 4. Add environment variables
```

---

## 📊 Performance Metrics

- ⚡ **First Contentful Paint**: < 1.5s
- 🚀 **Time to Interactive**: < 3s
- 📦 **Bundle Size**: Optimized with code splitting
- 🖼️ **Image Loading**: Lazy loading with blur placeholders
- 💾 **Caching**: Service worker for offline support

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Community** - For the amazing ecosystem
- **Tailwind CSS** - For the utility-first approach
- **Framer Motion** - For beautiful animations
- **Vercel** - For seamless deployment
- **All Contributors** - Who make this project better

---

## 📞 Contact & Support

- **Website**: [Live Demo](https://real-homes.vercel.app)
- **GitHub**: [@NickiMash17](https://github.com/NickiMash17)
- **Issues**: [Report a Bug](https://github.com/NickiMash17/RealHomes/issues)

---

<div align="center">

### Built with ❤️ by [Nicolette Mashaba](https://github.com/NickiMash17)

**RealHomes** - *Transforming Real Estate Technology, One Property at a Time*

⭐ Star this repo if you find it helpful!

---

[⬆ Back to Top](#-realhomes-south-africa)

</div>
