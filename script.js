const menuButton = document.getElementById("menuButton");
const navPanel = document.getElementById("navPanel");
const navLinks = document.querySelectorAll(".nav-links a");

function closeMenu() {
  navPanel.classList.remove("open");
  menuButton.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
}

menuButton.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("open");

  menuButton.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close menu" : "Open menu"
  );
});

navLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});


/* EMAILOCTOPUS MAILING LIST */


/* HIDE EMAILOCTOPUS WEBSITE ATTRIBUTION */

function hideEmailOctopusBranding() {
  const formWrapper =
    document.querySelector(".emailoctopus-form");

  const form =
    formWrapper
      ? formWrapper.querySelector("form")
      : null;

  const links = Array.from(
    document.querySelectorAll("a")
  );

  const emailOctopusLink = links.find(link => {
    const text = (link.textContent || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    const href = (link.getAttribute("href") || "")
      .toLowerCase();

    return (
      text.includes("emailoctopus") ||
      href.includes("emailoctopus")
    );
  });

  if (!emailOctopusLink) {
    return false;
  }

  let branding = emailOctopusLink;
  let current = emailOctopusLink;

  for (let i = 0; i < 6; i++) {
    const parent = current.parentElement;

    if (!parent) {
      break;
    }

    if (
      parent === form ||
      parent === formWrapper ||
      (form && parent.contains(form))
    ) {
      break;
    }

    const text = (parent.textContent || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    const looksLikeBranding =
      text.includes("emailoctopus") &&
      text.length < 100;

    if (!looksLikeBranding) {
      break;
    }

    branding = parent;
    current = parent;
  }

  branding.style.setProperty(
    "display",
    "none",
    "important"
  );

  branding.style.setProperty(
    "visibility",
    "hidden",
    "important"
  );

  branding.style.setProperty(
    "height",
    "0",
    "important"
  );

  branding.style.setProperty(
    "min-height",
    "0",
    "important"
  );

  branding.style.setProperty(
    "max-height",
    "0",
    "important"
  );

  branding.style.setProperty(
    "margin",
    "0",
    "important"
  );

  branding.style.setProperty(
    "padding",
    "0",
    "important"
  );

  branding.style.setProperty(
    "overflow",
    "hidden",
    "important"
  );

  return true;
}


function freezeHymForm(form) {
  if (!form || form.dataset.hymFrozen === "true") {
    return;
  }

  const height = form.getBoundingClientRect().height;

  form.dataset.hymFrozen = "true";

  form.style.setProperty(
    "height",
    `${height}px`,
    "important"
  );

  form.style.setProperty(
    "min-height",
    `${height}px`,
    "important"
  );

  form.style.setProperty(
    "max-height",
    `${height}px`,
    "important"
  );

  form.style.setProperty(
    "overflow",
    "hidden",
    "important"
  );
}


function findEmailOctopusSuccess(wrapper, form) {
  const elements = Array.from(
    wrapper.querySelectorAll("*")
  );

  return elements.find(element => {
    if (
      element === form ||
      form.contains(element) ||
      element.classList.contains("hym-success-panel")
    ) {
      return false;
    }

    const ownText = Array.from(element.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    return ownText.includes(
      "thanks for subscribing"
    );
  });
}


function hideEmailOctopusSuccess(element) {
  if (!element) {
    return;
  }

  element.style.setProperty(
    "display",
    "none",
    "important"
  );

  element.style.setProperty(
    "height",
    "0",
    "important"
  );

  element.style.setProperty(
    "min-height",
    "0",
    "important"
  );

  element.style.setProperty(
    "margin",
    "0",
    "important"
  );

  element.style.setProperty(
    "padding",
    "0",
    "important"
  );

  element.style.setProperty(
    "overflow",
    "hidden",
    "important"
  );
}


function showHymSuccess(form) {
  if (!form || form.dataset.hymSuccess === "true") {
    return;
  }

  form.dataset.hymSuccess = "true";


  /* HIDE ORIGINAL FORM CONTENT */

  Array.from(form.children).forEach(element => {
    element.style.setProperty(
      "display",
      "none",
      "important"
    );
  });


  /* CREATE HYM SUCCESS SCREEN */

  const success = document.createElement("div");

  success.className = "hym-success-panel";

  success.style.setProperty(
    "position",
    "absolute",
    "important"
  );

  success.style.setProperty(
    "inset",
    "0",
    "important"
  );

  success.style.setProperty(
    "width",
    "100%",
    "important"
  );

  success.style.setProperty(
    "height",
    "100%",
    "important"
  );

  success.style.setProperty(
    "padding",
    "30px",
    "important"
  );

  success.style.setProperty(
    "display",
    "flex",
    "important"
  );

  success.style.setProperty(
    "flex-direction",
    "column",
    "important"
  );

  success.style.setProperty(
    "align-items",
    "center",
    "important"
  );

  success.style.setProperty(
    "justify-content",
    "center",
    "important"
  );

  success.style.setProperty(
    "text-align",
    "center",
    "important"
  );

  success.style.setProperty(
    "background",
    "#25282b",
    "important"
  );


  /* SUCCESS HEADING */

  const title = document.createElement("div");

  title.className =
    "slice-heading hym-success-title";

  title.style.cssText = `
    width:100%;
    margin:0 auto 28px;
    font-size:48px;
    line-height:52px;
  `;

  title.innerHTML = `
    <span
      data-text="YOU'RE IN!"
      style="min-height:52px;"
    >
      YOU'RE IN!
    </span>
  `;


  /* SUCCESS COPY */

  const message = document.createElement("p");

  message.textContent =
    "Thanks for subscribing to Holy Youth Movement.";

  message.style.cssText = `
    max-width:520px;
    margin:0 auto 12px;
    color:#fff;
    font-family:'Inter',Arial,Helvetica,sans-serif;
    font-size:1rem;
    font-weight:400;
    line-height:1.6;
    text-align:center;
  `;


  /* INBOX MESSAGE */

  const inboxMessage = document.createElement("p");

  inboxMessage.textContent =
    "Check your inbox for a welcome email.";

  inboxMessage.style.cssText = `
    max-width:520px;
    margin:0 auto 12px;
    color:#fff;
    font-family:'Inter',Arial,Helvetica,sans-serif;
    font-size:1rem;
    font-weight:400;
    line-height:1.6;
    text-align:center;
  `;


  /* JUNK / SPAM MESSAGE */

  const spamMessage = document.createElement("p");

  spamMessage.textContent =
    "Can't find it? Check your junk or spam folder and add hello@holyyouthmovement.co.uk to your contacts to help ensure you don't miss future updates.";

  spamMessage.style.cssText = `
    max-width:520px;
    margin:0 auto;
    color:#fff;
    font-family:'Inter',Arial,Helvetica,sans-serif;
    font-size:1rem;
    font-weight:400;
    line-height:1.6;
    text-align:center;
  `;


  /* BUILD SUCCESS SCREEN */

  success.appendChild(title);
  success.appendChild(message);
  success.appendChild(inboxMessage);
  success.appendChild(spamMessage);

  form.appendChild(success);
}


function watchForEmailOctopusSuccess(wrapper, form) {
  if (
    !wrapper ||
    wrapper.dataset.hymSuccessWatch === "true"
  ) {
    return;
  }

  wrapper.dataset.hymSuccessWatch = "true";

  const checkForSuccess = () => {
    hideEmailOctopusBranding();

    if (form.dataset.hymSubmitted !== "true") {
      return;
    }

    const nativeSuccess =
      findEmailOctopusSuccess(wrapper, form);

    if (!nativeSuccess) {
      return;
    }

    hideEmailOctopusSuccess(nativeSuccess);

    showHymSuccess(form);
  };


  const observer = new MutationObserver(() => {
    checkForSuccess();
  });

  observer.observe(wrapper, {
    childList:true,
    subtree:true,
    characterData:true
  });
}


function enhanceEmailOctopusForm() {
  const wrapper =
    document.querySelector(".emailoctopus-form");

  if (
    !wrapper ||
    wrapper.dataset.hymEnhanced === "true"
  ) {
    return false;
  }

  const form = wrapper.querySelector("form");

  if (!form) {
    return false;
  }

  const introCopy =
    document.querySelector(".mailing-list-copy");

  const emailInput =
    form.querySelector('input[type="email"]');

  const textInputs = Array.from(
    form.querySelectorAll('input[type="text"]')
  );

  const locationInput =
    textInputs.find(input =>
      (input.placeholder || "")
        .toLowerCase()
        .includes("town")
    ) || textInputs[0];

  const submitControls = Array.from(
    form.querySelectorAll(
      'button, input[type="submit"]'
    )
  );

  const realSubmit =
    submitControls.find(control => {
      const text =
        control.textContent ||
        control.value ||
        "";

      return text
        .trim()
        .toLowerCase()
        .includes("subscribe");
    }) || submitControls[0];

  if (
    !emailInput ||
    !locationInput ||
    !realSubmit
  ) {
    return false;
  }

  form.classList.add(
    "hym-emailoctopus-form"
  );

  form.style.setProperty(
    "position",
    "relative",
    "important"
  );


  /* MOVE INTRO TEXT INSIDE FORM */

  if (introCopy) {
    form.insertBefore(
      introCopy,
      form.firstElementChild
    );
  }


  /* EMAIL FIELD */

  emailInput.classList.add(
    "mailing-list-input"
  );

  emailInput.setAttribute(
    "autocomplete",
    "email"
  );

  emailInput.setAttribute(
    "inputmode",
    "email"
  );

  emailInput.setAttribute(
    "autocapitalize",
    "none"
  );

  emailInput.setAttribute(
    "autocorrect",
    "off"
  );

  emailInput.setAttribute(
    "spellcheck",
    "false"
  );


  /* TOWN / CITY FIELD */

  locationInput.classList.add(
    "mailing-list-input",
    "mailing-list-location"
  );

  locationInput.setAttribute(
    "autocomplete",
    "address-level2"
  );

  locationInput.setAttribute(
    "autocorrect",
    "off"
  );

  locationInput.setAttribute(
    "spellcheck",
    "false"
  );


  /* REMOVE PREVIOUS HELPER */

  form
    .querySelectorAll(".hym-eo-helper")
    .forEach(element => element.remove());


  /* ADD TOWN / CITY HELPER */

  const helper = document.createElement("p");

  helper.className =
    "mailing-list-location-copy hym-eo-helper";

  helper.textContent =
    "Tell us where you are and help us plan where to play next.";

  locationInput.insertAdjacentElement(
    "afterend",
    helper
  );


  /* HIDE EMAILOCTOPUS ORIGINAL BUTTON */

  realSubmit.style.setProperty(
    "display",
    "none",
    "important"
  );

  realSubmit.style.setProperty(
    "visibility",
    "hidden",
    "important"
  );

  realSubmit.setAttribute(
    "aria-hidden",
    "true"
  );


  /* REMOVE PREVIOUS HYM BUTTON */

  form
    .querySelectorAll(".hym-eo-button-wrap")
    .forEach(element => element.remove());


  /* CREATE CENTRED BUTTON WRAPPER */

  const buttonWrap =
    document.createElement("div");

  buttonWrap.className =
    "hym-eo-button-wrap";

  buttonWrap.style.setProperty(
    "width",
    "100%",
    "important"
  );

  buttonWrap.style.setProperty(
    "display",
    "flex",
    "important"
  );

  buttonWrap.style.setProperty(
    "justify-content",
    "center",
    "important"
  );

  buttonWrap.style.setProperty(
    "align-items",
    "center",
    "important"
  );

  buttonWrap.style.setProperty(
    "margin-top",
    "28px",
    "important"
  );


  /* CREATE HYM SUBSCRIBE BUTTON */

  const hymButton =
    document.createElement("button");

  hymButton.type = "button";

  hymButton.className =
    "hym-button mailing-list-button hym-eo-submit";

  hymButton.setAttribute(
    "aria-label",
    "Subscribe to the Holy Youth Movement mailing list"
  );

  hymButton.style.setProperty(
    "margin",
    "0",
    "important"
  );

  hymButton.innerHTML = `
    <svg
      class="hym-button-icon"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="22"
        height="18"
        rx="2"
        stroke="currentColor"
        stroke-width="2"
      />
      <path
        d="M2 3L12 11L22 3"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <span
      class="hym-button-text"
      data-text="SUBSCRIBE"
    >
      SUBSCRIBE
    </span>
  `;

  buttonWrap.appendChild(hymButton);

  helper.insertAdjacentElement(
    "afterend",
    buttonWrap
  );


  /* HIDE WEBSITE ATTRIBUTION */

  hideEmailOctopusBranding();


  /* WATCH EMAILOCTOPUS */

  watchForEmailOctopusSuccess(
    wrapper,
    form
  );


  /* SUBMIT */

  hymButton.addEventListener("click", () => {
    if (
      typeof form.reportValidity === "function" &&
      !form.reportValidity()
    ) {
      return;
    }

    freezeHymForm(form);

    form.dataset.hymSubmitted = "true";

    realSubmit.click();
  });


  wrapper.dataset.hymEnhanced = "true";

  return true;
}


/* WAIT FOR EMAILOCTOPUS TO LOAD */

if (!enhanceEmailOctopusForm()) {
  const emailOctopusObserver =
    new MutationObserver(() => {
      if (enhanceEmailOctopusForm()) {
        emailOctopusObserver.disconnect();
      }
    });

  emailOctopusObserver.observe(
    document.body,
    {
      childList:true,
      subtree:true
    }
  );
}


/* CATCH LATE EMAILOCTOPUS ATTRIBUTION */

let brandingChecks = 0;

const brandingTimer = setInterval(() => {
  hideEmailOctopusBranding();

  brandingChecks += 1;

  if (brandingChecks >= 20) {
    clearInterval(brandingTimer);
  }
}, 250);
