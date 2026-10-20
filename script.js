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

function enhanceEmailOctopusForm() {
  const wrapper = document.querySelector(".emailoctopus-form");

  if (!wrapper || wrapper.dataset.hymEnhanced === "true") {
    return false;
  }

  const form = wrapper.querySelector("form");

  if (!form) {
    return false;
  }

  const introCopy = document.querySelector(".mailing-list-copy");

  const emailInput = form.querySelector('input[type="email"]');

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

  const realSubmit = submitControls.find(control => {
    const text =
      control.textContent ||
      control.value ||
      "";

    return text
      .trim()
      .toLowerCase()
      .includes("subscribe");
  }) || submitControls[0];

  if (!emailInput || !locationInput || !realSubmit) {
    return false;
  }

  form.classList.add("hym-emailoctopus-form");


  /* MOVE INTRO COPY INSIDE THE PINK BOX */

  if (introCopy) {
    form.insertBefore(
      introCopy,
      form.firstElementChild
    );
  }


  /* STYLE EMAILOCTOPUS FIELDS */

  emailInput.classList.add("mailing-list-input");

  locationInput.classList.add(
    "mailing-list-input",
    "mailing-list-location"
  );


  /* REMOVE ANY PREVIOUS HELPER */

  form
    .querySelectorAll(".hym-eo-helper")
    .forEach(element => element.remove());


  /* ADD HYM TOWN/CITY HELPER */

  const helper = document.createElement("p");

  helper.className =
    "mailing-list-location-copy hym-eo-helper";

  helper.textContent =
    "Tell us where you are and help us plan where to play next.";

  locationInput.insertAdjacentElement(
    "afterend",
    helper
  );


  /* HIDE EMAILOCTOPUS'S ORIGINAL BUTTON */

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


  /* REMOVE ANY PREVIOUS HYM BUTTON */

  form
    .querySelectorAll(".hym-eo-submit")
    .forEach(element => element.remove());


  /* CREATE HYM SUBSCRIBE BUTTON */

  const hymButton = document.createElement("button");

  hymButton.type = "button";

  hymButton.className =
    "hym-button mailing-list-button hym-eo-submit";

  hymButton.setAttribute(
    "aria-label",
    "Subscribe to the Holy Youth Movement mailing list"
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


  /* CENTRE BUTTON BELOW HELPER TEXT */

  hymButton.style.setProperty(
    "align-self",
    "center",
    "important"
  );

  helper.insertAdjacentElement(
    "afterend",
    hymButton
  );


  /* USE EMAILOCTOPUS'S REAL SUBMIT MECHANISM */

  hymButton.addEventListener("click", () => {
    if (
      typeof form.reportValidity === "function" &&
      !form.reportValidity()
    ) {
      return;
    }

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
      childList: true,
      subtree: true
    }
  );
}
