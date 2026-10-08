/* ── LISTINGS: one home per screen ──
   Scroll position picks the home; a lerp turns it into a glide; idle snaps
   to the nearest home in the direction you were going. Trackpad swipes,
   arrow keys and touch swipes are translated into the same scroll, so every
   input drives one timeline. */
export function initListings() {
  const act = document.getElementById('listings');
  if (!act) return;
  const viewport = act.querySelector('.lx-viewport');
  const rail = act.querySelector('.lx-rail');
  const slides = Array.from(rail.children);
  const tabs = Array.from(act.querySelectorAll('[data-lx-go]'));
  const steps = Array.from(act.querySelectorAll('[data-lx-step]'));
  const last = slides.length - 1;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  const range = () => act.offsetHeight - innerHeight;
  const top = () => act.getBoundingClientRect().top + scrollY;
  const raw = () => (scrollY - top()) / range() * last;   // slide position, unclamped
  const owns = () => { const r = act.getBoundingClientRect(); return r.top <= innerHeight * 0.25 && r.bottom >= innerHeight * 0.75; };

  let cur = -1, rest = 0, active = -1, touching = false, loaded = false;

  function goTo(i) {
    i = clamp(i, 0, last);
    rest = i;
    if (reduce) viewport.scrollTo({ left: i * viewport.clientWidth, behavior: 'smooth' });
    else scrollTo({ top: top() + range() * i / last, behavior: 'smooth' });
  }
  function setActive(i) {
    if (i === active) return;
    active = i;
    tabs.forEach((t, k) => t.setAttribute('aria-current', k === i));
    slides.forEach((s, k) => { s.inert = k !== i; });
    steps[0].disabled = i === 0;
    steps[1].disabled = i === last;
  }
  tabs.forEach(t => t.addEventListener('click', () => goTo(+t.dataset.lxGo)));
  steps.forEach(b => b.addEventListener('click', () => goTo(active + +b.dataset.lxStep)));
  setActive(0);

  if (reduce) {
    viewport.addEventListener('scroll', () => {
      setActive(Math.round(viewport.scrollLeft / viewport.clientWidth));
      act.style.setProperty('--lx-p', ((active + 1) / (last + 1)).toFixed(4));
    }, { passive: true });
    return;
  }

  // idle snap. A move of more than ~5% of a home counts as intent.
  let idle;
  function snap() {
    if (touching) return;
    const pos = raw();
    if (pos <= 0.002 || pos >= last - 0.002) { rest = clamp(Math.round(pos), 0, last); return; }
    const delta = pos - rest;
    const i = Math.abs(delta) < 0.05 ? rest : Math.abs(delta) < 1 ? rest + Math.sign(delta) : Math.round(pos);
    if (Math.abs(pos - i) > 0.002) goTo(i); else rest = i;
  }
  addEventListener('scroll', () => { clearTimeout(idle); idle = setTimeout(snap, 140); }, { passive: true });

  // trackpad: a sideways swipe scrolls the page, kept inside this section
  act.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || !owns()) return;
    e.preventDefault();
    const t = top();
    const y = clamp(scrollY + e.deltaX * 1.5 * range() / (last * viewport.clientWidth), t, t + range());
    scrollTo({ top: y, behavior: 'instant' });
  }, { passive: false });

  addEventListener('keydown', e => {
    if (!owns() || e.altKey || e.ctrlKey || e.metaKey || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    const k = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!k) return;
    e.preventDefault();
    goTo(active + k);
  });

  let x0 = 0, y0 = 0;
  act.addEventListener('touchstart', e => { touching = true; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  act.addEventListener('touchcancel', () => { touching = false; }, { passive: true });
  act.addEventListener('touchend', e => {
    touching = false;
    const t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3 && owns()) goTo(active + (dx < 0 ? 1 : -1));
    else { clearTimeout(idle); idle = setTimeout(snap, 140); }
  }, { passive: true });

  // pointer bubble over the photo
  const bubble = act.querySelector('.lx-cursor');
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  let bx = 0, by = 0, bs = 0, tx = 0, ty = 0, ts = 0;
  if (fine) {
    act.classList.add('lx-has-cursor');
    act.addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; ts = e.target.closest('.lx-frame') ? 1 : 0; if (!bs) { bx = tx; by = ty; } });
    act.addEventListener('pointerleave', () => { ts = 0; });
  }

  let then = performance.now();
  (function frame(now) {
    const dt = Math.min(64, now - then);
    then = now;
    const r = act.getBoundingClientRect();
    if (r.bottom > -innerHeight && r.top < innerHeight * 2) {
      if (!loaded) { loaded = true; act.querySelectorAll('img').forEach(img => { img.loading = 'eager'; }); }
      const target = clamp(raw(), -1, last + 1);   // past either end = arriving / leaving
      cur += (target - cur) * (1 - Math.pow(0.86, dt / 16.67));
      if (Math.abs(target - cur) < 0.0005) cur = target;
      rail.style.transform = 'translate3d(' + (-clamp(cur, 0, last) * viewport.clientWidth).toFixed(2) + 'px,0,0)';
      for (let k = 0; k <= last; k++) {
        const d = k - cur, st = slides[k].style;
        st.setProperty('--d', d.toFixed(4));
        st.setProperty('--ad', Math.min(Math.abs(d), 1.5).toFixed(4));
      }
      act.style.setProperty('--av', Math.min(Math.abs(target - cur), 1).toFixed(4));
      act.style.setProperty('--lx-p', ((clamp(cur, 0, last) + 1) / (last + 1)).toFixed(4));
      setActive(clamp(Math.round(cur), 0, last));
      if (fine) {
        bx += (tx - bx) * 0.2; by += (ty - by) * 0.2; bs += (ts - bs) * 0.16;
        bubble.style.transform = 'translate3d(' + bx.toFixed(1) + 'px,' + by.toFixed(1) + 'px,0) scale(' + bs.toFixed(3) + ')';
      }
    }
    requestAnimationFrame(frame);
  })(then);
}
