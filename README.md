# RealHomes South Africa 🏠

A premium real estate platform showcasing exceptional properties across South Africa, featuring luxury villas, modern apartments, and exclusive estates in the country's most prestigious locations.

## 🌟 Features

- **South African Focus**: Properties across major cities including Cape Town, Johannesburg, Durban, and more
- **Rands Currency**: All prices displayed in South African Rands (ZAR)
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Property Listings**: Comprehensive property details with images, facilities, and descriptions
- **User Authentication**: Secure login system with Auth0
- **Interactive Maps**: Property location visualization with Leaflet
- **Favorites System**: Save and manage favorite properties
- **Booking System**: Schedule property viewings
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🏙️ Featured Locations

- **Cape Town**: Luxury villas in Camps Bay, modern apartments in Green Point
- **Johannesburg**: Premium properties in Sandton and Bryanston
- **Durban**: Beachfront properties in Umhlanga and family homes in Durban North
- **Stellenbosch**: Exclusive wine estates in the Cape Winelands
- **Plettenberg Bay**: Stunning beachfront properties on the Garden Route
- **Pretoria**: Modern townhouses in secure estates

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Query** for data fetching
- **Auth0** for authentication
- **Leaflet** for interactive maps
- **Swiper** for carousel components
- **React Icons** for beautiful icons

### Backend
- **Node.js** with Express
- **Prisma** ORM with PostgreSQL
- **JWT** authentication
- **CORS** enabled for cross-origin requests

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd RealHomes
   ```

2. **Install frontend dependencies**
   ```bash
   cd RealHome/frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables**
   
   Create `.env` files in both frontend and backend directories:
   
   **Frontend (.env)**
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_AUTH0_DOMAIN=your-auth0-domain
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   ```
   
   **Backend (.env)**
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/realhomes"
   PORT=3000
   ```

5. **Set up the database**
   ```bash
   cd backend
   npx prisma generate
   npx prisma db push
   ```

6. **Run the development servers**

   **Backend:**
   ```bash
   cd backend
   npm start
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📱 Key Features

### Property Listings
- Browse properties by location, type, and price range
- Detailed property information with high-quality images
- Interactive property cards with key details
- Price formatting in South African Rands

### User Experience
- Smooth navigation between pages
- Responsive design for all devices
- Loading states and error handling
- Toast notifications for user feedback

### Authentication
- Secure login with Auth0
- User profile management
- Protected routes for authenticated users

## 🎨 Design System

The application uses a modern design system with:
- **Color Palette**: Professional blues, grays, and accent colors
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Reusable UI components with consistent styling
- **Animations**: Smooth transitions and hover effects

## 🌐 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway/Render)
1. Connect your repository to Railway or Render
2. Set environment variables
3. Deploy the backend API

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

- **Email**: info@realhomes.co.za
- **Phone**: +27 11 234 5678
- **Website**: [RealHomes South Africa](https://realhomes.co.za)

---

**RealHomes South Africa** - Your trusted partner in South African real estate. 🇿🇦

