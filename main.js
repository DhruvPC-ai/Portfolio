(function () {
  'use strict';
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Projects ---------- */
  var ICONS = {
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
    cart: '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>',
    db: '<ellipse cx="12" cy="5" rx="8" ry="3"></ellipse><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"></path><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"></path>',
    api: '<rect x="3" y="4" width="18" height="7" rx="2"></rect><rect x="3" y="13" width="18" height="7" rx="2"></rect><path d="M7 7.5h.01"></path><path d="M7 16.5h.01"></path>',
    game: '<rect x="2" y="6" width="20" height="12" rx="4"></rect><path d="M6 12h4M8 10v4"></path><path d="M15 11h.01M18 13h.01"></path>',
    code: '<path d="M16 18l6-6-6-6"></path><path d="M8 6l-6 6 6 6"></path>'
  };
  var LIVE_ICON = '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><path d="M15 3h6v6"></path><path d="M10 14L21 3"></path>';
  var GH_ICON = '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>';

  function svg(paths, size, sw) {
    var ns = 'http://www.w3.org/2000/svg';
    var el = document.createElementNS(ns, 'svg');
    el.setAttribute('width', size); el.setAttribute('height', size);
    el.setAttribute('viewBox', '0 0 24 24'); el.setAttribute('fill', 'none');
    el.setAttribute('stroke', 'currentColor'); el.setAttribute('stroke-width', sw || '1.9');
    el.setAttribute('stroke-linecap', 'round'); el.setAttribute('stroke-linejoin', 'round');
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = paths; // trusted, defined above
    return el;
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function str(v) { return v == null ? '' : String(v).trim(); }
  function safeUrl(u) {
    u = str(u);
    return /^(https?:\/\/|\/|\.\/|images\/)/i.test(u) ? u : '';
  }

  function renderProjects() {
    var list = document.getElementById('project-list');
    if (!list) return;
    var items = (window.PROJECTS || []).filter(function (p) { return p && p.show !== false && str(p.title); });
    items.forEach(function (p) {
      var card = el('article', 'card proj lift');

      var head = el('div', 'proj-head');
      var type = el('div', 'proj-type');
      var icon = el('span', 'proj-icon');
      icon.setAttribute('aria-hidden', 'true');
      icon.appendChild(svg(ICONS[p.icon] || ICONS.code, 18));
      type.appendChild(icon);
      if (str(p.label)) type.appendChild(el('span', 'proj-label', str(p.label)));
      head.appendChild(type);
      var meta = el('div', 'proj-meta');
      if (str(p.status)) meta.appendChild(el('span', 'proj-status', str(p.status)));
      if (str(p.year)) meta.appendChild(el('span', '', str(p.year)));
      head.appendChild(meta);
      card.appendChild(head);

      var img = safeUrl(p.image);
      if (img) {
        var shot = el('img', 'proj-shot');
        shot.src = img; shot.alt = 'Screenshot of ' + str(p.title); shot.loading = 'lazy';
        card.appendChild(shot);
      }

      var body = el('div', 'proj-body');
      body.appendChild(el('h3', '', str(p.title)));
      if (str(p.summary)) body.appendChild(el('p', 'muted', str(p.summary)));
      var points = (p.points || []).map(str).filter(Boolean);
      if (points.length) {
        var ul = el('ul', 'proj-points');
        points.forEach(function (t) { ul.appendChild(el('li', '', t)); });
        body.appendChild(ul);
      }
      var tags = (p.tags || []).map(str).filter(Boolean);
      if (tags.length) {
        var chips = el('div', 'chips');
        tags.forEach(function (t) { chips.appendChild(el('span', 'chip', t)); });
        body.appendChild(chips);
      }
      var live = safeUrl(p.live), source = safeUrl(p.source);
      if (live || source) {
        var links = el('div', 'proj-links');
        if (live) {
          var a = el('a', 'btn btn-primary btn-sm');
          a.href = live; a.target = '_blank'; a.rel = 'noopener noreferrer';
          a.appendChild(svg(LIVE_ICON, 16, '2')); a.appendChild(document.createTextNode('Live'));
          a.setAttribute('aria-label', 'Live demo of ' + str(p.title) + ' (opens in a new tab)');
          links.appendChild(a);
        }
        if (source) {
          var b = el('a', 'btn btn-ghost btn-sm');
          b.href = source; b.target = '_blank'; b.rel = 'noopener noreferrer';
          b.appendChild(svg(GH_ICON, 16, '2')); b.appendChild(document.createTextNode('Source'));
          b.setAttribute('aria-label', 'Source code of ' + str(p.title) + ' (opens in a new tab)');
          links.appendChild(b);
        }
        body.appendChild(links);
      }
      card.appendChild(body);
      list.appendChild(card);
    });
  }

  /* ---------- Theme toggle ---------- */
  function setupTheme() {
    var btn = document.getElementById('theme-toggle');
    var meta = document.querySelector('meta[name="theme-color"]');
    var timer;
    function label() {
      var light = root.getAttribute('data-theme') === 'light';
      var text = light ? 'Switch to dark mode' : 'Switch to light mode';
      btn.setAttribute('aria-label', text); btn.title = text;
      if (meta) meta.setAttribute('content', light ? '#F6F6F3' : '#0E1116');
    }
    label();
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      if (!reduceMotion) {
        root.classList.add('switching');
        clearTimeout(timer);
        timer = setTimeout(function () { root.classList.remove('switching'); }, 550);
      }
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('dc-portfolio-theme', next); } catch (e) {}
      label();
    });
  }

  /* ---------- Scroll reveal ---------- */
  function setupReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('.rv'));
    if (reduceMotion || typeof IntersectionObserver !== 'function') {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Active section in the header ---------- */
  function setupNav() {
    var ids = ['work', 'experience', 'projects', 'skills', 'contact'];
    var ind = document.getElementById('nav-ind');
    var contact = document.getElementById('nav-contact');
    var current = null, ticking = false;
    function update() {
      ticking = false;
      var line = Math.max(120, window.innerHeight * 0.35);
      var active = '';
      ids.forEach(function (id) {
        var s = document.getElementById(id);
        if (s && s.getBoundingClientRect().top <= line) active = id;
      });
      ids.forEach(function (id) {
        var link = document.getElementById('nav-' + id);
        if (!link) return;
        link.classList.toggle('is-active', id === active);
        if (id === active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      var bar = document.getElementById('navlinks');
      var shown = active ? document.getElementById('nav-' + active) : null;
      if (shown && bar && bar.scrollWidth > bar.clientWidth && active !== current) {
        var left = shown.offsetLeft - 8, right = shown.offsetLeft + shown.offsetWidth + 8;
        if (left < bar.scrollLeft || right > bar.scrollLeft + bar.clientWidth) {
          bar.scrollTo({ left: Math.max(0, right - bar.clientWidth), behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      }
      var target = active && active !== 'contact' ? document.getElementById('nav-' + active) : null;
      if (target) {
        var cs = getComputedStyle(target);
        var pl = parseFloat(cs.paddingLeft) || 0, pr = parseFloat(cs.paddingRight) || 0;
        ind.style.width = Math.max(0, target.offsetWidth - pl - pr) + 'px';
        ind.style.transform = 'translate(' + (target.offsetLeft + pl) + 'px,' + (target.offsetTop + target.offsetHeight - 9) + 'px)';
        ind.style.opacity = '1';
      } else {
        ind.style.opacity = '0';
      }
      current = active;
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
    update();
  }

  renderProjects();
  setupTheme();
  setupReveal();
  setupNav();
})();
