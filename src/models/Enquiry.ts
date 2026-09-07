import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide your full name.'],
      trim: true,
    },
    countryCode: {
      type: String,
      required: [true, 'Please provide a country code.'],
    },
    contactNumber: {
      type: String,
      required: [true, 'Please provide a contact number.'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address.'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address.',
      ],
    },
    dateOfTravel: {
      type: Date,
      required: [true, 'Please provide a date of travel.'],
    },
    numberOfPeople: {
      type: Number,
      required: [true, 'Please provide the number of people.'],
      min: [1, 'Number of people must be at least 1.'],
    },
    hotelCategory: {
      type: String,
      required: [true, 'Please select a hotel category.'],
      enum: ['Standard', 'Deluxe', 'Luxury'],
    },
    numberOfChildren: {
      type: Number,
      default: 0,
      min: [0, 'Number of children cannot be negative.'],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Prevent mongoose from recreating the model if it already exists (useful in Next.js hot reload)
export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
