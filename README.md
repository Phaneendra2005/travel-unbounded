# Travel Unbounded

## Overview

A full-stack responsive web application for "Travel Unbounded", India's Most Trusted Experiential Travel Experts. This project represents the fully implemented Phase 1 and Phase 2 of the platform, enabling users to explore destination packages, securely submit booking enquiries, chat with an AI travel assistant to generate itineraries, and allowing administrators to securely manage enquiries, destinations, and view analytics.

## Features

- **Responsive Home page:** High-impact hero section, curated India and International destination grids (driven by MongoDB).
- **About page:** Company story, philosophy, office locations, and "Why Choose Us" features.
- **Contact / Enquiry form:** A comprehensive booking enquiry form capturing user details and travel preferences.
- **AI Travel Chatbot:** A responsive, conversational Google Gemini-powered travel assistant with independent internal scrolling.
- **Multi-turn Travel Preference Collection:** The chatbot gathers specific user preferences seamlessly.
- **Structured Day-Wise Itinerary Generation:** Generates and renders clean UI cards containing detailed itineraries.
- **Copy Itinerary:** Clean plain-text formatting suitable for WhatsApp or email sharing.
- **Download Itinerary:** Generates a downloadable `.txt` itinerary strictly in the browser.
- **Save Itinerary to MongoDB:** Visitors can securely save generated itineraries directly to the database.
- **Secure Admin Dashboard:** JWT-authenticated dashboard.
- **Enquiries Management:** View, search, and securely update the status (New, Contacted, Converted, Closed) of all customer enquiries.
- **Destination CRUD:** Admin interface to securely add, edit, and delete travel packages.
- **Analytics:** Data-driven visualizations for enquiries over time and status breakdowns.
- **Server-side validation:** Strong API validation using Zod to ensure data integrity.
- **MongoDB persistence:** Secure storage of all enquiries, destinations, and saved itineraries.
- **Polished UX:** Loading states, success/error toasts, and prevention of duplicate submissions.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB
- **ORM / Driver:** Mongoose
- **Validation:** Zod
- **Form Handling:** React Hook Form
- **AI Provider:** Google Gemini API (`@google/generative-ai`)
- **Authentication:** JWT (`jsonwebtoken`) & `bcryptjs`
- **Charts:** Recharts
- **Icons & UI:** Lucide React, Sonner (for toast notifications)

## Project Structure

```text
travel_unbounded/
├── src/
│   ├── app/                # Next.js App Router (pages, layout, api)
│   │   ├── api/            # API routes
│   │   │   ├── admin/      # Authentication & admin routes
│   │   │   ├── analytics/summary/ # Analytics route
│   │   │   ├── chat/       # Gemini AI integration
│   │   │   ├── destinations/ # Destination routes
│   │   │   │   ├── [id]/   # Dynamic destination route
│   │   │   │   └── seed/   # Seed destination route
│   │   │   ├── enquiry/    # Enquiry routes
│   │   │   │   └── [id]/   # Dynamic enquiry route
│   │   │   └── itineraries/# Itinerary save route
│   │   ├── admin/          # Admin pages
│   │   │   ├── (dashboard)/# Protected admin dashboard layouts
│   │   │   │   ├── analytics/page.tsx
│   │   │   │   ├── destinations/page.tsx
│   │   │   │   ├── enquiries/page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── login/page.tsx
│   │   ├── about/          # About Us page
│   │   ├── contact/        # Contact & Enquiry page
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable UI components
│   │   ├── admin/          # Admin-specific UI (Sidebar, Loaders)
│   │   └── chat/           # Chat components (ChatWidget, ItineraryCard)
│   ├── lib/                # Utilities (mongodb.ts connection, auth)
│   └── models/             # Mongoose schemas
│       ├── Destination.ts  # Destination model
│       ├── Enquiry.ts      # Enquiry model
│       └── SavedItinerary.ts # SavedItinerary model
└── .env.example            # Environment variables template
```

## Environment Variables

The project requires the following environment variables. **Real secrets must never be committed to Git.**

- `MONGODB_URI`: The connection string for your MongoDB Atlas cluster.
- `GEMINI_API_KEY`: API key for Google Gemini API.
- `JWT_SECRET`: Secure random string for signing admin session tokens.
- `ADMIN_EMAIL`: Email for evaluator login.
- `ADMIN_PASSWORD_HASH`: Bcrypt hash of the evaluator password.

## Admin Access (Evaluator Login)

The admin dashboard (`/admin`) uses secure JWT authentication. The evaluator account is strictly configured through server-side environment variables.

To access the dashboard, use the following assignment evaluator credentials:

**Email:** `admin@gmail.com`  
**Password:** `TravelAdmin@123`

## API Endpoint Documentation

### Public Endpoints
- `POST /api/chat`: Handles Gemini AI conversational flows and structured itinerary generation.
- `POST /api/enquiry`: Submits a new booking enquiry.
- `GET /api/destinations`: Retrieves all active destination packages.
- `GET /api/destinations/:id`: Retrieves a specific destination package.
- `POST /api/itineraries`: Validates and saves a generated itinerary to MongoDB.

### Authentication Endpoints
- `POST /api/admin/login`: Authenticates the admin and issues a JWT httpOnly cookie.
- `POST /api/admin/logout`: Clears the authentication session.

### Protected Admin Endpoints (Require valid JWT Cookie)
- `GET /api/admin/enquiries`: Retrieves enquiries for the authenticated admin dashboard.
- `PATCH /api/enquiry/:id`: Updates an existing booking enquiry.
- `POST /api/destinations`: Creates a new destination package.
- `PATCH /api/destinations/:id`: Updates a destination package.
- `DELETE /api/destinations/:id`: Deletes a destination package.
- `POST /api/destinations/seed`: Safely seeds initial destination data to the database.
- `GET /api/analytics/summary`: Retrieves aggregated statistical data for dashboard visualization.

## Saved Itineraries

Users interacting with the AI Travel Chatbot are provided with several post-generation itinerary features:
- **Copy**: Generated itineraries can be copied securely to the clipboard in a clean, plain-text format.
- **Download**: Itineraries can be downloaded directly in the browser as a `.txt` file.
- **Save anonymously**: Visitors can securely save their itineraries to the database. The `POST /api/itineraries` endpoint strictly validates the itinerary payload server-side using Zod before persisting it to MongoDB via the `SavedItinerary` model, where a `createdAt` timestamp is automatically stored.

## Deployment

This project is optimized for deployment on Vercel. When deploying to production:
1. Push your code to a Git repository.
2. Import the project into Vercel.
3. Production environment variables must be configured in the Vercel dashboard for:
   - `MONGODB_URI`
   - `GEMINI_API_KEY`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD_HASH`
4. **Note:** Any future environment variable changes require a new deployment/redeployment to take effect.

## Assumptions

- Destination pricing and data (`src/data/destinations.ts`) are dummy data representations.
- All destination images are sourced from Unsplash. For reliability, the Iceland Waterfalls and Sri Lanka Tea Plantations images were downloaded from Unsplash and are stored locally in `public/images/`, while the remaining destination images use Unsplash image URLs.

## Phase 2 Implementation Details

- **Server-side Gemini API integration**: The `GEMINI_API_KEY` is completely hidden from the client. All communications to the Gemini API occur securely via the server backend.
- **Structured itinerary generation**: The chatbot evaluates multi-turn inputs and is explicitly instructed to output only valid JSON when generating an itinerary.
- **JWT/httpOnly-cookie authentication**: Security implementation issuing and verifying strict httpOnly cookies.
- **Protected admin APIs**: Protected admin APIs enforce strong JWT verification before accessing or modifying administrative data.
- **Destination CRUD**: Full integration allowing the secure, dynamic management of website packages.
- **Analytics**: Real-time aggregation of MongoDB metrics for administration review.
- **Saved itinerary persistence**: Allowing users to save their chat generation directly into MongoDB.
- **Server-side validation**: Enforced using `zod` inside the API routes, verifying all payloads strictly before database interaction.
