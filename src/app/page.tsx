import Link from 'next/link';
import Image from 'next/image';
import { destinations as staticDestinations } from '@/data/destinations';
import DestinationCard from '@/components/DestinationCard';
import dbConnect from '@/lib/mongodb';
import DestinationModel from '@/models/Destination';

export const revalidate = 60; // revalidate every minute for ISR-like behavior

async function getDestinations() {
  try {
    await dbConnect();
    const dests = await DestinationModel.find().lean();
    if (dests && dests.length > 0) {
      // Map _id to string if necessary, but lean() + Next.js handles plain objects well
      // Ensure we map MongoDB documents to plain objects without strict class prototypes
      return dests.map(d => ({
        id: d.id,
        name: d.name,
        country: d.country,
        image: d.image,
        description: d.description,
        price: d.price,
        category: d.category,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch destinations from DB, falling back to static data', error);
  }
  return staticDestinations;
}

export default async function Home() {
  const destinations = await getDestinations();
  const indiaDestinations = destinations.filter(d => d.category === 'india');
  const internationalDestinations = destinations.filter(d => d.category === 'international');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop"
            alt="Travel Landscape"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
            India&apos;s Most Trusted <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Experiential Travel Experts</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light drop-shadow-md">
            We don&apos;t just plan trips. We craft stories. Discover handpicked destinations, local guides, and custom itineraries tailored to your rhythm.
          </p>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-gray-900 bg-white hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      </section>

      {/* India Destinations Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Discover India</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From the serene backwaters of Kerala to the rugged peaks of Ladakh, explore the incredible diversity of India with our carefully curated experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {indiaDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* International Destinations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore the World</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Venture beyond borders. Witness the Great Migration, cruise ancient bays, or chase the Northern Lights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internationalDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to write your next real story?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Our travel experts are ready to design an itinerary built entirely around you. No catalogues, just authentic experiences.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-blue-600 bg-white hover:bg-gray-50 hover:shadow-xl transition-all duration-300"
          >
            Enquire Now
          </Link>
        </div>
      </section>
    </div>
  );
}
