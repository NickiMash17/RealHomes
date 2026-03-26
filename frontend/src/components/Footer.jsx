import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaArrowUp,
  FaShieldAlt,
  FaAward,
  FaUsers,
  FaHome,
  FaStar,
  FaCrown,
  FaCheckCircle,
  FaClock,
  FaGlobe,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ];

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/listing", label: "Properties" },
    { to: "/contact", label: "Contact" },
    { to: "/favourites", label: "Favorites" },
    { to: "/bookings", label: "Bookings" },
    { to: "/addproperty", label: "List Property" },
  ];

  const popularAreas = [
    { to: "/listing?city=cape-town", label: "Cape Town" },
    { to: "/listing?city=johannesburg", label: "Johannesburg" },
    { to: "/listing?city=durban", label: "Durban" },
    { to: "/listing?city=stellenbosch", label: "Stellenbosch" },
    { to: "/listing?city=pretoria", label: "Pretoria" },
    { to: "/listing?city=plettenberg-bay", label: "Plettenberg Bay" },
  ];

  const trustIndicators = [
    {
      icon: FaShieldAlt,
      text: "Licensed & Regulated",
      color: "text-amber-400",
    },
    { icon: FaAward, text: "15+ Years Experience", color: "text-amber-400" },
    { icon: FaUsers, text: "500+ Happy Clients", color: "text-amber-400" },
    { icon: FaStar, text: "Premium Service", color: "text-amber-400" },
  ];

  const contactItems = [
    {
      icon: FaPhone,
      label: "Phone",
      value: "+27 11 234 5678",
      href: "tel:+27112345678",
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: "+27 11 234 5678",
      href: "https://wa.me/27112345678",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: "info@realhomes.co.za",
      href: "mailto:info@realhomes.co.za",
    },
  ];

  return (
    <footer
      className="text-white relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #091524 0%, #0F2339 40%, #1B3A5C 100%)",
      }}
    >
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.9)_1px,transparent_1px)] bg-[length:24px_24px]" />
      </div>

      <div className="relative z-10">
        {/* ── Main Grid ─────────────────────────────────────────────── */}
        <div className="max-padd-container py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* ── Column 1 · Brand & Trust ──────────────────────────── */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Logo */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 bg-navy-700 rounded-xl flex items-center justify-center shadow-navy border border-white/10 flex-shrink-0">
                    <FaCrown className="text-gold-400 text-lg" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold font-display text-white leading-tight">
                      RealHomes
                    </span>
                    <p className="text-xs text-gold-400 font-semibold tracking-wide">
                      Premium Properties
                    </p>
                  </div>
                </div>

                <p className="text-white/65 leading-relaxed mb-8 text-sm">
                  Premium South African real estate platform connecting
                  discerning buyers with exceptional properties across the
                  country's most coveted locations.
                </p>

                {/* Trust Indicators */}
                <div className="space-y-2.5">
                  {trustIndicators.map((indicator, index) => (
                    <motion.div
                      key={indicator.text}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg border border-white/15 text-white/80"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <indicator.icon className="text-gold-400 text-sm flex-shrink-0" />
                      <span className="text-sm font-medium">
                        {indicator.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Column 2 · Quick Links ────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-base font-bold text-white mb-6 after:content-[''] after:block after:w-8 after:h-0.5 after:bg-gold-600 after:mt-2">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-navy-100 hover:text-gold-400 transition-colors duration-200 text-sm flex items-center gap-2.5 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-600/60 flex-shrink-0 group-hover:bg-gold-400 group-hover:scale-125 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ── Column 3 · Popular Areas ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-base font-bold text-white mb-6 after:content-[''] after:block after:w-8 after:h-0.5 after:bg-gold-600 after:mt-2">
                Popular Areas
              </h3>
              <ul className="space-y-3">
                {popularAreas.map((area) => (
                  <li key={area.to}>
                    <Link
                      to={area.to}
                      className="text-navy-100 hover:text-gold-400 transition-colors duration-200 text-sm flex items-center gap-2.5 group"
                    >
                      <FaMapMarkerAlt className="w-3 h-3 text-gold-600/70 flex-shrink-0 group-hover:text-gold-400 group-hover:scale-110 transition-all duration-200" />
                      {area.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ── Column 4 · Contact ────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-base font-bold text-white mb-6 after:content-[''] after:block after:w-8 after:h-0.5 after:bg-gold-600 after:mt-2">
                Contact Us
              </h3>

              <div className="space-y-4">
                {/* Phone / WhatsApp / Email */}
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-gold-600 transition-colors duration-200 flex-shrink-0 mt-0.5">
                      <Icon className="text-gold-400 group-hover:text-white text-sm transition-colors duration-200" />
                    </div>
                    <div>
                      <p className="text-white/45 text-xs mb-0.5">{label}</p>
                      <a
                        href={href}
                        className="text-white/85 hover:text-gold-400 transition-colors duration-200 text-sm font-medium"
                      >
                        {value}
                      </a>
                    </div>
                  </div>
                ))}

                {/* Address (no link) */}
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-gold-600 transition-colors duration-200 flex-shrink-0 mt-0.5">
                    <FaMapMarkerAlt className="text-gold-400 group-hover:text-white text-sm transition-colors duration-200" />
                  </div>
                  <div>
                    <p className="text-white/45 text-xs mb-0.5">Address</p>
                    <p className="text-white/85 text-sm font-medium leading-relaxed">
                      123 Sandton Drive
                      <br />
                      Sandton, Johannesburg
                      <br />
                      South Africa
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Newsletter ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-14 pt-10 border-t border-white/10"
          >
            <div className="max-w-2xl mx-auto text-center mb-7">
              <h3 className="text-xl font-bold font-display text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-white/55 text-sm">
                Get the latest property listings and exclusive market insights
                delivered to your inbox
              </p>
            </div>

            <div className="max-w-lg mx-auto">
              <form onSubmit={handleSubscribe} className="flex gap-2.5">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/45 text-sm focus:outline-none focus:border-gold-500 focus:bg-white/15 transition-all duration-200"
                />
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-semibold rounded-xl text-sm transition-all duration-200 whitespace-nowrap shadow-gold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
              </form>

              <AnimatePresence>
                {isSubscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-3 text-center"
                  >
                    <span className="inline-flex items-center gap-2 bg-green-600/25 border border-green-500/35 text-green-300 px-4 py-2 rounded-lg text-sm">
                      <FaCheckCircle className="text-green-400 flex-shrink-0" />
                      Successfully subscribed!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Bar ─────────────────────────────────────────────── */}
        <div className="border-t border-white/10">
          <div className="max-padd-container py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-5">
              {/* Copyright */}
              <p className="text-white/50 text-sm order-last md:order-first">
                <span className="text-gold-500">&copy;</span> {currentYear}{" "}
                RealHomes South Africa. All rights reserved.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-gold-600 flex items-center justify-center text-white/65 hover:text-white transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-5 text-sm">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-white/45 hover:text-gold-400 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll to Top ──────────────────────────────────────────────── */}
      <motion.button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 bg-navy-700 hover:bg-gold-600 text-white rounded-xl shadow-navy z-50 flex items-center justify-center transition-colors duration-300"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <FaArrowUp className="w-4 h-4" />
      </motion.button>
    </footer>
  );
};

export default Footer;
