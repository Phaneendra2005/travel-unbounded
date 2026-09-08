# Travel Unbounded

## Overview

A full-stack responsive web application for "Travel Unbounded", India's Most Trusted Experiential Travel Experts. This project represents Phase 1 of the platform, enabling users to explore destination packages, read about the company, and submit booking enquiries securely.

## Features

- **Responsive Home page:** High-impact hero section, curated India and International destination grids.
- **About page:** Company story, philosophy, office locations, and "Why Choose Us" features.
- **Contact / Enquiry form:** A comprehensive booking enquiry form capturing user details and travel preferences.
- **Server-side validation:** Strong API validation using Zod to ensure data integrity (including future date validation).
- **Client-side validation:** Real-time form feedback using React Hook Form and Zod.
- **MongoDB persistence:** Secure storage of all enquiries in a MongoDB database with timestamps.
- **Polished UX:** Loading states, success/error toasts, and prevention of duplicate submissions.
- **Responsive design:** Optimized for mobile, tablet, and desktop viewing.
- **SEO optimized:** Metadata and proper semantic HTML for all pages.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB
- **ORM / Driver:** Mongoose
- **Validation:** Zod
- **Form Handling:** React Hook Form
- **Icons & UI:** Lucide React, Sonner (for toast notifications)

## Project Structure

```
travel_unbounded/
├── src/
│   ├── app/                # Next.js App Router (pages, layout, api)
│   │   ├── api/enquiry/    # API Route for form submission
│   │   ├── about/          # About Us page
│   │   ├── contact/        # Contact & Enquiry page
│   │   ├── globals.css     # Global styles & Tailwind
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable UI components (Navbar, Footer, BookingForm, DestinationCard)
│   ├── data/               # Static data layer (destinations.ts)
│   ├── lib/                # Utilities (mongodb.ts connection)
│   └── models/             # Mongoose schemas (Enquiry.ts)
├── .env.example            # Environment variables template
└── next.config.ts          # Next.js config (configured for external images)
```

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd travel_unbounded
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Add your MongoDB connection string to `MONGODB_URI` in `.env.local`.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

- `MONGODB_URI`: The connection string for your MongoDB Atlas cluster. Must include database name, credentials, and configuration.

## API Endpoint

### `POST /api/enquiry`

**Payload:**
```json
{
  "fullName": "John Doe",
  "countryCode": "+91",
  "contactNumber": "9876543210",
  "email": "john@example.com",
  "dateOfTravel": "2027-12-01",
  "numberOfPeople": 2,
  "hotelCategory": "Deluxe",
  "numberOfChildren": 0
}
```

**Response (Success - 201 Created):**
```json
{
  "success": true,
  "message": "Thank you! Our travel expert will contact you within 24 hours.",
  "data": {
    "id": "60d5ecb8b392...",
    "createdAt": "2026-09-08T10:00:00.000Z"
  }
}
```

**Response (Error - 400 Bad Request):**
Returns a structured error object containing specific field validation failures.

## Database Structure

The `Enquiry` collection stores the following fields:
- `fullName` (String, required)
- `countryCode` (String, required)
- `contactNumber` (String, required)
- `email` (String, required)
- `dateOfTravel` (Date, required, must be future)
- `numberOfPeople` (Number, required, min 1)
- `hotelCategory` (String, required, enum: Standard/Deluxe/Luxury)
- `numberOfChildren` (Number, default 0, min 0)
- `createdAt` (Date, auto-generated)
- `updatedAt` (Date, auto-generated)

## Validation

- **Client-Side:** Enforced using `react-hook-form` with `@hookform/resolvers/zod`. Prevents submission of invalid types, empty fields, past dates, and invalid email formats.
- **Server-Side:** Enforced using `zod` inside the API route. Discards client validation assumptions and independently verifies all constraints before database interaction. Also backed by Mongoose schema validations as a final safety net.

## Deployment

This project is optimized for deployment on Vercel:
1. Push your code to a Git repository.
2. Import the project into Vercel.
3. Add the `MONGODB_URI` to Vercel's Environment Variables.
4. Deploy.

Alternatively, it can be deployed on any platform supporting Next.js (e.g., Netlify, AWS Amplify, Docker).

## Assumptions

- Destination pricing and data (`src/data/destinations.ts`) are dummy data representations for Phase 1.
- All destination images are sourced from Unsplash. For reliability, the Iceland Waterfalls and Sri Lanka Tea Plantations images were downloaded from Unsplash and are stored locally in `public/images/`, while the remaining destination images use Unsplash image URLs.

## Features Not Included

The following Phase 2 features were **intentionally excluded** from this implementation as per assignment instructions:
- AI travel chatbot widget
- AI itinerary generator / OpenAI integration
- Secure admin dashboard for enquiry management
- Destination Content Management System (CMS)
- Analytics / Conversion tracking dashboards
