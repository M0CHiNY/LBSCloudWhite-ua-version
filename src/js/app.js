/* import scss files */
import '../scss/app.scss';

/* HTML PARTS INCLUDE */
import './inc-html.js';
import './menu.js';

import './script.js';

import './blog.js';
import './videotube';


// footer submenu

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
  
    const accordion = new Accordion(document.getElementById("accordion"), false);
  });

