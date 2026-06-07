import { signInWithPopup } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { auth, googleProvider } from '../config/firebase'

export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider)
}

export function getAuthErrorMessage(error: unknown, fallback: string): string | null {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/popup-closed-by-user':
      case 'auth/cancelled-popup-request':
        return null
      case 'auth/popup-blocked':
        return 'Popup was blocked. Allow popups for this site and try again.'
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with this email using a different sign-in method.'
      case 'auth/network-request-failed':
        return 'Network error. Check your connection and try again.'
      default:
        return error.message || fallback
    }
  }

  if (error instanceof Error) return error.message || fallback
  return fallback
}
