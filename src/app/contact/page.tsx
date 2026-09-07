import { Metadata } from 'next';
import BookingForm from '@/components/BookingForm';
import { PhoneCall, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Plan Your Trip | Travel Unbounded',
  description: 'Submit an enquiry to start planning your dream experiential travel journey with our experts.',
};

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-blue-600 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Let&apos;s Start Planning
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Tell us about your dream destination, and we&apos;ll craft an itinerary tailored just for you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 flex-grow -mt-10 lg:-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <PhoneCall className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Call Us</h4>
                      <p className="text-gray-600">+91 98765 43210</p>
                      <p className="text-sm text-gray-500 mt-1">Mon-Sat, 9am to 6pm IST</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Email Us</h4>
                      <p className="text-gray-600">hello@travelunbounded.com</p>
                      <p className="text-sm text-gray-500 mt-1">We aim to reply within 24hrs</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-1">Headquarters</h4>
                      <p className="text-gray-600 leading-relaxed">
                        541, 7th Main Rd, HAL 2nd Stage<br />
                        Indiranagar, Bengaluru – 560008<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                <h3 className="text-xl font-bold text-blue-900 mb-2">What happens next?</h3>
                <ul className="space-y-4 mt-4 relative">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-sm font-bold mt-0.5 mr-3">1</div>
                    <p className="text-sm text-blue-900">You submit the form with your preferences.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-sm font-bold mt-0.5 mr-3">2</div>
                    <p className="text-sm text-blue-900">Our expert reviews and contacts you to discuss details.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-sm font-bold mt-0.5 mr-3">3</div>
                    <p className="text-sm text-blue-900">We send you a custom crafted itinerary for approval.</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-2">
              <BookingForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
