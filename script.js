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


  /*
    Mark the genuine EmailOctopus form.
  */

  form.classList.add("hym-emailoctopus-form");


  /*
    Style the genuine EmailOctopus fields using
    our existing HYM field classes.
  */

  emailInput.classList.add("mailing-list-input");

  locationInput.classList.add(
    "mailing-list-input",
    "mailing-list-location"
  );


  /*
    Remove any helper element previously inserted
    by an earlier version of this script.
  */

  form
    .querySelectorAll(".hym-eo-helper")
    .forEach(element => element.remove());


  /*
    Create the genuine HYM helper copy and place it
    immediately after the Town / City field.
  */

  const helper = document.createElement("p");

  helper.className =
    "mailing-list-location-copy hym-eo-helper";

  helper.textContent =
    "Tell us where you are and help us plan where to play next.";

  locationInput.insertAdjacentElement(
    "afterend",
    helper
  );


  /*
    Completely remove the genuine EmailOctopus
    submit control from the visual layout.

    We keep a reference to it so its normal click
    behaviour can still be triggered.
  */

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


  /*
    Remove any HYM button left behind by an
    earlier execution before creating the new one.
  */

  form
    .querySelectorAll(".hym-eo-submit")
    .forEach(element => element.remove());


  /*
    Build the exact HYM visual SUBSCRIBE button.
  */

  const hymButton =
    document.createElement("button");

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


  /*
    Put our button after the helper copy.
  */

  helper.insertAdjacentElement(
    "afterend",
    hymButton
  );


  /*
    Our visual button triggers EmailOctopus's
    genuine submit mechanism.
  */

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


/*
  EmailOctopus loads asynchronously.

  Try immediately, then watch the page until
  EmailOctopus has inserted its form.
*/

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
