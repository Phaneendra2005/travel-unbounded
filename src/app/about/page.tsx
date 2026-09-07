import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ShieldCheck, Compass, HeartHandshake, Users } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Travel Unbounded',
  description: 'Learn about India\'s Most Trusted Experiential Travel Experts and our philosophy of crafting journeys around you.',
};

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="bg-blue-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            About <span className="text-blue-600">Travel Unbounded</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            India&apos;s Most Trusted Experiential Travel Experts
          </p>
        </div>
      </section>

      {/* Company Story & Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop"
                alt="Travelers exploring together"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Travel Unbounded was born from a simple belief — that the best journeys aren&apos;t sold from a catalogue. They&apos;re built around the people taking them.
                </p>
                <p>
                  Headquartered in Bangalore with offices in Kerala and Nairobi, we design trips that blend comfort, culture, and raw nature. Every destination, resort, and activity we recommend has been personally experienced by our team.
                </p>
                <p>
                  From spotting the Big Five at dawn in the Masai Mara to cruising Ha Long Bay at sunset — we go where real stories are written, and we bring you along.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We focus on quality, authenticity, and personal connection to make your journey unforgettable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personally Vetted</h3>
              <p className="text-gray-600">
                We never recommend a place we haven&apos;t experienced ourselves. Quality and safety are guaranteed.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Local Guides</h3>
              <p className="text-gray-600">
                Explore with passionate locals who know the hidden gems and true stories of your destination.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Compass className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Itineraries</h3>
              <p className="text-gray-600">
                Your pace, your interests. Every itinerary is crafted from scratch to match your unique travel style.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <HeartHandshake className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24x7 Support</h3>
              <p className="text-gray-600">
                From the moment you depart until you return home, our team is always on standby to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Offices</h2>
            <p className="text-lg text-gray-600">Come visit us to start planning your dream vacation.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bengaluru */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0" />
                <h3 className="text-xl font-bold text-gray-900">Bengaluru <span className="text-sm font-normal text-gray-500 ml-2">Headquarters</span></h3>
              </div>
              <address className="not-italic text-gray-600 leading-relaxed">
                541, 7th Main Rd, HAL 2nd Stage<br />
                Indiranagar, Bengaluru – 560008<br />
                India
              </address>
            </div>

            {/* Kochi */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0" />
                <h3 className="text-xl font-bold text-gray-900">Kochi <span className="text-sm font-normal text-gray-500 ml-2">Kerala Office</span></h3>
              </div>
              <address className="not-italic text-gray-600 leading-relaxed">
                LR Towers, S Janatha Road<br />
                Palavivatton, Kochi – 682025<br />
                India
              </address>
            </div>

            {/* Nairobi */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0" />
                <h3 className="text-xl font-bold text-gray-900">Nairobi <span className="text-sm font-normal text-gray-500 ml-2">Kenya Office</span></h3>
              </div>
              <address className="not-italic text-gray-600 leading-relaxed">
                Westpark Towers, Muthithi Road<br />
                Nairobi, P.O. Box 6950<br />
                Postal Code 00100<br />
                Kenya
              </address>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 mt-auto">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Let&apos;s craft your next adventure</h2>
          <p className="text-blue-100 text-lg mb-8">
            Speak directly with our experiential travel experts today.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-blue-600 bg-white hover:bg-gray-50 hover:shadow-xl transition-all duration-300"
          >
            Plan Your Trip
          </Link>
        </div>
      </section>
    </div>
  );
}
