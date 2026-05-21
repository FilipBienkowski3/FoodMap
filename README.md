# FoodMap

Techniki Projektowania Frontendowego

## Design System: Gourmet Minimalist

The application follows the **Gourmet Minimalist** design philosophy, focusing on high-quality food photography and a clean, "breathable" interface.

### Features

- **Inter Font**: Systematic and highly readable typography.
- **Appetizing Palette**: A neutral base with primary orange accents (#8b5000) to evoke warmth and hunger.
- **Rounded UI**: Soft aesthetics with 0.5rem (standard) to 1.5rem (cards) border radii.
- **Tonal Layers**: Minimal shadows replaced by tonal separation and subtle outlines.

## Profile Management

A dedicated profile view for authenticated users to track their culinary journey.

### Features

- **Dynamic User Data**: Displays name retrieved directly from Firebase Authentication.
- **Personalized Content**: "Visited" and "Want to Visit" tabs for tracking food spots.

## Voting System (DineVote)

A multi-stage voting process to help groups decide on a venue and time.

### Features

- **3-Step Wizard**: Simplified flow from room creation to finalization.
- **Cravings-Based Voting**: Users select their preferred cuisine before voting for specific venues.
- **Availability Matching**: Interactive time-slot selection with group availability indicators.
- **Interactive UI**: Real-time feedback on vote counts and selection states.

## Component Architecture

- **DishCard**: A reusable card component prioritized for food photography and ratings.
- **Navbar**: Fixed bottom navigation for seamless multi-screen transitions.

## Authentication (Firebase)

The application uses Firebase Authentication for user management.

### Features

- User registration with Email/Password.
- User login with Email/Password.
- Profile management (Store `displayName` during registration).
- Persistent session handling via `onAuthStateChanged`.
- Protected routes for authenticated users.

### Configuration

To run the project locally with authentication, create a `.env` file in the `FoodMap-frontend/` directory based on `.env.example`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Implementation Details

- `AuthContext.tsx`: Provides the authentication state (`user`, `loading`) and `logout` function to the entire application.
- `firebase.ts`: Initializes the Firebase SDK using environment variables.
- `ProtectedRoute`: A wrapper component in `App.tsx` that redirects unauthorized users to the login page.
