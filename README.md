# FoodMap
Techniki Projektowania Frontendowego

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
