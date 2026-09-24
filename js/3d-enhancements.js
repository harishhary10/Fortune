document.addEventListener('DOMContentLoaded', function () {
  // ---------- Floating pill navigation with sliding indicator ----------
  var navLinks = document.querySelectorAll('.links a[href]');
  if (navLinks.length) {
    var dock = document.createElement('div');
    dock.className = 'floating-tabs';
    var glide = document.createElement('span');
    glide.className = 'glide';
    dock.appendChild(glide);

    var items = [];
    navLinks.forEach(function (link) {
      var label = link.textContent.trim();
      if (!label) return;
      var tab = document.createElement('a');
      tab.href = link.getAttribute('href');
      tab.title = label;
      tab.textContent = label.charAt(0);
      dock.appendChild(tab);
      items.push(tab);
    });
    document.body.appendChild(dock);

    var path = location.pathname.split('/').pop() || 'index.html';
    var activeIndex = 0;
    items.forEach(function (tab, i) {
      var href = tab.getAttribute('href');
      if (href === path) activeIndex = i;
      tab.addEventListener('mouseenter', function () {
        glide.style.transform = 'translateY(' + (i * 52) + 'px)';
      });
      tab.addEventListener('mouseleave', function () {
        glide.style.transform = 'translateY(' + (activeIndex * 52) + 'px)';
      });
    });
    if (items[activeIndex]) items[activeIndex].classList.add('active');
    glide.style.transform = 'translateY(' + (activeIndex * 52) + 'px)';
  }

  // ---------- 3D tilt interaction ----------
  var tiltTargets = document.querySelectorAll('.card, .feature, .image-frame, .gallery figure');
  tiltTargets.forEach(function (el) {
    el.classList.add('tilt');
    var inner = document.createElement('div');
    inner.className = 'tilt-inner';
    while (el.firstChild) inner.appendChild(el.firstChild);
    var shine = document.createElement('span');
    shine.className = 'tilt-shine';
    inner.appendChild(shine);
    el.appendChild(inner);

    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      inner.style.transform = 'rotateY(' + (px * 12) + 'deg) rotateX(' + (py * -12) + 'deg) translateZ(14px)';
    });
    el.addEventListener('mouseleave', function () {
      inner.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
    });
  });

  // ---------- Sliding segmented toggle for .filter buttons ----------
  var filter = document.querySelector('.filter');
  if (filter) {
    filter.classList.add('segment');
    var glide2 = document.createElement('span');
    glide2.className = 'segment-glide';
    filter.insertBefore(glide2, filter.firstChild);
    var btns = Array.prototype.slice.call(filter.querySelectorAll('button'));
    var place = function (btn) {
      if (!btn) return;
      glide2.style.width = btn.offsetWidth + 'px';
      glide2.style.transform = 'translateX(' + (btn.offsetLeft - 5) + 'px)';
    };
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        place(b);
      });
    });
    var startActive = filter.querySelector('button.active') || btns[0];
    if (startActive) startActive.classList.add('active');
    requestAnimationFrame(function () { place(startActive); });
    window.addEventListener('resize', function () {
      place(filter.querySelector('button.active') || btns[0]);
    });
  }
});
