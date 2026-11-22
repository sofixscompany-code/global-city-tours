# Global City Tours — Android WebView App

Native Android shell around the live site at
https://global-city-tours.vercel.app/ — package `com.globalcitytours.travel`.

## What's in the app

- **Splash screen** — logo, app name, tagline and *Powered by Sofixs* credit
- **WebView** — loads the full responsive site (JS + DOM storage on, hardware
  accelerated), so content updates on the website appear in the app instantly
- **Back button** walks page history (exits only from the home page)
- **Horizontal progress bar** while pages load
- **Offline screen** with Retry when there's no connection
- **External link routing** — WhatsApp / `wa.me`, `tel:`, `mailto:` and any
  non-site URL opens in the matching Android app (WhatsApp, dialer, mail)
- **About dialog** (overflow menu) with version + *Powered by Sofixs*

## Build

Requirements: JDK 17, Android SDK (compileSdk 36), network for first Gradle run.

```powershell
cd android-app
.\gradlew.bat assembleRelease     # signed APK → app\build\outputs\apk\release\
.\gradlew.bat bundleRelease       # signed AAB → app\build\outputs\bundle\release\
```

Signing reads `keystore.properties` (git-ignored) → `keystore/upload.jks`
(git-ignored). Both must stay backed up: the upload key cannot be regenerated.

## Play Store

- Listing copy → [`STORE-LISTING.md`](STORE-LISTING.md)
- Step-by-step upload → [`UPLOAD-GUIDE.md`](UPLOAD-GUIDE.md)
- Assets → `store/` (icon-512, feature graphic, screenshots)

## Stack

Plain Java (no Kotlin), AppCompat only, Gradle 9.3.1 + AGP 9.1.1, minSdk 24 /
targetSdk 36, R8 minify + resource shrinking on.
