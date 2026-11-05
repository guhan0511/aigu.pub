/**
 * 全站交互逻辑 —— 导航渲染、滚动动效、数字计数、故事卡 / 联系方式渲染。
 * 依赖 window.SITE_DATA（见 js/data.js），在每个页面的 </body> 前引入。
 */
(function () {
  'use strict';

  var DATA = window.SITE_DATA || {};
  var isHome = /(^|\/)index\.html$/.test(location.pathname) || /\/$/.test(location.pathname);

  function anchor(id) {
    return isHome ? '#' + id : 'index.html#' + id;
  }

  /* -------------------- nav + footer -------------------- */
  function renderNav() {
    var slot = document.getElementById('site-nav-slot');
    if (!slot || !DATA.nav) return;

    var linksHtml = DATA.nav.map(function (item) {
      var isCta = item.anchor === 'connect';
      return '<a class="nav-link' + (isCta ? ' is-cta' : '') + '" href="' + anchor(item.anchor) + '">' +
        '<span class="cn">' + item.cn + '</span><span class="en">' + item.en + '</span></a>';
    }).join('');

    slot.innerHTML =
      '<nav class="site-nav" id="site-nav">' +
      '  <div class="container nav-inner">' +
      '    <a href="index.html" class="nav-brand" aria-label="回到首页">' +
      '      <span class="en">' + DATA.brand.en + '</span>' +
      '      <span class="cn">' + DATA.brand.cn + '</span>' +
      '    </a>' +
      '    <div class="nav-links">' + linksHtml + '</div>' +
      '    <button class="nav-toggle" id="nav-toggle" aria-label="打开菜单" aria-expanded="false">' +
      '      <span></span><span></span><span></span>' +
      '    </button>' +
      '  </div>' +
      '</nav>' +
      '<div class="nav-mobile-panel" id="nav-mobile-panel">' + linksHtml + '</div>';

    var navEl = document.getElementById('site-nav');
    var toggle = document.getElementById('nav-toggle');
    var panel = document.getElementById('nav-mobile-panel');

    function onScroll() {
      if (window.scrollY > 10) navEl.classList.add('is-scrolled');
      else navEl.classList.remove('is-scrolled');
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    toggle.addEventListener('click', function () {
      var open = panel.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    panel.querySelectorAll('.nav-link').forEach(function (a) {
      a.addEventListener('click', function () {
        panel.classList.remove('is-open');
        toggle.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  function renderFooter() {
    var slot = document.getElementById('site-footer-slot');
    if (!slot || !DATA.social) return;
    var year = new Date().getFullYear();
    var s = DATA.social;

    slot.innerHTML =
      '<footer class="site-footer">' +
      '  <div class="container">' +
      '    <div class="footer-top">' +
      '      <div class="footer-brand">' +
      '        <div class="en">' + DATA.brand.en + '</div>' +
      '        <div class="cn">' + DATA.brand.cn + ' · Personal Archive</div>' +
      '      </div>' +
      '      <div class="footer-sign">Still moving.</div>' +
      '      <div class="footer-links">' +
      '        <a href="' + (s.wechat.url || '#') + '"' + (s.wechat.url ? '' : ' aria-disabled="true"') + '>' + s.wechat.label + '</a>' +
      '        <a href="' + (s.xiaohongshu.url || 'index.html#connect') + '">' + s.xiaohongshu.label + '</a>' +
      '        <a href="' + s.instagram.url + '" target="_blank" rel="noopener">' + s.instagram.label + '</a>' +
      '        <a href="' + s.email.url + '">' + s.email.label + '</a>' +
      '      </div>' +
      '    </div>' +
      '    <div class="footer-bottom">' +
      '      <span>' + DATA.brand.cn + ' © ' + year + '</span>' +
      '      <span>Designed as an editorial, not a résumé.</span>' +
      '    </div>' +
      '  </div>' +
      '</footer>';
  }

  /* -------------------- hero title split-in -------------------- */
  function initHero() {
    var h = document.getElementById('hero-title');
    if (!h) return;
    requestAnimationFrame(function () {
      setTimeout(function () { h.classList.add('is-in'); }, 150);
    });
  }

  /* -------------------- about facts -------------------- */
  function renderAbout() {
    var root = document.getElementById('about-root');
    if (!root || !DATA.about) return;
    var a = DATA.about;
    var pillsHtml = [a.name, a.birthday, a.mbti, a.zodiac].map(function (v) {
      return '<span class="pill">' + v + '</span>';
    }).join('') + a.keywords.map(function (k) {
      return '<span class="pill is-keyword">' + k + '</span>';
    }).join('');

    root.innerHTML =
      '<div class="about-pills reveal">' + pillsHtml + '</div>' +
      '<dl class="fact-list">' +
      '  <div class="fact-row reveal"><dt>Base</dt><dd>' + a.base + '</dd></div>' +
      '  <div class="fact-row reveal"><dt>状态 Now</dt><dd>' + a.status + '</dd></div>' +
      '</dl>';
    observeReveal(root);
  }

  /* -------------------- numbers -------------------- */
  var BOAT_ICON_SVG =
    '<svg class="number-boat-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M9 40h46l-6 11H15z"/>' +
    '<path d="M32 40V13"/>' +
    '<path d="M32 15l15 17H32z" fill="currentColor" fill-opacity=".12"/>' +
    '<path d="M32 19L19 32h13z" fill="currentColor" fill-opacity=".06"/>' +
    '</svg>';

  function renderNumbers() {
    var root = document.getElementById('numbers-root');
    if (!root || !DATA.numbers) return;

    var html = DATA.numbers.map(function (n, i) {
      var sizeClass = 'is-' + n.size;
      var toggleBtn = '<button type="button" class="number-toggle" aria-expanded="false" aria-label="展开详情"></button>';
      if (n.size === 'tags') {
        var tagsHtml = n.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('');
        return '<div class="number-item ' + sizeClass + ' reveal" tabindex="0" data-index="' + i + '">' +
          toggleBtn +
          '<div class="number-label"><strong>' + n.label + '</strong><span class="en">' + n.labelEn + '</span></div>' +
          '<div class="number-tags-list">' + tagsHtml + '</div>' +
          '<div class="number-caption">' + n.caption + '</div>' +
          '</div>';
      }
      if (n.size === 'lang') {
        var langsHtml = n.langs.map(function (l) {
          return '<span class="lang-chip"><strong>' + l.native + '</strong><em>' + l.en + '</em></span>';
        }).join('');
        return '<div class="number-item ' + sizeClass + ' reveal" tabindex="0" data-index="' + i + '">' +
          toggleBtn +
          '<div class="number-value"><span class="num-count" data-target="' + n.value + '">0</span>' + (n.unit ? '<span class="unit">' + n.unit + '</span>' : '') + '</div>' +
          '<div class="number-label">' + n.label + '<span class="en">' + n.labelEn + '</span></div>' +
          '<div class="number-lang-list">' + langsHtml + '</div>' +
          '<div class="number-caption">' + n.caption + '</div>' +
          '</div>';
      }
      var iconHtml = n.icon === 'boat' ? BOAT_ICON_SVG : '';
      var valueHtml = n.isText
        ? iconHtml + '<span class="num-count">' + n.value + '</span>'
        : '<span class="num-count" data-target="' + n.value + '">0</span>' + (n.unit ? '<span class="unit">' + n.unit + '</span>' : '');
      var flagsHtml = n.flags
        ? '<div class="number-flags">' + n.flags.map(function (f) {
          return '<img src="images/flags/' + f.cc + '.svg" alt="' + f.name + '" loading="lazy">';
        }).join('') + '</div>'
        : '';
      return '<div class="number-item ' + sizeClass + ' reveal" tabindex="0" data-index="' + i + '">' +
        toggleBtn +
        '<div class="number-value">' + valueHtml + '</div>' +
        '<div class="number-label">' + n.label + '<span class="en">' + n.labelEn + '</span></div>' +
        flagsHtml +
        '<div class="number-caption">' + n.caption + '</div>' +
        '</div>';
    }).join('');

    root.innerHTML = html;
    observeReveal(root);

    // tap-to-toggle caption on touch / click (in addition to hover)
    root.querySelectorAll('.number-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var wasActive = item.classList.contains('is-active');
        root.querySelectorAll('.number-item').forEach(function (el) {
          el.classList.remove('is-active');
          var btn = el.querySelector('.number-toggle');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        if (!wasActive) {
          item.classList.add('is-active');
          var activeBtn = item.querySelector('.number-toggle');
          if (activeBtn) activeBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // count-up animation when visible
    var counters = root.querySelectorAll('.num-count[data-target]');
    if (!counters.length) return;
    var counted = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !counted) {
          counted = true;
          counters.forEach(animateCount);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(root);
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-target'));
    if (isNaN(target)) return;
    var duration = 900;
    var start = performance.now();
    function tick(now) {
      var p = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* -------------------- stories -------------------- */
  function renderStories() {
    var root = document.getElementById('stories-root');
    if (!root || !DATA.stories) return;

    root.innerHTML = DATA.stories.map(function (s) {
      var logosHtml = s.logos
        ? '<div class="story-logos">' + s.logos.map(function (l) {
          return l.src
            ? '<span class="story-logo"><img src="' + l.src + '" alt="' + l.name + ' logo" loading="lazy"></span>'
            : '<span class="story-logo is-placeholder">' + l.name + '</span>';
        }).join('') + '</div>'
        : '';
      return '<a class="story-card story-card--' + s.theme + ' reveal" href="' + s.href + '">' +
        '  <div class="story-top">' +
        '    <span class="story-num">' + s.num + '</span>' +
        '    <span class="story-ghost" aria-hidden="true">' + s.num + '</span>' +
        '    <h3 class="story-title">' + s.title + '</h3>' +
        '    <p class="story-summary">' + s.summary + '</p>' +
        logosHtml +
        '  </div>' +
        '  <div class="story-tags">' +
        '    <span>' + s.tags + '</span>' +
        '    <span class="story-arrow" aria-hidden="true">→</span>' +
        '  </div>' +
        '</a>';
    }).join('');
    observeReveal(root);
  }

  /* -------------------- connect -------------------- */
  function renderConnect() {
    var root = document.getElementById('connect-root');
    if (!root || !DATA.social) return;
    var s = DATA.social;

    function item(key, s) {
      var valueHtml = s.url
        ? '<a class="value" href="' + s.url + '"' + (key === 'instagram' ? ' target="_blank" rel="noopener"' : '') + '>' + s.value + '</a>'
        : '<span class="value">' + s.value + '</span>';
      var qrHtml = s.qr
        ? '<a class="qr-download" href="' + s.qr + '" download aria-label="保存' + s.label + '二维码">' +
          '<img class="channel-qr" src="' + s.qr + '" alt="' + s.label + ' 二维码，长按可保存" loading="lazy" width="120" height="120">' +
          '</a>'
        : '';
      return '<div class="connect-item reveal">' +
        '<div class="connect-details">' +
        '<span class="label-en">' + s.en + '</span>' +
        valueHtml +
        '</div>' +
        qrHtml +
        '</div>';
    }

    root.innerHTML =
      item('wechat', s.wechat) +
      item('xiaohongshu', s.xiaohongshu) +
      item('instagram', s.instagram) +
      item('linkedin', s.linkedin) +
      item('email', s.email);

    observeReveal(root);
  }

  /* -------------------- generic scroll reveal -------------------- */
  function observeReveal(scope) {
    var els = (scope || document).querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderNav();
    renderFooter();
    initHero();
    renderAbout();
    renderNumbers();
    renderStories();
    renderConnect();
    observeReveal(document);
  });
})();
