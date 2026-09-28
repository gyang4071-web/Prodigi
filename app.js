(() => {
  'use strict';

  // ---------------------------------------------------------------------
  // Paid Ads cast — configured in team.json. Each member renders ONLY if
  // its image asset actually loads. x/y are percentages of the office scene
  // and anchor each character's FEET (bottom-center). The team stands as one
  // group on the open floor beside the Paid Ads desks under WE BUILD (never
  // on furniture, never near Coffee Corner). Height is BASE_H% of the
  // scene's own height times `scale`, so size tracks the office artwork at
  // every breakpoint; larger y = closer to the viewer = higher zIndex.
  // ---------------------------------------------------------------------
  const BASE_H = 13.5;
  let TEAM = [];

  const sceneWrap = document.getElementById('sceneWrap');
  const scene = document.getElementById('scene');
  const officeImage = document.getElementById('officeImage');
  const cast = document.getElementById('cast');
  const characterCard = document.getElementById('characterCard');
  const cardName = document.getElementById('cardName');
  const cardRole = document.getElementById('cardRole');
  const cardNote = document.getElementById('cardNote');
  const cardMemories = document.getElementById('cardMemories');
  const cardClose = document.getElementById('cardClose');
  const cardBack = document.getElementById('cardBack');

  const department = document.getElementById('department');
  const gallerySection = document.getElementById('gallerySection');
  const galleryTitle = document.getElementById('galleryTitle');
  const gallerySubtitle = document.getElementById('gallerySubtitle');
  const galleryStatus = document.getElementById('galleryStatus');
  const photoGrid = document.getElementById('photoGrid');
  const fileInput = document.getElementById('fileInput');
  const backGallery = document.getElementById('backGallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');

  let activeAlbum = 'team';
  let focusedId = null;

  // ---------------------------------------------------------------------
  // Cast rendering
  // ---------------------------------------------------------------------
  function buildCast(){
    TEAM.forEach(member => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cast-member';
      btn.dataset.id = member.id;
      btn.style.setProperty('--m-x', member.x + '%');
      btn.style.setProperty('--m-y', member.y + '%');
      btn.style.setProperty('--m-h', (BASE_H * (member.scale || 1)) + '%');
      btn.style.setProperty('--m-z', member.zIndex || 1);
      btn.setAttribute('aria-label', `${member.name} — ${member.role}`);

      const img = document.createElement('img');
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';

      // Only keep this member in the scene if its production asset exists.
      img.addEventListener('error', () => btn.remove(), { once:true });
      img.src = member.image;

      const label = document.createElement('span');
      label.className = 'cast-name';
      label.textContent = member.name;

      btn.appendChild(img);
      btn.appendChild(label);
      btn.addEventListener('click', () => focusMember(member.id));

      cast.appendChild(btn);
    });
  }

  function positionCard(member){
    const wrapRect = sceneWrap.getBoundingClientRect();
    const cardW = characterCard.offsetWidth || 268;
    const cardH = characterCard.offsetHeight || 150;
    const margin = 14;

    let left = (member.x / 100) * wrapRect.width;
    let top = (member.y / 100) * wrapRect.height;

    // Anchor to the left of the person (cast sits in the right half of the
    // scene), vertically centered on them, clamped inside the frame.
    left = left - cardW - 28;
    top = top - cardH / 2;

    left = Math.max(margin, Math.min(left, wrapRect.width - cardW - margin));
    top = Math.max(margin, Math.min(top, wrapRect.height - cardH - margin));

    characterCard.style.left = `${left}px`;
    characterCard.style.top = `${top}px`;
  }

  function focusMember(id){
    const member = TEAM.find(m => m.id === id);
    if(!member) return;

    focusedId = id;
    scene.classList.add('focus-mode');
    cast.querySelectorAll('.cast-member').forEach(el => {
      el.classList.toggle('is-focused', el.dataset.id === id);
    });

    cardName.textContent = member.name;
    cardRole.textContent = member.role;
    cardNote.textContent = member.note;
    cardMemories.dataset.album = member.id;
    cardMemories.dataset.title = member.name;

    characterCard.classList.add('open');
    // Position after layout so offsetWidth/Height are accurate.
    requestAnimationFrame(() => positionCard(member));
  }

  function clearFocus(){
    if(!focusedId) return;
    focusedId = null;
    scene.classList.remove('focus-mode');
    cast.querySelectorAll('.cast-member.is-focused').forEach(el => el.classList.remove('is-focused'));
    characterCard.classList.remove('open');
  }

  cardClose.addEventListener('click', clearFocus);
  cardBack.addEventListener('click', clearFocus);

  scene.addEventListener('click', e => {
    if(!focusedId) return;
    if(e.target === scene || e.target === officeImage) clearFocus();
  });

  cardMemories.addEventListener('click', () => {
    const album = cardMemories.dataset.album;
    const title = cardMemories.dataset.title;
    clearFocus();
    openDepartment();
    setGallery(album, title);
    requestAnimationFrame(scrollToGallery);
  });

  // ---------------------------------------------------------------------
  // Department overlay
  // ---------------------------------------------------------------------
  function openDepartment(){
    department.classList.add('open');
    department.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function closeDepartment(){
    department.classList.remove('open');
    department.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  ['paidAnchor','openDept','openDeptTop','focusPaid'].forEach(id => {
    document.getElementById(id).addEventListener('click', openDepartment);
  });

  document.getElementById('closeDept').addEventListener('click', closeDepartment);
  department.addEventListener('click', e => { if(e.target === department) closeDepartment(); });

  function scrollToGallery(){
    gallerySection.scrollIntoView({behavior:'smooth',block:'start'});
  }

  // ---------------------------------------------------------------------
  // Gallery (Netlify Blobs backend — /api/gallery, unchanged contract)
  // ---------------------------------------------------------------------
  async function loadGallery(){
    galleryStatus.textContent = 'Loading photos…';
    photoGrid.innerHTML = '';

    try{
      const response = await fetch(`/api/gallery?action=list&album=${encodeURIComponent(activeAlbum)}`, {cache:'no-store'});
      let data = {};
      try{ data = await response.json(); }catch{ throw new Error('Gallery is temporarily unavailable.'); }
      if(!response.ok) throw new Error(data.error || 'Could not load gallery');

      const photos = Array.isArray(data.photos) ? data.photos : [];
      galleryStatus.textContent = photos.length ? `${photos.length} photo${photos.length === 1 ? '' : 's'}` : '';

      if(!photos.length){
        photoGrid.innerHTML = '<div class="empty"><div><b>No memories here yet.</b><br>Add the first one.</div></div>';
        return;
      }

      const frag = document.createDocumentFragment();

      photos.forEach(photo => {
        const button = document.createElement('button');
        button.className = 'photo';
        button.type = 'button';

        const img = document.createElement('img');
        img.loading = 'lazy';
        img.alt = '';
        img.src = photo.url;

        button.appendChild(img);
        button.addEventListener('click', () => {
          lightboxImage.src = photo.url;
          lightbox.classList.add('open');
          lightbox.setAttribute('aria-hidden','false');
        });

        frag.appendChild(button);
      });

      photoGrid.appendChild(frag);
    }catch(error){
      galleryStatus.textContent = error.message || 'Gallery is temporarily unavailable.';
      photoGrid.innerHTML = '<div class="empty">Gallery is temporarily unavailable.</div>';
    }
  }

  function setGallery(album,title){
    activeAlbum = album;

    if(album === 'team'){
      galleryTitle.textContent = 'Team Gallery';
      gallerySubtitle.textContent = 'Office moments, events and memories from Paid Ads.';
      backGallery.classList.remove('show');
    }else{
      galleryTitle.textContent = `${title} Gallery`;
      gallerySubtitle.textContent = `Photos and memories with ${title}.`;
      backGallery.classList.add('show');
    }

    loadGallery();
  }

  document.querySelectorAll('.person').forEach(card => {
    card.addEventListener('click', () => {
      setGallery(card.dataset.album,card.dataset.title);
      scrollToGallery();
    });
  });

  ['teamGalleryCta','teamGalleryLink'].forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
      setGallery('team','Team Gallery');
      scrollToGallery();
    });
  });

  backGallery.addEventListener('click', () => {
    setGallery('team','Team Gallery');
  });

  async function uploadOne(file){
    const form = new FormData();
    form.append('album', activeAlbum);
    form.append('file', file);

    const response = await fetch('/api/gallery', {method:'POST',body:form});
    let data = {};
    try{ data = await response.json(); }catch{}
    if(!response.ok) throw new Error(data.error || `Upload failed (${response.status})`);
  }

  fileInput.addEventListener('change', async () => {
    const files = [...fileInput.files];
    if(!files.length) return;

    try{
      for(let i=0;i<files.length;i++){
        galleryStatus.textContent = `Uploading ${i+1} of ${files.length}…`;
        await uploadOne(files[i]);
      }
      fileInput.value = '';
      galleryStatus.textContent = 'Memory added.';
      await loadGallery();
    }catch(error){
      galleryStatus.textContent = error.message || 'Upload failed.';
      fileInput.value = '';
    }
  });

  // ---------------------------------------------------------------------
  // Lightbox
  // ---------------------------------------------------------------------
  function closeLightboxNow(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    lightboxImage.removeAttribute('src');
  }

  document.getElementById('closeLightbox').addEventListener('click', closeLightboxNow);
  lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightboxNow(); });

  window.addEventListener('keydown', e => {
    if(e.key !== 'Escape') return;
    if(lightbox.classList.contains('open')) return closeLightboxNow();
    if(department.classList.contains('open')) return closeDepartment();
    if(focusedId) return clearFocus();
  });

  // ---------------------------------------------------------------------
  // Subtle parallax — real interface motion, not a static PNG-only page
  // ---------------------------------------------------------------------
  sceneWrap.addEventListener('pointermove', e => {
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = sceneWrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    officeImage.style.transform = `scale(1.03) translate(${x * -8}px,${y * -8}px)`;
  });

  sceneWrap.addEventListener('pointerleave', () => {
    officeImage.style.transform = 'scale(1.015)';
  });

  fetch('team.json', {cache:'no-cache'})
    .then(r => r.json())
    .then(data => { TEAM = Array.isArray(data.team) ? data.team : []; buildCast(); })
    .catch(err => console.error('Could not load team.json', err));
  loadGallery();
})();
