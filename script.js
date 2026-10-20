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
  if (
    !form ||
    form.querySelector(".hym-success-panel")
  ) {
    return;
  }

  form.style.setProperty(
    "position",
    "relative",
    "important"
  );

  const panel = document.createElement("div");

  panel.className = "hym-success-panel";

  panel.style.cssText = `
    position:absolute;
    inset:0;
    z-index:50;
    min-height:100%;
    padding:45px 30px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background:#25282b;
    border:0;
    text-align:center;
  `;

  panel.innerHTML = `
    <button
      type="button"
      class="hym-success-close"
      aria-label="Close confirmation"
      style="
        position:absolute;
        top:14px;
        right:16px;
        width:42px;
        height:42px;
        padding:0;
        display:flex;
        align-items:center;
        justify-content:center;
        color:#fff;
        background:transparent;
        border:0;
        font-size:36px;
        font-weight:300;
        line-height:1;
        cursor:pointer;
      "
    >
      &times;
    </button>

    <div
      class="slice-heading hym-success-title"
      style="
        width:100%;
        margin:0 auto 24px;
        font-size:48px;
        line-height:52px;
      "
    >
      <span
        data-text="YOU'RE IN!"
        style="min-height:52px;"
      >
        YOU'RE IN!
      </span>
    </div>

    <p
      style="
        max-width:520px;
        margin:0 auto 12px;
        color:#fff;
        font-family:'Inter',Arial,Helvetica,sans-serif;
        font-size:1rem;
        font-weight:400;
        line-height:1.6;
        text-align:center;
      "
    >
      Thanks for subscribing to Holy Youth Movement.
    </p>

    <p
      style="
        max-width:520px;
        margin:0 auto;
        color:rgba(255,255,255,.72);
        font-family:'Inter',Arial,Helvetica,sans-serif;
        font-size:.9rem;
        font-weight:400;
        line-height:1.6;
        text-align:center;
      "
    >
      Check your inbox for a welcome email.
    </p>
  `;

  form.appendChild(panel);

  const closeButton =
    panel.querySelector(".hym-success-close");

  closeButton.addEventListener("click", () => {
    panel.remove();
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

  const successObserver =
    new MutationObserver(() => {
      const text =
        wrapper.textContent
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase();

      if (
        text.includes("thanks for subscribing")
      ) {
        showHymSuccess(form);
      }
    });

  successObserver.observe(
    wrapper,
    {
      childList:true,
      subtree:true,
      characterData:true
    }
  );
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


  /* WATCH FOR A REAL SUCCESS RESPONSE */

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
