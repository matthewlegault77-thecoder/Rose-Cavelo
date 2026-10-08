/* ── HERO MEDIA: the photo drifts against the pointer and sinks slower than the page on scroll ── */
export function initHero() {
  const inner = document.querySelector('.hero__media-inner');
  if (!inner || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  let tx = 0, ty = 0, x = 0, y = 0;
  if (fine) addEventListener('pointermove', e => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; }, { passive: true });
  (function frame() {
    x += (tx - x) * 0.05;
    y += (ty - y) * 0.05;
    const s = scrollY / innerHeight;   // 0 at the top, 1 once the hero has scrolled away
    if (s < 1.2) inner.style.transform = 'translate3d(' + (-x * 22).toFixed(2) + 'px,' + (-y * 16 + s * innerHeight * 0.25).toFixed(2) + 'px,0)';
    requestAnimationFrame(frame);
  })();
}
