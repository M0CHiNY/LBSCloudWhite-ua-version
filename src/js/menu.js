// Documentation
// https://jolty.dev

const { Dropdown, Dialog, Tablist } = jolty;

new Dialog("#mob-nav", {
  shown: false,
  breakpoints: {
    1024: {
      destroy: true,
    },
  },
});

document.querySelectorAll(".nav-submenu").forEach((submenu) => {
  new Dropdown(submenu, {
    toggler: submenu.previousElementSibling,
    delay: 100,
    itemClickHide: false,
    items: ":scope > li > a",
    trigger: "click hover",
    arrowActivation: submenu.parentNode.closest(".nav-submenu") ? "x" : "y",
    hideMode: "class-shown",
    destroy: true,
    breakpoints: {
      1024: {
        destroy: false,
      },
    },
  });
});

document.querySelectorAll(".nav-submenu, .nav-menu").forEach((submenu) => {
  new Tablist(submenu, {
    tab: "a:not(:only-child)",
    tabpanel: ".nav-submenu",
    hideMode: "class-shown",
    breakpoints: {
      1024: {
        destroy: true,
      },
    },
  });
});

if (document.querySelector(".accordion")) {
  Tablist.initAll();
}

document.addEventListener("DOMContentLoaded", function () {
  function Accordion(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Перевірка, чи є елементи перед додаванням обробників подій
    const links = this.el.querySelectorAll(".link");
    if (links.length > 0) {
      links.forEach(function (link) {
        link.addEventListener("click", function (event) {
          const next = link.nextElementSibling;
          const parent = link.parentNode;
          next.style.display =
            next.style.display === "block" ? "none" : "block";
          parent.classList.toggle("open");

          if (!multiple) {
            const siblings = parent.parentNode.children;
            for (let i = 0; i < siblings.length; i++) {
              const sibling = siblings[i];
              if (sibling !== parent && sibling.classList.contains("open")) {
                sibling.querySelector(".submenu").style.display = "none";
                sibling.classList.remove("open");
              }
            }
          }
        });
      });
    }
  }

  const accordion = new Accordion(document.getElementById("accordion-mobile"), false);
});