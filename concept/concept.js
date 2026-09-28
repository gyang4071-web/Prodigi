import { departments, international, characters, zodiacSigns } from './data.js';

const $ = (s, el = document) => el.querySelector(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const T = (ms) => (reduced ? 1 : ms);
const EASE = 'cubic-bezier(.2,.8,.2,1)';
const EASE_IO = 'cubic-bezier(.76,0,.24,1)';
const wait = (ms) => new Promise((r) => setTimeout(r, T(ms)));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const body = document.body;
const hero = $('#hero');
const doorsEl = $('#doors');
const dept = $('#dept');
const portal = $('#portal');
const portalLight = $('#portalLight');

/* ---------------------------------------------------------------
   DOORS
---------------------------------------------------------------- */
const mid = departments.findIndex((d) => d.open);
doorsEl.innerHTML = departments.map((d, i) => {
  const rank = Math.abs(i - mid); // distance from the open door → size + parallax depth
  const tag = d.open ? 'button' : 'div';
  const attrs = d.open
    ? `type="button" data-dept="${d.id}" aria-label="Enter ${esc(d.name)}"`
    : `aria-disabled="true" aria-label="${esc(d.name)}, coming soon"`;
  return `
  <${tag} class="door${d.open ? ' door--active' : ''}" data-rank="${rank}" role="listitem" ${attrs}>
    <span class="door__glow" aria-hidden="true"></span>
    <span class="door__frame" aria-hidden="true">
      <span class="door__tunnel"><i></i><i></i><i></i><i></i></span>
      <span class="door__core"></span>
      <span class="door__seam"></span>
      <span class="door__leaves"><span class="door__leaf door__leaf--l"></span><span class="door__leaf door__leaf--r"></span></span>
      <span class="door__label">${esc(d.name)}</span>
      ${d.open ? '<span class="door__hint">Enter <span>→</span></span>' : ''}
    </span>
    <span class="door__meta" aria-hidden="true"><span>${d.index}</span>${d.open ? '<b>Open</b>' : '<span>Soon</span>'}</span>
  </${tag}>`;
}).join('');
$('#doorCount').textContent = departments.length;
$('#openCount').textContent = departments.filter((d) => d.open).length;

const activeDoor = $('.door--active', doorsEl);

// subtle parallax + light that follows the pointer
let target = { x: 0, y: 0 }, cur = { x: 0, y: 0 }, raf = 0;
function tick() {
  cur.x += (target.x - cur.x) * 0.08;
  cur.y += (target.y - cur.y) * 0.08;
  hero.style.setProperty('--mx', cur.x.toFixed(4));
  hero.style.setProperty('--my', cur.y.toFixed(4));
  raf = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.001 ? requestAnimationFrame(tick) : 0;
}
hero.addEventListener('pointermove', (e) => {
  if (e.pointerType !== 'mouse' || reduced) return;
  target = { x: (e.clientX / innerWidth) * 2 - 1, y: (e.clientY / innerHeight) * 2 - 1 };
  if (!raf) raf = requestAnimationFrame(tick);
});
const lit = (on) => hero.classList.toggle('is-lit', on);
activeDoor.addEventListener('pointerenter', () => lit(true));
activeDoor.addEventListener('pointerleave', () => lit(false));
activeDoor.addEventListener('focus', () => lit(true));
activeDoor.addEventListener('blur', () => lit(false));
activeDoor.addEventListener('click', enter);

/* ---------------------------------------------------------------
   DOOR → DEPARTMENT TRANSITION
---------------------------------------------------------------- */
function doorClip() {
  const r = $('.door__frame', activeDoor).getBoundingClientRect();
  const rad = r.width / 2;
  return {
    clip: `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px round ${rad}px ${rad}px 3px 3px)`,
    cx: r.left + r.width / 2,
    cy: r.top + r.height * 0.72,
  };
}
const FULL = 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)';

let busy = false;
async function enter() {
  if (busy || body.dataset.view !== 'doors') return;
  busy = true;
  body.dataset.view = 'transition';
  lit(false);
  activeDoor.classList.add('is-opening');
  hero.classList.add('is-receding');
  await wait(520);

  const { clip, cx, cy } = doorClip();
  portalLight.style.left = cx + 'px';
  portalLight.style.top = cy + 'px';
  portal.classList.add('is-active');
  const grow = portal.animate([{ clipPath: clip }, { clipPath: FULL }], { duration: T(1050), easing: EASE_IO, fill: 'forwards' });
  portalLight.animate(
    [{ transform: 'scale(.3)', opacity: 1 }, { transform: 'scale(.9)', opacity: 1, offset: 0.7 }, { transform: 'scale(1.5)', opacity: 0.35 }],
    { duration: T(1300), easing: EASE_IO, fill: 'forwards' }
  );
  await grow.finished;

  hero.hidden = true;
  dept.hidden = false;
  window.scrollTo(0, 0);
  body.dataset.view = 'dept';
  showcase.reset();
  await wait(180);
  const fade = portal.animate([{ opacity: 1 }, { opacity: 0 }], { duration: T(700), easing: 'ease', fill: 'forwards' });
  requestAnimationFrame(() => dept.classList.add('is-in'));
  await fade.finished;
  portal.classList.remove('is-active');
  fade.cancel(); grow.cancel();
  portalLight.getAnimations().forEach((a) => a.cancel());
  busy = false;
}

async function back() {
  if (busy || body.dataset.view !== 'dept') return;
  busy = true;
  body.dataset.view = 'transition';

  portalLight.style.left = innerWidth / 2 + 'px';
  portalLight.style.top = innerHeight * 0.62 + 'px';
  portal.classList.add('is-active');
  portal.style.clipPath = FULL;
  const lightIn = portalLight.animate([{ transform: 'scale(1.5)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1 }], { duration: T(650), easing: EASE, fill: 'forwards' });
  await portal.animate([{ opacity: 0 }, { opacity: 1 }], { duration: T(550), easing: 'ease', fill: 'forwards' }).finished;
  await lightIn.finished;

  dept.classList.remove('is-in');
  dept.hidden = true;
  hero.hidden = false;
  window.scrollTo(0, 0);
  void hero.offsetWidth; // hero is back in its "receding + door open" state

  const { clip, cx, cy } = doorClip();
  portalLight.animate([{ left: portalLight.style.left, top: portalLight.style.top }, { left: cx + 'px', top: cy + 'px' }], { duration: T(1000), easing: EASE_IO, fill: 'forwards' });
  portalLight.animate([{ transform: 'scale(1.1)', opacity: 1 }, { transform: 'scale(.12)', opacity: 0.9 }], { duration: T(1000), easing: EASE_IO, fill: 'forwards' });
  await portal.animate([{ clipPath: FULL }, { clipPath: clip }], { duration: T(1000), easing: EASE_IO, fill: 'forwards' }).finished;

  hero.classList.remove('is-receding');
  activeDoor.classList.remove('is-opening');
  const out = portal.animate([{ opacity: 1 }, { opacity: 0 }], { duration: T(450), easing: 'ease', fill: 'forwards' });
  await out.finished;
  portal.classList.remove('is-active');
  portal.style.clipPath = '';
  portal.getAnimations().forEach((a) => a.cancel());
  portalLight.getAnimations().forEach((a) => a.cancel());
  body.dataset.view = 'doors';
  busy = false;
  activeDoor.focus({ preventScroll: true });
}

$('#backTop').addEventListener('click', back);
$('#backBottom').addEventListener('click', back);
$('#logo').addEventListener('click', (e) => { e.preventDefault(); back(); });

/* ---------------------------------------------------------------
   INTERNATIONAL INTRO
---------------------------------------------------------------- */
$('#deptTitle').innerHTML = [...international.title].map((c, i) => `<span class="ch" style="--i:${i}" aria-hidden="true">${esc(c)}</span>`).join('');
$('#deptLead').textContent = international.lead;
$('#deptPillars').innerHTML = international.pillars.map((p, i) => `<li><span>0${i + 1}</span>${esc(p)}</li>`).join('');

/* ---------------------------------------------------------------
   CHARACTER SHOWCASE
---------------------------------------------------------------- */
const showcase = (() => {
  const root = $('#showcase');
  const figures = $('#figures');
  const bars = $('#bars');
  const nameLayers = [$('#scNames')];
  const el = { intro: $('#scIntro'), role: $('#scRole'), zodiac: $('#scZodiac'), desc: $('#scDesc'), highlight: $('#scHighlight'), index: $('#scIndex') };
  const n = characters.length;
  const pad = (i) => String(i + 1).padStart(2, '0');
  let idx = 0, lock = false, figure = null;

  characters.forEach((c) => { if (c.image) new Image().src = c.image; });
  $('#scTotal').textContent = '/ ' + String(n).padStart(2, '0');
  bars.innerHTML = characters.map((c, i) => `<button class="sc-bar" type="button" role="tab" aria-label="${esc(fullName(c))}" data-i="${i}"></button>`).join('');

  function fullName(c) { return [c.name, c.surname].filter(Boolean).join(' '); }
  const letters = (w) => [...w].map((ch) => `<span class="l">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`).join('');
  const roleLines = (c) => c.roleLines || [c.role.split(' ')[0], c.role.split(' ').slice(1).join(' ')].filter(Boolean);
  const paragraphs = (t) => t.split(/\n{2,}/).map((p) => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`).join('');

  // each text block renders into masked ".in" pieces so it can slide out / in
  const render = {
    intro: (c) => `<span class="in">${esc(c.intro)}</span>`,
    role: (c) => roleLines(c).map((l) => `<span class="rl"><span class="in">${esc(l)}</span></span>`).join(''),
    zodiac: (c) => `<span class="in"><span class="sym">${zodiacSigns[c.zodiac.toLowerCase()] || ''}︎</span>${esc(c.zodiac)}</span>`,
    desc: (c) => `<div class="in">${paragraphs(c.description)}</div>`,
    highlight: (c) => `<span class="in">${esc(c.highlight)}</span>`,
    index: (c, i) => `<span class="in">${pad(i)}</span>`,
  };

  // Huge names: every line is sized to the width of the left column, capped by
  // viewport height, so short and long names both hold the composition.
  function setNames(c) {
    nameLayers.forEach((layer) => {
      layer.children[0].innerHTML = letters(c.name);
      layer.children[1].innerHTML = letters(c.surname || '');
    });
    fitNames();
  }
  function fitNames() {
    const [names] = nameLayers;
    const W = names.clientWidth;
    const cap = innerWidth <= 900 ? Math.min(innerHeight * 0.13, W * 0.3) : innerHeight * 0.16;
    [...names.children].forEach((line) => {
      line.style.setProperty('--fs', '100px');
      const w = line.getBoundingClientRect().width || 1;
      line.style.setProperty('--fs', Math.min((100 * W) / w, cap) + 'px');
    });
  }
  addEventListener('resize', fitNames);
  document.fonts?.ready.then(fitNames);

  function makeFigure(c, i) {
    const pending = () => {
      const f = document.createElement('div');
      f.className = 'figure figure--pending';
      f.innerHTML = `<b>${esc(c.name[0] || '')}${esc((c.surname || '')[0] || '')}</b>Image slot ${pad(i)}${c.image ? `<code>${esc(c.image.split('/').pop())}</code>` : ''}`;
      return f;
    };
    if (!c.image) return pending();
    const img = new Image();
    img.className = 'figure';
    img.alt = fullName(c);
    img.draggable = false;
    img.onerror = () => { if (img.isConnected) { const p = pending(); p.style.cssText = img.style.cssText; img.replaceWith(p); if (figure === img) figure = p; } };
    img.src = c.image;
    return img;
  }

  function setMeta(i) {
    const c = characters[i];
    $('#scName').textContent = `${fullName(c)}, ${c.role}`;
    [...bars.children].forEach((b, j) => b.setAttribute('aria-selected', j === i));
  }

  function renderStatic(i) {
    const c = characters[i];
    Object.keys(render).forEach((k) => { el[k].innerHTML = render[k](c, i); });
    setNames(c);
    figures.replaceChildren(figure = makeFigure(c, i));
    setMeta(i);
  }

  const OUT = 'cubic-bezier(.6,0,.8,.4)';
  function slideOut(nodes, dir, delay, stagger = 25, dur = 340) {
    nodes.forEach((o, k) => o.animate(
      [{ transform: 'none', opacity: 1 }, { transform: `translateY(${-dir * 105}%)`, opacity: 0 }],
      { duration: T(dur), delay: T(delay + k * stagger), easing: OUT, fill: 'forwards' }
    ));
  }
  function slideIn(nodes, dir, delay, stagger = 45, dur = 760) {
    nodes.forEach((o, k) => o.animate(
      [{ transform: `translateY(${dir * 105}%)`, opacity: 0 }, { transform: 'none', opacity: 1 }],
      { duration: T(dur), delay: T(delay + k * stagger), easing: EASE, fill: 'backwards' }
    ));
  }

  // "page turn": names, figure and every text block change together, with small offsets
  function go(to, dir) {
    if (lock) return;
    to = (to + n) % n;
    if (to === idx) return;
    dir = dir || (to > idx ? 1 : -1);
    lock = true;
    const c = characters[to];

    // 1. huge names, letter by letter
    const oldLetters = nameLayers.flatMap((l) => [...l.querySelectorAll('.l')]);
    nameLayers.forEach((l) => slideOut([...l.querySelectorAll('.l')], dir, 0, 14, 380));
    setTimeout(() => {
      setNames(c);
      nameLayers.forEach((l) => slideIn([...l.querySelectorAll('.l')], dir, 0, 22, 820));
    }, T(420 + Math.min(oldLetters.length / 2, 12) * 14));

    // 2. figure: current drifts sideways, shrinks, fades; next enters from the other side
    const old = figure;
    const from = getComputedStyle(old).transform;
    old.animate(
      [{ transform: from === 'none' ? 'translateX(-50%)' : from, opacity: 1, filter: 'blur(0px) brightness(1)' },
       { transform: `translateX(calc(-50% + ${-dir * 38}%)) scale(.86)`, opacity: 0, filter: 'blur(8px) brightness(.6)' }],
      { duration: T(760), easing: EASE_IO, fill: 'forwards' }
    ).finished.then(() => old.remove());
    figure = makeFigure(c, to);
    figures.appendChild(figure);
    figure.animate(
      [{ transform: `translateX(calc(-50% + ${dir * 30}%)) scale(.9)`, opacity: 0, filter: 'blur(8px)' },
       { transform: 'translateX(-50%) scale(1)', opacity: 1, filter: 'blur(0px)' }],
      { duration: T(1000), delay: T(260), easing: EASE, fill: 'backwards' }
    );

    // 3. foreground text, cascading
    ['index', 'intro', 'role', 'zodiac', 'desc', 'highlight'].forEach((key, k) => {
      const host = el[key];
      const d = 80 + k * 50;
      slideOut([...host.querySelectorAll('.in')], dir, d);
      setTimeout(() => {
        host.innerHTML = render[key](c, to);
        slideIn([...host.querySelectorAll('.in')], dir, 0);
      }, T(d + 380));
    });

    idx = to;
    setMeta(idx);
    setTimeout(() => { lock = false; }, T(1100));
  }

  // arrows, bars, keys
  $('#prev').addEventListener('click', () => go(idx - 1, -1));
  $('#next').addEventListener('click', () => go(idx + 1, 1));
  bars.addEventListener('click', (e) => { const b = e.target.closest('.sc-bar'); if (b) go(+b.dataset.i); });
  document.addEventListener('keydown', (e) => {
    if (body.dataset.view !== 'dept') return;
    if (e.key === 'Escape') return back();
    const r = root.getBoundingClientRect();
    if (r.bottom < innerHeight * 0.3 || r.top > innerHeight * 0.7) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1, 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1, -1); }
  });

  // wheel: once the showcase fills the screen, the wheel flips people instead of scrolling.
  // At the first/last person the page scrolls normally again.
  let acc = 0, lastWheel = 0, held = false;
  root.addEventListener('wheel', (e) => {
    if (body.dataset.view !== 'dept') return;
    const r = root.getBoundingClientRect();
    if (Math.abs(r.top) > innerHeight * 0.14) return;
    const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    const dir = Math.sign(d);
    const now = performance.now();
    const quiet = now - lastWheel > 220;
    lastWheel = now;
    if (held && !quiet) { e.preventDefault(); return; } // swallow trackpad inertia after a flip
    held = false;
    const to = idx + dir;
    if (!dir || to < 0 || to >= n) { acc = 0; return; }
    e.preventDefault();
    if (lock) return;
    acc += d;
    if (Math.abs(acc) > 40) { acc = 0; held = true; go(to, dir); }
  }, { passive: false });

  // drag / swipe anywhere on the composition
  let drag = null;
  root.addEventListener('pointerdown', (e) => {
    if (lock || e.target.closest('button') || (e.pointerType === 'mouse' && e.button !== 0)) return;
    drag = { x: e.clientX, y: e.clientY, dx: 0, id: e.pointerId, moved: false };
  });
  root.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    drag.dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(drag.dx) > 8 && Math.abs(drag.dx) > Math.abs(e.clientY - drag.y)) {
      drag.moved = true;
      root.setPointerCapture(e.pointerId);
      root.classList.add('is-dragging');
    }
    if (drag.moved) figure.style.transform = `translateX(calc(-50% + ${drag.dx * 0.45}px)) rotate(${drag.dx * 0.01}deg)`;
  });
  const endDrag = () => {
    if (!drag) return;
    const { dx, moved } = drag;
    drag = null;
    root.classList.remove('is-dragging');
    if (!moved) return;
    if (Math.abs(dx) > 60) {
      go(idx + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    } else {
      const f = figure;
      f.animate([{ transform: getComputedStyle(f).transform }, { transform: 'translateX(-50%)' }], { duration: T(400), easing: EASE });
    }
    requestAnimationFrame(() => { figure.style.transform = ''; });
  };
  root.addEventListener('pointerup', endDrag);
  root.addEventListener('pointercancel', endDrag);

  return { reset() { idx = 0; renderStatic(0); } };
})();

showcase.reset();
