import mongoose from 'mongoose';

const SavedItinerarySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    destination: { type: String, required: true },
    duration: { type: Number, required: true },
    days: [
      {
        day: { type: Number, required: true },
        title: { type: String, required: true },
        activities: [{ type: String, required: true }],
        highlight: { type: String, required: false },
      }
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SavedItinerary || mongoose.model('SavedItinerary', SavedItinerarySchema);
