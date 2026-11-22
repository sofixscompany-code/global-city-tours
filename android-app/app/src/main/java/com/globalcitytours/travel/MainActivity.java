package com.globalcitytours.travel;

import android.annotation.SuppressLint;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Message;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;

/**
 * Loads the live Global City Tours site in a WebView.
 *
 * Behaviour kept intentionally simple so it feels native:
 *  - horizontal progress bar while pages load
 *  - back button walks the page history instead of exiting
 *  - WhatsApp / tel / mail / foreign links leave the app (external handlers),
 *    including target=_blank / window.open links (routed via onCreateWindow)
 *  - the brochure modal's PDF iframe can't render inside a WebView, so the
 *    iframe request is answered with a branded "Open brochure" panel that
 *    hands the PDF to the device's PDF viewer
 *  - a branded offline screen with Retry when the network is gone
 *  - About dialog credits "Powered by Sofixs"
 */
public class MainActivity extends AppCompatActivity {

    private static final String HOME_URL = "https://global-city-tours.vercel.app/";
    private static final String SITE_HOST = "global-city-tours.vercel.app";

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
        settings.setSupportMultipleWindows(true);
        settings.setMixedContentMode(android.webkit.WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        settings.setCacheMode(android.webkit.WebSettings.LOAD_DEFAULT);

        // PDFs (brochure) cannot render inside a WebView — hand them over.
        web.setDownloadListener((url, ua, disposition, mime, length) -> {
            android.util.Log.i("GCApp", "download: " + url + " mime=" + mime);
            if (url != null) openExternally(Uri.parse(url));
        });

        web.setWebViewClient(new WebViewClient() {

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) {
                return route(req.getUrl());
            }

            // The brochure modal embeds the PDF in an iframe. WebView has no
            // PDF engine, so answer that request with a small branded panel
            // whose button opens the PDF in the top frame (-> external viewer).
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest req) {
                String url = req.getUrl().toString();
                android.util.Log.i("GCApp", "intercept: " + url);
                if (url.contains(".pdf")) {
                    byte[] html = brochurePanel(url).getBytes(StandardCharsets.UTF_8);
                    android.util.Log.i("GCApp", "serving brochure panel");
                    return new WebResourceResponse("text/html", "utf-8",
                            new ByteArrayInputStream(html));
                }
                return super.shouldInterceptRequest(view, req);
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

            // target=_blank / window.open: capture the new window and route
            // each URL either back into this WebView or out to another app.
            @Override
            public boolean onCreateWindow(WebView view, boolean isDialog,
                                          boolean isUserGesture, Message resultMsg) {
                var transport = (WebView.WebViewTransport) resultMsg.obj;
                var probe = new WebView(view.getContext());
                probe.setWebViewClient(new WebViewClient() {
                    @Override
                    public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
                        route(r.getUrl());
                        return true;
                    }
                });
                probe.getSettings().setJavaScriptEnabled(true);
                transport.setWebView(probe);
                resultMsg.sendToTarget();
                return true;
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

    /** Decides where a URL goes: external app, PDF viewer, or this WebView. */
    private boolean route(Uri uri) {
        if (uri == null) return true;
        String scheme = uri.getScheme() == null ? "" : uri.getScheme().toLowerCase();
        String host = uri.getHost() == null ? "" : uri.getHost().toLowerCase();
        String url = uri.toString().toLowerCase();

        // PDFs always go to the device's viewer — WebView can't show them.
        if (url.contains(".pdf")) {
            openExternally(uri);
            return true;
        }

        boolean externalScheme = scheme.equals("whatsapp") || scheme.equals("tel")
                || scheme.equals("mailto") || scheme.equals("sms") || scheme.equals("intent");

        boolean sameSite = host.equals(SITE_HOST)
                || host.endsWith("." + SITE_HOST)
                || host.endsWith("globalcitytours.com.np");

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

    /** Served into the brochure modal's iframe in place of the raw PDF. */
    private String brochurePanel(String pdfUrl) {
        String safe = pdfUrl.replace("\"", "%22");
        return "<!DOCTYPE html><html><head><meta charset=\"utf-8\">"
                + "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">"
                + "<style>body{margin:0;min-height:100vh;display:flex;align-items:center;"
                + "justify-content:center;text-align:center;padding:24px;"
                + "background:linear-gradient(160deg,#062a63,#0a3a86 48%,#0f62c6);"
                + "font-family:system-ui,-apple-system,sans-serif;color:#fff}"
                + "h1{font-size:19px;margin:0 0 8px}p{font-size:14px;opacity:.85;margin:0 0 22px}"
                + "a{display:inline-block;background:#1fae4a;color:#fff;font-weight:700;"
                + "font-size:16px;padding:14px 32px;border-radius:999px;text-decoration:none}"
                + "small{display:block;margin-top:16px;opacity:.65;font-size:12px}</style></head>"
                + "<body><div><h1>Global City — Brochure</h1>"
                + "<p>3 pages · services, airlines, destinations &amp; contacts</p>"
                + "<a href=\"" + safe + "\" target=\"_top\">Open brochure</a>"
                + "<small>Opens in your PDF viewer</small></div></body></html>";
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
