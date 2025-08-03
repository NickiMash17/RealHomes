import img1 from '../assets/img1.png'
import img2 from '../assets/img2.png'
import img3 from '../assets/img3.png'
import img4 from '../assets/img4.png'
import img5 from '../assets/img5.png'
import blog1 from '../assets/blog1.jpg'
import blog2 from '../assets/blog2.jpg'
import blog3 from '../assets/blog3.jpg'
import blog4 from '../assets/blog4.jpg'

// icons
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";

// South African properties data with realistic Rands currency
export const PROPERTIES = [
  {
    title: "Luxury Villa in Camps Bay",
    image: img1,
    category: "Villa",
    address: "Victoria Road 45",
    country: "South Africa",
    city: "Cape Town",
    area: 450,
    price: 45000000,
    description: "Stunning oceanfront villa with panoramic Atlantic views, modern amenities, and private pool. Perfect for luxury living in one of Cape Town's most prestigious areas.",
    facilities: {
      bedrooms: 4,
      bathrooms: 3,
      parkings: 2
    }
  },
  {
    title: "Modern Apartment in Sandton",
    image: img2,
    category: "Apartment",
    address: "Rivonia Road 78",
    country: "South Africa",
    city: "Johannesburg",
    area: 180,
    price: 18500000,
    description: "Contemporary apartment in the heart of Sandton's business district. Features smart home technology and stunning city skyline views.",
    facilities: {
      bedrooms: 2,
      bathrooms: 2,
      parkings: 1
    }
  },
  {
    title: "Family Home in Durban North",
    image: img3,
    category: "House",
    address: "Musgrave Road 23",
    country: "South Africa",
    city: "Durban",
    area: 320,
    price: 12500000,
    description: "Spacious family home with garden, pool, and mountain views. Located in the sought-after Durban North area with excellent schools nearby.",
    facilities: {
      bedrooms: 3,
      bathrooms: 2,
      parkings: 2
    }
  },
  {
    title: "Penthouse in Umhlanga",
    image: img4,
    category: "Penthouse",
    address: "Lagoon Drive 12",
    country: "South Africa",
    city: "Durban",
    area: 280,
    price: 28000000,
    description: "Luxurious penthouse with 360-degree ocean and city views. Features high-end finishes, private terrace, and exclusive building amenities.",
    facilities: {
      bedrooms: 3,
      bathrooms: 3,
      parkings: 2
    }
  },
  {
    title: "Wine Estate in Stellenbosch",
    image: img5,
    category: "Estate",
    address: "Helshoogte Pass 67",
    country: "South Africa",
    city: "Stellenbosch",
    area: 850,
    price: 85000000,
    description: "Magnificent wine estate with vineyard, guest house, and mountain views. Perfect for those seeking a lifestyle property in the Cape Winelands.",
    facilities: {
      bedrooms: 5,
      bathrooms: 4,
      parkings: 4
    }
  },
  {
    title: "Townhouse in Pretoria East",
    image: img1,
    category: "Townhouse",
    address: "Lynnwood Road 34",
    country: "South Africa",
    city: "Pretoria",
    area: 220,
    price: 8500000,
    description: "Modern townhouse in a secure estate with communal facilities. Close to shopping centers and major highways.",
    facilities: {
      bedrooms: 3,
      bathrooms: 2,
      parkings: 1
    }
  },
  {
    title: "Beach House in Plettenberg Bay",
    image: img2,
    category: "Beach House",
    address: "Robberg Beach Road 89",
    country: "South Africa",
    city: "Plettenberg Bay",
    area: 380,
    price: 35000000,
    description: "Stunning beachfront property with direct access to pristine beaches. Features open-plan living and spectacular ocean views.",
    facilities: {
      bedrooms: 4,
      bathrooms: 3,
      parkings: 2
    }
  },
  {
    title: "Luxury Apartment in Green Point",
    image: img3,
    category: "Apartment",
    address: "Main Road 156",
    country: "South Africa",
    city: "Cape Town",
    area: 140,
    price: 22000000,
    description: "Sleek apartment in the trendy Green Point area. Walking distance to the promenade, restaurants, and shopping.",
    facilities: {
      bedrooms: 2,
      bathrooms: 2,
      parkings: 1
    }
  },
  {
    title: "Country Estate in Franschhoek",
    image: img4,
    category: "Estate",
    address: "Huguenot Road 23",
    country: "South Africa",
    city: "Franschhoek",
    area: 1200,
    price: 125000000,
    description: "Exclusive country estate with vineyard, guest cottages, and mountain views. Includes wine cellar and entertainment areas.",
    facilities: {
      bedrooms: 6,
      bathrooms: 5,
      parkings: 6
    }
  },
  {
    title: "Modern House in Bryanston",
    image: img5,
    category: "House",
    address: "Bryanston Drive 78",
    country: "South Africa",
    city: "Johannesburg",
    area: 420,
    price: 25000000,
    description: "Contemporary family home with smart technology, solar panels, and beautiful garden. Located in one of Johannesburg's most prestigious areas.",
    facilities: {
      bedrooms: 4,
      bathrooms: 3,
      parkings: 3
    }
  },
];

// South African focused blog posts
export const BLOGS = [
  {
    title: "Top 10 Luxury Properties in Cape Town",
    image: blog1,
    category: "Luxury",
  },
  {
    title: "Investment Opportunities in Johannesburg",
    image: blog2,
    category: "Investment",
  },
  {
    title: "Wine Estate Living in the Cape Winelands",
    image: blog3,
    category: "Lifestyle",
  },
  {
    title: "Beachfront Properties on the Garden Route",
    image: blog4,
    category: "Beachfront",
  }
]

// Updated footer with South African focus
export const FOOTER_LINKS = [
  {
    title: "Learn More",
    links: [
      "About Us",
      "Latest Properties",
      "Special Offers",
      "Popular Areas",
      "FAQ",
      "Privacy Policy",
    ],
  },
  {
    title: "Our Community",
    links: [
      "Terms and Conditions",
      "Special Offers",
      "Customer Reviews",
    ],
  },
];

export const FOOTER_CONTACT_INFO = {
  title: "Contact Us",
  links: [
    { label: "Contact Number", value: "+27 11 234 5678" },
    { label: "Email Address", value: "info@realhomes.co.za" },
  ],
};

export const SOCIALS = {
  title: "Social",
  links: [
    { icon: <FaFacebook />, id: "facebook" },
    { icon: <FaInstagram />, id: "instagram" },
    { icon: <FaTwitter />, id: "twitter" },
    { icon: <FaYoutube />, id: "youtube" },
    { icon: <FaLinkedin />, id: "linkedin" },
  ],
};