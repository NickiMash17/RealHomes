import React, { useState } from "react";
import { Modal } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBell,
  FaTimes,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaCheckCircle,
  FaHome,
  FaArrowRight,
} from "react-icons/fa";
import { usePropertyAlerts } from "../hooks/usePropertyAlerts";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import EmptyState from "./EmptyState";

const PropertyAlerts = ({ opened, onClose }) => {
  const {
    alerts,
    newMatches,
    removeAlert,
    toggleAlert,
    clearAllAlerts,
    markMatchesAsRead,
    getUnreadCount,
    maxAlerts,
  } = usePropertyAlerts();
  const navigate = useNavigate();

  const handleViewMatches = (alertId, alertName) => {
    const alert = alerts.find((a) => a.id === alertId);
    if (!alert) return;

    // Navigate to listing page with alert criteria
    const params = new URLSearchParams();
    if (alert.criteria.searchTerm)
      params.append("search", alert.criteria.searchTerm);
    if (alert.criteria.selectedCategory !== "all")
      params.append("category", alert.criteria.selectedCategory);
    if (alert.criteria.minBedrooms !== "any")
      params.append("bedrooms", alert.criteria.minBedrooms);
    if (alert.criteria.maxPrice < 50000000)
      params.append("maxPrice", alert.criteria.maxPrice);

    markMatchesAsRead(alertId);
    navigate(`/listing?${params.toString()}`);
    onClose();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <FaBell className="text-navy-700 text-2xl" />
          <span className="font-display font-bold text-2xl text-charcoal-900">
            Property Alerts
          </span>
          {getUnreadCount() > 0 && (
            <span className="bg-gold-600 text-white rounded-full px-2.5 py-0.5 text-xs font-bold ml-2">
              {getUnreadCount()} new
            </span>
          )}
        </div>
      }
      size="xl"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      transitionProps={{ transition: "pop", duration: 200 }}
      classNames={{
        content: "rounded-2xl shadow-2xl",
        header: "px-6 py-4 border-b border-ivory-300",
        body: "p-0",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white rounded-b-2xl"
      >
        {alerts.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={FaBell}
              title="No Property Alerts"
              description="Create alerts to get notified when new properties match your search criteria."
            />
          </div>
        ) : (
          <>
            <div className="max-h-[60vh] overflow-y-auto p-6">
              <motion.div variants={containerVariants} className="space-y-4">
                {alerts.map((alert) => {
                  const match = newMatches.find((m) => m.alertId === alert.id);
                  const hasNewMatches = match && match.count > 0;

                  return (
                    <motion.div
                      key={alert.id}
                      variants={itemVariants}
                      className={`bg-white rounded-2xl border-2 p-5 transition-all duration-300 ${
                        hasNewMatches
                          ? "border-gold-300 bg-gold-50/30 shadow-lg"
                          : "border-ivory-300 shadow-sm hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-lg text-charcoal-900">
                              {alert.name}
                            </h4>
                            {hasNewMatches && (
                              <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-bold">
                                {match.count} new
                              </span>
                            )}
                            {!alert.isActive && (
                              <span className="bg-neutral-100 text-neutral-600 rounded-full px-2 py-0.5 text-xs font-medium">
                                Inactive
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-400 mb-3">
                            Created:{" "}
                            {dayjs(alert.createdAt).format("DD MMM YYYY")} •
                            Last checked:{" "}
                            {dayjs(alert.lastChecked).format(
                              "DD MMM YYYY HH:mm",
                            )}
                          </p>
                          <div className="space-y-1 text-sm text-neutral-700">
                            {alert.criteria.searchTerm && (
                              <p>
                                <strong>Keywords:</strong>{" "}
                                {alert.criteria.searchTerm}
                              </p>
                            )}
                            {alert.criteria.selectedCategory !== "all" && (
                              <p>
                                <strong>Type:</strong>{" "}
                                {alert.criteria.selectedCategory}
                              </p>
                            )}
                            {alert.criteria.minBedrooms !== "any" && (
                              <p>
                                <strong>Min Beds:</strong>{" "}
                                {alert.criteria.minBedrooms}+
                              </p>
                            )}
                            {alert.criteria.maxPrice < 50000000 && (
                              <p>
                                <strong>Max Price:</strong>{" "}
                                {formatPrice(alert.criteria.maxPrice)}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <motion.button
                            onClick={() => toggleAlert(alert.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              alert.isActive
                                ? "text-green-600 hover:bg-green-50"
                                : "text-neutral-400 hover:bg-navy-50"
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={
                              alert.isActive
                                ? "Deactivate alert"
                                : "Activate alert"
                            }
                          >
                            {alert.isActive ? (
                              <FaToggleOn className="w-6 h-6" />
                            ) : (
                              <FaToggleOff className="w-6 h-6" />
                            )}
                          </motion.button>
                          <motion.button
                            onClick={() => removeAlert(alert.id)}
                            className="p-2 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Remove ${alert.name}`}
                          >
                            <FaTrash className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>

                      {hasNewMatches && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 pt-4 border-t border-gold-200"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-gold-700">
                              🎉 {match.count} new{" "}
                              {match.count === 1 ? "property" : "properties"}{" "}
                              found!
                            </p>
                            <button
                              onClick={() =>
                                handleViewMatches(alert.id, alert.name)
                              }
                              className="inline-flex items-center gap-2 px-4 py-2 bg-gold-600 hover:bg-gold-700 text-white rounded-xl text-sm font-semibold transition-all"
                            >
                              View Matches
                              <FaArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <div className="p-6 bg-ivory-200 border-t border-ivory-300 flex items-center justify-between">
              <p className="text-sm text-neutral-500">
                {alerts.length} / {maxAlerts} alerts
              </p>
              <button
                onClick={clearAllAlerts}
                className="text-red-600 hover:bg-red-50 border border-red-200 hover:border-red-300 rounded-lg px-3 py-1.5 text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <FaTrash />
                Clear All
              </button>
            </div>
          </>
        )}
      </motion.div>
    </Modal>
  );
};

export default PropertyAlerts;
