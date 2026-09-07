import Image from 'next/image';
import Link from 'next/link';
import { Destination } from '@/data/destinations';

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 group">
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800 shadow-sm">
          {destination.country}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{destination.name}</h3>
        </div>
        
        <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
          {destination.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider block mb-1">Starting from</span>
            <span className="text-lg font-bold text-blue-600">₹{destination.price.toLocaleString('en-IN')}</span>
          </div>
          
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
}
