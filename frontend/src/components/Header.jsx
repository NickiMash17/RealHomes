import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMockAuth } from "../context/MockAuthContext.jsx";
import { useQuery } from "react-query";
import { getAllFav } from "../utils/api";
import { usePropertyComparison } from "../hooks/usePropertyComparison";
import { usePropertyAlerts } from "../hooks/usePropertyAlerts";
import ProfileMenu from "./ProfileMenu";
import PropertyComparison from "./PropertyComparison";
import PropertyAlerts from "./PropertyAlerts";
import MortgageCalculator from "./MortgageCalculator";
import {
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
  FaWhatsapp,
  FaHome,
  FaBuilding,
  FaUser as FaContact,
  FaFileAlt,
  FaSearch,
  FaCrown,
  FaBalanceScale,
  FaBell,
  FaCalculator,
} from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showComparison, setShowComparison] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showMortgageCalculator, setShowMortgageCalculator] = useState(false);
  const { isAuthenticated, user, loginWithRedirect, isLoading, getAccessTokenSilently } = useMockAuth();
  const { comparisonList } = usePropertyComparison();
  const { getUnreadCount } = usePropertyAlerts();
  const location = useLocation();

  // Favorites count query
  const { data: favoritesData } = useQuery(
    ["favorites", user?.email],
    async () => {
      const token = await getAccessTokenSilently();
      return getAllFav(user?.email, token);
    },
    {
      enabled: isAuthenticated && !!user?.email,
      staleTime: 2 * 60 * 1000,
    },
  );

  const favoritesCount = Array.isArray(favoritesData)
    ? favoritesData.length
    : 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleFavoritesClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      window.location.href = "/favourites";
    }
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/listing?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const isActiveLink = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/listing", label: "Properties", icon: FaBuilding },
    { path: "/contact", label: "Contact", icon: FaContact },
    { path: "/add-property", label: "List Property", icon: FaFileAlt },
  ];

  return (
    <>
      {/* ─── Main Header ─────────────────────────────────────────────── */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? "shadow-md border-b border-ivory-300" : ""
        }`}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* ── Logo ─────────────────────────────────────────────── */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 mr-2 sm:mr-8"
            >
              <Link
                to="/"
                className="flex items-center gap-2 sm:gap-3 group min-w-0"
              >
                <div className="w-9 h-9 bg-navy-700 rounded-xl flex items-center justify-center shadow-navy group-hover:bg-navy-800 transition-colors duration-300">
                  <FaCrown className="text-gold-400 text-base" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-bold font-display text-charcoal-900 group-hover:text-navy-700 transition-colors duration-300 tracking-tight truncate">
                    RealHomes
                  </span>
                  <span className="hidden sm:block text-xs text-neutral-500 font-medium tracking-wide">
                    Luxury Properties
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* ── Desktop Navigation ────────────────────────────────── */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      isActiveLink(item.path)
                        ? "bg-navy-700 text-white shadow-navy"
                        : "text-charcoal-700 hover:text-navy-700 hover:bg-navy-50"
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* ── Desktop Search ────────────────────────────────────── */}
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex flex-1 max-w-xs xl:max-w-sm mx-4"
            >
              <div className="relative w-full">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-3.5 h-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border-2 border-ivory-300 rounded-xl bg-white text-charcoal-900 placeholder:text-neutral-400 focus:outline-none focus:border-gold-600 transition-colors duration-200"
                />
              </div>
            </form>

            {/* ── Action Buttons ────────────────────────────────────── */}
            <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/27112345678"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center justify-center p-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Contact via WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </motion.a>

              {/* Property Comparison */}
              <motion.button
                onClick={() => setShowComparison(true)}
                className="relative hidden md:inline-flex p-2.5 rounded-lg text-neutral-500 hover:text-navy-700 hover:bg-navy-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy-300 focus:ring-offset-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Compare properties${comparisonList.length > 0 ? ` (${comparisonList.length} selected)` : ""}`}
                aria-expanded={showComparison}
              >
                <FaBalanceScale className="w-4 h-4" />
                {comparisonList.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-navy-700 text-white text-[10px] rounded-full min-w-[16px] h-4 flex items-center justify-center font-bold px-1">
                    {comparisonList.length}
                  </span>
                )}
              </motion.button>

              {/* Property Alerts */}
              <motion.button
                onClick={() => setShowAlerts(true)}
                className="relative hidden md:inline-flex p-2.5 rounded-lg text-neutral-500 hover:text-navy-700 hover:bg-navy-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy-300 focus:ring-offset-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Property alerts${getUnreadCount() > 0 ? ` (${getUnreadCount()} new)` : ""}`}
                aria-expanded={showAlerts}
              >
                <FaBell className="w-4 h-4" />
                {getUnreadCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-600 text-white text-[10px] rounded-full min-w-[16px] h-4 flex items-center justify-center font-bold px-1 animate-pulse">
                    {getUnreadCount() > 99 ? "99+" : getUnreadCount()}
                  </span>
                )}
              </motion.button>

              {/* Mortgage Calculator */}
              <motion.button
                onClick={() => setShowMortgageCalculator(true)}
                className="hidden md:inline-flex p-2.5 rounded-lg text-neutral-500 hover:text-navy-700 hover:bg-navy-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy-300 focus:ring-offset-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open mortgage calculator"
                aria-expanded={showMortgageCalculator}
              >
                <FaCalculator className="w-4 h-4" />
              </motion.button>

              {/* Favorites */}
              <motion.button
                onClick={handleFavoritesClick}
                disabled={isLoading}
                className="relative hidden sm:inline-flex p-2.5 rounded-lg text-neutral-500 hover:text-navy-700 hover:bg-navy-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy-300 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`View favorites${favoritesCount > 0 ? ` (${favoritesCount} properties)` : ""}`}
                aria-disabled={isLoading}
              >
                <FaHeart className="w-4 h-4" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full min-w-[16px] h-4 flex items-center justify-center font-bold px-1">
                    {favoritesCount > 99 ? "99+" : favoritesCount}
                  </span>
                )}
              </motion.button>

              {/* Profile / Login */}
              <div className="hidden sm:block">
                {isAuthenticated ? (
                  <ProfileMenu user={user} />
                ) : (
                  <motion.button
                    onClick={handleProfileClick}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-navy-700 hover:bg-navy-800 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-navy disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <FaUser className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Login</span>
                      </>
                    )}
                  </motion.button>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2.5 rounded-lg text-neutral-500 hover:text-navy-700 hover:bg-navy-50 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* ─── Mobile Menu ──────────────────────────────────────────────── */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden bg-white border-t border-ivory-300 shadow-lg"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <div className="max-h-[75vh] sm:max-h-[70vh] overflow-y-auto">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="mb-4">
                    <div className="relative w-full">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-3.5 h-3.5 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Search properties..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border-2 border-ivory-300 rounded-xl text-sm text-charcoal-900 placeholder:text-neutral-400 bg-white focus:outline-none focus:border-gold-600 transition-colors duration-200"
                      />
                    </div>
                  </form>

                  {/* Mobile Nav Links */}
                  <nav className="flex flex-col gap-1 mb-4">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.06 }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isActiveLink(item.path)
                              ? "bg-navy-700 text-white shadow-navy"
                              : "text-charcoal-700 hover:text-navy-700 hover:bg-navy-50"
                          }`}
                        >
                          <item.icon className="w-4 h-4 flex-shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Mobile WhatsApp CTA */}
                  <div className="mb-4">
                    <a
                      href="https://wa.me/27112345678"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                      Contact via WhatsApp
                    </a>
                  </div>

                  {/* Mobile Bottom Actions */}
                  <div className="flex flex-col gap-2 pt-4 border-t border-ivory-300">
                    {/* Favorites shortcut */}
                    <motion.button
                      onClick={() => {
                        handleFavoritesClick();
                        setIsMenuOpen(false);
                      }}
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg text-charcoal-700 hover:text-navy-700 hover:bg-navy-50 text-sm font-medium transition-all duration-200 disabled:opacity-50"
                      whileTap={{ scale: 0.97 }}
                    >
                      <FaHeart className="w-4 h-4" />
                      <span>
                        Favorites {favoritesCount > 0 && `(${favoritesCount})`}
                      </span>
                    </motion.button>

                    {/* Comparison shortcut */}
                    <motion.button
                      onClick={() => {
                        setShowComparison(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg text-charcoal-700 hover:text-navy-700 hover:bg-navy-50 text-sm font-medium transition-all duration-200"
                      whileTap={{ scale: 0.97 }}
                    >
                      <FaBalanceScale className="w-4 h-4" />
                      <span>
                        Compare{" "}
                        {comparisonList.length > 0 &&
                          `(${comparisonList.length})`}
                      </span>
                    </motion.button>

                    {/* Alerts shortcut */}
                    <motion.button
                      onClick={() => {
                        setShowAlerts(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg text-charcoal-700 hover:text-navy-700 hover:bg-navy-50 text-sm font-medium transition-all duration-200"
                      whileTap={{ scale: 0.97 }}
                    >
                      <FaBell className="w-4 h-4" />
                      <span>
                        Alerts {getUnreadCount() > 0 && `(${getUnreadCount()})`}
                      </span>
                    </motion.button>

                    {/* Mortgage calculator shortcut */}
                    <motion.button
                      onClick={() => {
                        setShowMortgageCalculator(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg text-charcoal-700 hover:text-navy-700 hover:bg-navy-50 text-sm font-medium transition-all duration-200"
                      whileTap={{ scale: 0.97 }}
                    >
                      <FaCalculator className="w-4 h-4" />
                      <span>Mortgage Calculator</span>
                    </motion.button>

                    {/* Authenticated user info OR login button */}
                    {isAuthenticated ? (
                      <motion.div
                        className="flex items-center gap-3 px-4 py-3 bg-navy-50 rounded-xl border border-navy-200"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <img
                          src={user?.picture || "/user.svg"}
                          alt="Profile"
                          className="w-9 h-9 rounded-lg border-2 border-white shadow-sm flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-sm font-bold text-charcoal-900 block truncate">
                            {user?.name}
                          </span>
                          <p className="text-xs text-gold-600 font-semibold">
                            Premium Member
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.button
                        onClick={() => {
                          handleProfileClick();
                          setIsMenuOpen(false);
                        }}
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2.5 px-4 py-2.5 bg-navy-700 hover:bg-navy-800 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-navy disabled:opacity-50 active:scale-95"
                        whileTap={{ scale: 0.97 }}
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <FaUser className="w-4 h-4" />
                            Login / Register
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ─── Modals ───────────────────────────────────────────────────── */}
      <PropertyComparison
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />
      <PropertyAlerts
        opened={showAlerts}
        onClose={() => setShowAlerts(false)}
      />
      <MortgageCalculator
        opened={showMortgageCalculator}
        onClose={() => setShowMortgageCalculator(false)}
      />
    </>
  );
};

export default Header;
