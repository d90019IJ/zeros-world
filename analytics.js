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

  // These events describe outbound intent, never a confirmed follow or contact.
  // Report social_click alone; do not add native Enhanced Measurement click totals.
  // In GA4, turn off Outbound clicks before enabling profile URLs if those URLs
  // contain account IDs: the native click event can collect the full destination.
  const socialHosts = {
    instagram: ["instagram.com"],
    threads: ["threads.net", "threads.com"],
    line: ["line.me", "lin.ee"]
  };
  const seenEvents = new WeakSet();
  const trackSocialClick = event => {
    if (event.defaultPrevented || seenEvents.has(event)) return;
    if (event.type === "click" && event.button !== 0) return;
    if (event.type === "auxclick" && event.button !== 1) return;
    const anchor = event.target?.closest?.("a[data-social-platform][data-link-location]");
    if (!anchor || anchor.getAttribute("aria-disabled") === "true") return;
    const platform = anchor.dataset.socialPlatform;
    if (!Object.hasOwn(socialHosts, platform) || anchor.dataset.linkLocation !== "home_connect") return;
    try {
      const destination = new URL(anchor.href);
      const allowedHost = socialHosts[platform].some(host =>
        destination.hostname === host || destination.hostname.endsWith("." + host));
      if (destination.protocol !== "https:" || !allowedHost) return;
      seenEvents.add(event);
      window.gtag("event", "social_click", {
        send_to: measurementId,
        social_platform: platform,
        // Origin only: no profile handles, LINE IDs, queries, fragments or credentials.
        link_url: destination.origin + "/",
        link_location: "home_connect",
        page_location: location.origin + location.pathname
      });
    } catch {
      // Analytics must never prevent normal navigation, even when unavailable.
    }
  };
  document.addEventListener("click", trackSocialClick);
  document.addEventListener("auxclick", trackSocialClick);
})();
