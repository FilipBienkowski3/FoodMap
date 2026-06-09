# Protokół różnic: Figma (dokumentacja) vs implementacja


---

## Podsumowanie ogólne

| Obszar | Zgodność wizualna | Zgodność funkcjonalna | Uwagi |
|--------|-------------------|----------------------|-------|
| Home (landing) | Średnia | Wysoka | Inny stan ekranu na screenie (niezalogowany vs zalogowany w Figmie) |
| Logowanie / Rejestracja | Wysoka | Średnia | Apple Sign-In i „Forgot Password” tylko wizualnie |
| Mapa | Średnia | Wysoka | Prawdziwa mapa OSM zamiast stylizowanej grafiki |
| Explore | Wysoka | Wysoka | Drobiazgi typograficzne i ikony nawigacji |
| Activity | Wysoka | Wysoka | Lokalizacja danych (krakowskie lokale) |
| Profil własny | Niska–średnia | Średnia | Brak odznak, inna mapa, brak Follow/Message |
| Profil innego użytkownika | Wysoka | Średnia | Follow/Message bez backendu |
| Szczegóły restauracji | Wysoka | Wysoka | PLN i krakowskie lokale zamiast USD |
| Recenzja | Wysoka | Średnia | Upload zdjęć lokalny, bez persystencji |
| DineVote (3 kroki) | Wysoka | Średnia | Głosowanie symulowane (mock), bez realtime |
| Podsumowanie głosowania | — | Wysoka | Brak makiety w Figmie |

**Wniosek:** Layout, hierarchia wizualna, paleta kolorów (#8B5000, #FFC107) i typografia Inter są w dużej mierze odwzorowane. Największe rozbieżności wynikają z decyzji technicznych (prawdziwa mapa, dane z API), lokalizacji (Kraków, PLN) oraz ograniczeń czasu projektu (mocki zamiast pełnego backendu społecznościowego).

---

## Porównanie ekran po ekranie

### 1. Home — „Welcome User”

| Element | Figma | Implementacja | Powód różnicy |
|---------|-------|---------------|---------------|
| Nagłówek | Logo FoodMap (widelec + łyżka) po lewej, „Hello, Alex” + avatar po prawej | Na screenie: LOGIN + REGISTER (stan niezalogowany) | Screen w README pokazuje wariant publiczny; kod obsługuje oba stany (`Home.tsx`) |
| CTA | Żółty przycisk „START THE HUNT” z ikoną sztućców | Niezalogowany: przycisk ghost (wyłączony); zalogowany: brązowy primary z emoji 🍴 | Różny wariant przycisku i brak żółtego `#FFC107` na CTA |
| Tagline | *„Discover the city's hidden culinary gems through the lens of those who eat there.”* | *„Discover the architectural beauty of culinary excellence.”* | Zmieniony copy w `constants/app.ts` |
| Tło | Fotografia dania z rozmyciem | Fotografia burgera z ciemnym overlay | Inny asset stockowy |
| Stopka | Brak w makiecie zalogowanego użytkownika | Privacy · Terms · Instagram + © 2024 | Dodatkowy element UX na landing page |

**Co się udało:** pełnoekranowy hero, overlay na zdjęciu, logika CTA zależna od sesji, przekierowanie do mapy po zalogowaniu.  
**Co się nie udało:** wierne odwzorowanie żółtego CTA, identyczny tagline, logo z ikoną sztućców w nagłówku (w kodzie `home__logo` jest pustym `<span>`).

---

### 2. Logowanie i rejestracja

| Element | Figma | Implementacja | Powód różnicy |
|---------|-------|---------------|---------------|
| Layout karty auth | Biała karta, nagłówek z strzałką + FoodMap | Zgodne | — |
| Nagłówki / placeholdery | „Welcome back.” / „Join the hunt.” | Zgodne | — |
| Pola formularza | 3 pola (Sign Up) | 4 pola — dodane **Confirm Password** | Decyzja developerska (walidacja hasła) |
| Przycisk primary | Brązowy „Login” / „Create Account” | Zgodne | — |
| Social login | Google + Apple obok siebie | Zgodne wizualnie | — |
| Google Sign-In | — | Działa (Firebase) | ✅ |
| Apple Sign-In | — | Przycisk bez `onClick` (`() => {}`) | Brak konfiguracji Apple w Firebase / poza zakresem |
| Forgot Password? | Link brązowy | Link `href="#"` — nieaktywny | Brak flow resetu hasła w Firebase |

**Co się udało:** layout, kolory, Google OAuth, rejestracja z `displayName`, nawigacja między Login ↔ Register.  
**Co się nie udało:** funkcjonalny Apple Sign-In, reset hasła.

---

### 3. Mapa — „Interactive Map”

| Element | Figma | Implementacja | Powód różnicy |
|---------|-------|---------------|---------------|
| Tło mapy | Stylizowany zielony gradient, brak ulic | Prawdziwa mapa Leaflet / OpenStreetMap (Kraków) | Świadoma decyzja: interaktywna mapa z geolokalizacją |
| Piny | Ikony miski ramen, klaster „4” | Piny z Material Icons, brak klastrowania | Leaflet bez pluginu markercluster |
| Karta restauracji | Floating card na mapie (Ramen Ichiraku, $16 · 0.2m) | Karta w Leaflet Popup po kliknięciu pinu | Inny wzorzec UX (popup vs overlay) |
| Wyszukiwanie | Aktywny tag „Shoyu Ramen” w search barze | Mechanizm tagów zaimplementowany, na screenie brak aktywnego tagu | Różnica stanu UI, nie brak funkcji |
| Filtry | „Open Now” w stanie aktywnym (brązowa obwódka) | Chipy z klasą `--active` po kliknięciu | Zgodne po interakcji |
| Dystans | Mile (0.2m) | Kilometry (np. 0.8 km) | Lokalizacja PL + metryka SI |
| Cena | USD ($) | PLN (zł) | Dane z backendu dla Krakowa |
| Przycisk FAB | „START GROUP VOTE” (caps) | „Start Group Vote” (mixed case) | Różnica typograficzna |
| Dolna nawigacja | MAP aktywny, czerwona kropka na Activity | Zgodne (badge na Activity w `Navbar.tsx`) | ✅ |

**Co się udało:** wyszukiwanie, filtry (otwarte, ocena, cena, dystans), panel tune, geolokalizacja, nawigacja do restauracji i DineVote, analityka GA (`map_pin_click`).  
**Co się nie udało:** stylizowana mapa ilustracyjna, klastry pinów, floating card bez popupu, jednostki imperialne.

---

### 4. Explore — „Explore Friends”

| Element | Figma | Implementacja | Powód różnicy |
|---------|-------|---------------|---------------|
| Nagłówek | FoodMap (serif, brązowy) | Zgodne | — |
| Search | „Search for friends...” | Zgodne + filtrowanie na żywo | ✅ |
| Lista znajomych | 4 karty z avatarami i tagline | Zgodne (mock `MOCK_USERS`) | — |
| Link akcji | „View Profile >” ze strzałką | „View Profile” bez „>” | Drobiazg UI |
| VIEW ALL | Link brązowy | Przycisk bez akcji (brak routingu) | Brak ekranu listy pełnej |
| Ikona Explore (nav) | Kompas | Lupa (`search`) | Inna ikona Material Symbols |
| Dane | „Alex M.” | „Alex Mercer” | Pełniejsze imię w mockach |

**Co się udało:** layout kart, wyszukiwanie, nawigacja do `/user/:id`, aktywny stan nav.  
**Co się nie udało:** „VIEW ALL”, strzałka przy „View Profile”, ikona kompasu.

---

### 5. Activity — „Activity Feed”

| Element | Figma | Implementacja | Powód różnicy |
|---------|-------|---------------|---------------|
| Karty feedu | 5 typów: meetup, voting, review, invite, poll | Wszystkie 5 typów obecne | ✅ |
| Meetup | Osteria Marco | Wierzynek (krakowski lokal) | Lokalizacja treści |
| Voting complete | Zdjęcie stołu + VIEW SUMMARY | Zgodne, link do `/vote/summary` | ✅ |
| New review | David L. · Spicy Tuna Roll · Sushi Spot | Sarah M. · Dragon Roll · Sushi Kyo | Inne mocki |
| New invite | JOIN ROOM / DECLINE | Zgodne + toast po DECLINE | ✅ |
| Poll vote | Alex M. · Pizza Night · 2 min ago | Zgodne | ✅ |
| Nagłówek | Logo z ikoną sztućców | Ikona `restaurant` + FoodMap | Nieznacznie inna ikona |

**Co się udało:** pełna struktura feedu, interaktywne przyciski, nawigacja do vote/restaurant/summary.  
**Co się nie udało:** dynamiczny feed z backendu (dane statyczne).

---

### 6. Profil — własny (`/profile`)

| Element | Figma (Alex Mercer) | Implementacja | Powód różnicy |
|---------|---------------------|---------------|---------------|
| Odznaki | Ramen Master, Top Reviewer, Bread Enthusiast | **Brak** | Odznaki tylko na profilu innego użytkownika |
| Przyciski | Follow + Message | **Edit Profile** | Własny profil — inna akcja |
| My Food Map | Ilustracja mapy z kolorowymi pinami | Zdjęcie krajobrazu (placeholder) | Brak custom grafiki SVG |
| Zakładki | Visited / Want to Visit | Zgodne | ✅ |
| Karty dań | Tonkotsu Ramen, $16.00 | Tonkotsu Ramen, 42 zł | PLN + dane API |
| Nagłówek | Strzałka + FoodMap | Brak (wejście z dolnej nawigacji) | Poprawne dla własnego profilu |

**Co się udało:** zakładki Visited/Want to Visit, karty dań (`DishCard`), dane z Firebase (`displayName`, avatar).  
**Co się nie udało:** odznaki gamifikacyjne, ilustrowana mapa odwiedzin, edycja profilu (przycisk bez logiki).

---

### 7. Profil — inny użytkownik (`/user/:id`)

| Element | Figma | Implementacja | Powód różnicy |
|---------|-------|---------------|---------------|
| Layout | Avatar, bio, odznaki, Follow/Message | Zgodne (Sarah M. na screenie) | ✅ |
| Odznaki | 3 pill z ikonami | Tekstowe pill bez ikon | Uproszczenie CSS |
| My Food Map | Ilustracja | Zdjęcie satelitarne (placeholder) | Brak dedykowanej grafiki |
| Follow / Message | Przyciski aktywne | Widoczne, bez backendu | Mock UI |

**Co się udało:** najbliższe odwzorowanie makietu profilu społecznościowego.  
**Co się nie udało:** prawdziwy follow/messaging, mapa z pinami odwiedzin.

---

### 8. Szczegóły restauracji + Full Menu

| Element | Figma | Implementacja | Powód różnicy |
|---------|-------|---------------|---------------|
| Nazwa lokalu | Lumière Gastronomy | Ramen Ichiraku | Krakowskie dane z API |
| Ceny | USD ($24.00) | PLN (42 zł, 22 zł…) | Lokalizacja |
| Hero + OPEN NOW | Zgodne | Zgodne (dynamiczne `isOpenNow`) | ✅ |
| Top Rated Dishes | Karty z REVIEW | Zgodne (`RestaurantDishCard`) | ✅ |
| Full Menu — zakładki | STARTERS / MAINS / DESSERTS / DRINKS | Zgodne | ✅ |
| Pozycje menu | Tylko tekst (tytuł, opis, tagi VEGAN/GF) | Tekst **+ miniaturki zdjęć** | Rozszerzenie ponad makietę |
| CTA „Enjoyed your visit?” | Karta brzoskwiniowa + WRITE A REVIEW | Zgodne | ✅ |

**Co się udało:** pełny flow restauracja → menu → recenzja, ulubione (serce), dane z Express API.  
**Co się nie udało:** identyczne nazwy lokali z makiety, menu bez zdjęć jak w Figmie (implementacja ma więcej).

---

### 9. Recenzja — „Rate Your Experience”

| Element | Figma | Implementacja | Powód różnicy |
|---------|-------|---------------|---------------|
| Gwiazdki (4/5) | Zgodne | Zgodne | ✅ |
| Wybór dania | Karty z checkmarkiem | Zgodne | ✅ |
| Detailed Review | Textarea | Zgodne | ✅ |
| ADD PHOTOS | Strefa z przerywaną obwódką | Zgodne + podpis „Up to 5 images” | Rozszerzenie UX |
| Submit Review | Brązowy przycisk | Zgodne + event GA | ✅ |
| Persystencja | — | Recenzja nie zapisywana w backendzie | Brak API recenzji |
| Upload zdjęć | — | Działa lokalnie (`URL.createObjectURL`) | Bez storage (Firebase Storage) |

**Co się udało:** wierny layout formularza, walidacja, wybór dania, podgląd zdjęć.  
**Co się nie udało:** trwałe przechowywanie recenzji i zdjęć.

---

### 10. DineVote — kroki 1–3

#### Krok 1: Create a Room

| Element | Figma | Implementacja | Powód różnicy |
|---------|-------|---------------|---------------|
| Layout | STEP 1 OF 3, ROOM NAME, INVITE FRIENDS | Zgodne | ✅ |
| Zaproszeni | Alex, Sarah, David ✓ · Emily ✗ | Zgodne | ✅ |
| CTA | „Next: Vote for Venue →” | Zgodne | ✅ |
| Nazwa pokoju | Placeholder „Friday Feast” | Wpisane „Spotkanie” | Lokalizacja PL na screenie |

#### Krok 2: Cravings + Vote for Venue

| Element | Figma | Implementacja | Powód różnicy |
|---------|-------|---------------|---------------|
| Karty kuchni | Italian / American / Japanese | Zgodne | ✅ |
| Badge 4/6 VOTED | Zgodny | Zgodny | ✅ |
| Lista lokali | Osteria Marco, Bar Dough, Tavernetta | Zgodne (te same nazwy) | ✅ |
| Głosowanie | Thumbs up, licznik głosów | Zgodne wizualnie | Symulacja — brak WebSocket |
| Wybrana kuchnia | Italian (Figma) | American (screen) | Różny stan wyboru użytkownika |

#### Krok 3: Find the Best Time

| Element | Figma | Implementacja | Powód różnicy |
|---------|-------|---------------|---------------|
| Kalendarz (THU–SUN) | Zgodny | Zgodny | ✅ |
| Sekcje Morning/Lunch/Dinner | Zgodne z ikonami | Zgodne | ✅ |
| Sloty z X/6 AVAILABLE | Zgodne | Zgodne | ✅ |
| Finalize Vote | Zgodny | Zgodny → `/vote/summary` | ✅ |

**Co się udało:** kompletny 3-etapowy kreator, spójny branding DineVote, nawigacja między krokami.  
**Co się nie udało:** prawdziwe głosowanie grupowe w czasie rzeczywistym (wymaga backendu + synchronizacji).

---


## Co się udało zrobić

1. **Wszystkie ekrany z prototypu** są dostępne przez React Router (12 tras) — wymaganie projektu spełnione.
2. **Design system Gourmet Minimalist** — paleta brązowo-pomarańczowa, Inter, karty z fotografią, dolna nawigacja, zaokrąglenia — utrzymana spójnie.
3. **Komponenty współdzielone** — `Button`, `Input`, `AuthCard`, `DishCard`, `Navbar` itd. ograniczają duplikację kodu.
4. **Firebase Authentication** — email/hasło + Google Sign-In z chronionymi trasami.
5. **Mapa funkcjonalna** — Leaflet z prawdziwymi restauracjami z Krakowa, filtrami i geolokalizacją (ponad makietę statyczną).
6. **Integracje analityczne** — GA4 (pageview + custom events) i Hotjar/Contentsquare.
7. **Deploy produkcyjny** — Vercel (`food-map-drab.vercel.app`).
8. **Moduł DineVote** — pełny flow 3 kroków + ekran podsumowania.
9. **Feed Activity** — wszystkie typy kart z makiet (meetup, voting, review, invite, poll).

---


## Uzasadnienia projektowe i techniczne

### Lokalizacja (Kraków, PLN)
Projekt akademicki zakładał mapę restauracji w Krakowie. Makietowe nazwy (Lumière Gastronomy, ceny w USD, dystanse w milach) zastąpiono danymi z `FoodMap-backend` (Ramen Ichiraku, Wierzynek, ceny w zł, km). To świadoma decyzja produktowa, nie oversight.

### Mapa: ilustracja vs Leaflet
Figma przedstawiała koncepcyjny widok „discovery”. Implementacja używa **Leaflet + OpenStreetMap**, co daje prawdziwą nawigację, geolokalizację i integrację z API — kosztem wizualnej zgodności z zielonym gradientem.

### Mocki zamiast backendu społecznościowego
Feed Activity, profile użytkowników, follow/message i głosowanie grupowe opierają się na statycznych danych (`MOCK_USERS`, hardcoded vote counts). Pełna synchronizacja wymagałaby WebSocket/REST z kolekcjami Firebase Firestore — poza zakresem przedmiotu od frontendu.

### Auth: Google tak, Apple nie
Firebase obsługuje Google Sign-In out-of-the-box. Apple wymaga płatnego konta Apple Developer i dodatkowej konfiguracji domeny — przycisk pozostawiono jako element UI zgodny z makietą.

### Rejestracja: Confirm Password
Makieta Sign Up ma 3 pola; implementacja dodała potwierdzenie hasła — standardowa praktyka bezpieczeństwa, niewielka rozbieżność z dokumentacją.



---

## Załącznik: mapowanie screenów

| Figma (dokumentacja) | Implementacja (README) |
|----------------------|------------------------|
| Welcome User (Unified) | `main.png` — stan niezalogowany |
| Sign Up / Login (Unified) | `register.png`, `login.png` |
| Interactive Map (Unified) | `map.png` |
| Explore Friends (Unified) | `explore.png` |
| Activity Feed (Unified) | `activity.png` |
| User Profile (Alex Mercer) | `profile.png`, `user_profile.png` |
| Restaurant Details | `restaurant1.png` |
| Full Menu | `restaurant2.png` |
| Write a Review (Unified) | `review.png` |
| DineVote Step 1–3 | `vote.png`, `vote2.png`, `vote3.png` |
| — | `profile_want_to_visit.png` (stan zakładki) |
| — | Voting Summary (brak w Figmie, brak screena w README) |
