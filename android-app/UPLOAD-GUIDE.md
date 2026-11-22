# Play Console Upload Guide — Global City Tours

Step-by-step: from the finished AAB to the live Play Store listing.
Everything you paste is already prepared in `STORE-LISTING.md`.

---

## Step 0 — What you need (all ready in `android-app/`)

| Item | Where |
|---|---|
| Signed AAB (upload this) | `app/build/outputs/bundle/release/app-release.aab` |
| Signed APK (sideload / test) | `app/build/outputs/apk/release/app-release.apk` |
| App icon 512×512 | `store/icon-512.png` |
| Feature graphic 1024×500 | `store/feature-graphic-1024x500.png` |
| Listing text | `STORE-LISTING.md` |
| Upload key + passwords | `keystore.properties` (git-ignored) |
| Upload key SHA-256 | `3B:F2:A4:DC:AA:7D:1A:A7:44:09:D9:0D:CC:FC:CB:AC:F2:06:CF:76:10:31:5F:0C:06:15:9D:33:B9:D6:2D:68` |

**Screenshots:** Play needs ≥2 phone screenshots. Quickest path — install
`app-release.apk` on your Android phone (see Step 5), open the app, take 2
screenshots of different sections of the site, transfer them to your PC.

---

## Step 1 — Create the app in Play Console

1. Go to https://play.google.com/console → sign in with your developer account.
2. **All apps → Create app**.
3. Fill in:
   - App name: `Global City Tours`
   - Default language: English (United States)
   - Free app / Paid: **Free**
   - App or game: **App**
   - Declarations: check both boxes → **Create account**.
4. (One-time) Accept the Play Console Developer Distribution Agreement.

## Step 2 — Set up the app (left menu checklist)

Play walks you through 4 tasks. Use `STORE-LISTING.md` for all text:

1. **App details** — short + full description, category *Travel & Local*,
   contact email, website `https://global-city-tours.vercel.app/`.
2. **App content** — content rating questionnaire (tick *Yes, my app contains
   material from the categories shown...* → answer mostly "No"; expected
   rating: **Everyone**), privacy policy URL, target audience (all ages),
   news apps / ads declarations (ads: **No**), app access (choose *No login
   required* — the site opens without signing in).
3. **Store listing** — upload:
   - App icon → `store/icon-512.png`
   - Feature graphic → `store/feature-graphic-1024x500.png`
   - Phone screenshots → at least 2 (see Step 5)
4. **Accounts & access** — testers/production access (can skip for now).

> Store listing can also be edited later under **Grow → Store presence →
> Main store listing**.

## Step 3 — App signing

Play Console → **Setup → App integrity → App signing key** page:

- Play creates its own **app signing key** automatically on first release.
- You upload with your **upload key** (`keystore/upload.jks`).
- If the page asks to verify your upload key (SHA-256), enter:

```
3B:F2:A4:DC:AA:7D:1A:A7:44:09:D9:0D:CC:FC:CB:AC:F2:06:CF:76:10:31:5F:0C:06:15:9D:33:B9:D6:2D:68
```

## Step 4 — Upload the AAB

1. **Production → Releases → Create new release**.
2. Under **App bundles**, click **Upload** → choose
   `app/build/outputs/bundle/release/app-release.aab`.
3. Name the release, e.g. `1.0 (1)`.
4. Release notes:
   ```
   Initial release — air ticketing, hotels, tours and cargo from Global City Tours and Travels.
   ```
5. Play validates the AAB (a few minutes). Fix any errors it reports.
6. **Review release → Start rollout to production**.

First-time note: for a brand-new personal developer account Google may hold
the first release for **up to 14 days** (verification). This is normal.

## Step 5 — Sideload the APK on your phone (for screenshots / testing)

```
adb install -r app\build\outputs\apk\release\app-release.apk
```
Or copy `app-release.apk` to the phone → tap it → allow "install from unknown
sources". Open **Global City Tours**, wait for the site to load, screenshot it.

## Step 6 — After it's live

- Store listing link will be `https://play.google.com/store/apps/details?id=com.globalcitytours.travel`
- Any site update (content, brochure, photos) goes live instantly — the app
  loads the website, no new APK needed.
- App updates (icon, splash, features): bump `versionCode` in
  `app/build.gradle.kts`, run `gradlew.bat bundleRelease`, upload the new AAB
  as a new release.

---

## Rebuild commands (from `android-app/`)

```powershell
.\gradlew.bat assembleRelease     # APK  → app\build\outputs\apk\release\
.\gradlew.bat bundleRelease       # AAB  → app\build\outputs\bundle\release\
```

Signed automatically via `keystore.properties`. Never delete
`keystore/upload.jks` — it is required for every future update.
