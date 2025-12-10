// ---------- scrollbar logic (uendret) ----------
const root = document.documentElement;
const THRESHOLD = 26;
const VISIBLE_WIDTH = '10px';
const HIDDEN_WIDTH = '0px';
const VISIBLE_ALPHA = '0.9';
const HIDDEN_ALPHA = '0';
let hideTimer = null;

function showScrollbar() {
  root.style.setProperty('--scrollbar-width', VISIBLE_WIDTH);
  root.style.setProperty('--scrollbar-thumb-alpha', VISIBLE_ALPHA);
  try { document.documentElement.style.setProperty('scrollbar-width', 'thin'); } catch (e) {}
  if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
}
function hideScrollbarDelayed() {
  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    root.style.setProperty('--scrollbar-width', HIDDEN_WIDTH);
    root.style.setProperty('--scrollbar-thumb-alpha', HIDDEN_ALPHA);
    try { document.documentElement.style.setProperty('scrollbar-width', 'none'); } catch (e) {}
  }, 300);
}
document.addEventListener('mousemove', (e) => {
  if ('ontouchstart' in window) return;
  const nearRight = window.innerWidth - e.clientX <= THRESHOLD;
  if (nearRight) showScrollbar();
  else hideScrollbarDelayed();
});
document.addEventListener('mouseleave', hideScrollbarDelayed);

// ---------- Random maling on nav hover (one-shot animation) ----------
const malingIds = ['maling1', 'maling2', 'maling3'];
const navButtons = document.querySelectorAll('.nav_knapper a'); // riktig selector

console.log('Nav buttons funnet:', navButtons.length);
console.log('Maling elementer:', malingIds.map(id => document.getElementById(id)));

function getRandomMaling() {
  return malingIds[Math.floor(Math.random() * malingIds.length)];
}

function showRandomMaling() {
  // Fjern klassen fra alle og skjul dem
  malingIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('maling-play');
      el.style.opacity = '0';
    }
  });

  // Velg og spill en tilfeldig maling (én gang)
  const chosen = getRandomMaling();
  const el = document.getElementById(chosen);
  if (!el) return;

  // Tving reflow for å kunne starte animasjonen på nytt
  void el.offsetWidth;
  el.classList.add('maling-play');
}

function hideAllMaling() {
  malingIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('maling-play');
      el.style.opacity = '0';
    }
  });
}

// Legg på event-lyttere
if (navButtons.length > 0) {
  navButtons.forEach(btn => {
    btn.addEventListener('mouseenter', showRandomMaling);
    btn.addEventListener('mouseleave', hideAllMaling);
  });
} else {
  console.warn('Ingen nav-knapper funnet. Sjekk at <ul> har klassen "nav_knapper".');
}