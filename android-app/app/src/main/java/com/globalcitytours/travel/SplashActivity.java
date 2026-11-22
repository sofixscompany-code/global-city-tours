package com.globalcitytours.travel;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.WindowCompat;

/**
 * Branded splash — shows the emblem, the app name and the "Powered by Sofixs"
 * credit, then hands over to the WebView. Deliberately short so the app feels
 * instant.
 */
public class SplashActivity extends AppCompatActivity {

    private static final long SPLASH_MS = 1400;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private final Runnable go = () -> {
        if (!isFinishing() && !isDestroyed()) {
            startActivity(new Intent(SplashActivity.this, MainActivity.class));
            overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);
            finish();
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Keep the app out of the status/navigation bar area so the net/wifi
        // icons never overlap the splash content on edge-to-edge devices.
        WindowCompat.setDecorFitsSystemWindows(getWindow(), true);
        setContentView(R.layout.activity_splash);
        handler.postDelayed(go, SPLASH_MS);
    }

    @Override
    protected void onDestroy() {
        handler.removeCallbacks(go);
        super.onDestroy();
    }
}
