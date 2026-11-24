/* GA4 public Measurement ID. Local previews never send analytics events. */
(() => {
  "use strict";

  const measurementId = "G-DWH59HHHK6";
  const isPublicSite = location.hostname === "d90019ij.github.io"
    && location.pathname.startsWith("/zeros-world/");

  if (!isPublicSite || !/^G-[A-Z0-9]+$/.test(measurementId)) return;
  if (window.ZERO_ANALYTICS_STARTED) return;
  window.ZERO_ANALYTICS_STARTED = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
  document.head.append(script);
})();
