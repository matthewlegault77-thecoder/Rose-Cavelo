/* ── BUILDS: blueprint-to-photo morph ──
   Driven by the pinned act's progress (--sc-p, written inline by the engine):
   the first 20% draws the elevation, 20%..80% opens the photo over it. */
export function initBuilds() {
  const morph = document.getElementById('morph');
  const act = morph && morph.closest('[data-sc-act]');
  if (!act) return;
  const ease = t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  let last = -1;
  (function update() {
    // read the inline value: getComputedStyle here would force a style recalc every frame
    const p = parseFloat(act.style.getPropertyValue('--sc-p')) || 0;
    if (p !== last) {
      last = p;
      morph.style.setProperty('--draw-p', Math.min(1, p / 0.2).toFixed(4));
      morph.style.setProperty('--morph-p', ease(Math.max(0, Math.min(1, (p - 0.2) / 0.6))).toFixed(4));
    }
    requestAnimationFrame(update);
  })();
}
