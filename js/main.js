(function () {
  'use strict';

  // ---- Settings you may want to change -------------------------------------
  // Contact address used by the mailto fallback.
  var CONTACT_EMAIL = 'hello@miscellanyoffunction.example';
  // Optional: a form-handling endpoint (Formspree, Netlify Forms, your own API).
  // When set, the form POSTs JSON there instead of opening the visitor's email app.
  var FORM_ENDPOINT = '';
  // --------------------------------------------------------------------------

  document.documentElement.classList.add('js');

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  function setNav(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  }
  toggle.addEventListener('click', function () {
    setNav(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setNav(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setNav(false);
  });

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Project form
  var form = document.getElementById('project-form');
  var status = document.getElementById('form-status');

  function say(msg) { status.textContent = msg; }

  function buildBrief(data) {
    var needs = data.needs.length ? data.needs.join(', ') : 'Not specified';
    return [
      'Name: ' + data.name,
      'Email: ' + data.email,
      'Business / group: ' + (data.org || '—'),
      'Needs: ' + needs,
      'Needed by: ' + (data.date || 'Flexible'),
      '',
      data.message
    ].join('\n');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var fd = new FormData(form);
    var data = {
      name: (fd.get('name') || '').toString().trim(),
      email: (fd.get('email') || '').toString().trim(),
      org: (fd.get('org') || '').toString().trim(),
      date: (fd.get('date') || '').toString(),
      message: (fd.get('message') || '').toString().trim(),
      needs: fd.getAll('need')
    };

    var bad = [];
    ['name', 'email', 'message'].forEach(function (k) {
      var el = form.elements[k];
      var ok = data[k] && (k !== 'email' || /^\S+@\S+\.\S+$/.test(data[k]));
      el.classList.toggle('invalid', !ok);
      el.setAttribute('aria-invalid', String(!ok));
      if (!ok) bad.push(el);
    });
    if (bad.length) {
      say('Please fill in your name, a valid email and a short description.');
      bad[0].focus();
      return;
    }

    if (FORM_ENDPOINT) {
      say('Sending…');
      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) {
        if (!r.ok) throw new Error('bad status');
        form.reset();
        say('Thanks! We’ll be in touch within two business days.');
      }).catch(function () {
        say('Something went wrong. Please email ' + CONTACT_EMAIL + ' instead.');
      });
      return;
    }

    var subject = 'Project inquiry' + (data.org ? ' — ' + data.org : '');
    window.location.href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(buildBrief(data));
    say('Opening your email app with your brief. If nothing opens, write to ' + CONTACT_EMAIL + '.');
  });
})();
