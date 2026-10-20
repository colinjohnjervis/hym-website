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

function showHymSuccess(form) {
  if (!form || form.dataset.hymSuccess === "true") {
    return;
  }

  form.dataset.hymSuccess = "true";

  /*
    Hide everything currently inside the pink box.
    Remember each element's original display value so
    it can be restored when the confirmation is closed.
  */

  const originalChildren = Array.from(form.children);

  originalChildren.forEach(element => {
    element.dataset.hymOriginalDisplay =
      element.style.display || "";

    element.style.setProperty(
      "display",
      "none",
      "important"
    );
  });


  /* CREATE SUCCESS SCREEN */

  const success = document.createElement("div");

  success.className = "hym-success-panel";

  success.style.cssText = `
    position:relative;
    width:100%;
    min-height:330px;
    padding:40px 20px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
    background:#25282b;
  `;


  /* CLOSE BUTTON */

  const closeButton =
    document.createElement("button");

  closeButton.type = "button";
  closeButton.setAttribute(
    "aria-label",
    "Close confirmation"
  );

  closeButton.innerHTML = "&times;";

  closeButton.style.cssText = `
    position:absolute;
    top:0;
    right:0;
    z-index:10;
    width:44px;
    height:44px;
    padding:0;
    display:flex;
    align-items:center;
    justify-content:center;
    color:#fff;
    background:transparent;
    border:0;
    font-family:Arial,Helvetica,sans-serif;
    font-size:38px;
    font-weight:300;
    line-height:1;
    cursor:pointer;
    appearance:none;
    -webkit-appearance:none;
  `;


  /* SUCCESS HEADING */

  const title =
    document.createElement("div");

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

  const message =
    document.createElement("p");

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

  const inboxMessage =
    document.createElement("p");

  inboxMessage.textContent =
    "Check your inbox for a welcome email.";

  inboxMessage.style.cssText = `
    max-width:520px;
    margin:0 auto;
    color:rgba(255,255,255,.72);
    font-family:'Inter',Arial,Helvetica,sans-serif;
    font-size:.9rem;
    font-weight:400;
    line-height:1.6;
    text-align:center;
  `;


  /* BUILD SUCCESS SCREEN */

  success.appendChild(closeButton);
  success.appendChild(title);
  success.appendChild(message);
  success.appendChild(inboxMessage);

  form.appendChild(success);


  /* CLOSE AND RESTORE FORM */

  closeButton.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();

    success.remove();

    originalChildren.forEach(element => {
      const originalDisplay =
        element.dataset.hymOriginalDisplay || "";

      element.style.removeProperty("display");

      if (originalDisplay) {
        element.style.display = originalDisplay;
      }

      delete element.dataset.hymOriginalDisplay;
    });

    form.dataset.hymSuccess = "false";
  });
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
    const text = wrapper.textContent
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    if (text.includes("thanks for subscribing")) {
      showHymSuccess(form);
      return true;
    }

    return false;
  };

  const successObserver =
    new MutationObserver(() => {
      checkForSuccess();
    });

  successObserver.observe(wrapper, {
    childList:true,
    subtree:true,
    characterData:true
  });

  checkForSuccess();
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


  /* MOVE INTRO TEXT INSIDE FORM */

  if (introCopy) {
    form.insertBefore(
      introCopy,
      form.firstElementChild
    );
  }


  /* STYLE INPUTS */

  emailInput.classList.add(
    "mailing-list-input"
  );

  locationInput.classList.add(
    "mailing-list-input",
    "mailing-list-location"
  );


  /* REMOVE PREVIOUS HELPER */

  form
    .querySelectorAll(".hym-eo-helper")
    .forEach(element => element.remove());


  /* ADD TOWN / CITY HELPER */

  const helper =
    document.createElement("p");

  helper.className =
    "mailing-list-location-copy hym-eo-helper";

  helper.textContent =
    "Tell us where you are and help us plan where to play next.";

  locationInput.insertAdjacentElement(
    "afterend",
    helper
  );


  /* HIDE EMAILOCTOPUS BUTTON */

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


  /* WATCH FOR GENUINE EMAILOCTOPUS SUCCESS */

  watchForEmailOctopusSuccess(
    wrapper,
    form
  );


  /* USE EMAILOCTOPUS SUBMISSION */

  hymButton.addEventListener(
    "click",
    () => {
      if (
        typeof form.reportValidity === "function" &&
        !form.reportValidity()
      ) {
        return;
      }

      realSubmit.click();
    }
  );


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
