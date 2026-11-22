package com.globalcitytours.travel;

import android.annotation.SuppressLint;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

/**
 * Loads the live Global City Tours site in a WebView.
 *
 * Behaviour kept intentionally simple so it feels native:
 *  - horizontal progress bar while pages load
 *  - back button walks the page history instead of exiting
 *  - WhatsApp / tel / mail / foreign links leave the app (external handlers)
 *  - a branded offline screen with Retry when the network is gone
 *  - About dialog credits "Powered by Sofixs"
 */
public class MainActivity extends AppCompatActivity {

    private static final String HOME_URL = "https://global-city-tours.vercel.app/";

    private WebView web;
    private ProgressBar progress;
    private View offlineView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        web = findViewById(R.id.webview);
        progress = findViewById(R.id.progress);
        offlineView = findViewById(R.id.offlineView);
        Button retry = findViewById(R.id.retryButton);

        var settings = web.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setBuiltInZoomControls(false);
        settings.setSupportZoom(false);
        settings.setMixedContentMode(android.webkit.WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setCacheMode(android.webkit.WebSettings.LOAD_DEFAULT);

        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) {
                return handleUri(req.getUrl());
            }

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                progress.setProgress(0);
                progress.setVisibility(View.VISIBLE);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                progress.setVisibility(View.INVISIBLE);
                offlineView.setVisibility(View.GONE);
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest req, android.webkit.WebResourceError err) {
                if (req.isForMainFrame()) {
                    progress.setVisibility(View.INVISIBLE);
                    offlineView.setVisibility(View.VISIBLE);
                }
            }
        });

        web.setWebChromeClient(new android.webkit.WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                progress.setProgress(newProgress);
                if (newProgress >= 100) progress.setVisibility(View.INVISIBLE);
            }
        });

        retry.setOnClickListener(v -> {
            offlineView.setVisibility(View.GONE);
            if (isOnline()) web.reload();
            else Toast.makeText(this, R.string.offline_msg, Toast.LENGTH_SHORT).show();
        });

        if (isOnline()) {
            web.loadUrl(HOME_URL);
        } else {
            offlineView.setVisibility(View.VISIBLE);
        }
    }

    /** Routes a URL either into the WebView or out to an external handler. */
    private boolean handleUri(Uri uri) {
        if (uri == null) return false;
        String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase();
        String host = uri.getHost() == null ? "" : uri.getHost().toLowerCase();

        boolean externalScheme = scheme.equals("whatsapp") || scheme.equals("tel")
                || scheme.equals("mailto") || scheme.equals("sms") || scheme.equals("intent");

        boolean sameSite = host.endsWith("global-city-tours.vercel.app")
                || host.endsWith("globalcitytours.com.np")
                || host.equals("www.google.com") && uri.getPath().startsWith("/maps");

        if (externalScheme || (!sameSite && !scheme.equals("https") && !scheme.equals("http"))) {
            openExternally(uri);
            return true;
        }
        if (!sameSite) {
            openExternally(uri);
            return true;
        }
        return false; // same site -> load inside the WebView
    }

    private void openExternally(Uri uri) {
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, uri));
        } catch (ActivityNotFoundException e) {
            Toast.makeText(this, "No app found to open this link", Toast.LENGTH_SHORT).show();
        }
    }

    private boolean isOnline() {
        var cm = (android.net.ConnectivityManager) getSystemService(CONNECTIVITY_SERVICE);
        if (cm == null) return true;
        var net = cm.getActiveNetwork();
        if (net == null) return false;
        var caps = cm.getNetworkCapabilities(net);
        return caps != null && caps.hasCapability(android.net.NetworkCapabilities.NET_CAPABILITY_INTERNET);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && web != null && web.canGoBack()) {
            web.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_about) {
            String version;
            try {
                version = getPackageManager().getPackageInfo(getPackageName(), 0).versionName;
            } catch (Exception e) {
                version = "1.0";
            }
            new AlertDialog.Builder(this)
                    .setTitle(R.string.about_title)
                    .setMessage(getString(R.string.about_body)
                            + "\n\n" + getString(R.string.version_label) + " " + version
                            + "\n" + getString(R.string.powered_by))
                    .setPositiveButton(android.R.string.ok, null)
                    .show();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
