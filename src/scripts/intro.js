/* ── INTRO: the name holds centre stage, then flies into the logo slot top-left ── */
export function initIntro() {
  const intro = document.getElementById('intro');
  const brand = document.getElementById('introBrand');
  const nav = document.getElementById('mainNav');
  const navBrand = nav && nav.querySelector('.nav__brand');
  if (!intro || !brand || !navBrand) return;

  // reduced motion: no flight, just a short fade so the page is usable at once
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    intro.classList.add('is-fading');
    setTimeout(() => intro.remove(), 450);
    return;
  }

  nav.style.opacity = '0';
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    const dest = navBrand.getBoundingClientRect();
    const src = brand.getBoundingClientRect();
    intro.classList.add('is-moving');
    brand.style.transformOrigin = 'left center';
    brand.style.transform = `translate(${dest.left - src.left}px, ${dest.top - src.top}px) scale(${dest.height / src.height})`;
    brand.style.opacity = '0';

    setTimeout(() => {
      intro.classList.add('is-fading');
      nav.style.transition = 'opacity 0.4s ease-out';
      nav.style.opacity = '1';
      document.body.style.overflow = '';
      setTimeout(() => intro.remove(), 500);
    }, 850);
  }, 1200);
}
