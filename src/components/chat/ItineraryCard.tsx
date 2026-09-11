import { useState } from 'react';
import { MapPin, Clock, Star, Copy, Download, Bookmark, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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

export const formatItineraryAsText = (itinerary: ItineraryData) => {
  let text = `${itinerary.title}\n\n`;
  text += `Destination: ${itinerary.destination}\n`;
  text += `Duration: ${itinerary.duration} Days\n\n`;

  itinerary.days.forEach((day) => {
    text += `Day ${day.day}: ${day.title}\n\n`;
    day.activities.forEach((activity) => {
      text += `• ${activity}\n`;
    });
    if (day.highlight) {
      text += `\nHighlight: ${day.highlight}\n`;
    }
    text += `\n`;
  });

  return text.trim();
};

export default function ItineraryCard({ itinerary }: { itinerary: ItineraryData }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCopy = async () => {
    try {
      const text = formatItineraryAsText(itinerary);
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success('Itinerary copied!');
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error('Failed to copy. Please try again.');
    }
  };

  const handleDownload = () => {
    try {
      const text = formatItineraryAsText(itinerary);
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const sanitizedName = itinerary.destination.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      a.download = `travel-unbounded-${sanitizedName}-itinerary.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Itinerary downloaded!');
    } catch {
      toast.error('Failed to download.');
    }
  };

  const handleSave = async () => {
    if (isSaving || isSaved) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/itineraries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itinerary),
      });
      const data = await res.json();
      if (data.success) {
        setIsSaved(true);
        toast.success('Itinerary saved!');
      } else {
        toast.error("Couldn't save your itinerary right now. You can still copy or download it.");
      }
    } catch {
      toast.error("Couldn't save your itinerary right now. You can still copy or download it.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden w-full max-w-sm my-4 text-left">
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-4 text-white">
        <h3 className="font-bold text-lg leading-tight mb-1">{itinerary.title}</h3>
        <div className="flex items-center text-sm opacity-90 space-x-4 mb-3">
          <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {itinerary.destination}</span>
          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {itinerary.duration} Days</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          <button 
            onClick={handleCopy}
            className="flex items-center bg-white/20 hover:bg-white/30 transition-colors px-2 py-1.5 rounded"
            aria-label="Copy Itinerary"
          >
            {isCopied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
            Copy Itinerary
          </button>
          <button 
            onClick={handleDownload}
            className="flex items-center bg-white/20 hover:bg-white/30 transition-colors px-2 py-1.5 rounded"
            aria-label="Download Itinerary"
          >
            <Download className="w-3 h-3 mr-1" />
            Download
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving || isSaved}
            className="flex items-center bg-white/20 hover:bg-white/30 transition-colors px-2 py-1.5 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Save Itinerary"
          >
            {isSaving ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : 
             isSaved ? <Check className="w-3 h-3 mr-1" /> : <Bookmark className="w-3 h-3 mr-1" />}
            {isSaved ? 'Saved' : 'Save Itinerary'}
          </button>
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
