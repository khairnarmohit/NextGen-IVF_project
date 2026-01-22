// Active nav link handler
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((item) => {
        item.classList.remove("active");
        item.removeAttribute("aria-current");
      });

      this.classList.add("active");
      this.setAttribute("aria-current", "page");
    });
  });
});