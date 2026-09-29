import { departments, zodiacSigns } from './data.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
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
doorsEl.innerHTML = departments.map((d) => {
  const tag = d.open ? 'button' : 'div';
  const attrs = d.open
    ? `type="button" data-dept="${d.id}" aria-label="Enter ${esc(d.name)}"`
    : `aria-disabled="true" aria-label="${esc(d.name)}, coming soon"`;
  return `
  <${tag} class="door${d.open ? ' door--active' : ''}" role="listitem" style="--chars:${Math.max(d.name.length, 6)}" ${attrs}>
    <span class="door__glow" aria-hidden="true"></span>
    <span class="door__frame" aria-hidden="true">
      <span class="door__tunnel"><i></i><i></i><i></i><i></i></span>
      <span class="door__core"></span>
      <span class="door__seam"></span>
      <span class="door__leaves"><span class="door__leaf door__leaf--l"></span><span class="door__leaf door__leaf--r"></span></span>
      <span class="door__label">${esc(d.name)}</span>
      ${d.open ? '<span class="door__hint">Enter <span>→</span></span>' : ''}
    </span>
    <span class="door__meta" aria-hidden="true"><span>${d.index}${d.tag ? ` · ${esc(d.tag)}` : ''}</span>${d.open ? '<b>Open</b>' : '<span>Soon</span>'}</span>
    ${d.lead ? `<span class="door__lead" aria-hidden="true">Head · <b>${esc(d.lead)}</b></span>` : ''}
  </${tag}>`;
}).join('');
const openDoors = departments.filter((d) => d.open).length;
$('#doorSummary').textContent = openDoors === departments.length ? `${openDoors} departments, all open` : `${openDoors} of ${departments.length} doors open`;

const doorList = [...doorsEl.children];
let activeDoor = doorList[departments.findIndex((d) => d.id === 'international')] || $('.door--active', doorsEl);

/* doors carousel: the door nearest the centre is in focus (largest); the rest step down */
let focusIdx = -1;
function updateFocus() {
  const mid = doorsEl.getBoundingClientRect().left + doorsEl.clientWidth / 2;
  let best = 0, bestD = Infinity;
  doorList.forEach((d, i) => {
    const r = d.getBoundingClientRect();
    const dist = Math.abs(r.left + r.width / 2 - mid);
    if (dist < bestD) { bestD = dist; best = i; }
  });
  if (best === focusIdx) return;
  focusIdx = best;
  doorList.forEach((d, i) => d.dataset.rank = Math.min(Math.abs(i - best), 3));
  $('#doorName').textContent = departments[best].name;
}
function centerDoor(i, smooth = true) {
  i = Math.max(0, Math.min(doorList.length - 1, i));
  const d = doorList[i];
  doorsEl.scrollTo({ left: d.offsetLeft + d.offsetWidth / 2 - doorsEl.clientWidth / 2, behavior: smooth && !reduced ? 'smooth' : 'auto' });
}
let scrollRaf = 0;
doorsEl.addEventListener('scroll', () => { if (doorsEl.scrollTop) doorsEl.scrollTop = 0; if (!scrollRaf) scrollRaf = requestAnimationFrame(() => { scrollRaf = 0; updateFocus(); }); }, { passive: true });
addEventListener('resize', () => { if (body.dataset.view === 'doors') centerDoor(focusIdx, false); });
$('#doorsPrev').addEventListener('click', () => centerDoor(focusIdx - 1));
$('#doorsNext').addEventListener('click', () => centerDoor(focusIdx + 1));
// vertical wheel scrolls the row sideways, one door per notch
let wheelLock = 0;
doorsEl.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // trackpads already scroll sideways
  e.preventDefault();
  const now = performance.now();
  if (now < wheelLock || Math.abs(e.deltaY) < 4) return;
  wheelLock = now + 380;
  centerDoor(focusIdx + Math.sign(e.deltaY));
}, { passive: false });
// mouse drag to scroll (touch scrolls natively)
let dragDoors = null;
doorsEl.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse' && e.button === 0) dragDoors = { x: e.clientX, left: doorsEl.scrollLeft, moved: false }; });
addEventListener('pointermove', (e) => {
  if (!dragDoors) return;
  const dx = e.clientX - dragDoors.x;
  if (Math.abs(dx) > 6) { dragDoors.moved = true; doorsEl.classList.add('is-dragging'); }
  if (dragDoors.moved) doorsEl.scrollLeft = dragDoors.left - dx;
});
addEventListener('pointerup', () => {
  if (!dragDoors) return;
  const moved = dragDoors.moved; dragDoors = null;
  doorsEl.classList.remove('is-dragging');
  if (moved) { centerDoor(focusIdx); doorsEl.dataset.justDragged = '1'; setTimeout(() => delete doorsEl.dataset.justDragged, 60); }
});
document.addEventListener('keydown', (e) => {
  if (body.dataset.view !== 'doors') return;
  if (e.key === 'ArrowRight') { e.preventDefault(); centerDoor(focusIdx + 1); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); centerDoor(focusIdx - 1); }
});
// a click on a side door brings it to the centre; a click on the centred open door enters
doorList.forEach((d, i) => d.addEventListener('click', (e) => {
  if (doorsEl.dataset.justDragged) return;
  if (i !== focusIdx) return centerDoor(i);
  if (d.classList.contains('door--active')) { activeDoor = d; enter(departments[i]); }
}));
requestAnimationFrame(() => { centerDoor(doorList.indexOf(activeDoor), false); updateFocus(); });

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
$$('.door--active', doorsEl).forEach((d) => {
  d.addEventListener('pointerenter', () => lit(true));
  d.addEventListener('pointerleave', () => lit(false));
  d.addEventListener('focus', () => lit(true));
  d.addEventListener('blur', () => lit(false));
});

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
async function enter(d) {
  if (busy || body.dataset.view !== 'doors') return;
  busy = true;
  setDept(d);
  centerDoor(doorList.indexOf(activeDoor), false);
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
  fitTitle();
  showcase.reset(d.people);
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
  centerDoor(doorList.indexOf(activeDoor), false); // the row lost its scroll position while hidden
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
   DEPARTMENT INTRO (filled from data on every entry)
---------------------------------------------------------------- */
const titleEl = $('#deptTitle');
function setDept(d) {
  const lead = d.people[0];
  const n = d.people.length;
  dept.setAttribute('aria-label', `${d.name} department`);
  $('#deptEyebrow').innerHTML = `Department ${d.index} <span aria-hidden="true">/</span> Now open`;
  titleEl.setAttribute('aria-label', d.name);
  titleEl.innerHTML = [...d.name].map((c, i) => `<span class="ch" style="--i:${i}" aria-hidden="true">${c === ' ' ? '&nbsp;' : esc(c)}</span>`).join('');
  $('#deptLead').textContent = d.tagline
    || (d.lead ? `${n === 1 ? 'Meet' : `${n} people, led by`} ${lead.name === d.lead ? [lead.name, lead.surname].filter(Boolean).join(' ') : d.lead}.` : `${n} people, one team.`);
  const pillars = $('#deptPillars');
  pillars.hidden = !d.pillars?.length;
  pillars.innerHTML = (d.pillars || []).map((p, i) => `<li><span>0${i + 1}</span>${esc(p)}</li>`).join('');
}
// the department name always fills one line, whatever its length
function fitTitle() {
  titleEl.style.fontSize = '';
  const max = parseFloat(getComputedStyle(titleEl).fontSize);
  const w = titleEl.scrollWidth, W = titleEl.parentElement.clientWidth;
  if (w > W) titleEl.style.fontSize = Math.floor((max * W) / w) + 'px';
}
addEventListener('resize', () => { if (!dept.hidden) fitTitle(); });

/* ---------------------------------------------------------------
   CHARACTER SHOWCASE
---------------------------------------------------------------- */
const showcase = (() => {
  const root = $('#showcase');
  const figures = $('#figures');
  const bars = $('#bars');
  const nameLayers = [$('#scNames')];
  const el = { intro: $('#scIntro'), role: $('#scRole'), zodiac: $('#scZodiac'), desc: $('#scDesc'), highlight: $('#scHighlight'), index: $('#scIndex') };
  const nav = $('.sc-nav', root);
  const pad = (i) => String(i + 1).padStart(2, '0');
  let people = [], n = 0, idx = 0, lock = false, figure = null;

  function setPeople(list) {
    people = list; n = list.length;
    people.forEach((c) => { if (c.image) new Image().src = c.image; });
    $('#scTotal').textContent = '/ ' + String(n).padStart(2, '0');
    bars.innerHTML = people.map((c, i) => `<button class="sc-bar" type="button" role="tab" aria-label="${esc(fullName(c))}" data-i="${i}"></button>`).join('');
    nav.hidden = n < 2;
    root.classList.toggle('is-solo', n < 2);
  }

  function fullName(c) { return [c.name, c.surname].filter(Boolean).join(' '); }
  const letters = (w) => [...w].map((ch) => `<span class="l">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`).join('');
  const roleLines = (c) => c.roleLines || (c.role ? [c.role.split(' ')[0], c.role.split(' ').slice(1).join(' ')].filter(Boolean) : []);
  const paragraphs = (t = '') => t.split(/\n{2,}/).map((p) => `<p>${esc(p).replace(/\n/g, '<br>')}</p>`).join('');

  // each text block renders into masked ".in" pieces so it can slide out / in
  const render = {
    intro: (c) => c.intro ? `<span class="in">${esc(c.intro)}</span>` : '',
    role: (c) => roleLines(c).map((l) => `<span class="rl"><span class="in">${esc(l)}</span></span>`).join(''),
    zodiac: (c) => c.zodiac ? `<span class="in"><span class="sym">${zodiacSigns[c.zodiac.toLowerCase()] || ''}︎</span>${esc(c.zodiac)}</span>` : '',
    desc: (c) => c.description ? `<div class="in">${paragraphs(c.description)}</div>` : '',
    highlight: (c) => c.highlight ? `<span class="in">${esc(c.highlight)}</span>` : '',
    index: (c, i) => `<span class="in">${pad(i)}</span>`,
  };
  // fill a block and hide it when this person has nothing for it
  function fill(key, c, i) {
    const html = render[key](c, i);
    el[key].innerHTML = html;
    (key === 'highlight' ? el[key].closest('figure') : el[key]).hidden = !html;
    if (key === 'desc' || key === 'highlight') root.classList.toggle('is-quiet', !c.description && !c.highlight);
  }

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
    const cap = innerWidth <= 900 ? Math.min(innerHeight * 0.068, W * 0.3) : innerHeight * 0.14;
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
      f.innerHTML = `<b>${esc(c.name[0] || '')}${esc((c.surname || '')[0] || '')}</b>Portrait coming soon`;
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
    const c = people[i];
    $('#scName').textContent = [fullName(c), c.role].filter(Boolean).join(', ');
    [...bars.children].forEach((b, j) => b.setAttribute('aria-selected', j === i));
  }

  function renderStatic(i) {
    const c = people[i];
    Object.keys(render).forEach((k) => fill(k, c, i));
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
    const c = people[to];

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
        fill(key, c, to);
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
    if (lock || n < 2 || e.target.closest('button') || (e.pointerType === 'mouse' && e.button !== 0)) return;
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

  return { reset(list) { if (list) setPeople(list); idx = 0; lock = false; renderStatic(0); } };
})();
