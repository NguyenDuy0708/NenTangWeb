const root = document.getElementById('root');

const products = [
  { id:1, name:'iPhone 16', price:25990000, category:'phone', image:'https://placehold.co/400x300/ddd/000?text=iPhone+16', rating:4.5, inStock:true },
  { id:2, name:'Samsung S24', price:22990000, category:'phone', image:'https://placehold.co/400x300/ddd/000?text=Samsung+S24', rating:4.4, inStock:true },
  { id:3, name:'Pixel 9', price:19990000, category:'phone', image:'https://placehold.co/400x300/ddd/000?text=Pixel+9', rating:4.6, inStock:true },
  { id:4, name:'MacBook Pro', price:45990000, category:'laptop', image:'https://placehold.co/400x300/ddd/000?text=MacBook+Pro', rating:4.8, inStock:true },
  { id:5, name:'Dell XPS 15', price:35990000, category:'laptop', image:'https://placehold.co/400x300/ddd/000?text=Dell+XPS+15', rating:4.7, inStock:true },
  { id:6, name:'ThinkPad X1', price:32990000, category:'laptop', image:'https://placehold.co/400x300/ddd/000?text=ThinkPad+X1', rating:4.5, inStock:false },
  { id:7, name:'AirPods Pro', price:6990000, category:'accessory', image:'https://placehold.co/400x300/ddd/000?text=AirPods+Pro', rating:4.3, inStock:true },
  { id:8, name:'Galaxy Buds', price:3490000, category:'accessory', image:'https://placehold.co/400x300/ddd/000?text=Galaxy+Buds', rating:4.1, inStock:true },
  { id:9, name:'USB-C Hub', price:990000, category:'accessory', image:'https://placehold.co/400x300/ddd/000?text=USB-C+Hub', rating:4.0, inStock:true },
  { id:10, name:'iPad Air', price:16990000, category:'tablet', image:'https://placehold.co/400x300/ddd/000?text=iPad+Air', rating:4.6, inStock:false },
  { id:11, name:'Xiaomi Pad 6', price:7990000, category:'tablet', image:'https://placehold.co/400x300/ddd/000?text=Xiaomi+Pad+6', rating:4.2, inStock:true },
  { id:12, name:'Lenovo Tab', price:4990000, category:'tablet', image:'https://placehold.co/400x300/ddd/000?text=Lenovo+Tab', rating:4.0, inStock:true }
];

let state = {
  items: products.slice(),
  query: '',
  category: 'all',
  sort: 'none',
  cart: {},
  dark: false
};

function formatMoney(v){ return v.toLocaleString('vi-VN') + 'đ'; }

function buildLayout(){
  const app = document.createElement('div'); app.className='app';

  const topbar = document.createElement('div'); topbar.className='topbar';
  const leftControls = document.createElement('div'); leftControls.className='controls';
  const search = document.createElement('input'); search.className='search'; search.placeholder='Tìm kiếm sản phẩm...';
  search.id='search';
  leftControls.appendChild(search);

  const categories = document.createElement('div'); categories.className='categories';
  ['all','phone','laptop','tablet','accessory'].forEach(c=>{
    const b = document.createElement('button'); b.className='cat-btn'; b.textContent = c=== 'all' ? 'Tất cả' : c[0].toUpperCase()+c.slice(1);
    b.dataset.cat = c; if(c==='all') b.classList.add('active'); categories.appendChild(b);
  });
  leftControls.appendChild(categories);

  const rightControls = document.createElement('div'); rightControls.className='controls';
  const sort = document.createElement('select'); sort.className='sort';
  ['none','price-asc','price-desc','name-asc','rating-desc'].forEach(val=>{
    const opt = document.createElement('option'); opt.value=val; opt.textContent = ({'none':'Sắp xếp','price-asc':'Giá ↑','price-desc':'Giá ↓','name-asc':'Tên A-Z','rating-desc':'Đánh giá cao nhất'}[val]); sort.appendChild(opt);
  });
  const cartBtn = document.createElement('button'); cartBtn.className='cart'; cartBtn.innerHTML='Giỏ hàng 🛒';
  const badge = document.createElement('span'); badge.className='badge hidden'; badge.id='cartBadge'; badge.textContent='0'; cartBtn.appendChild(badge);
  const darkBtn = document.createElement('button'); darkBtn.textContent='🌙';

  rightControls.appendChild(sort); rightControls.appendChild(cartBtn); rightControls.appendChild(darkBtn);

  topbar.appendChild(leftControls); topbar.appendChild(rightControls);
  app.appendChild(topbar);

  const grid = document.createElement('div'); grid.className='grid'; grid.id='grid'; app.appendChild(grid);

  const modalRoot = document.createElement('div'); modalRoot.id='modalRoot'; app.appendChild(modalRoot);

  root.appendChild(app);

  search.addEventListener('input', e=>{ state.query = e.target.value; searchProducts(); });
  categories.addEventListener('click', e=>{ if(e.target.dataset.cat){ filterByCategory(e.target.dataset.cat); categories.querySelectorAll('button').forEach(b=>b.classList.remove('active')); e.target.classList.add('active'); }});
  sort.addEventListener('change', e=>{ state.sort = e.target.value; sortProducts(); });
  cartBtn.addEventListener('click', ()=> alert('Giỏ hàng - số lượng: '+ Object.values(state.cart).reduce((s,n)=>s+n,0)));
  darkBtn.addEventListener('click', ()=>{ state.dark = !state.dark; document.body.classList.toggle('dark-mode', state.dark); });
}

function renderProducts(items){
  const grid = document.getElementById('grid'); grid.innerHTML='';
  items.forEach(p=>{
    const card = document.createElement('div'); card.className='card'; card.dataset.id = p.id;
    const img = document.createElement('img'); img.src = p.image; img.alt = p.name;
    const title = document.createElement('div'); title.className='title'; title.textContent = p.name;
    const price = document.createElement('div'); price.className='price'; price.textContent = formatMoney(p.price);
    const meta = document.createElement('div'); meta.className='meta';
    const rating = document.createElement('div'); rating.textContent = '⭐ '+p.rating;
    const add = document.createElement('button'); add.className='btn-add'; add.textContent = p.inStock ? 'Thêm vào giỏ' : 'Hết hàng'; add.disabled = !p.inStock;

    meta.appendChild(rating); meta.appendChild(add);
    card.appendChild(img); card.appendChild(title); card.appendChild(price); card.appendChild(meta);
    grid.appendChild(card);
  });

  grid.addEventListener('click', e=>{
    const card = e.target.closest('.card'); if(!card) return;
    const id = Number(card.dataset.id);
    if(e.target.classList.contains('btn-add')){ addToCart(id); e.stopPropagation(); return; }
    showModal(id);
  });
}

function filterByCategory(cat){ state.category = cat; const items = state.items.filter(p => cat==='all' ? true : p.category === cat); renderProducts(items); }

function searchProducts(){ const q = state.query.trim().toLowerCase(); const items = state.items.filter(p => p.name.toLowerCase().includes(q) && (state.category==='all' ? true : p.category===state.category)); renderProducts(items); }

function sortProducts(){ let items = state.items.slice(); if(state.category !== 'all') items = items.filter(p => p.category === state.category); if(state.query) items = items.filter(p => p.name.toLowerCase().includes(state.query.toLowerCase()));
  switch(state.sort){
    case 'price-asc': items.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': items.sort((a,b)=>b.price-a.price); break;
    case 'name-asc': items.sort((a,b)=>a.name.localeCompare(b.name)); break;
    case 'rating-desc': items.sort((a,b)=>b.rating-a.rating); break;
  }
  renderProducts(items);
}

function showModal(id){ const p = products.find(x=>x.id===id); if(!p) return; const modalRoot = document.getElementById('modalRoot'); modalRoot.innerHTML='';
  const modal = document.createElement('div'); modal.className='modal';
  const panel = document.createElement('div'); panel.className='panel';
  const h = document.createElement('h2'); h.textContent = p.name;
  const img = document.createElement('img'); img.src = p.image; img.style.width='100%'; img.style.borderRadius='8px';
  const desc = document.createElement('p'); desc.textContent = `Category: ${p.category} — Rating: ${p.rating}`;
  const price = document.createElement('p'); price.textContent = formatMoney(p.price);
  const add = document.createElement('button'); add.className='btn-add'; add.textContent = 'Thêm vào giỏ'; add.disabled = !p.inStock;
  add.addEventListener('click', ()=>{ addToCart(id); });
  const close = document.createElement('button'); close.textContent='Đóng'; close.style.marginLeft='12px'; close.addEventListener('click', ()=> modalRoot.innerHTML='');

  panel.appendChild(h); panel.appendChild(img); panel.appendChild(desc); panel.appendChild(price); panel.appendChild(add); panel.appendChild(close);
  modal.appendChild(panel); modalRoot.appendChild(modal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) modalRoot.innerHTML=''; });
}

function addToCart(id){ state.cart[id] = (state.cart[id] || 0) + 1; updateCartBadge(); }

function updateCartBadge(){ const n = Object.values(state.cart).reduce((s,x)=>s+x,0); const badge = document.getElementById('cartBadge'); badge.textContent = n; badge.classList.toggle('hidden', n===0); }
buildLayout(); renderProducts(state.items);
