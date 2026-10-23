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
   HIDE UNWANTED TEXT ONLY
========================= */

function hideUnwantedBandsintownContent() {

  if (!widget) {
    return;
  }


  /*
    Known Play My City classes.
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
    Hide ONLY exact unwanted text.

    Do not hide parent containers.
  */

  widget
    .querySelectorAll(
      "div, p, span, a, button"
    )
    .forEach(element => {

      const text =
        (element.textContent || "")
          .trim()
          .replace(/\s+/g, " ")
          .toLowerCase();


      const exactUnwantedText =

        text === "want a show near you?" ||

        text === "play my city" ||

        text ===
          "get updates on new shows, new music, and more" ||

        text ===
          "follow holy youth movement";


      if (!exactUnwantedText) {
        return;
      }


      if (
        element.children.length <= 2
      ) {

        element.style.setProperty(
          "display",
          "none",
          "important"
        );

      }

    });

}


/* =========================
   REMOVE TOP DIVIDER
========================= */

function removeTopBandsintownDivider() {

  if (!widget) {
    return;
  }


  const widgetRect =
    widget.getBoundingClientRect();


  if (
    widgetRect.width <= 0 ||
    widgetRect.height <= 0
  ) {
    return;
  }


  /*
    Bandsintown may create the divider
    as a border on a larger container
    rather than as a separate thin
    element.

    Look at rendered elements near the
    top of the widget and find visible
    horizontal borders.
  */

  const candidates = [];


  Array.from(
    widget.querySelectorAll("*")
  )
    .forEach(element => {

      const rect =
        element.getBoundingClientRect();


      if (
        rect.width <= 0 ||
        rect.height <= 0
      ) {
        return;
      }


      const style =
        window.getComputedStyle(
          element
        );


      if (
        style.display === "none" ||
        style.visibility === "hidden" ||
        parseFloat(
          style.opacity || "1"
        ) <= 0
      ) {
        return;
      }


      const distanceFromTop =
        rect.top -
        widgetRect.top;


      /*
        Only inspect elements in the
        upper part of the widget.

        This keeps us away from the
        divider between later events.
      */

      if (
        distanceFromTop < 10 ||
        distanceFromTop > 220
      ) {
        return;
      }


      /*
        The visible divider spans most
        of the widget width.
      */

      if (
        rect.width <
        widgetRect.width * 0.65
      ) {
        return;
      }


      const topWidth =
        parseFloat(
          style.borderTopWidth
        ) || 0;


      const bottomWidth =
        parseFloat(
          style.borderBottomWidth
        ) || 0;


      const topStyle =
        style.borderTopStyle;


      const bottomStyle =
        style.borderBottomStyle;


      const hasTopBorder =
        topWidth > 0 &&
        topStyle !== "none" &&
        topStyle !== "hidden";


      const hasBottomBorder =
        bottomWidth > 0 &&
        bottomStyle !== "none" &&
        bottomStyle !== "hidden";


      if (
        !hasTopBorder &&
        !hasBottomBorder
      ) {
        return;
      }


      /*
        Store the actual vertical
        position of each border.

        A bottom border sits at the
        bottom of its element rather
        than at rect.top.
      */

      if (hasTopBorder) {

        candidates.push({
          element,
          side: "top",
          position:
            rect.top -
            widgetRect.top
        });

      }


      if (hasBottomBorder) {

        candidates.push({
          element,
          side: "bottom",
          position:
            rect.bottom -
            widgetRect.top
        });

      }

    });


  if (!candidates.length) {
    return;
  }


  /*
    Ignore borders right against the
    outer edge of the widget and sort
    remaining borders from highest
    to lowest.
  */

  const usableCandidates =
    candidates
      .filter(candidate =>
        candidate.position >= 15 &&
        candidate.position <= 220
      )
      .sort(
        (a, b) =>
          a.position -
          b.position
      );


  if (!usableCandidates.length) {
    return;
  }


  /*
    The highest qualifying horizontal
    border is the unwanted divider
    above the first event.
  */

  const divider =
    usableCandidates[0];


  if (
    divider.side === "top"
  ) {

    divider.element.style.setProperty(
      "border-top",
      "0",
      "important"
    );

    divider.element.style.setProperty(
      "border-top-width",
      "0",
      "important"
    );

  }

  else {

    divider.element.style.setProperty(
      "border-bottom",
      "0",
      "important"
    );

    divider.element.style.setProperty(
      "border-bottom-width",
      "0",
      "important"
    );

  }

}


/* =========================
   FIND REAL BANDSINTOWN LOGO
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
      Reject action links.
    */

    if (
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
    Prefer elements containing
    actual logo artwork.
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


  /*
    Genuine Bandsintown branding
    should be the lowest valid item.
  */

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


  /*
    Already successful.
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
    Clone the REAL Bandsintown logo.
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
    Reset cloned outer positioning.
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
    Put genuine clone outside widget.
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
    Hide ONLY the original logo.

    Do not hide its parent.
  */

  realLogo.style.setProperty(
    "display",
    "none",
    "important"
  );


  /*
    Reveal external credit.
  */

  credit.classList.add(
    "ready"
  );

}


/* =========================
   RUN
========================= */

function tidyBandsintown() {

  hideUnwantedBandsintownContent();

  removeTopBandsintownDivider();

  buildExternalCredit();

}


/* =========================
   WATCH BANDSINTOWN LOAD
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


/*
  Backup checks while the
  Bandsintown widget finishes loading.
*/

setTimeout(tidyBandsintown, 300);

setTimeout(tidyBandsintown, 700);

setTimeout(tidyBandsintown, 1200);

setTimeout(tidyBandsintown, 2000);

setTimeout(tidyBandsintown, 3500);

setTimeout(tidyBandsintown, 5000);
