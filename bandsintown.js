/* =========================
   BANDSINTOWN
========================= */

const widget =
  document.getElementById("bandsintownWidget");

const credit =
  document.getElementById("bandsintownCredit");

const logoCopy =
  document.getElementById("bandsintownLogoCopy");


/* =========================
   REMOVE PLAY MY CITY
========================= */

function removePlayMyCity() {

  if (!widget) {
    return;
  }

  widget
    .querySelectorAll(
      '.bit-play-my-city-wrapper,' +
      '.bit-play-my-city,' +
      '[class*="play-my-city"],' +
      '[class*="playMyCity"]'
    )
    .forEach(element => {

      element.style.setProperty(
        "display",
        "none",
        "important"
      );

    });

}


/* =========================
   REMOVE FOLLOW / UPDATES BLOCK
========================= */

function removeFollowBlock() {

  if (!widget) {
    return;
  }


  const elements =
    Array.from(
      widget.querySelectorAll(
        "div, p, span, a, button"
      )
    );


  /*
    Find the text:
    "Get updates on new shows, new music, and more"
  */

  const updatesText =
    elements.find(element => {

      const text =
        (element.textContent || "")
          .trim()
          .replace(/\s+/g, " ")
          .toLowerCase();

      return text.includes(
        "get updates on new shows"
      );

    });


  /*
    Find the follow button separately
  */

  const followButton =
    elements.find(element => {

      const text =
        (element.textContent || "")
          .trim()
          .replace(/\s+/g, " ")
          .toLowerCase();

      return text.includes(
        "follow holy youth movement"
      );

    });


  /*
    Hide only the immediate compact
    container around the updates text.
  */

  if (updatesText) {

    const parent =
      updatesText.parentElement;

    if (parent) {

      const rect =
        parent.getBoundingClientRect();

      if (
        rect.height > 0 &&
        rect.height < 220
      ) {

        parent.style.setProperty(
          "display",
          "none",
          "important"
        );

      }
      else {

        updatesText.style.setProperty(
          "display",
          "none",
          "important"
        );

      }

    }

  }


  /*
    Hide follow button / its direct wrapper.
  */

  if (followButton) {

    const parent =
      followButton.parentElement;

    if (parent) {

      const rect =
        parent.getBoundingClientRect();

      if (
        rect.height > 0 &&
        rect.height < 160
      ) {

        parent.style.setProperty(
          "display",
          "none",
          "important"
        );

      }
      else {

        followButton.style.setProperty(
          "display",
          "none",
          "important"
        );

      }

    }

  }

}


/* =========================
   FIND GENUINE BANDSINTOWN LOGO
========================= */

function findBandsintownLogo() {

  if (!widget) {
    return null;
  }


  const links =
    Array.from(
      widget.querySelectorAll(
        "a[href]"
      )
    );


  const candidates =
    links
      .map(link => {

        const href =
          (
            link.getAttribute("href") ||
            ""
          )
            .toLowerCase();


        if (
          !href.includes("bandsintown")
        ) {
          return null;
        }


        const text =
          (
            link.textContent ||
            ""
          )
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();


        /*
          Reject action links.
        */

        if (
          text.includes("ticket") ||
          text.includes("rsvp") ||
          text.includes("follow") ||
          text.includes("track") ||
          text.includes("play my city")
        ) {
          return null;
        }


        const hasArtwork =
          !!link.querySelector(
            "svg, img"
          );


        const rect =
          link.getBoundingClientRect();


        if (
          rect.width <= 0 ||
          rect.height <= 0
        ) {
          return null;
        }


        return {
          link,
          top: rect.top,
          hasArtwork
        };

      })
      .filter(Boolean);


  /*
    Prefer links containing actual logo artwork.
  */

  const artworkCandidates =
    candidates.filter(
      item =>
        item.hasArtwork
    );


  const usable =
    artworkCandidates.length
      ? artworkCandidates
      : candidates;


  /*
    Bandsintown logo should be the
    lowest suitable Bandsintown link.
  */

  usable.sort(
    (a, b) =>
      b.top - a.top
  );


  return usable.length
    ? usable[0].link
    : null;

}


/* =========================
   COPY COMPUTED STYLES
========================= */

function copyComputedStyles(
  original,
  clone
) {

  const originals =
    [
      original,
      ...original.querySelectorAll("*")
    ];


  const clones =
    [
      clone,
      ...clone.querySelectorAll("*")
    ];


  originals.forEach(
    (originalElement, index) => {

      const cloneElement =
        clones[index];


      if (!cloneElement) {
        return;
      }


      const styles =
        window.getComputedStyle(
          originalElement
        );


      for (
        let i = 0;
        i < styles.length;
        i++
      ) {

        const property =
          styles[i];


        cloneElement.style.setProperty(
          property,
          styles.getPropertyValue(
            property
          ),
          styles.getPropertyPriority(
            property
          )
        );

      }

    }
  );

}


/* =========================
   BUILD EXTERNAL CREDIT
========================= */

function buildExternalCredit() {

  if (
    !widget ||
    !credit ||
    !logoCopy
  ) {
    return;
  }


  if (
    credit.classList.contains(
      "ready"
    )
  ) {
    return;
  }


  const realLogo =
    findBandsintownLogo();


  if (!realLogo) {
    return;
  }


  /*
    Clone the genuine logo.
  */

  const clonedLogo =
    realLogo.cloneNode(true);


  copyComputedStyles(
    realLogo,
    clonedLogo
  );


  /*
    Remove duplicate IDs.
  */

  clonedLogo.removeAttribute("id");


  clonedLogo
    .querySelectorAll("[id]")
    .forEach(element => {

      element.removeAttribute("id");

    });


  /*
    Reset only outer positioning.
  */

  clonedLogo.style.setProperty(
    "position",
    "static",
    "important"
  );

  clonedLogo.style.setProperty(
    "left",
    "auto",
    "important"
  );

  clonedLogo.style.setProperty(
    "right",
    "auto",
    "important"
  );

  clonedLogo.style.setProperty(
    "top",
    "auto",
    "important"
  );

  clonedLogo.style.setProperty(
    "bottom",
    "auto",
    "important"
  );

  clonedLogo.style.setProperty(
    "transform",
    "none",
    "important"
  );

  clonedLogo.style.setProperty(
    "opacity",
    "1",
    "important"
  );

  clonedLogo.style.setProperty(
    "visibility",
    "visible",
    "important"
  );

  clonedLogo.style.setProperty(
    "margin-left",
    "auto",
    "important"
  );

  clonedLogo.style.setProperty(
    "margin-right",
    "auto",
    "important"
  );


  /*
    Put clone outside widget.
  */

  logoCopy.innerHTML = "";

  logoCopy.appendChild(
    clonedLogo
  );


  if (
    !logoCopy.firstElementChild
  ) {
    return;
  }


  /*
    IMPORTANT:
    Hide only the original logo link.
    Do NOT hide any parent wrapper.
  */

  realLogo.style.setProperty(
    "display",
    "none",
    "important"
  );


  /*
    Reveal external text + clone.
  */

  credit.classList.add(
    "ready"
  );

}


/* =========================
   RUN CLEANUP
========================= */

function tidyBandsintown() {

  removePlayMyCity();

  removeFollowBlock();

  buildExternalCredit();

}


/* =========================
   WATCH WIDGET
========================= */

if (widget) {

  let timer;


  const observer =
    new MutationObserver(() => {

      clearTimeout(timer);


      timer =
        setTimeout(
          tidyBandsintown,
          100
        );

    });


  observer.observe(
    widget,
    {
      childList: true,
      subtree: true
    }
  );

}


/* Backup checks */

setTimeout(tidyBandsintown, 300);

setTimeout(tidyBandsintown, 700);

setTimeout(tidyBandsintown, 1200);

setTimeout(tidyBandsintown, 2000);

setTimeout(tidyBandsintown, 3500);

setTimeout(tidyBandsintown, 5000);
