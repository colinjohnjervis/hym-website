/* =========================
   BANDSINTOWN
========================= */

const widget =
  document.getElementById(
    "bandsintownWidget"
  );

const credit =
  document.getElementById(
    "bandsintownCredit"
  );

const logoCopy =
  document.getElementById(
    "bandsintownLogoCopy"
  );


/* =========================
   REMOVE UNWANTED CONTENT
========================= */

function removeUnwantedBandsintownContent() {

  if (!widget) {
    return;
  }


  /*
    Hide Play My City elements
  */

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


  /*
    Hide unwanted text-based sections:

    - Want a show near you?
    - Play My City
    - Get updates on new shows...
    - Follow Holy Youth Movement
  */

  widget
    .querySelectorAll(
      "div, p, span, a, button"
    )
    .forEach(element => {

      const text =
        (
          element.textContent ||
          ""
        )
          .trim()
          .replace(/\s+/g, " ")
          .toLowerCase();


      const isPlayMyCity =
        text ===
          "want a show near you?" ||

        text ===
          "play my city";


      const isUpdatesText =
        text.includes(
          "get updates on new shows"
        );


      const isFollowButton =
        text.includes(
          "follow holy youth movement"
        );


      if (
        !isPlayMyCity &&
        !isUpdatesText &&
        !isFollowButton
      ) {
        return;
      }


      let wrapper =
        element;


      /*
        Move upwards through compact
        containers only.

        This removes the whole unwanted
        block without hiding the event list.
      */

      for (
        let i = 0;
        i < 4;
        i++
      ) {

        const parent =
          wrapper.parentElement;


        if (
          !parent ||
          parent === widget
        ) {
          break;
        }


        const rect =
          parent.getBoundingClientRect();


        if (
          rect.height > 0 &&
          rect.height < 320
        ) {

          wrapper =
            parent;

        }
        else {

          break;

        }

      }


      wrapper.style.setProperty(
        "display",
        "none",
        "important"
      );

    });

}


/* =========================
   FIND REAL LOGO
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
    [];


  links.forEach(link => {

    const href =
      (
        link.getAttribute("href") ||
        ""
      )
        .toLowerCase();


    if (
      !href.includes("bandsintown")
    ) {
      return;
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
      Ignore tickets, RSVP,
      follow and tracking links.
    */

    if (
      text.includes("tickets") ||
      text.includes("ticket") ||
      text.includes("rsvp") ||
      text.includes("follow") ||
      text.includes("track") ||
      text.includes("play my city")
    ) {
      return;
    }


    const rect =
      link.getBoundingClientRect();


    if (
      rect.width <= 0 ||
      rect.height <= 0
    ) {
      return;
    }


    const hasArtwork =
      !!link.querySelector(
        "svg, img"
      );


    candidates.push({
      element: link,
      top: rect.top,
      hasArtwork: hasArtwork
    });

  });


  /*
    Prefer a candidate containing
    SVG/image artwork.
  */

  const artworkCandidates =
    candidates.filter(
      candidate =>
        candidate.hasArtwork
    );


  const usableCandidates =
    artworkCandidates.length
      ? artworkCandidates
      : candidates;


  usableCandidates.sort(
    (a, b) =>
      b.top - a.top
  );


  if (
    usableCandidates.length
  ) {

    return (
      usableCandidates[0]
        .element
    );

  }


  /*
    Backup search:
    look for artwork inside
    Bandsintown links.
  */

  const artwork =
    Array.from(
      widget.querySelectorAll(
        "svg, img"
      )
    );


  const artworkMatches =
    [];


  artwork.forEach(element => {

    const link =
      element.closest(
        "a[href]"
      );


    if (!link) {
      return;
    }


    const href =
      (
        link.getAttribute("href") ||
        ""
      )
        .toLowerCase();


    if (
      !href.includes("bandsintown")
    ) {
      return;
    }


    const rect =
      link.getBoundingClientRect();


    artworkMatches.push({
      element: link,
      top: rect.top
    });

  });


  artworkMatches.sort(
    (a, b) =>
      b.top - a.top
  );


  if (
    artworkMatches.length
  ) {

    return (
      artworkMatches[0]
        .element
    );

  }


  return null;

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
    (
      originalElement,
      index
    ) => {

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
   FIND LOGO WRAPPER
========================= */

function findLogoWrapper(
  logo
) {

  if (!logo) {
    return null;
  }


  let wrapper =
    logo;


  for (
    let i = 0;
    i < 3;
    i++
  ) {

    const parent =
      wrapper.parentElement;


    if (
      !parent ||
      parent === widget ||
      !widget.contains(parent)
    ) {
      break;
    }


    const rect =
      parent.getBoundingClientRect();


    const interactiveElements =
      parent.querySelectorAll(
        "a, button"
      ).length;


    if (
      rect.height > 0 &&
      rect.height < 150 &&
      interactiveElements <= 1
    ) {

      wrapper =
        parent;

    }
    else {

      break;

    }

  }


  return wrapper;

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


  /*
    If already built successfully,
    leave it alone.
  */

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
    Clone the ACTUAL logo
    rendered by Bandsintown.
  */

  const clonedLogo =
    realLogo.cloneNode(
      true
    );


  /*
    Preserve its actual appearance.
  */

  copyComputedStyles(
    realLogo,
    clonedLogo
  );


  /*
    Remove duplicate IDs.
  */

  clonedLogo.removeAttribute(
    "id"
  );


  clonedLogo
    .querySelectorAll("[id]")
    .forEach(element => {

      element.removeAttribute(
        "id"
      );

    });


  /*
    Reset only positioning
    on the outer clone.
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
    "display",
    "inline-flex",
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
    Put cloned real logo
    OUTSIDE the widget.
  */

  logoCopy.innerHTML =
    "";


  logoCopy.appendChild(
    clonedLogo
  );


  /*
    Safety check.
  */

  if (
    !logoCopy.firstElementChild
  ) {
    return;
  }


  /*
    Hide original logo
    inside the widget.
  */

  const originalWrapper =
    findLogoWrapper(
      realLogo
    );


  if (originalWrapper) {

    originalWrapper.style.setProperty(
      "display",
      "none",
      "important"
    );

  }
  else {

    realLogo.style.setProperty(
      "display",
      "none",
      "important"
    );

  }


  /*
    Reveal external wording
    and cloned real logo.
  */

  credit.classList.add(
    "ready"
  );

}


/* =========================
   RUN BANDSINTOWN CLEANUP
========================= */

function tidyBandsintown() {

  removeUnwantedBandsintownContent();

  buildExternalCredit();

}


/* =========================
   WATCH WIDGET
========================= */

if (widget) {

  let tidyTimer;


  const observer =
    new MutationObserver(
      () => {

        clearTimeout(
          tidyTimer
        );


        tidyTimer =
          setTimeout(
            tidyBandsintown,
            100
          );

      }
    );


  observer.observe(
    widget,
    {
      childList: true,
      subtree: true
    }
  );

}


/*
  Backup checks while
  Bandsintown is loading.
*/

setTimeout(
  tidyBandsintown,
  300
);

setTimeout(
  tidyBandsintown,
  700
);

setTimeout(
  tidyBandsintown,
  1200
);

setTimeout(
  tidyBandsintown,
  2000
);

setTimeout(
  tidyBandsintown,
  3500
);

setTimeout(
  tidyBandsintown,
  5000
);

setTimeout(
  tidyBandsintown,
  7500
);

setTimeout(
  tidyBandsintown,
  10000
);
