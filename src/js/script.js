document.addEventListener("DOMContentLoaded", function () {
  // acordeon
// const tabs = document.querySelectorAll("[data-tab]");
// const tabsContent = document.querySelectorAll("[data-tab-content]");

// tabs.forEach(function (item) {
//   item.addEventListener("click", function () {
//     const currentBtn = item;
//     const contentBox = document.querySelector("#" + this.dataset.tab);

//     if (currentBtn.classList.contains("tab-active")) {
//       contentBox.style.maxHeight = "0";
//       setTimeout(() => {
//         contentBox.style.display = "none";
//       }, 500);
//       currentBtn.classList.remove("tab-active");
//     } else {
//       tabs.forEach(function (item) {
//         item.classList.remove("tab-active");
//       });

//       currentBtn.classList.add("tab-active");

//       tabsContent.forEach(function (e) {
//         if (e !== contentBox) {
//           e.style.maxHeight = 0;
//           setTimeout(() => {
//             e.style.display = "none";
//           }, 500);
//         }
//       });

//       contentBox.style.display = "block";
//       contentBox.style.maxHeight = contentBox.scrollHeight + "px";
//     }
//   });
// });





  // scroll

  const scrollToTop = document.getElementById("up");

  window.onscroll = function () {
    scroll();
  };

  function scroll() {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      scrollToTop.style.display = "flex";
    } else {
      scrollToTop.style.display = "none";
    }
  }
  //modal
document.addEventListener("click", (e) => {
  const openModalButton = e.target.closest(".prices__btn");

  if (openModalButton) {
    const modalId = openModalButton.getAttribute("data-modal-id");
    const modal = document.getElementById(modalId);

    if (modal) {
      modal.showModal();

      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.close();
      });

      const closeButton = modal.querySelector(".modal__btn-clouse");

      if (closeButton) {
        closeButton.addEventListener("click", () => {
          modal.close();
        });
      }
    }
  }
});







});
