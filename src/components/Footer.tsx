import Link from 'next/link';
import { PlaneTakeoff, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group inline-block">
              <div className="bg-blue-600 p-2 rounded-lg">
                <PlaneTakeoff className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                Travel <span className="text-blue-500">Unbounded</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              India&apos;s Most Trusted Experiential Travel Experts. We design trips that blend comfort, culture, and raw nature.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-sm font-medium">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-sm font-medium">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors text-sm font-medium">Twitter</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-base text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-base text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-base text-gray-400 hover:text-white transition-colors">Plan Your Trip</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-base text-gray-400">
                  541, 7th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru – 560008, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                <span className="text-base text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                <span className="text-base text-gray-400">hello@travelunbounded.com</span>
              </li>
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Our Offices</h3>
            <ul className="space-y-4">
              <li className="text-base text-gray-400">
                <span className="block text-white font-medium mb-1">Bengaluru</span>
                Headquarters
              </li>
              <li className="text-base text-gray-400">
                <span className="block text-white font-medium mb-1">Kochi</span>
                Kerala Office
              </li>
              <li className="text-base text-gray-400">
                <span className="block text-white font-medium mb-1">Nairobi</span>
                Kenya Office
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-base text-gray-500">
            &copy; {new Date().getFullYear()} Travel Unbounded. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
