/* ── NAV: frosted once the page moves, light over dark sections, current section underlined ── */
export function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  let queued = false;
  function paint() {
    queued = false;
    nav.classList.toggle('is-solid', scrollY > 8);
    const under = document.elementsFromPoint(innerWidth / 2, nav.offsetHeight / 2);
    nav.classList.toggle('is-dark', under.some(el => !nav.contains(el) && el.closest('.sec--dark, #listings')));
  }
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(paint); } }, { passive: true });
  addEventListener('resize', paint);
  paint();

  // menu links mark the section crossing the middle of the screen
  const links = new Map();
  nav.querySelectorAll('.nav__menu-links a').forEach(a => {
    const id = a.hash.slice(1);
    links.set(id, (links.get(id) || []).concat(a));
  });
  const io = new IntersectionObserver(entries => entries.forEach(e => links.get(e.target.id).forEach(a => {
    if (e.isIntersecting) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
  })), { rootMargin: '-50% 0px -50% 0px' });
  links.forEach((_, id) => { const sec = document.getElementById(id); if (sec) io.observe(sec); });

  // the logo is the menu (big.dk)
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('siteMenu');
  let closing, opening;
  function setOpen(open) {
    clearTimeout(closing);
    clearTimeout(opening);
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.inert = !open;
  }
  setOpen(false);
  btn.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    // a beat on the logo first, so it reads as logo, then three lines, then the menu drops
    btn.addEventListener('pointerenter', () => { clearTimeout(closing); opening = setTimeout(() => setOpen(true), 160); });
    menu.addEventListener('pointerenter', () => setOpen(true));
    [btn, menu].forEach(el => el.addEventListener('pointerleave', () => {
      clearTimeout(opening);
      closing = setTimeout(() => setOpen(false), 260);
    }));
  }
  menu.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
  addEventListener('pointerdown', e => { if (!nav.contains(e.target)) setOpen(false); });
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); btn.focus(); }
  });
}
