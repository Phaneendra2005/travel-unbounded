export type DestinationCategory = 'india' | 'international';

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  price: number;
  category: DestinationCategory;
}

export const destinations: Destination[] = [
  // India
  {
    id: 'kerala',
    name: 'Kerala Backwaters',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop',
    description: 'Experience the serene backwaters, lush greenery, and traditional houseboats of God\'s Own Country.',
    price: 25000,
    category: 'india',
  },
  {
    id: 'himachal-pradesh',
    name: 'Himachal Mountains',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop',
    description: 'Snow-capped peaks, adventurous trails, and serene Buddhist monasteries await you in the Himalayas.',
    price: 32000,
    category: 'india',
  },
  {
    id: 'ladakh',
    name: 'Ladakh Landscape',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1000&auto=format&fit=crop',
    description: 'A high-altitude desert with stunning blue lakes, dramatic mountains, and rich Tibetan culture.',
    price: 45000,
    category: 'india',
  },
  {
    id: 'andaman',
    name: 'Andaman Beach',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
    description: 'Pristine white-sand beaches, crystal clear waters, and some of the best scuba diving in South Asia.',
    price: 55000,
    category: 'india',
  },
  {
    id: 'goa',
    name: 'Goa Beaches',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop',
    description: 'Sun, sand, and sea. Enjoy the vibrant nightlife, Portuguese heritage, and relaxing beach shacks.',
    price: 18000,
    category: 'india',
  },
  // International
  {
    id: 'kenya',
    name: 'Kenya Safari',
    country: 'Kenya',
    image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=1000&auto=format&fit=crop',
    description: 'Witness the Great Migration and spot the Big Five in the legendary Masai Mara.',
    price: 120000,
    category: 'international',
  },
  {
    id: 'vietnam',
    name: 'Ha Long Bay',
    country: 'Vietnam',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1000&auto=format&fit=crop',
    description: 'Cruise through emerald waters towering with thousands of towering limestone islands.',
    price: 85000,
    category: 'international',
  },
  {
    id: 'tanzania',
    name: 'Serengeti',
    country: 'Tanzania',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
    description: 'Endless plains teeming with wildlife, home to the spectacular Great Migration.',
    price: 140000,
    category: 'international',
  },
  {
    id: 'iceland',
    name: 'Iceland Waterfalls',
    country: 'Iceland',
    image: '/images/iceland-waterfalls.jpg',
    description: 'Discover the land of fire and ice with its dramatic waterfalls, geysers, and northern lights.',
    price: 180000,
    category: 'international',
  },
  {
    id: 'sri-lanka',
    name: 'Tea Plantations',
    country: 'Sri Lanka',
    image: '/images/sri-lanka-tea.jpg',
    description: 'Rolling hills covered in lush green tea estates, ancient ruins, and beautiful coastlines.',
    price: 45000,
    category: 'international',
  },
];
