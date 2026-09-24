document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('.glass-nav');
  var gmenu = document.querySelector('.gmenu');
  var glinks = document.querySelector('.glinks');
  gmenu && gmenu.addEventListener('click', function () { glinks.classList.toggle('open'); });
  window.addEventListener('scroll', function () {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });

  var layer = document.querySelector('.cine-hero .layer');
  if (layer) {
    window.addEventListener('scroll', function () {
      var y = Math.min(window.scrollY, 600);
      layer.style.transform = 'translateZ(0) scale(1.08) translateY(' + (y * 0.25) + 'px)';
    });
  }

  var widgetForm = document.querySelector('.book-widget form');
  var results = document.querySelector('.room-results');
  if (widgetForm && results) {
    widgetForm.addEventListener('submit', function (e) {
      e.preventDefault();
      results.classList.add('show');
      results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  document.querySelectorAll('[data-book], .float-book, .mobile-book-bar button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = document.getElementById('bookingModal');
      if (modal) modal.classList.add('open');
    });
  });
});
