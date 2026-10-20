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


/* EMAILOCTOPUS MAILING LIST ENHANCEMENT */

function enhanceEmailOctopusForm() {
  const wrapper = document.querySelector(".emailoctopus-form");

  if (!wrapper || wrapper.dataset.hymEnhanced === "true") {
    return false;
  }

  const form = wrapper.querySelector("form");

  if (!form) {
    return false;
  }

  const emailInput = form.querySelector('input[type="email"]');

  const textInputs = Array.from(
    form.querySelectorAll('input[type="text"]')
  );

  const locationInput =
    textInputs.find(input =>
      (input.placeholder || "")
        .toLowerCase()
        .includes("town")
    ) ||
    textInputs[0];

  const realButton =
    form.querySelector('button[type="submit"]') ||
    form.querySelector('input[type="submit"]') ||
    form.querySelector("button");

  if (!emailInput || !locationInput || !realButton) {
    return false;
  }


  /* Add our own classes to EmailOctopus's real fields */

  emailInput.classList.add("mailing-list-input");

  locationInput.classList.add(
    "mailing-list-input",
    "mailing-list-location"
  );


  /* Helper text */

  const helper = document.createElement("p");

  helper.className = "mailing-list-location-copy hym-eo-helper";
  helper.textContent =
    "Tell us where you are and help us plan where to play next.";

  locationInput.insertAdjacentElement("afterend", helper);


  /* Preserve EmailOctopus's real submit button */

  realButton.classList.add("hym-eo-real-submit");


  /*
    Create the HYM visual button.
    Clicking it triggers EmailOctopus's genuine submit button,
    so EmailOctopus still handles the actual subscription.
  */

  const hymButton = document.createElement("button");

  hymButton.type = "button";
  hymButton.className =
    "hym-button mailing-list-button hym-eo-submit";

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

  hymButton.addEventListener("click", () => {
    if (typeof form.requestSubmit === "function") {
      form.requestSubmit(realButton);
    } else {
      realButton.click();
    }
  });

  realButton.insertAdjacentElement("afterend", hymButton);


  /*
    Add one class to the genuine EmailOctopus form so our
    stylesheet can reproduce the original HYM container.
  */

  form.classList.add("hym-emailoctopus-form");

  wrapper.dataset.hymEnhanced = "true";

  return true;
}


/*
  EmailOctopus loads asynchronously, so its form may not exist
  when our own script first runs. Watch the page until it appears.
*/

if (!enhanceEmailOctopusForm()) {
  const emailOctopusObserver = new MutationObserver(() => {
    if (enhanceEmailOctopusForm()) {
      emailOctopusObserver.disconnect();
    }
  });

  emailOctopusObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
}
