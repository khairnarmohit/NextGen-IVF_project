// Active nav link handler
// document.addEventListener("DOMContentLoaded", () => {
//   const navLinks = document.querySelectorAll(".nav-link");

//   navLinks.forEach((link) => {
//     link.addEventListener("click", function () {
//       navLinks.forEach((item) => {
//         item.classList.remove("active");
//         item.removeAttribute("aria-current");
//       });

//       this.classList.add("active");
//       this.setAttribute("aria-current", "page");
//     });
//   });
// });

  document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
      // आधी सगळ्यांतून active काढ
      link.classList.remove("active");
      link.removeAttribute("aria-current");

      // जर link चा href current page शी match झाला
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  });