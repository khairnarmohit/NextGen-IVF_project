  function swapHeroBg() {
    const hero = document.querySelector('.about-hero-bg');
    if (!hero) return;

    if (window.innerWidth >= 768) {
      hero.style.backgroundImage = `url('${hero.dataset.bgDesktop}')`;
    } else {
      hero.style.backgroundImage = `url('/images/AboutbannerM.png')`;
    }
  }

  window.addEventListener('load', swapHeroBg);
  window.addEventListener('resize', swapHeroBg);