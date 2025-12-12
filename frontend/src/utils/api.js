import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency", {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    // Handle both response formats: {data: [...]} or direct array
    return response.data?.data || response.data || [];
  } catch (error) {
    // Return mock data if backend fails
    if (process.env.NODE_ENV === 'development') {
      console.warn("Backend not available, using mock data");
    }
    return [
      {
        id: "1",
        title: "Luxury Villa in Camps Bay",
        description: "Stunning oceanfront villa with panoramic views of the Atlantic. This premium property features modern architecture, high-end finishes, and exclusive amenities.",
        price: 25000000,
        address: "Victoria Road, Camps Bay",
        city: "Cape Town",
        country: "South Africa",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=60",
        facilities: { bedrooms: 5, bathrooms: 4, parkings: 3 },
        rating: 4.9,
        category: "Luxury Villa",
        featured: true
      },
      {
        id: "2",
        title: "Modern Apartment in Sandton",
        description: "Contemporary apartment in the heart of Sandton's business district. Perfect for professionals seeking luxury and convenience.",
        price: 8500000,
        address: "Rivonia Road, Sandton",
        city: "Johannesburg",
        country: "South Africa",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60",
        facilities: { bedrooms: 3, bathrooms: 2, parkings: 2 },
        rating: 4.7,
        category: "Modern Apartment",
        featured: false
      },
      {
        id: "3",
        title: "Beachfront House in Umhlanga",
        description: "Exclusive beachfront property with direct access to the Indian Ocean. Features private pool, garden, and stunning sunset views.",
        price: 18000000,
        address: "Beach Road, Umhlanga",
        city: "Durban",
        country: "South Africa",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60",
        facilities: { bedrooms: 4, bathrooms: 3, parkings: 2 },
        rating: 4.8,
        category: "Beachfront House",
        featured: true
      },
      {
        id: "4",
        title: "Wine Estate in Stellenbosch",
        description: "Historic wine estate with modern luxury. Features vineyards, wine cellar, and breathtaking mountain views.",
        price: 35000000,
        address: "Wine Route, Stellenbosch",
        city: "Stellenbosch",
        country: "South Africa",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=60",
        facilities: { bedrooms: 6, bathrooms: 5, parkings: 4 },
        rating: 5.0,
        category: "Wine Estate",
        featured: true
      },
      {
        id: "5",
        title: "Penthouse in V&A Waterfront",
        description: "Luxury penthouse with harbor views and world-class amenities. Located in the prestigious V&A Waterfront precinct.",
        price: 22000000,
        address: "Dock Road, V&A Waterfront",
        city: "Cape Town",
        country: "South Africa",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60",
        facilities: { bedrooms: 4, bathrooms: 3, parkings: 2 },
        rating: 4.9,
        category: "Penthouse",
        featured: false
      },
      {
        id: "6",
        title: "Mountain Lodge in Plettenberg Bay",
        description: "Exclusive mountain lodge with panoramic views of the Garden Route. Perfect for nature lovers and luxury seekers.",
        price: 28000000,
        address: "Mountain Road, Plettenberg Bay",
        city: "Plettenberg Bay",
        country: "South Africa",
        image: "https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=800&auto=format&fit=crop&q=60",
        facilities: { bedrooms: 5, bathrooms: 4, parkings: 3 },
        rating: 4.8,
        category: "Mountain Lodge",
        featured: true
      }
    ];
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    // Handle both response formats: {data: {...}} or direct object
    return response.data?.data || response.data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn("Backend not available, using mock data for property:", id);
    }
    
    // Mock data for individual properties
    const mockProperties = {
      "1": {
        id: "1",
        title: "Luxury Villa in Camps Bay",
        description: "Stunning oceanfront villa with panoramic views of the Atlantic. This premium property features modern architecture, high-end finishes, and exclusive amenities. Perfect for those seeking the ultimate luxury lifestyle in one of Cape Town's most prestigious locations.",
        price: 25000000,
        address: "Victoria Road, Camps Bay",
        city: "Cape Town",
        country: "South Africa",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=60",
        facilities: { bedrooms: 5, bathrooms: 4, parkings: 3 },
        rating: 4.9,
        category: "Luxury Villa",
        featured: true
      },
      "2": {
        id: "2",
        title: "Modern Apartment in Sandton",
        description: "Contemporary apartment in the heart of Sandton's business district. Perfect for professionals seeking luxury and convenience. Features state-of-the-art amenities and stunning city views.",
        price: 8500000,
        address: "Rivonia Road, Sandton",
        city: "Johannesburg",
        country: "South Africa",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60",
        facilities: { bedrooms: 3, bathrooms: 2, parkings: 2 },
        rating: 4.7,
        category: "Modern Apartment",
        featured: false
      },
      "3": {
        id: "3",
        title: "Beachfront House in Umhlanga",
        description: "Exclusive beachfront property with direct access to the Indian Ocean. Features private pool, garden, and stunning sunset views. The perfect coastal retreat for luxury living.",
        price: 18000000,
        address: "Beach Road, Umhlanga",
        city: "Durban",
        country: "South Africa",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60",
        facilities: { bedrooms: 4, bathrooms: 3, parkings: 2 },
        rating: 4.8,
        category: "Beachfront House",
        featured: true
      },
      "4": {
        id: "4",
        title: "Wine Estate in Stellenbosch",
        description: "Historic wine estate with modern luxury. Features vineyards, wine cellar, and breathtaking mountain views. A unique opportunity to own a piece of South Africa's wine heritage.",
        price: 35000000,
        address: "Wine Route, Stellenbosch",
        city: "Stellenbosch",
        country: "South Africa",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=60",
        facilities: { bedrooms: 6, bathrooms: 5, parkings: 4 },
        rating: 5.0,
        category: "Wine Estate",
        featured: true
      },
      "5": {
        id: "5",
        title: "Penthouse in V&A Waterfront",
        description: "Luxury penthouse with harbor views and world-class amenities. Located in the prestigious V&A Waterfront precinct. Features panoramic views and exclusive access to premium facilities.",
        price: 22000000,
        address: "Dock Road, V&A Waterfront",
        city: "Cape Town",
        country: "South Africa",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60",
        facilities: { bedrooms: 4, bathrooms: 3, parkings: 2 },
        rating: 4.9,
        category: "Penthouse",
        featured: false
      },
      "6": {
        id: "6",
        title: "Mountain Lodge in Plettenberg Bay",
        description: "Exclusive mountain lodge with panoramic views of the Garden Route. Perfect for nature lovers and luxury seekers. Features private hiking trails and wildlife viewing opportunities.",
        price: 28000000,
        address: "Mountain Road, Plettenberg Bay",
        city: "Plettenberg Bay",
        country: "South Africa",
        image: "https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12?w=800&auto=format&fit=crop&q=60",
        facilities: { bedrooms: 5, bathrooms: 4, parkings: 3 },
        rating: 4.8,
        category: "Mountain Lodge",
        featured: true
      }
    };
    
    const property = mockProperties[id];
    if (property) {
      return property;
    } else {
      toast.error("Property not found");
      throw new Error("Property not found");
    }
  }
};

export const createUser = async (email, token) => {
  try {
    await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something's not right, Please Try again");
    throw error;
  }
};

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `/user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something's not right. Please try again.");
    throw error;
  }
};

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/removeBooking/${id}`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something's not right. Please try again.");

    throw error;
  }
};

export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `/user/toFav/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

export const getAllFav = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allFav`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log(res)
    return res.data["favResidenciesID"];
  } catch (e) {
    toast.error("Something went wrong while fetching favs");
    throw e;
  }
};

export const getAllBookings = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allBookings`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("res", res)
    return res.data["bookedVisits"];
  } catch (e) {
    toast.error("Something went wrong while fetching bookings");
    throw e;
  }
};

export const getBookings = async (email, token) => {
  if (!token) return [];
  try {
    const res = await api.post(
      `/user/allBookings`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data["bookedVisits"] || [];
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.warn("Backend not available, using mock bookings");
    }
    // Return mock bookings data
    return [
      {
        id: "1",
        propertyId: "1",
        date: "15/08/2024",
        property: {
          id: "1",
          title: "Luxury Villa in Camps Bay",
          image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=60",
          price: 25000000,
          address: "Victoria Road, Camps Bay",
          city: "Cape Town"
        }
      },
      {
        id: "2",
        propertyId: "3",
        date: "20/08/2024",
        property: {
          id: "3",
          title: "Beachfront House in Umhlanga",
          image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60",
          price: 18000000,
          address: "Beach Road, Umhlanga",
          city: "Durban"
        }
      }
    ];
  }
};



export const createResidency = async (data, token, userEmail) => {
  // Ensure userEmail is included in the data object
  const requestData = { ...data, userEmail };
  try {
    const res = await api.post(
      `/residency/create`,
      requestData, // Pass the updated data object as the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};


