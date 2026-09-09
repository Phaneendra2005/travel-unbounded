import { MapPin, Clock, Star } from 'lucide-react';

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  highlight: string;
}

export interface ItineraryData {
  title: string;
  destination: string;
  duration: number;
  days: ItineraryDay[];
}

export default function ItineraryCard({ itinerary }: { itinerary: ItineraryData }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden w-full max-w-sm my-4 text-left">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-4 text-white">
        <h3 className="font-bold text-lg leading-tight mb-1">{itinerary.title}</h3>
        <div className="flex items-center text-sm opacity-90 space-x-4">
          <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {itinerary.destination}</span>
          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {itinerary.duration} Days</span>
        </div>
      </div>

      {/* Days List */}
      <div className="p-4 max-h-80 overflow-y-auto space-y-4">
        {itinerary.days.map((day) => (
          <div key={day.day} className="relative pl-6 pb-2 border-l-2 border-blue-100 last:border-0 last:pb-0">
            {/* Timeline Dot */}
            <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1"></div>
            
            <h4 className="font-semibold text-gray-800 text-sm mb-1">Day {day.day}: {day.title}</h4>
            
            <ul className="text-xs text-gray-600 mb-2 space-y-1 list-disc pl-4">
              {day.activities.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>

            {day.highlight && (
              <div className="bg-blue-50 p-2 rounded text-xs text-blue-800 flex items-start">
                <Star className="w-3 h-3 mr-1 text-blue-500 shrink-0 mt-0.5" />
                <span><span className="font-semibold">Highlight:</span> {day.highlight}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
