const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const pwInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submit');

const nameMsg = document.getElementById('nameMsg');
const nameIcon = document.getElementById('nameIcon');
const emailMsg = document.getElementById('emailMsg');
const pwMsg = document.getElementById('pwMsg');
const pwBar = document.getElementById('pwBar');
const confirmMsg = document.getElementById('confirmMsg');
const phoneMsg = document.getElementById('phoneMsg');

const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');

function validName(v){ return typeof v==='string' && v.trim().length>=2 && v.trim().length<=50 }
function validEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) }

function passwordStrength(pw){
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0..4
}

function strengthState(score){
  if (score <= 1) return {label:'Yếu', color:'#ef4444', width:'25%'};
  if (score === 2) return {label:'Trung bình', color:'#f59e0b', width:'60%'};
  return {label:'Mạnh', color:'#10b981', width:'100%'};
}

function validPhone(raw){ const digits = raw.replace(/[^0-9]/g,''); return digits.length === 10 }

function formatPhone(v){ const d = v.replace(/\D/g,'').slice(0,10); if(!d) return ''; return d.replace(/(\d{4})(\d{3})(\d{3})/,'$1-$2-$3'); }

function updateUI(){
  // name
  if (nameInput.value === '') { nameMsg.textContent=''; nameIcon.textContent=''; }
  else if (validName(nameInput.value)) { nameMsg.textContent=''; nameIcon.textContent='✅'; nameMsg.classList.add('ok'); }
  else { nameMsg.textContent='Tên phải từ 2-50 ký tự'; nameIcon.textContent='❌'; nameMsg.classList.remove('ok'); }

  // email
  if (emailInput.value === '') emailMsg.textContent='';
  else if (!validEmail(emailInput.value)) emailMsg.textContent='Email không hợp lệ';
  else emailMsg.textContent='';

  // password
  const s = passwordStrength(pwInput.value);
  const st = strengthState(s);
  pwBar.style.width = st.width; pwBar.style.background = st.color; pwMsg.textContent = pwInput.value ? st.label : '';

  // confirm
  if (!confirmInput.value) confirmMsg.textContent='';
  else if (confirmInput.value !== pwInput.value) confirmMsg.textContent='Mật khẩu không khớp';
  else confirmMsg.textContent='';

  // phone
  if (!phoneInput.value) phoneMsg.textContent='';
  else if (!validPhone(phoneInput.value)) phoneMsg.textContent='Số điện thoại phải 10 chữ số';
  else phoneMsg.textContent='';

  // enable submit
  const allValid = validName(nameInput.value) && validEmail(emailInput.value) && passwordStrength(pwInput.value) >= 2 && confirmInput.value === pwInput.value && validPhone(phoneInput.value);
  submitBtn.disabled = !allValid;
}

// events
nameInput.addEventListener('input', updateUI);
emailInput.addEventListener('input', updateUI);
pwInput.addEventListener('input', updateUI);
confirmInput.addEventListener('input', updateUI);

phoneInput.addEventListener('input', e=>{ const pos = phoneInput.selectionStart; phoneInput.value = formatPhone(phoneInput.value); updateUI(); });

form.addEventListener('submit', e=>{
  e.preventDefault();
  // show modal with info (except password)
  modalContent.innerHTML = `
    <p><strong>Tên:</strong> ${nameInput.value}</p>
    <p><strong>Email:</strong> ${emailInput.value}</p>
    <p><strong>Phone:</strong> ${phoneInput.value}</p>
  `;
  modal.classList.remove('hidden');
});

closeModal.addEventListener('click', ()=>{ modal.classList.add('hidden'); form.reset(); updateUI(); });

// init
updateUI();
