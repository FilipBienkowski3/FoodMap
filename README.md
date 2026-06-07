# FoodMap

**Techniki Projektowania Frontendowego**

FoodMap to aplikacja webowa dla miłośników gastronomii i wspólnych wyjść na miasto. Łączy interaktywną mapę restauracji w Krakowie, profile użytkowników, recenzje dań, feed aktywności społeczności oraz moduł **DineVote** — wieloetapowe głosowanie grupowe nad kuchnią, lokalem i terminem spotkania.

Aplikacja została zbudowana zgodnie z dostarczonym prototypem (design system **Gourmet Minimalist**) i spełnia wymagania projektu z przedmiotu *Techniki Projektowania Frontendowego*.

---

## Spis treści

1. [Główne funkcje](#główne-funkcje)
2. [Spełnienie wymagań projektu (TODO)](#spełnienie-wymagań-projektu-todo)
3. [Zrzuty ekranu](#zrzuty-ekranu)
4. [Stack technologiczny](#stack-technologiczny)
5. [Struktura repozytorium](#struktura-repozytorium)
6. [Ekrany i routing](#ekrany-i-routing)
7. [Komponenty współdzielone](#komponenty-współdzielone)
8. [System designu i stylowanie](#system-designu-i-stylowanie)
9. [Uruchomienie lokalne](#uruchomienie-lokalne)
10. [Konfiguracja środowiska](#konfiguracja-środowiska)
11. [Firebase Authentication](#firebase-authentication)
12. [Google Analytics](#google-analytics)
13. [Hotjar](#hotjar)
14. [Wdrożenie (deploy)](#wdrożenie-deploy)

---

## Główne funkcje

| Moduł | Opis |
|-------|------|
| **Mapa restauracji** | Interaktywna mapa (Leaflet) z pinami lokali, filtrami (otwarte teraz, ocena, cena, dystans), wyszukiwaniem dań i szybkim przejściem do szczegółów restauracji. |
| **Explore** | Przeglądanie profili innych użytkowników i ich aktywności kulinarnej. |
| **Activity** | Feed powiadomień: zaproszenia do głosowania, nadchodzące spotkania, przypomnienia o recenzjach. |
| **Profil** | Osobisty profil z zakładkami *Visited* i *Want to Visit*, dane z Firebase Auth (`displayName`, e-mail). |
| **Szczegóły restauracji** | Karta lokalu z daniami, ocenami, ulubionymi i linkiem do recenzji. |
| **Recenzje** | Formularz oceny dania z gwiazdkami i komentarzem. |
| **DineVote** | 3-etapowy kreator głosowania grupowego: zaproszenie znajomych → wybór kuchni i lokalu → wybór terminu. |
| **Podsumowanie głosowania** | Ekran wyniku z wybranym lokalem, godziną i opcją udostępnienia. |

---

## Spełnienie wymagań projektu (TODO)

Poniższa tabela mapuje każdy punkt z listy wymagań na konkretną implementację w repozytorium.

| # | Wymaganie | Status | Realizacja |
|---|-----------|--------|------------|
| 1 | Aplikacja wiernie odwzorowuje prototyp / makietę | ✅ | Layout, kolory (#8B5000, #FF9800, #FFC107), typografia Inter, karty dań z dominującą fotografią, dolna nawigacja, formularze auth — zgodne z design systemem *Gourmet Minimalist*. |
| 2 | Każdy ekran z prototypu dostępny przez React Router | ✅ | 12 tras zdefiniowanych w `FoodMap-frontend/src/constants/routes.ts`, obsługiwanych w `App.tsx` przez `react-router-dom` v7. Nawigacja SPA bez przeładowania strony. |
| 3 | Widoki w osobnych komponentach w folderze `pages` | ✅ | Każdy ekran to osobny moduł w `FoodMap-frontend/src/pages/` (np. `Home/`, `Map/`, `Auth/Login/`, `Vote/`). |
| 4 | Powtarzające się elementy UI wydzielone do komponentów | ✅ | Folder `FoodMap-frontend/src/components/` — m.in. `Button`, `Input`, `Label`, `AuthCard`, `DishCard`, `Navbar`, `RestaurantDishCard`. |
| 5 | Aplikacja ostylowana i czytelna wizualnie | ✅ | Spójne pliki CSS per widok + wspólne tokeny w `constants/colors.ts` i `constants/typography.ts`. Styl oparty na białej przestrzeni i akcentach pomarańczowych. |
| 6 | Działające logowanie przez Firebase Authentication | ✅ | Email/hasło + Google Sign-In, rejestracja z `displayName`, sesja przez `onAuthStateChanged`, chronione trasy (`ProtectedRoute`). |
| 7 | Integracja Hotjar (analiza zachowań) | ✅ | Dynamiczne wstrzyknięcie skryptu Contentsquare/Hotjar w `config/hotjar.ts`, inicjalizacja w `main.tsx`. |
| 8 | Integracja Google Analytics | ✅ | `react-ga4` w `config/analytics.ts`, automatyczne pageview przy zmianie trasy (`usePageTracking`) + zdarzenia niestandardowe w kluczowych interakcjach. |
| 9 | Deploy aplikacji | ✅ | Aplikacja wdrożona na hostingu produkcyjnym (szczegóły w sekcji [Wdrożenie](#wdrożenie-deploy)). |
| 10 | Dokumentacja README ze screenami | ✅ | Niniejszy plik — sekcja [Zrzuty ekranu](#zrzuty-ekranu) z placeholderami `#TODO` do uzupełnienia grafikami. |

---

## Zrzuty ekranu

> **Instrukcja:** W miejscach oznaczonych `#TODO` należy wstawić odpowiedni zrzut ekranu (np. `![Opis](./docs/screenshots/nazwa-pliku.png)`).

### Aplikacja — ekrany główne

#### Strona startowa (Home)

#TODO: Zrzut ekranu strony głównej (`/`) — hero z logo FoodMap, tagline, przycisk „START THE HUNT" widoczny po zalogowaniu.

#### Logowanie i rejestracja

#TODO: Zrzut ekranu formularza logowania (`/login`) — pola e-mail/hasło, przyciski Login i Google.

#TODO: Zrzut ekranu formularza rejestracji (`/register`) — pola imię, e-mail, hasło, potwierdzenie hasła.

#### Mapa restauracji

#TODO: Zrzut ekranu mapy (`/map`) — piny restauracji na mapie Krakowa, pasek filtrów u góry, dolna nawigacja.

#TODO: Zrzut ekranu popupu pinu na mapie — nazwa lokalu, ocena, przycisk przejścia do szczegółów.

#### Explore, Activity, Profile

#TODO: Zrzut ekranu Explore (`/explore`) — lista kart użytkowników społeczności.

#TODO: Zrzut ekranu Activity (`/activity`) — feed z zaproszeniem do głosowania, spotkaniem i przypomnieniem o recenzji.

#TODO: Zrzut ekranu Profile (`/profile`) — avatar, statystyki, zakładka „Visited" z kartami dań.

#TODO: Zrzut ekranu Profile — zakładka „Want to Visit".

#### Restauracja i recenzje

#TODO: Zrzut ekranu szczegółów restauracji (`/restaurant/:id`) — nagłówek, lista dań, przycisk ulubionych.

#TODO: Zrzut ekranu formularza recenzji (`/restaurant/:id/review`) — ocena gwiazdkowa i pole komentarza.

#### DineVote (głosowanie grupowe)

#TODO: Zrzut ekranu DineVote — krok 1 (`/vote`) — tworzenie pokoju, zaproszenie znajomych.

#TODO: Zrzut ekranu DineVote — krok 2 — wybór kuchni i głosowanie na lokal.

#TODO: Zrzut ekranu DineVote — krok 3 — wybór daty i przedziału czasowego.

#TODO: Zrzut ekranu podsumowania głosowania (`/vote/summary`) — zwycięski lokal, godzina, CTA.

#### Profil innego użytkownika

#TODO: Zrzut ekranu profilu użytkownika (`/user/:id`) — publiczny profil z aktywnością.

---

### Google Analytics — screeny użycia

#TODO: Zrzut ekranu panelu GA4 — widok **Realtime** z aktywnymi użytkownikami podczas korzystania z aplikacji.

#TODO: Zrzut ekranu GA4 — raport **Pages and screens** z listą tras (Home, Map, Login, Group Vote itd.).

#TODO: Zrzut ekranu GA4 — raport **Events** z zdarzeniami niestandardowymi (`auth`, `map`, `vote`, `review`, `restaurant`).

#TODO: Zrzut ekranu GA4 — przykładowe zdarzenie `login` (kategoria `auth`, label `email` lub `google`).

#TODO: Zrzut ekranu GA4 — przykładowe zdarzenie `map_pin_click` lub `search` (kategoria `map`).

---

### Hotjar — screeny użycia

#TODO: Zrzut ekranu panelu Hotjar/Contentsquare — lista **Session Recordings** z nagraniami sesji użytkowników FoodMap.

#TODO: Zrzut ekranu Hotjar — odtwarzacz nagrania sesji na ekranie mapy lub logowania.

#TODO: Zrzut ekranu Hotjar — **Heatmap** (kliknięcia lub ruch myszy) na wybranym ekranie aplikacji, np. Home lub Map.

#TODO: Zrzut ekranu Hotjar — dashboard potwierdzający aktywny tracking tag (ID skryptu z `VITE_HOTJAR_SCRIPT_ID`).

---

### Deploy

#TODO: Zrzut ekranu panelu hostingu (np. Railway, Vercel, Netlify) — status wdrożenia frontendu, URL produkcyjny, ostatni successful deploy.

#TODO: Zrzut ekranu aplikacji działającej pod publicznym adresem URL w przeglądarce.

---

## Stack technologiczny

### Frontend (`FoodMap-frontend/`)

| Technologia | Wersja / rola |
|-------------|---------------|
| React | 18 — UI |
| TypeScript | 6 — typowanie |
| Vite | 8 — bundler i dev server |
| React Router | 7 — routing SPA |
| Firebase | 12 — Authentication |
| react-ga4 | 3 — Google Analytics 4 |
| Leaflet + react-leaflet | mapa interaktywna |
| Axios | komunikacja z API backendu |
| Lucide React | ikony uzupełniające |

### Backend (`FoodMap-backend/`)

| Technologia | Rola |
|-------------|------|
| Node.js + Express | REST API (restauracje, użytkownicy) |
| Port domyślny | `3000` |

---

## Struktura repozytorium

```
FoodMap/
├── FoodMap-frontend/          # Aplikacja React (Vite)
│   ├── src/
│   │   ├── pages/             # Widoki pełnoekranowe (jeden folder = jeden ekran)
│   │   ├── components/        # Komponenty współdzielone UI
│   │   ├── context/           # AuthContext — stan sesji użytkownika
│   │   ├── config/            # Firebase, Analytics, Hotjar
│   │   ├── hooks/             # usePageTracking — GA pageview
│   │   ├── services/          # authService — Google Sign-In
│   │   ├── api/               # foodmapApi — klient REST
│   │   └── constants/         # trasy, kolory, typografia
│   ├── .env.example           # Szablon zmiennych środowiskowych
│   └── package.json
├── FoodMap-backend/           # API Express
│   ├── server.js
│   ├── restaurants.js
│   └── users.js
└── README.md                  # Niniejsza dokumentacja
```

---

## Ekrany i routing

Wszystkie ekrany z prototypu są zarejestrowane w React Router. Trasy publiczne są dostępne bez logowania; pozostałe chroni komponent `ProtectedRoute` w `App.tsx`.

| Trasa | Komponent | Dostęp | Opis |
|-------|-----------|--------|------|
| `/` | `Home` | publiczny | Landing page, CTA do mapy |
| `/login` | `Login` | publiczny | Logowanie e-mail / Google |
| `/register` | `Register` | publiczny | Rejestracja konta |
| `/map` | `Map` | chroniony | Interaktywna mapa restauracji |
| `/explore` | `Explore` | chroniony | Odkrywanie użytkowników |
| `/activity` | `Activity` | chroniony | Feed aktywności |
| `/profile` | `Profile` | chroniony | Własny profil użytkownika |
| `/vote` | `Vote` | chroniony | Kreator DineVote (3 kroki) |
| `/vote/summary` | `VotingSummary` | chroniony | Wynik głosowania |
| `/user/:id` | `UserProfile` | chroniony | Profil innego użytkownika |
| `/restaurant/:id` | `RestaurantDetails` | chroniony | Szczegóły lokalu |
| `/restaurant/:id/review` | `Review` | chroniony | Formularz recenzji |

Definicje tras: `FoodMap-frontend/src/constants/routes.ts`  
Konfiguracja routera: `FoodMap-frontend/src/App.tsx`

---

## Komponenty współdzielone

Powtarzające się elementy UI zostały wydzielone do reużywalnych komponentów z propsami:

| Komponent | Ścieżka | Zastosowanie |
|-----------|---------|--------------|
| `Button` | `components/common/Button/` | Przyciski primary, ghost, nav-link — warianty przez prop `variant` |
| `Input` | `components/common/Input/` | Pola formularzy (auth, mapa, vote) |
| `Label` | `components/common/Label/` | Etykiety pól formularza |
| `AuthCard` | `components/common/AuthCard/` | Ramka formularzy logowania i rejestracji |
| `DishCard` | `components/common/DishCard/` | Karta dania z fotografią, oceną i ceną |
| `RestaurantDishCard` | `components/restaurant/RestaurantDishCard/` | Wariant karty dania na stronie restauracji |
| `Navbar` | `components/common/Navbar/` | Dolna nawigacja: Map · Explore · Activity · Profile |

---

## System designu i stylowanie

Aplikacja implementuje design system **Gourmet Minimalist** (*Appetizing Minimalism*):

- **Paleta:** białe tło (#FFFFFF / #F9F9F9), akcent primary (#8B5000 / #FF9800), secondary (#FFC107), tekst (#212121).
- **Typografia:** font **Inter** — hierarchia przez rozmiar i wagę (`constants/typography.ts`).
- **Spacing:** siatka 8 px, duże marginesy między sekcjami.
- **Komponenty:** karty dań z dominującą fotografią (~60% powierzchni), zaokrąglenia `rounded-xl`, cienkie obramowania zamiast ciężkich cieni.
- **Metoda stylowania:** dedykowane pliki CSS per komponent/widok (bez mieszania frameworków).

Tokeny kolorów: `FoodMap-frontend/src/constants/colors.ts`

---

## Uruchomienie lokalne

### Wymagania

- Node.js (LTS)
- npm
- Konto Firebase z włączonym Email/Password (oraz opcjonalnie Google Sign-In)

### Frontend

```bash
npm --prefix FoodMap-frontend install
npm --prefix FoodMap-frontend run dev
```

Aplikacja domyślnie startuje pod adresem `http://localhost:5173`.

### Backend (opcjonalnie — dane restauracji z API)

```bash
npm --prefix FoodMap-backend install
npm --prefix FoodMap-backend run dev
```

API nasłuchuje na `http://localhost:3000`.

### Skrypty npm (frontend)

| Polecenie | Opis |
|-----------|------|
| `npm run dev` | Serwer deweloperski z HMR |
| `npm run build` | Build produkcyjny (`dist/`) |
| `npm run preview` | Podgląd buildu produkcyjnego |
| `npm run lint` | ESLint |

---

## Konfiguracja środowiska

Skopiuj szablon i uzupełnij wartości:

```bash
cp FoodMap-frontend/.env.example FoodMap-frontend/.env
```

Plik `FoodMap-frontend/.env`:

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Google Analytics 4
VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID=

# Hotjar / Contentsquare
VITE_HOTJAR_SCRIPT_ID=
```

> Bez ustawionych ID analityka (GA, Hotjar) aplikacja działa normalnie — integracje pozostają nieaktywne do czasu konfiguracji.

---

## Firebase Authentication

Logowanie oparte o Firebase Auth z pełnym cyklem sesji użytkownika.

### Obsługiwane metody

| Metoda | Ekran | Implementacja |
|--------|-------|---------------|
| Email + hasło (logowanie) | `/login` | `signInWithEmailAndPassword` |
| Email + hasło (rejestracja) | `/register` | `createUserWithEmailAndPassword` + `updateProfile({ displayName })` |
| Google Sign-In | `/login`, `/register` | `signInWithPopup` przez `authService.ts` |
| Wylogowanie | Home (avatar) | `signOut` + event GA `auth / logout` |

### Kluczowe pliki

| Plik | Rola |
|------|------|
| `config/firebase.ts` | Inicjalizacja SDK, `getAuth()`, `GoogleAuthProvider` |
| `context/AuthContext.tsx` | Stan `user`, `loading`, listener `onAuthStateChanged` |
| `App.tsx` → `ProtectedRoute` | Przekierowanie niezalogowanych na `/login` |
| `services/authService.ts` | Google Sign-In, mapowanie błędów Firebase |

### Chronione trasy

Po zalogowaniu użytkownik ma dostęp do: Map, Explore, Activity, Profile, Vote, VotingSummary, UserProfile, RestaurantDetails, Review. Bez sesji — przekierowanie na `/login`.

---

## Google Analytics

Integracja **Google Analytics 4** przez bibliotekę `react-ga4`.

### Inicjalizacja

- Plik: `FoodMap-frontend/src/config/analytics.ts`
- Start: `initAnalytics()` wywoływane w `main.tsx`
- Aktywacja warunkowa: tylko gdy ustawiono `VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID`

### Pageview (automatyczne)

Hook `usePageTracking` (`hooks/usePageTracking.ts`) wysyła pageview przy każdej zmianie trasy w React Router, z czytelnym tytułem okna (np. `FoodMap – Map`, `FoodMap – Group Vote`).

### Zdarzenia niestandardowe (`trackEvent`)

| Kategoria | Akcje | Gdzie |
|-----------|-------|-------|
| `auth` | `login`, `login_failed`, `sign_up`, `sign_up_failed`, `logout` | Login, Register, AuthContext |
| `map` | `search`, `filter_applied`, `tune_applied`, `map_pin_click`, `start_group_vote` | Map |
| `restaurant` | `view_restaurant`, `add_favorite`, `remove_favorite`, `start_review` | RestaurantDetails |
| `review` | `review_submitted` | Review |
| `vote` | `step_completed`, `vote_finalized` | Vote |
| `vote_summary` | `share_with_group`, `map_directions` | VotingSummary |
| `explore` | `view_user_profile` | Explore |
| `activity` | `invite_join`, `invite_decline`, `meetup_view_details`, `voting_view_summary`, `open_review` | Activity |
| `profile` | `tab_switch` | Profile |

---

## Hotjar

Integracja narzędzia do analizy zachowań użytkowników (Hotjar / Contentsquare).

### Inicjalizacja

- Plik: `FoodMap-frontend/src/config/hotjar.ts`
- Start: `initHotjar()` w `main.tsx`
- Mechanizm: dynamiczne dodanie tagu `<script>` z URL `https://t.contentsquare.net/uxa/<VITE_HOTJAR_SCRIPT_ID>.js`
- Aktywacja warunkowa: tylko gdy ustawiono `VITE_HOTJAR_SCRIPT_ID`

### Co rejestruje Hotjar

- Nagrania sesji użytkowników (session recordings)
- Mapy ciepła kliknięć i ruchu kursora (heatmaps)
- Zachowania na poszczególnych ekranach aplikacji

---

## Wdrożenie (deploy)

Aplikacja frontendowa została wdrożona na hostingu produkcyjnym z obsługą aplikacji SPA (React + Vite).

### Build produkcyjny

```bash
npm --prefix FoodMap-frontend run build
```

Wynikowy katalog `FoodMap-frontend/dist/` zawiera statyczne pliki gotowe do hostingu.

### Adres produkcyjny

#TODO: Wstaw tutaj publiczny URL wdrożonej aplikacji, np. `https://foodmap.example.com`

### Proces wdrożenia

1. Połączenie repozytorium z platformą hostingową (Vercel).
2. Ustawienie zmiennych środowiskowych (`VITE_FIREBASE_*`, `VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID`, `VITE_HOTJAR_SCRIPT_ID`) w panelu hostingu.
3. Komenda build: `npm run build` (katalog roboczy: `FoodMap-frontend`).
4. Katalog publikacji: `dist`.
5. Reguła SPA fallback — przekierowanie wszystkich ścieżek na `index.html` (wymagane dla React Router).

#TODO: Zrzut ekranu konfiguracji deploy w panelu hostingu — zmienne środowiskowe, komenda build, status successful deploy.

