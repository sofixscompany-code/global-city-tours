# Global City Tours — Google Play Store Listing

Everything you need to paste into Play Console. Package: **com.globalcitytours.travel**

---

## 1. App details

| Field | Value |
|---|---|
| App name | Global City Tours |
| Short description | Book domestic & international air tickets, hotels, tours and cargo — right from your phone. |
| Full description | see below |
| App icon | `store/icon-512.png` (512×512) |
| Feature graphic | `store/feature-graphic-1024x500.png` (1024×500) |
| Category | **Travel & Local** (primary), Maps & Navigation (secondary, optional) |
| Tags | travel, flight, ticket, tours, Nepal, Kathmandu, hotel booking, cargo |
| Content rating | Everyone |
| Website | https://global-city-tours.vercel.app/ |
| Email | globalcitytraveltours@gmail.com |
| Privacy policy URL | https://global-city-tours.vercel.app/privacy.html |

### Short description (max 80 chars)

```
Air tickets, hotels, tours & cargo from Kathmandu. 20+ airlines, one app.
```
(74 chars)

### Full description

```
Global City Tours and Travels Pvt. Ltd. — Travel Beyond Boundaries.

The official app of Global City Tours and Travels, a full-service travel
agency in Kathmandu, Nepal. Everything the office does, in your pocket.

WHAT YOU CAN DO
• Book domestic & international air tickets — 6 domestic and 14 international
  airline partners including Buddha Air, Yeti Airlines, Qatar Airways,
  Emirates, Thai Airways, IndiGo and more.
• Reserve hotels in Nepal and worldwide — budget guesthouses to 5-star stays.
• Browse holiday & tour packages — Pokhara, Chitwan, Dubai, Thailand, USA,
  Korea, Japan and 12+ destinations.
• Send cargo and courier to and from Nepal with door-to-door pickup.
• Get fare comparisons, group discounts and 24×7 re-issue support.

WHY TRAVELLERS CHOOSE US
• Competitive fares — negotiated rates with 20+ carriers
• Fast processing — tickets and vouchers in minutes
• Always reachable — phone, WhatsApp or walk-in
• Trusted & transparent — clear prices, no hidden mark-ups

ONE MESSAGE TO BOOK
Chat with us directly on WhatsApp: +977 9851150530
Call: +977 9851150530 · +977 9851450530
Email: globalcitytraveltours@gmail.com
Office: Gokarneshwor-8, Attarkhel, Kathmandu, Nepal
Hours: Sunday – Friday, 9:00 AM – 6:00 PM

The app loads our full website, so offers, packages and airline lists are
always up to date. Bookings are completed over WhatsApp — no account needed.

Powered by Sofixs.
```

---

## 2. Screenshots (minimum 2, phone)

Upload from `store/screenshots/` (see README there). Required: at least
**2 phone screenshots** (16:9 or 9:16, min 1080 px on the shortest side).
If you don't have them yet: sideload the APK on your phone (steps in
`UPLOAD-GUIDE.md`), open the app, take 2 screenshots of the site inside it,
and upload those.

Tablet screenshots are optional.

---

## 3. Upload steps (summary — full detail in UPLOAD-GUIDE.md)

1. Play Console → **All apps → Create app** → name "Global City Tours",
   app (free), platform Android.
2. **Set up your app** (store listing, content rating, privacy, target
   audience, app access) — paste text from this file.
3. **Production → Create new release → Upload** `app/build/outputs/bundle/release/app-release.aab`.
4. Sign in to the release with the upload key (Play Console shows the
   SHA-256; it must match the fingerprint of `keystore/upload.jks`).
5. Review → **Roll out to production**.

---

## 4. Signing key fingerprint (for Play Console "App signing key request" page)

Play Console will ask to verify your **upload key**. Use:

```
SHA-256: 3B:F2:A4:DC:AA:7D:1A:A7:44:09:D9:0D:CC:FC:CB:AC:F2:06:CF:76:10:31:5F:0C:06:15:9D:33:B9:D6:2D:68
```

Credentials are in `android-app/keystore.properties` (git-ignored):
storepass / keypass = `GlobalCity@2026`, alias = `upload`.

**Keep `keystore/upload.jks` backed up somewhere safe** — without it you
cannot update the app later.
