const WA = '261377519833';

// ─── UC MODAL ────────────────────────────────────────────────────────────────

function openModal(uc, price, key) {
  const ucData = {
    '30': '30', '60': '60', '325': '325',
    '660': '660', '1800': '1 800', '16200': '16 200'
  };
  document.getElementById('modal').classList.add('active');
  document.getElementById('modalAmount').textContent = ucData[key] || uc.replace(' UC', '');
  document.getElementById('modalPrice').textContent = price;
  document.getElementById('modalPseudo').value = '';
  document.getElementById('modalId').value = '';
  refreshUCLink();
  setTimeout(() => document.getElementById('modalPseudo').focus(), 300);
}

function refreshUCLink() {
  const pseudo = document.getElementById('modalPseudo').value || '[pseudo]';
  const pid    = document.getElementById('modalId').value    || '[ID]';
  const amt    = document.getElementById('modalAmount').textContent + ' UC';
  const price  = document.getElementById('modalPrice').textContent;
  const msg = encodeURIComponent(
    `Bonjour PINK Gaming Store !\n\n▸ Pack : ${amt}\n▸ Prix : ${price}\n▸ Pseudo PUBG : ${pseudo}\n▸ Player ID : ${pid}`
  );
  document.getElementById('whatsappLink').href = `https://wa.me/${WA}?text=${msg}`;
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
}

function closeModalOutside(e) {
  if (e.target.id === 'modal') closeModal();
}

// ─── ABONNEMENT MODAL ────────────────────────────────────────────────────────

function openSubModal(name, price, bonus, isPlus) {
  document.getElementById('modalSub').classList.add('active');
  document.getElementById('subModalName').textContent  = name;
  document.getElementById('subModalPrice').textContent = price;
  document.getElementById('subModalBonus').textContent = bonus;
  document.getElementById('subModalPseudo').value = '';
  document.getElementById('subModalId').value    = '';

  const box = document.getElementById('subModalBox');
  if (isPlus) {
    box.classList.add('gold-theme');
    box.style.borderColor = '';
  } else {
    box.classList.remove('gold-theme');
    box.style.borderColor = 'var(--pink)';
  }

  refreshSubLink();
  setTimeout(() => document.getElementById('subModalPseudo').focus(), 300);
}

function refreshSubLink() {
  const pseudo = document.getElementById('subModalPseudo').value || '[pseudo]';
  const pid    = document.getElementById('subModalId').value     || '[ID]';
  const name   = document.getElementById('subModalName').textContent;
  const price  = document.getElementById('subModalPrice').textContent;
  const bonus  = document.getElementById('subModalBonus').textContent;
  const msg = encodeURIComponent(
    `Bonjour PINK Gaming Store !\n\n▸ Abonnement : ${name}\n▸ Prix : ${price}\n▸ Inclus : ${bonus}\n▸ Pseudo PUBG : ${pseudo}\n▸ Player ID : ${pid}`
  );
  document.getElementById('subWhatsappLink').href = `https://wa.me/${WA}?text=${msg}`;
}

function closeSubModal() {
  document.getElementById('modalSub').classList.remove('active');
}

function closeSubModalOutside(e) {
  if (e.target.id === 'modalSub') closeSubModal();
}

// ─── ORDER FORM ──────────────────────────────────────────────────────────────

function submitOrder() {
  const pack   = document.getElementById('pack').value;
  const id     = document.getElementById('pubgid').value.trim();
  const pseudo = document.getElementById('whatsapp').value.trim();

  if (!pack || !id || !pseudo) {
    alert('Veuillez remplir tous les champs avant de commander.');
    return;
  }

  const packLabels = {
    '30uc'    : '30 UC — 3 000 Ar',
    '60uc'    : '60 UC — 5 000 Ar',
    '325uc'   : '325 UC — 21 000 Ar',
    '660uc'   : '660 UC — 41 000 Ar',
    '1800uc'  : '1 800 UC — 100 000 Ar',
    '16200uc' : '16 200 UC — 793 000 Ar',
    'prime1m' : 'Prime 1 mois — 6 000 Ar',
    'prime3m' : 'Prime 3 mois — 17 000 Ar',
    'prime6m' : 'Prime 6 mois — 28 000 Ar',
    'prime12m': 'Prime 12 mois — 50 000 Ar',
    'plus1m'  : 'Prime Plus 1 mois — 42 000 Ar',
    'plus3m'  : 'Prime Plus 3 mois — 188 000 Ar',
    'plus6m'  : 'Prime Plus 6 mois — 229 000 Ar',
    'plus12m' : 'Prime Plus 12 mois — 448 000 Ar',
  };

  const msg = encodeURIComponent(
    `Bonjour PINK Gaming Store !\n\nNouvelle commande :\n▸ Pack : ${packLabels[pack]}\n▸ Pseudo PUBG : ${pseudo}\n▸ Player ID : ${id}`
  );
  window.open(`https://wa.me/${WA}?text=${msg}`, '_blank');
}

// ─── SCROLL ANIMATIONS ───────────────────────────────────────────────────────

const fadeEls  = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));

// ─── NAV MOBILE ──────────────────────────────────────────────────────────────

function toggleMobileMenu() {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('active');
  const spans = document.querySelectorAll('.nav-toggle span');
  if (links.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity   = '1';
    spans[2].style.transform = 'none';
  }
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('active');
    const spans = document.querySelectorAll('.nav-toggle span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity   = '1';
    spans[2].style.transform = 'none';
  });
});

// ─── PRIME PLUS HOLD EFFECT ──────────────────────────────────────────────────

document.querySelectorAll('.uc-card.prime-plus').forEach(card => {
  const addHold    = () => card.classList.add('holding');
  const removeHold = () => card.classList.remove('holding');
  card.addEventListener('mousedown',   addHold);
  card.addEventListener('touchstart',  addHold,    { passive: true });
  card.addEventListener('mouseup',     removeHold);
  card.addEventListener('mouseleave',  removeHold);
  card.addEventListener('touchend',    removeHold);
  card.addEventListener('touchcancel', removeHold);
});

// ─── KEYBOARD ESC ────────────────────────────────────────────────────────────

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeSubModal(); }
});