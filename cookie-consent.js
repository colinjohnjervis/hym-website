
/* =========================
   HYM COOKIE CONSENT
========================= */

(() => {
  "use strict";

  const CONSENT_KEY = "hym_cookie_consent";
  const GA_ID = "G-T5Y1TZ7GW2";

  let analyticsLoaded = false;

  function getConsent() {
    try {
      const value = localStorage.getItem(CONSENT_KEY);

      return value === "accepted" || value === "rejected"
        ? value
        : null;
    } catch (error) {
      return null;
    }
  }

  function saveConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (error) {
      // Storage may be unavailable.
    }
  }

  function loadAnalytics() {
    if (analyticsLoaded) return;

    analyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];

    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", GA_ID);

    const script = document.createElement("script");

    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" +
      encodeURIComponent(GA_ID);

    document.head.appendChild(script);
  }

  function hideBanner() {
    const banner = document.getElementById(
      "hymCookieBanner"
    );

    if (banner) {
      banner.hidden = true;
    }
  }

  function showBanner() {
    const banner = document.getElementById(
      "hymCookieBanner"
    );

    if (banner) {
      banner.hidden = false;
    }
  }

  function setConsent(value) {
    const previousConsent = getConsent();

    saveConsent(value);
    hideBanner();

    if (value === "accepted") {
      loadAnalytics();
    } else if (previousConsent === "accepted") {
      // Reload to stop Analytics already running.
      window.location.reload();
    }
  }

  function initialiseConsent() {
    const banner = document.getElementById(
      "hymCookieBanner"
    );

    const acceptButton = document.getElementById(
      "hymCookieAccept"
    );

    const rejectButton = document.getElementById(
      "hymCookieReject"
    );

    const settingsButton = document.getElementById(
      "hymCookieSettings"
    );

    if (!banner || !acceptButton || !rejectButton) {
      return;
    }

    acceptButton.addEventListener("click", () => {
      setConsent("accepted");
    });

    rejectButton.addEventListener("click", () => {
      setConsent("rejected");
    });

    if (settingsButton) {
      settingsButton.addEventListener("click", () => {
        showBanner();
      });
    }

    const consent = getConsent();

    if (consent === "accepted") {
      hideBanner();
      loadAnalytics();
    } else if (consent === "rejected") {
      hideBanner();
    } else {
      showBanner();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initialiseConsent
    );
  } else {
    initialiseConsent();
  }
})();
