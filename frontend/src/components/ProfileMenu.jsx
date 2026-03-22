import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMockAuth } from "../context/MockAuthContext.jsx";
import {
  FaHeart,
  FaCalendarAlt,
  FaSignOutAlt,
  FaChevronDown,
  FaUserCircle,
} from "react-icons/fa";

const ProfileMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { logout } = useMockAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-ivory-300 bg-white hover:border-gold-400 hover:bg-ivory-100 transition-all duration-200 shadow-sm"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {user?.picture ? (
          <img
            src={user.picture}
            alt={user?.name || "Profile"}
            className="w-7 h-7 rounded-lg object-cover border border-ivory-300"
          />
        ) : (
          <div className="w-7 h-7 rounded-lg bg-navy-700 flex items-center justify-center flex-shrink-0">
            <FaUserCircle className="text-white text-sm" />
          </div>
        )}
        <span className="hidden sm:block text-sm font-semibold text-charcoal-900 max-w-[100px] truncate">
          {user?.name?.split(" ")[0] || "Account"}
        </span>
        <FaChevronDown
          className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-ivory-300 overflow-hidden z-50"
          style={{
            boxShadow:
              "0 16px 40px rgba(27,58,92,0.14), 0 4px 8px rgba(0,0,0,0.06)",
          }}
        >
          {/* User info header */}
          <div className="px-4 py-3.5 border-b border-ivory-300 bg-navy-50">
            <div className="flex items-center gap-3">
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt={user?.name || "Profile"}
                  className="w-9 h-9 rounded-xl object-cover border-2 border-white shadow-sm flex-shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-navy-700 flex items-center justify-center flex-shrink-0">
                  <FaUserCircle className="text-white text-base" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-charcoal-900 truncate leading-tight">
                  {user?.name || "Guest User"}
                </p>
                <p
                  className="text-xs font-semibold mt-0.5"
                  style={{ color: "#C9962C" }}
                >
                  Premium Member
                </p>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1.5">
            <Link
              to="/favourites"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal-700 hover:bg-navy-50 hover:text-navy-700 transition-colors duration-150 group"
            >
              <span className="w-7 h-7 rounded-lg bg-ivory-200 group-hover:bg-navy-100 flex items-center justify-center flex-shrink-0 transition-colors">
                <FaHeart className="w-3.5 h-3.5 text-neutral-500 group-hover:text-navy-700" />
              </span>
              <span className="font-medium">My Favourites</span>
            </Link>

            <Link
              to="/bookings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal-700 hover:bg-navy-50 hover:text-navy-700 transition-colors duration-150 group"
            >
              <span className="w-7 h-7 rounded-lg bg-ivory-200 group-hover:bg-navy-100 flex items-center justify-center flex-shrink-0 transition-colors">
                <FaCalendarAlt className="w-3.5 h-3.5 text-neutral-500 group-hover:text-navy-700" />
              </span>
              <span className="font-medium">My Bookings</span>
            </Link>
          </div>

          {/* Divider + logout */}
          <div className="border-t border-ivory-300 py-1.5">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 group"
            >
              <span className="w-7 h-7 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center flex-shrink-0 transition-colors">
                <FaSignOutAlt className="w-3.5 h-3.5 text-red-500" />
              </span>
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
