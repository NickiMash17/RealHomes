import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const MAX_ALERTS = 5;
const CHECK_INTERVAL = 5 * 60 * 1000; // Check every 5 minutes

export const usePropertyAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [newMatches, setNewMatches] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('propertyAlerts');
      if (stored) {
        setAlerts(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load property alerts from localStorage:', error);
    }
  }, []);

  // Check for new properties matching alerts
  useEffect(() => {
    if (alerts.length === 0) return;

    const checkForNewProperties = async (allProperties) => {
      if (!Array.isArray(allProperties) || allProperties.length === 0) return;

      const matches = [];
      
      alerts.forEach(alert => {
        const matchingProperties = allProperties.filter(property => {
          // Check if property matches alert criteria
          const matchesSearch = !alert.criteria.searchTerm || 
            property.title?.toLowerCase().includes(alert.criteria.searchTerm.toLowerCase()) ||
            property.description?.toLowerCase().includes(alert.criteria.searchTerm.toLowerCase()) ||
            property.address?.toLowerCase().includes(alert.criteria.searchTerm.toLowerCase()) ||
            property.city?.toLowerCase().includes(alert.criteria.searchTerm.toLowerCase());

          const matchesCategory = alert.criteria.selectedCategory === 'all' ||
            property.category?.toLowerCase().includes(alert.criteria.selectedCategory.toLowerCase());

          const matchesBedrooms = alert.criteria.minBedrooms === 'any' ||
            (property.facilities?.bedrooms || property.bedrooms || 0) >= parseInt(alert.criteria.minBedrooms);

          const matchesPrice = property.price <= alert.criteria.maxPrice;

          // Check if property is new (created after alert was set up or last checked)
          const propertyDate = new Date(property.createdAt || property.updatedAt || 0);
          const lastChecked = new Date(alert.lastChecked || alert.createdAt);
          const isNew = propertyDate > lastChecked;

          return matchesSearch && matchesCategory && matchesBedrooms && matchesPrice && isNew;
        });

        if (matchingProperties.length > 0) {
          matches.push({
            alertId: alert.id,
            alertName: alert.name,
            properties: matchingProperties,
            count: matchingProperties.length
          });
        }
      });

      if (matches.length > 0) {
        setNewMatches(matches);
        // Show notification
        matches.forEach(match => {
          toast.info(
            `🎉 ${match.count} new ${match.count === 1 ? 'property' : 'properties'} found for "${match.alertName}"!`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        });
      }
    };

    // Check immediately - only if we have alerts
    const checkNow = async () => {
      if (alerts.length === 0) return;
      
      try {
        // Import dynamically to avoid circular dependencies
        const { getAllProperties } = await import('../utils/api');
        const properties = await getAllProperties();
        checkForNewProperties(properties);
      } catch (error) {
        console.error('Failed to check for new properties:', error);
      }
    };

    // Only check if we have active alerts
    const hasActiveAlerts = alerts.some(a => a.isActive);
    if (hasActiveAlerts) {
      checkNow();
    }

    // Set up interval to check periodically
    const interval = setInterval(checkNow, CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [alerts]);

  const createAlert = (name, criteria) => {
    if (!name || !criteria) {
      toast.error('Alert name and criteria are required.');
      return false;
    }

    const newAlert = {
      id: Date.now().toString(),
      name,
      criteria,
      createdAt: new Date().toISOString(),
      lastChecked: new Date().toISOString(),
      isActive: true
    };

    setAlerts(prev => {
      if (prev.length >= MAX_ALERTS) {
        toast.warn(`You can have up to ${MAX_ALERTS} alerts. Please remove one first.`);
        return prev;
      }

      const existingIndex = prev.findIndex(a => a.name === name);
      let newAlerts;

      if (existingIndex !== -1) {
        // Update existing alert
        newAlerts = prev.map((a, index) =>
          index === existingIndex ? { ...a, criteria, lastChecked: new Date().toISOString() } : a
        );
        toast.info(`Alert "${name}" updated!`);
      } else {
        // Add new alert
        newAlerts = [newAlert, ...prev];
        toast.success(`Alert "${name}" created! You'll be notified when new properties match.`);
      }

      try {
        localStorage.setItem('propertyAlerts', JSON.stringify(newAlerts));
      } catch (error) {
        console.error('Failed to save alert to localStorage:', error);
        toast.error('Failed to save alert.');
        return prev;
      }
      return newAlerts;
    });
    return true;
  };

  const removeAlert = (alertId) => {
    setAlerts(prev => {
      const newAlerts = prev.filter(a => a.id !== alertId);
      try {
        localStorage.setItem('propertyAlerts', JSON.stringify(newAlerts));
        toast.info('Alert removed.');
      } catch (error) {
        console.error('Failed to remove alert from localStorage:', error);
        toast.error('Failed to remove alert.');
      }
      return newAlerts;
    });
    // Remove related matches
    setNewMatches(prev => prev.filter(m => m.alertId !== alertId));
  };

  const toggleAlert = (alertId) => {
    setAlerts(prev => {
      const newAlerts = prev.map(a =>
        a.id === alertId ? { ...a, isActive: !a.isActive } : a
      );
      try {
        localStorage.setItem('propertyAlerts', JSON.stringify(newAlerts));
      } catch (error) {
        console.error('Failed to update alert in localStorage:', error);
      }
      return newAlerts;
    });
  };

  const clearAllAlerts = () => {
    setAlerts([]);
    setNewMatches([]);
    try {
      localStorage.removeItem('propertyAlerts');
      toast.info('All alerts cleared.');
    } catch (error) {
      console.error('Failed to clear all alerts from localStorage:', error);
      toast.error('Failed to clear all alerts.');
    }
  };

  const markMatchesAsRead = (alertId) => {
    setAlerts(prev => {
      const newAlerts = prev.map(a => {
        if (a.id === alertId) {
          return { ...a, lastChecked: new Date().toISOString() };
        }
        return a;
      });
      try {
        localStorage.setItem('propertyAlerts', JSON.stringify(newAlerts));
      } catch (error) {
        console.error('Failed to update alert in localStorage:', error);
      }
      return newAlerts;
    });
    setNewMatches(prev => prev.filter(m => m.alertId !== alertId));
  };

  const getUnreadCount = () => {
    return newMatches.reduce((total, match) => total + match.count, 0);
  };

  return {
    alerts,
    newMatches,
    createAlert,
    removeAlert,
    toggleAlert,
    clearAllAlerts,
    markMatchesAsRead,
    getUnreadCount,
    maxAlerts: MAX_ALERTS
  };
};

