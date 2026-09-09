import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // The slug, e.g., 'kerala'
    name: { type: String, required: true },
    country: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ['india', 'international'], required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);
