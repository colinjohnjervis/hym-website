const menuButton =
  document.getElementById("menuButton");

const navPanel =
  document.getElementById("navPanel");


menuButton.addEventListener(
  "click",
  () => {
    navPanel.classList.toggle("open");
  }
);


document
  .querySelectorAll(".nav-panel a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {
        navPanel.classList.remove("open");
      }
    );

  });
