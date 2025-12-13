import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Dynamic SEO Component
 * Updates meta tags, Open Graph, and Twitter Cards based on page content
 */
const SEO = ({ 
  title = "RealHomes - South African Luxury Real Estate",
  description = "Discover premium properties across South Africa. Luxury homes, apartments, and estates in Cape Town, Johannesburg, Durban, and more.",
  image = "/favicon.svg",
  type = "website",
  url,
  property = null, // Property object for structured data
  keywords = "real estate, properties, South Africa, luxury homes, property management, Cape Town, Johannesburg, Durban"
}) => {
  const location = useLocation();
  const siteUrl = import.meta.env.VITE_FRONTEND_URL || "https://realhomes.vercel.app";
  const currentUrl = url || `${siteUrl}${location.pathname}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Nicolette Mashaba');
    
    // Open Graph tags
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', fullImageUrl, 'property');
    updateMetaTag('og:url', currentUrl, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', 'RealHomes', 'property');
    updateMetaTag('og:locale', 'en_ZA', 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', title, 'name');
    updateMetaTag('twitter:description', description, 'name');
    updateMetaTag('twitter:image', fullImageUrl, 'name');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Add structured data for properties
    if (property) {
      let script = document.querySelector('script[type="application/ld+json"][data-property-schema]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-property-schema', 'true');
        document.head.appendChild(script);
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": property.title || "Property",
        "description": property.description || description,
        "image": property.image || fullImageUrl,
        "url": currentUrl,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": property.address || "",
          "addressLocality": property.city || "",
          "addressCountry": property.country || "South Africa"
        },
        "offers": {
          "@type": "Offer",
          "price": property.price || 0,
          "priceCurrency": "ZAR",
          "availability": "https://schema.org/InStock"
        },
        "numberOfBedrooms": property.facilities?.bedrooms || 0,
        "numberOfBathroomsTotal": property.facilities?.bathrooms || 0,
        "numberOfParkingSpaces": property.facilities?.parkings || 0
      };

      script.textContent = JSON.stringify(structuredData);
    } else {
      // Remove property structured data if not on property page
      const propertyScript = document.querySelector('script[type="application/ld+json"][data-property-schema]');
      if (propertyScript) {
        propertyScript.remove();
      }
    }

    // Add organization structured data (always present)
    let orgScript = document.querySelector('script[type="application/ld+json"][data-organization-schema]');
    if (!orgScript) {
      orgScript = document.createElement('script');
      orgScript.setAttribute('type', 'application/ld+json');
      orgScript.setAttribute('data-organization-schema', 'true');
      document.head.appendChild(orgScript);
    }

    const organizationData = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "RealHomes",
      "description": "Premium South African real estate platform",
      "url": siteUrl,
      "logo": `${siteUrl}/favicon.svg`,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "ZA"
      },
      "sameAs": [
        "https://wa.me/27112345678"
      ]
    };

    orgScript.textContent = JSON.stringify(organizationData);

  }, [title, description, image, type, url, property, currentUrl, fullImageUrl, keywords]);

  return null; // This component doesn't render anything
};

export default SEO;

