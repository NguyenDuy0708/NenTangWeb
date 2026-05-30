const galleryEl = document.getElementById('gallery');
const modalRoot = document.getElementById('modalRoot');
const palette = document.getElementById('palette');
const paletteInput = document.getElementById('paletteInput');
const paletteList = document.getElementById('paletteList');

const images = Array.from({length:9},(_,i)=>({ id:i+1, src:`https://placehold.co/600x400/ccd/000?text=Image+${i+1}`, title:`Ảnh ${i+1}` }));

let state = { index:0, playing:false, slideTimer:null };

function renderGallery(){
  galleryEl.innerHTML='';
  images.forEach((img,i)=>{
    const div = document.createElement('div'); div.className='thumb'; div.tabIndex=0; div.setAttribute('role','button'); div.setAttribute('aria-label',`Open ${img.title}`);
    const im = document.createElement('img'); im.src = img.src; im.alt = img.title;
    div.appendChild(im);
    div.addEventListener('click', ()=> openModal(i));
    div.addEventListener('keydown', e=>{ if(e.key === 'Enter') openModal(i); if(e.key === ' '){ e.preventDefault(); togglePlay(); } });
    galleryEl.appendChild(div);
  });
}

function openModal(index){ state.index = index; showModal(); }

function showModal(){ const img = images[state.index]; modalRoot.innerHTML = '';
  const m = document.createElement('div'); m.className='modal'; m.tabIndex=0; m.setAttribute('role','dialog'); m.setAttribute('aria-label','Image viewer');
  const panel = document.createElement('div'); panel.className='panel';
  const image = document.createElement('img'); image.src = img.src; image.alt = img.title;
  const title = document.createElement('div'); title.textContent = img.title;
  const nav = document.createElement('div'); nav.className='nav';
  const prev = document.createElement('button'); prev.textContent='←'; prev.addEventListener('click', prevImage); prev.setAttribute('aria-label','Previous image');
  const next = document.createElement('button'); next.textContent='→'; next.addEventListener('click', nextImage); next.setAttribute('aria-label','Next image');
  const play = document.createElement('button'); play.textContent = state.playing ? '⏸️' : '▶️'; play.addEventListener('click', togglePlay); play.setAttribute('aria-pressed', String(state.playing));
  const close = document.createElement('button'); close.textContent='✖️'; close.addEventListener('click', closeModal);
  nav.appendChild(prev); nav.appendChild(play); nav.appendChild(next); nav.appendChild(close);

  panel.appendChild(title); panel.appendChild(image); panel.appendChild(nav);
  m.appendChild(panel); modalRoot.appendChild(m);

  // focus
  panel.querySelector('button').focus();

  // key handlers
  m.addEventListener('keydown', modalKeyHandler);
  m.addEventListener('click', e=>{ if(e.target === m) closeModal(); });
}

function modalKeyHandler(e){
  if (e.key === 'ArrowRight') nextImage();
  else if (e.key === 'ArrowLeft') prevImage();
  else if (e.key === ' ') { e.preventDefault(); togglePlay(); }
  else if (e.key === 'Escape') closeModal();
  else if (/^[1-9]$/.test(e.key)) { const n = Number(e.key) - 1; if(n < images.length) { state.index = n; showModal(); } }
}

function nextImage(){ state.index = (state.index + 1) % images.length; showModal(); }
function prevImage(){ state.index = (state.index - 1 + images.length) % images.length; showModal(); }

function togglePlay(){ state.playing = !state.playing; if(state.playing){ state.slideTimer = setInterval(()=>{ state.index = (state.index+1)%images.length; showModal(); }, 2000); } else { clearInterval(state.slideTimer); state.slideTimer = null; } updatePlayButton(); }

function updatePlayButton(){ const btn = modalRoot.querySelector('.panel button'); if(btn) btn.textContent = state.playing ? 'Dừng' : 'Phát'; }

function closeModal(){ modalRoot.innerHTML=''; if(state.slideTimer){ clearInterval(state.slideTimer); state.slideTimer = null; state.playing = false; } }

//
document.addEventListener('keydown', e=>{
  // Ctrl+K mở palette
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){ e.preventDefault(); openPalette(); return; }

  // Nếu palette đang mở
  if (!palette.classList.contains('hidden')){
    if (e.key === 'Escape') closePalette();
    if (e.key === 'Enter'){ executeSelectedCommand(); }
    return;
  }

  // Nếu modal đang mở, cho phép trình xử lý modal quản lý (nó ủy quyền cho phần tử modal)
  if (modalRoot.children.length > 0) return;

  // phím tắt toàn cục cho thư viện
  if (e.key === 'ArrowRight') { state.index = (state.index + 1) % images.length; openModal(state.index); }
  if (e.key === 'ArrowLeft') { state.index = (state.index - 1 + images.length) % images.length; openModal(state.index); }
  if (e.key === ' ') { e.preventDefault(); state.playing = !state.playing; if(state.playing) togglePlay(); else togglePlay(); }
  if (/^[1-9]$/.test(e.key)){ const n = Number(e.key)-1; if(n < images.length) openModal(n); }
  if (e.key === 'Escape') closeModal();
});

// Lệnh
const commands = [
  { id:'next', title:'Hình tiếp theo', run:()=>{ state.index=(state.index+1)%images.length; openModal(state.index); } },
  { id:'prev', title:'Hình trước', run:()=>{ state.index=(state.index-1+images.length)%images.length; openModal(state.index); } },
  { id:'slideshow', title:'Chuyển đổi trình chiếu', run:()=>togglePlay() }
];

function openPalette(){ palette.classList.remove('hidden'); paletteInput.value=''; paletteInput.focus(); renderPalette(''); }
function closePalette(){ palette.classList.add('hidden'); paletteList.innerHTML=''; }

paletteInput.addEventListener('input', e=> renderPalette(e.target.value));
paletteInput.addEventListener('keydown', e=>{
  if (e.key === 'Escape') closePalette();
  if (e.key === 'Enter') executeSelectedCommand();
});

function renderPalette(q){ const v = q.trim().toLowerCase(); paletteList.innerHTML=''; const matches = commands.filter(c=> c.title.toLowerCase().includes(v)); matches.forEach((c,i)=>{ const li = document.createElement('li'); li.textContent = c.title; li.tabIndex=0; li.dataset.id = c.id; li.role = 'option'; li.setAttribute('aria-selected', i===0); li.addEventListener('click', ()=>{ c.run(); closePalette(); }); paletteList.appendChild(li); }); }

function executeSelectedCommand(){ const first = paletteList.querySelector('li'); if(first){ const id = first.dataset.id; const cmd = commands.find(c=>c.id===id); if(cmd){ cmd.run(); closePalette(); } } }

// init
renderGallery();
