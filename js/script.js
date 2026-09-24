const CONFIG = {
  whatsapp: '919360103305',
  bookingMessage: 'Thank you — this prototype has captured your enquiry. Connect a booking engine or CRM before production.'
};
const $ = s => document.querySelector(s),
  $$ = s => document.querySelectorAll(s);
const modal = id => $('#' + id).classList.add('open');
const closeModal = id => $('#' + id).classList.remove('open');
$('#menuBtn')?.addEventListener('click', () => $('.links').classList.toggle('open'));
$$('[data-book]').forEach(x => x.onclick = () => modal('bookingModal'));
$$('[data-close]').forEach(x => x.onclick = () => closeModal(x.dataset.close));
$$('.modal').forEach(m => m.onclick = e => {
  if (e.target === m) m.classList.remove('open')
});
$$('[data-lightbox]').forEach(x => x.onclick = () => {
  $('#lightboxImg').src = x.querySelector('img').src;
  $('#lightboxImg').alt = x.querySelector('img').alt;
  modal('lightbox')
});
$$('form').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const note = f.querySelector('.form-note');
  if (note) {
    note.textContent = CONFIG.bookingMessage;
    note.style.color = '#173c32'
  } else alert(CONFIG.bookingMessage)
}));
const ob = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) e.target.classList.add('show')
}), {
  threshold: .12
});
$$('.reveal').forEach(e => ob.observe(e));
window.addEventListener('scroll', () => {
  $('.site-header')?.classList.toggle('scrolled', scrollY > 40)
});