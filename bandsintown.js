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
   TIGHTEN TOP OF WIDGET
========================= */

function tightenTopWidgetSpace() {

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
    Look through rendered Bandsintown
    elements near the top.

    We are looking for the first
    wide, very shallow visible element.

    This corresponds to the horizontal
    separator without relying on a
    particular Bandsintown class name.
  */

  const candidates =
    Array.from(
      widget.querySelectorAll("*")
    )
      .map(element => {

        const rect =
          element.getBoundingClientRect();


        const style =
          window.getComputedStyle(
            element
          );


        const distanceFromTop =
          rect.top -
          widgetRect.top;


        const visible =
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          parseFloat(style.opacity || "1") > 0;


        const wideEnough =
          rect.width >=
          widgetRect.width * 0.70;


        const shallowEnough =
          rect.height > 0 &&
          rect.height <= 8;


        const nearTop =
          distanceFromTop >= 15 &&
          distanceFromTop <= 180;


        return {
          element,
          rect,
          distanceFromTop,
          visible,
          wideEnough,
          shallowEnough,
          nearTop
        };

      })
      .filter(candidate =>

        candidate.visible &&
        candidate.wideEnough &&
        candidate.shallowEnough &&
        candidate.nearTop

      );


  if (!candidates.length) {
    return;
  }


  /*
    Use the highest matching separator.
  */

  candidates.sort(
    (a, b) =>
      a.distanceFromTop -
      b.distanceFromTop
  );


  const separator =
    candidates[0].element;


  /*
    First try to reduce spacing on the
    separator itself.
  */

  separator.style.setProperty(
    "margin-top",
    "-24px",
    "important"
  );


  /*
    Bandsintown may place the spacing on
    the immediate parent instead.

    If that parent is a relatively small
    layout wrapper, reduce its top padding.

    We deliberately DON'T climb further
    through the DOM because that could
    affect the entire event listing.
  */

  const parent =
    separator.parentElement;


  if (
    parent &&
    parent !== widget
  ) {

    const parentRect =
      parent.getBoundingClientRect();


    const parentStyle =
      window.getComputedStyle(
        parent
      );


    const currentPaddingTop =
      parseFloat(
        parentStyle.paddingTop
      ) || 0;


    /*
      Only alter a parent that occupies
      the top portion of the widget,
      rather than the entire event list.
    */

    if (
      parentRect.height < 180 &&
      currentPaddingTop > 0
    ) {

      parent.style.setProperty(
        "padding-top",
        Math.max(
          0,
          currentPaddingTop - 24
        ) + "px",
        "important"
      );

    }

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

  tightenTopWidgetSpace();

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
