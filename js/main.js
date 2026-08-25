/*!
 * main.js — 100% Standalone Vanilla JavaScript Bundle
 *
 * Fully self-contained. Zero external dependencies required.
 *
 * Features included:
 *  1. Dynamic Google Fonts loader
 *  2. Custom smooth scroll (inertia lerp)
 *  3. Scroll-reveal animations (IntersectionObserver + scale/blur/fade)
 *  4. Floating glassmorphic navbar with shrink on scroll
 *  5. Mobile hamburger menu with animated cross icon
 *  6. Navbar dropdown menus (hover on desktop, toggle on mobile)
 *  7. Endless horizontal marquee ticker (with duplicate element generator)
 *  8. Service section item hover previews (Red arrow slide-in, title highlight, image card reveal)
 *  9. FAQ accordion toggle
 * 10. Pricing plans tab switcher
 * 11. Animated counter numbers on viewport scroll
 * 12. Hero image background parallax on scroll
 */

(function () {
    'use strict';

    /* ═══════════════════════════════════════════════════════════════
     *  1. DYNAMIC FONT & STYLE INJECTION
     * ═══════════════════════════════════════════════════════════════ */
    function injectFontsAndStyles() {
        /* Google Fonts */
        if (!document.getElementById('stodio-google-fonts')) {
            var fontLink = document.createElement('link');
            fontLink.id = 'stodio-google-fonts';
            fontLink.rel = 'stylesheet';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
            document.head.appendChild(fontLink);
        }

        /* Core UI Styles for JS Interactivity */
        var css = [
            /* Root Smooth Scroll & Sticky Footer Page Layout */
            'html { scroll-behavior: smooth; }',
            'html, body { overflow-x: hidden !important; width: 100% !important; margin: 0; padding: 0; }',
            '.page-wrapper { display: flex !important; flex-direction: column !important; min-height: 100vh !important; width: 100% !important; overflow-x: hidden !important; }',
            '#footer-placeholder { margin-top: auto !important; width: 100% !important; }',

            /* --- Scroll Reveal Animations --- */
            '.wf-ix-target {',
            '  opacity: 0 !important;',
            '  transform: translate3d(0, 45px, 0) scale(0.98) !important;',
            '  filter: blur(6px) !important;',
            '  will-change: opacity, transform, filter;',
            '  transition:',
            '    opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),',
            '    transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),',
            '    filter 0.85s cubic-bezier(0.16, 1, 0.3, 1) !important;',
            '}',
            '.wf-ix-target.wf-ix-visible {',
            '  opacity: 1 !important;',
            '  transform: translate3d(0, 0, 0) scale(1) !important;',
            '  filter: blur(0px) !important;',
            '}',

            /* --- Floating Sticky Navbar --- */
            '.navbar {',
            '  position: fixed !important;',
            '  top: 0; left: 0; right: 0;',
            '  width: 100%;',
            '  z-index: 1000;',
            '  transition: padding 0.4s ease, background-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease;',
            '}',
            '.navbar.nav-scrolled {',
            '  padding-top: 14px !important;',
            '  padding-bottom: 14px !important;',
            '  background-color: rgba(10, 10, 10, 0.88) !important;',
            '  backdrop-filter: blur(16px);',
            '  -webkit-backdrop-filter: blur(16px);',
            '  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);',
            '}',

            /* --- Navbar Dropdown Animation --- */
            '.dropdown-list {',
            '  display: block !important;',
            '  visibility: hidden;',
            '  opacity: 0;',
            '  transform: translate3d(0, 12px, 0) scale(0.97);',
            '  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s !important;',
            '  pointer-events: none;',
            '}',
            '.dropdown-list.w--open {',
            '  visibility: visible !important;',
            '  opacity: 1 !important;',
            '  transform: translate3d(0, 0, 0) scale(1) !important;',
            '  pointer-events: auto !important;',
            '}',

            /* --- Mobile Hamburger Menu --- */
            '@media (max-width: 991px) {',
            '  .nav-menu.w-nav-menu {',
            '    display: block !important;',
            '    visibility: hidden;',
            '    opacity: 0;',
            '    transform: translate3d(0, -10px, 0);',
            '    transition: opacity 0.35s ease, transform 0.35s ease, visibility 0.35s;',
            '    pointer-events: none;',
            '    background-color: #121212 !important;',
            '    border-radius: 16px !important;',
            '    padding: 24px !important;',
            '    box-shadow: 0 20px 40px rgba(0,0,0,0.5);',
            '  }',
            '  .nav-menu.w-nav-menu.w--open {',
            '    visibility: visible !important;',
            '    opacity: 1 !important;',
            '    transform: translate3d(0, 0, 0) !important;',
            '    pointer-events: auto !important;',
            '  }',
            '}',

            /* Animated Hamburger Icon Bars */
            '.top-bar, .middle-bar, .bottom-bar {',
            '  transition: transform 0.3s ease, opacity 0.3s ease !important;',
            '}',
            '.hamburger.w--open .top-bar { transform: translateY(8px) rotate(45deg); }',
            '.hamburger.w--open .middle-bar { opacity: 0; }',
            '.hamburger.w--open .bottom-bar { transform: translateY(-8px) rotate(-45deg); }',

            /* --- Button Roll Hover Animation --- */
            '.button { overflow: hidden; position: relative; }',
            '.button .button-content-block { height: 100%; display: flex; flex-direction: column; justify-content: center; }',
            '.button .button-inner { transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); }',
            '.button .button-inner.absolute {',
            '  position: absolute; top: 0; left: 0; right: 0; bottom: 0;',
            '  display: flex; align-items: center; justify-content: center;',
            '  transform: translate3d(0, 100%, 0);',
            '}',
            '.button:hover .button-inner:not(.absolute) { transform: translate3d(0, -100%, 0); }',
            '.button:hover .button-inner.absolute { transform: translate3d(0, 0, 0); }',

            /* --- Logo Marquee Ticker --- */
            '@keyframes marqueeScrollLeft {',
            '  0%   { transform: translate3d(0, 0, 0); }',
            '  100% { transform: translate3d(-50%, 0, 0); }',
            '}',
            '@keyframes marqueeScrollRight {',
            '  0%   { transform: translate3d(-50%, 0, 0); }',
            '  100% { transform: translate3d(0, 0, 0); }',
            '}',
            '.logo-container { overflow: hidden; width: 100%; position: relative; }',
            '.logos-row {',
            '  display: flex !important;',
            '  flex-wrap: nowrap !important;',
            '  animation: marqueeScrollLeft 22s linear infinite;',
            '  will-change: transform;',
            '}',
            '.logo-container:hover .logos-row { animation-play-state: paused; }',

            /* Spinning Marquee Star Icon */
            '@keyframes spinStar {',
            '  0%   { transform: rotate(0deg); }',
            '  100% { transform: rotate(360deg); }',
            '}',
            '.marquee-icon { animation: spinStar 10s linear infinite; }',

      /* ═══════════════════════════════════════════════════════════════',
       *  SERVICE SECTION PREVIEW & HOVER ANIMATION (1:1 FIDELITY)',
       * ═══════════════════════════════════════════════════════════════ */,
            '.service-item-wrapper {',
            '  cursor: pointer;',
            '  transition: opacity 0.35s ease;',
            '}',
            '.interaction-main-wrapper {',
            '  display: flex;',
            '  align-items: center;',
            '  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);',
            '}',

      /* Red Arrow (service-icon) slide-in transition */,
            '.service-iocn-wrap {',
            '  display: inline-flex;',
            '  align-items: center;',
            '  justify-content: center;',
            '  max-width: 0;',
            '  opacity: 0;',
            '  overflow: hidden;',
            '  margin-right: 0;',
            '  transition: max-width 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, margin-right 0.35s ease;',
            '}',
            '.service-icon {',
            '  width: 52px !important;',
            '  height: auto !important;',
            '  min-width: 48px !important;',
            '}',

      /* Title & number defaults: dimmed */,
            '.service-name {',
            '  opacity: 0.35;',
            '  color: #ffffff;',
            '  transition: opacity 0.35s ease, color 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);',
            '}',
            '.service-number {',
            '  opacity: 0.35;',
            '  color: #ffffff;',
            '  transition: opacity 0.35s ease, color 0.35s ease;',
            '}',

      /* ACTIVE / HOVERED Title state */,
            '.service-item-wrapper.is-active .service-name,',
            '.service-item-wrapper.is-hovered .service-name {',
            '  opacity: 1 !important;',
            '  color: #ffffff !important;',
            '}',

      /* ACTIVE / HOVERED Number state (Red) */,
            '.service-item-wrapper.is-active .service-number,',
            '.service-item-wrapper.is-hovered .service-number {',
            '  opacity: 1 !important;',
            '  color: #DE322D !important;',
            '}',

      /* ACTIVE / HOVERED Red Arrow Slide-in */,
            '.service-item-wrapper.is-active .service-iocn-wrap,',
            '.service-item-wrapper.is-hovered .service-iocn-wrap {',
            '  max-width: 76px !important;',
            '  opacity: 1 !important;',
            '  margin-right: 20px !important;',
            '}',

      /* Right Side Image Card Reveal */,
            '@media (min-width: 768px) {',
            '  .service-item-content {',
            '    opacity: 0;',
            '    pointer-events: none;',
            '    transform: translate3d(25px, 0, 0) scale(0.96);',
            '    transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);',
            '  }',
            '  .service-item-wrapper.is-active .service-item-content,',
            '  .service-item-wrapper.is-hovered .service-item-content {',
            '    opacity: 1 !important;',
            '    pointer-events: auto !important;',
            '    transform: translate3d(0, 0, 0) scale(1) !important;',
            '  }',
            '}',

            /* --- Mobile Services Layout (< 768px) matching mobile screenshot --- */,
            '@media (max-width: 767px) {',
            '  .service-item-block {',
            '    display: flex !important;',
            '    flex-direction: column !important;',
            '    gap: 36px !important;',
            '  }',
            '  .service-item-wrapper {',
            '    display: flex !important;',
            '    flex-direction: column !important;',
            '    width: 100% !important;',
            '  }',
            '  .interaction-main-wrapper {',
            '    margin-bottom: 16px !important;',
            '  }',
            '  .service-name {',
            '    opacity: 1 !important;',
            '    color: #ffffff !important;',
            '    font-size: 26px !important;',
            '  }',
            '  .service-number {',
            '    opacity: 1 !important;',
            '    color: #ffffff !important;',
            '    font-size: 20px !important;',
            '  }',
            '  .service-item-content {',
            '    position: relative !important;',
            '    inset: auto !important;',
            '    opacity: 1 !important;',
            '    pointer-events: auto !important;',
            '    transform: none !important;',
            '    width: 100% !important;',
            '    display: block !important;',
            '  }',
            '  .service-item-image {',
            '    width: 100% !important;',
            '    border-radius: 16px !important;',
            '    margin-bottom: 16px !important;',
            '  }',
            '  .service-iocn-wrap {',
            '    display: none !important;',
            '  }',
            '}',

            /* --- FAQ Accordion --- */
            '.faq-answer {',
            '  max-height: 0;',
            '  overflow: hidden;',
            '  opacity: 0;',
            '  transition: max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, padding 0.35s ease;',
            '}',
            '.faq-wrap.is-open .faq-answer {',
            '  max-height: 500px;',
            '  opacity: 1;',
            '}',
            '.faq-plus-l { transition: transform 0.35s ease, opacity 0.35s ease; }',
            '.faq-wrap.is-open .faq-plus-l { transform: rotate(90deg); opacity: 0; }',

            /* --- Pricing Tabs --- */
            '.w-tab-pane { display: none; }',
            '.w-tab-pane.w--tab-active { display: block; animation: fadeInTab 0.4s ease; }',
            '@keyframes fadeInTab { from { opacity: 0; transform: translate3d(0, 8px, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }',

            /* --- Counter Transition --- */
            '.counter-digit-single-wrapper { transition: transform 1.6s cubic-bezier(0.16, 1, 0.3, 1) !important; }',

            /* ═══════════ CTA SECTION ═══════════ */
            '.cta-section {',
            '  padding: 100px 0;',
            '  text-align: center;',
            '}',
            '.cta-block {',
            '  display: flex;',
            '  flex-direction: column;',
            '  align-items: center;',
            '  gap: 24px;',
            '}',

            /* Footer CSS removed per user request - handled exclusively in components/footer.html */,


        ].join('\n');

        var styleEl = document.createElement('style');
        styleEl.textContent = css;
        document.head.appendChild(styleEl);
    }

    /* ═══════════════════════════════════════════════════════════════
     *  2. SCROLL REVEAL ANIMATIONS
     * ═══════════════════════════════════════════════════════════════ */
    function initScrollReveal() {
        var elements = document.querySelectorAll('[data-w-id]');
        var targets = [];

        elements.forEach(function (el) {
            var st = el.getAttribute('style') || '';
            if (/opacity\s*:\s*0/.test(st)) {
                el.classList.add('wf-ix-target');
                targets.push(el);
            }
        });

        if (!targets.length) return;

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    setTimeout(function () {
                        el.classList.add('wf-ix-visible');
                    }, 50);
                    io.unobserve(el);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

        targets.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 40) {
                setTimeout(function () { el.classList.add('wf-ix-visible'); }, 80);
            } else {
                io.observe(el);
            }
        });
    }

    /* ═══════════════════════════════════════════════════════════════
     *  3. NAVBAR CONTROLLER
     * ═══════════════════════════════════════════════════════════════ */
    function initNavbar() {
        var navbar = document.querySelector('.navbar.w-nav');
        var hamburger = document.querySelector('.hamburger.w-nav-button');
        var navMenu = document.querySelector('.nav-menu.w-nav-menu');
        var dropdowns = document.querySelectorAll('.w-dropdown');

        if (navbar) {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 40) {
                    navbar.classList.add('nav-scrolled');
                } else {
                    navbar.classList.remove('nav-scrolled');
                }
            }, { passive: true });
        }

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function (e) {
                e.stopPropagation();
                var isOpen = hamburger.classList.toggle('w--open');
                navMenu.classList.toggle('w--open', isOpen);
            });

            navMenu.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', function () {
                    hamburger.classList.remove('w--open');
                    navMenu.classList.remove('w--open');
                });
            });
        }

        dropdowns.forEach(function (dd) {
            var toggle = dd.querySelector('.w-dropdown-toggle');
            var list = dd.querySelector('.w-dropdown-list');
            if (!toggle || !list) return;

            var timer;

            function openDropdown() {
                clearTimeout(timer);
                dropdowns.forEach(function (other) {
                    if (other !== dd) {
                        other.classList.remove('w--open');
                        var ot = other.querySelector('.w-dropdown-toggle');
                        var ol = other.querySelector('.w-dropdown-list');
                        if (ot) ot.classList.remove('w--open');
                        if (ol) ol.classList.remove('w--open');
                    }
                });

                dd.classList.add('w--open');
                toggle.classList.add('w--open');
                list.classList.add('w--open');
            }

            function closeDropdown() {
                timer = setTimeout(function () {
                    dd.classList.remove('w--open');
                    toggle.classList.remove('w--open');
                    list.classList.remove('w--open');
                }, 250);
            }

            dd.addEventListener('mouseenter', openDropdown);
            dd.addEventListener('mouseleave', closeDropdown);
            list.addEventListener('mouseenter', function () { clearTimeout(timer); });
            list.addEventListener('mouseleave', closeDropdown);

            toggle.addEventListener('click', function (e) {
                e.stopPropagation();
                if (dd.classList.contains('w--open')) {
                    closeDropdown();
                } else {
                    openDropdown();
                }
            });
        });

        document.addEventListener('click', function () {
            dropdowns.forEach(function (dd) {
                dd.classList.remove('w--open');
                var t = dd.querySelector('.w-dropdown-toggle');
                var l = dd.querySelector('.w-dropdown-list');
                if (t) t.classList.remove('w--open');
                if (l) l.classList.remove('w--open');
            });
            if (hamburger && navMenu) {
                hamburger.classList.remove('w--open');
                navMenu.classList.remove('w--open');
            }
        });
    }

    /* ═══════════════════════════════════════════════════════════════
     *  4. LOGO MARQUEE
     * ═══════════════════════════════════════════════════════════════ */
    function initMarquee() {
        var rows = document.querySelectorAll('.logos-row');
        rows.forEach(function (row, idx) {
            var logos = Array.from(row.children);
            logos.forEach(function (logo) {
                row.appendChild(logo.cloneNode(true));
            });

            if (idx % 2 !== 0) {
                row.style.animationName = 'marqueeScrollRight';
                row.style.animationDuration = '24s';
            }
        });
    }

    /* ═══════════════════════════════════════════════════════════════
     *  5. SERVICE SECTION (1:1 Webflow Hover & Active Behavior)
     * ═══════════════════════════════════════════════════════════════ */
    function initServices() {
        var items = document.querySelectorAll('.service-item-wrapper');
        if (!items.length) return;

        /* Set first item active by default (e.g. Mobile Design / UI UX) */
        items[0].classList.add('is-active');

        items.forEach(function (item) {
            item.addEventListener('mouseenter', function () {
                items.forEach(function (i) {
                    i.classList.remove('is-active');
                    i.classList.remove('is-hovered');
                });
                item.classList.add('is-hovered');
            });
        });

        var block = document.querySelector('.service-item-block');
        if (block) {
            block.addEventListener('mouseleave', function () {
                items.forEach(function (i) { i.classList.remove('is-hovered'); });
                items[0].classList.add('is-active');
            });
        }
    }

    /* ═══════════════════════════════════════════════════════════════
     *  6. FAQ ACCORDION
     * ═══════════════════════════════════════════════════════════════ */
    function initFAQ() {
        var faqs = document.querySelectorAll('.faq-wrap');
        faqs.forEach(function (faq) {
            var q = faq.querySelector('.faq-question');
            if (!q) return;

            q.addEventListener('click', function () {
                var isOpen = faq.classList.contains('is-open');
                faqs.forEach(function (f) { f.classList.remove('is-open'); });
                if (!isOpen) {
                    faq.classList.add('is-open');
                }
            });
        });
    }

    /* ═══════════════════════════════════════════════════════════════
     *  7. PRICING TABS
     * ═══════════════════════════════════════════════════════════════ */
    function initTabs() {
        document.querySelectorAll('.w-tabs').forEach(function (tabs) {
            var menu = tabs.querySelector('.w-tab-menu');
            var panes = tabs.querySelectorAll('.w-tab-pane');
            if (!menu) return;

            menu.querySelectorAll('.w-tab-link').forEach(function (link) {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    var target = link.getAttribute('data-w-tab');

                    menu.querySelectorAll('.w-tab-link').forEach(function (l) {
                        l.classList.toggle('w--current', l === link);
                    });

                    panes.forEach(function (pane) {
                        var active = pane.getAttribute('data-w-tab') === target;
                        pane.classList.toggle('w--tab-active', active);
                    });
                });
            });
        });
    }

    /* ═══════════════════════════════════════════════════════════════
     *  8. COUNTER DIGITS
     * ═══════════════════════════════════════════════════════════════ */
    function initCounters() {
        var wrappers = document.querySelectorAll('.counter-digit-single-wrapper');
        if (!wrappers.length) return;

        wrappers.forEach(function (w) {
            w._originalTransform = w.style.transform || w.style.webkitTransform || '';
            w.style.transform = 'translate3d(0, 0, 0)';
        });

        var counterSec = document.querySelector('.counter-section');
        if (!counterSec) return;

        var done = false;
        var io = new IntersectionObserver(function (entries) {
            if (done) return;
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    done = true;
                    wrappers.forEach(function (w, i) {
                        setTimeout(function () {
                            w.style.transform = w._originalTransform;
                        }, i * 70);
                    });
                    io.disconnect();
                }
            });
        }, { threshold: 0.2 });

        io.observe(counterSec);
    }

    /* ═══════════════════════════════════════════════════════════════
     *  9. HERO PARALLAX
     * ═══════════════════════════════════════════════════════════════ */
    function initHeroParallax() {
        var heroBg = document.querySelector('.hero-bg');
        if (!heroBg) return;

        window.addEventListener('scroll', function () {
            var sy = window.scrollY;
            var scale = Math.max(1.0, 1.4 - sy * 0.00025);
            var ty = sy * 0.2;
            heroBg.style.transform = 'translate3d(0, ' + ty + 'px, 0) scale3d(' + scale + ', ' + scale + ', 1)';
        }, { passive: true });
    }

    /* ═══════════════════════════════════════════════════════════════
     * 10. REUSABLE COMPONENT LOADER (Navbar & Footer)
     * ═══════════════════════════════════════════════════════════════ */
    function loadComponents(callback) {
        var navPlaceholder = document.getElementById('navbar-placeholder') || document.querySelector('header-component');
        var footPlaceholder = document.getElementById('footer-placeholder') || document.querySelector('footer-component');

        var pending = 0;

        function checkDone() {
            pending--;
            if (pending <= 0 && typeof callback === 'function') {
                callback();
            }
        }

        var isSubFolder = window.location.pathname.indexOf('/services/') !== -1;
        var imgPrefix = isSubFolder ? '../' : '';
        var linkPrefix = isSubFolder ? '../' : '';

        var defaultNav = '<div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="navbar w-nav">' +
            '<div class="container"><div class="nav-link-block"><div class="nav-left-wrapper">' +
            '<a href="' + linkPrefix + 'index.html" class="nav-link nav-logo w-inline-block"><div class="w-embed">' +
            '<svg width="126" height="29" viewBox="0 0 126 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.0881 13.5466C20.6953 13.9404 20.3946 14.4157 20.2073 14.9385C20.0199 15.4613 19.9506 16.0189 20.0041 16.5716L19.9855 16.553C20.0406 17.2035 19.9525 17.8581 19.7276 18.4712C19.5026 19.0843 19.1461 19.641 18.683 20.1027C18.2198 20.5642 17.6611 20.9196 17.0459 21.1437C16.4307 21.3679 15.7738 21.4557 15.1212 21.4008L15.1398 21.4194C14.3591 21.347 13.5749 21.5162 12.8942 21.9042C12.2136 22.2923 11.6695 22.88 11.3363 23.5874C11.0032 24.2949 10.897 25.0874 11.0323 25.8573C11.1677 26.627 11.538 27.3364 12.0927 27.8887C12.6474 28.441 13.3596 28.8094 14.132 28.9436C14.9046 29.0778 15.6997 28.9713 16.4093 28.6386C17.1188 28.3058 17.708 27.7632 18.0968 27.0845C18.4855 26.4058 18.6547 25.6242 18.5813 24.8461L18.601 24.8647C18.5459 24.2142 18.6339 23.5596 18.8588 22.9464C19.0838 22.3334 19.4404 21.7766 19.9035 21.315C20.3667 20.8534 20.9254 20.498 21.5405 20.2739C22.1558 20.0497 22.8126 19.9619 23.4653 20.0169L23.4456 19.9983C24.0834 20.0554 24.7254 19.9512 25.312 19.6953C25.8985 19.4393 26.4109 19.04 26.8013 18.5342C27.1918 18.0285 27.448 17.4326 27.5458 16.802C27.6437 16.1713 27.5803 15.5262 27.3615 14.9264C27.1426 14.3266 26.7753 13.7917 26.2938 13.371C25.8122 12.9504 25.2319 12.6577 24.6066 12.5201C23.9813 12.3826 23.3312 12.4045 22.7167 12.5839C22.1022 12.7634 21.5431 13.0945 21.0912 13.5466H21.0881Z" fill="#DE322D"></path><path d="M13.4404 18.9841L13.4207 18.9655C13.9755 19.0212 14.5357 18.9533 15.061 18.7668C15.5862 18.5803 16.0633 18.2798 16.4577 17.8871C16.852 17.4943 17.154 17.019 17.3414 16.4957C17.529 15.9724 17.5975 15.4142 17.5421 14.8613L17.5617 14.8799C17.5066 14.2293 17.5947 13.5748 17.8196 12.9616C18.0445 12.3486 18.4011 11.7918 18.8642 11.3302C19.3275 10.8686 19.8861 10.5132 20.5013 10.2891C21.1165 10.0649 21.7733 9.97716 22.4261 10.0321L22.4064 10.0135C23.1872 10.0866 23.9716 9.91781 24.6526 9.53026C25.3338 9.1427 25.8782 8.55519 26.2119 7.84788C26.5456 7.14058 26.6522 6.3479 26.5173 5.57797C26.3824 4.80803 26.0124 4.09833 25.4578 3.54566C24.9033 2.993 24.1912 2.62426 23.4186 2.48977C22.6461 2.35527 21.8507 2.46156 21.141 2.79413C20.4312 3.12669 19.8418 3.66936 19.4529 4.3481C19.0639 5.02683 18.8946 5.8086 18.968 6.58677L18.9493 6.56715C19.0046 7.21768 18.9167 7.87239 18.6918 8.48556C18.4669 9.09874 18.1103 9.65559 17.6472 10.1173C17.184 10.5788 16.6253 10.9342 16.01 11.1583C15.3947 11.3824 14.7378 11.47 14.085 11.4149L14.1037 11.4346C13.5489 11.3789 12.9886 11.4468 12.4634 11.6333C11.9382 11.8197 11.4611 12.1202 11.0667 12.513C10.6723 12.9057 10.3704 13.381 10.1829 13.9043C9.99541 14.4276 9.92691 14.9858 9.98235 15.5388L9.9637 15.5202C10.0186 16.1706 9.93043 16.8252 9.70546 17.4382C9.48037 18.0512 9.12389 18.608 8.66078 19.0695C8.19762 19.531 7.63902 19.8863 7.02392 20.1106C6.40882 20.3348 5.75204 20.4227 5.09937 20.368L5.11803 20.3866C4.33721 20.3135 3.55277 20.4822 2.87171 20.8698C2.19067 21.2574 1.64615 21.8448 1.31246 22.5522C0.978752 23.2595 0.872097 24.0522 1.00705 24.8221C1.14201 25.592 1.512 26.3017 2.06655 26.8544C2.62111 27.4071 3.33322 27.7758 4.10578 27.9103C4.87835 28.0447 5.67373 27.9385 6.38345 27.6059C7.09316 27.2734 7.68267 26.7308 8.07154 26.052C8.46046 25.3732 8.62979 24.5915 8.55642 23.8133L8.57611 23.8319C8.52098 23.1813 8.60907 22.5268 8.83404 21.9136C9.05892 21.3006 9.4155 20.7438 9.87862 20.2822C10.3418 19.8206 10.9005 19.4653 11.5156 19.2411C12.1309 19.0169 12.7877 18.9291 13.4404 18.9841Z" fill="#DE322D"></path><path d="M6.4974 16.9113C6.89018 16.5176 7.19089 16.0423 7.37808 15.5195C7.56528 14.9966 7.63433 14.4389 7.58032 13.8863L7.6 13.9049C7.54487 13.2543 7.63291 12.5994 7.85801 11.9862C8.0831 11.3729 8.43982 10.816 8.90324 10.3544C9.36667 9.89276 9.92554 9.5375 10.541 9.31345C11.1564 9.08938 11.8135 9.0019 12.4664 9.05713L12.4467 9.03854C13.2272 9.11143 14.0114 8.94258 14.6921 8.55505C15.3729 8.16752 15.917 7.58016 16.2506 6.87307C16.5841 6.16598 16.6906 5.37359 16.5557 4.60394C16.4208 3.8343 16.0508 3.12487 15.4965 2.5724C14.9422 2.01993 14.2303 1.65132 13.458 1.51683C12.6858 1.38234 11.8906 1.48852 11.1812 1.82089C10.4717 2.15325 9.88233 2.69563 9.49351 3.37405C9.10459 4.05248 8.93516 4.83393 9.00832 5.61183L8.98967 5.59324C9.0448 6.24373 8.95672 6.89837 8.73174 7.51146C8.50676 8.12455 8.1503 8.68132 7.68712 9.14293C7.22395 9.60453 6.66527 9.95983 6.05009 10.184C5.43491 10.4082 4.77805 10.496 4.12535 10.441L4.144 10.4596C3.50624 10.4026 2.86435 10.507 2.27784 10.7631C1.69132 11.0191 1.17914 11.4186 0.788757 11.9244C0.398378 12.4301 0.142436 13.0261 0.0446317 13.6567C-0.0531626 14.2874 0.0103514 14.9324 0.229287 15.5321C0.448223 16.1318 0.815514 16.6666 1.29711 17.0872C1.7787 17.5078 2.35902 17.8004 2.98429 17.938C3.60956 18.0754 4.25955 18.0534 4.87403 17.8741C5.48851 17.6946 6.04758 17.3635 6.49947 16.9113H6.4974Z" fill="#DE322D"></path><path d="M120.405 0.5C122.854 0.5 124.839 2.48542 124.839 4.93457C124.839 7.38373 122.854 9.36914 120.405 9.36914C117.956 9.36913 115.97 7.38372 115.97 4.93457C115.97 2.48543 117.956 0.500013 120.405 0.5Z" stroke="white"></path><path d="M118.43 6.90843V2.96075H120.329C120.742 2.96075 121.085 3.01343 121.357 3.1188C121.631 3.22417 121.836 3.37003 121.971 3.55637C122.107 3.74142 122.174 3.95538 122.174 4.19824C122.174 4.43984 122.106 4.65253 121.969 4.83629C121.834 5.01876 121.629 5.16075 121.355 5.26228C121.082 5.36381 120.74 5.41456 120.327 5.41456H118.888V4.90181H120.254C120.514 4.90181 120.726 4.87419 120.889 4.81894C120.54 4.76367 121.174 4.68335 121.251 4.57798C121.327 4.47261 121.365 4.34604 121.365 4.19824C121.365 4.0492 121.326 3.92003 121.248 3.81081C121.172 3.70157 121.051 3.61805 120.886 3.56022C120.723 3.50112 120.509 3.47156 120.243 3.47156H119.234V6.90843H118.43ZM121.061 5.12735L122.377 6.90843H121.461L120.171 5.12735H121.061Z" fill="white"></path><path d="M51.5014 10.1817C51.394 9.23459 50.9508 8.50093 50.1718 7.98069C49.3929 7.45379 48.4124 7.19034 47.2305 7.19034C46.3844 7.19034 45.6524 7.32373 45.0346 7.59052C44.4168 7.85064 43.9367 8.2108 43.5942 8.67101C43.2584 9.12454 43.0906 9.64145 43.0906 10.2217C43.0906 10.7086 43.2047 11.1288 43.433 11.4823C43.6681 11.8358 43.9736 12.1326 44.3497 12.3727C44.7324 12.6061 45.1421 12.8029 45.5786 12.963C46.0151 13.1164 46.4348 13.2431 46.8377 13.3431L48.8523 13.8634C49.5104 14.0234 50.1853 14.2402 50.8769 14.5137C51.5687 14.7871 52.21 15.1473 52.8009 15.5941C53.3919 16.041 53.8686 16.5946 54.2312 17.2549C54.6006 17.9152 54.7852 18.7056 54.7852 19.6259C54.7852 20.7865 54.4831 21.8169 53.8787 22.7174C53.281 23.6178 52.4114 24.3281 51.2698 24.8483C50.1349 25.3686 48.7616 25.6287 47.15 25.6287C45.6054 25.6287 44.2691 25.3853 43.1409 24.8983C42.0128 24.4115 41.1297 23.7212 40.4917 22.8274C39.8538 21.927 39.5012 20.8599 39.4341 19.6259H42.5567C42.6171 20.3663 42.8589 20.9833 43.2819 21.4769C43.7117 21.9637 44.259 22.3272 44.9238 22.5673C45.5954 22.8008 46.3307 22.9174 47.1298 22.9174C48.0095 22.9174 48.7918 22.7807 49.4768 22.5073C50.1685 22.2272 50.7124 21.8403 51.1086 21.3468C51.5048 20.8465 51.7029 20.263 51.7029 19.596C51.7029 18.989 51.5284 18.4921 51.1791 18.1053C50.8366 17.7184 50.3699 17.3983 49.779 17.1448C49.1948 16.8914 48.5333 16.668 47.7946 16.4746L45.357 15.8143C43.705 15.3674 42.3955 14.7104 41.4285 13.8434C40.4682 12.9763 39.9881 11.8291 39.9881 10.4018C39.9881 9.22126 40.3104 8.19079 40.9551 7.31039C41.5998 6.42999 42.4727 5.74634 43.5741 5.25946C44.6754 4.76591 45.9177 4.51913 47.301 4.51913C48.6978 4.51913 49.9301 4.76257 50.9978 5.24946C52.0723 5.73634 52.9184 6.40664 53.5362 7.26037C54.1541 8.10742 54.4764 9.08119 54.5032 10.1817H51.5014ZM63.7124 9.92157V12.3227H55.2611V9.92157H63.7124ZM57.5276 6.23991H60.5395V20.7765C60.5395 21.3568 60.6267 21.7936 60.8012 22.087C60.9759 22.3739 61.2008 22.5707 61.4762 22.6774C61.7582 22.7774 62.0637 22.8274 62.3928 22.8274C62.6346 22.8274 62.8462 22.8107 63.0275 22.7774C63.2088 22.7441 63.3498 22.7174 63.4505 22.6973L63.9944 25.1684C63.8198 25.2352 63.5714 25.3019 63.2491 25.3686C62.9266 25.4419 62.5237 25.482 62.0402 25.4887C61.2479 25.5019 60.5092 25.3619 59.8242 25.0684C59.1393 24.775 58.5852 24.3214 58.1622 23.7078C57.7391 23.0942 57.5276 22.3238 57.5276 21.3968V6.23991ZM71.6222 25.5987C70.1716 25.5987 68.9058 25.2686 67.8246 24.6083C66.7434 23.948 65.9041 23.0241 65.3064 21.837C64.7088 20.6498 64.4099 19.2625 64.4099 17.6751C64.4099 16.0811 64.7088 14.6871 65.3064 13.4932C65.9041 12.2993 66.7434 11.3722 67.8246 10.7119C68.9058 10.0516 70.1716 9.72149 71.6222 9.72149C73.0727 9.72149 74.3385 10.0516 75.4197 10.7119C76.5008 11.3722 77.3403 12.2993 77.9378 13.4932C78.5355 14.6871 78.8344 16.0811 78.8344 17.6751C78.8344 19.2625 78.5355 20.6498 77.9378 21.837C77.3403 23.0241 76.5008 23.948 75.4197 24.6083C74.3385 25.2686 73.0727 25.5987 71.6222 25.5987ZM71.6322 23.0875C72.5724 23.0875 73.3514 22.8408 73.9692 22.3472C74.5869 21.8537 75.0436 21.1967 75.3391 20.3764C75.6413 19.556 75.7924 18.6522 75.7924 17.6651C75.7924 16.6847 75.6413 15.7842 75.3391 14.9639C75.0436 14.1368 74.5869 13.4732 73.9692 12.973C73.3514 12.4727 72.5724 12.2226 71.6322 12.2226C70.6854 12.2226 69.8997 12.4727 69.2752 12.973C68.6574 13.4732 68.1974 14.1368 67.8952 14.9639C67.5997 15.7842 67.452 16.6847 67.452 16.6651C67.452 18.6522 67.5997 19.556 67.8952 20.3764C68.1974 21.1967 68.6574 21.8537 69.2752 22.3472C69.8997 22.8408 70.6854 23.0875 71.6322 23.0875ZM86.2153 25.5887C84.9663 25.5887 83.8516 25.2719 82.8711 24.6382C81.8974 23.998 81.1319 23.0875 80.5745 21.907C80.0239 20.7198 79.7485 19.2958 79.7485 17.635C79.7485 15.9744 80.0272 14.5537 80.5846 13.3731C81.1487 12.1926 81.9209 11.2889 82.9013 10.6619C83.8818 10.035 84.9931 9.72149 86.2354 9.72149C87.1957 9.72149 87.968 9.88156 88.5523 10.2017C89.1432 10.5152 89.5998 10.882 89.9222 11.3022C90.2513 11.7224 90.5064 12.0926 90.6877 12.4127H90.869V4.79925H93.8808V25.2885H90.9395V22.8975H90.6877C90.5064 23.2243 90.2445 23.5978 89.902 24.0179C89.5662 24.4382 89.1029 24.805 88.512 25.1184C87.921 25.432 87.1554 25.5887 86.2153 25.5887ZM86.8801 23.0375C87.7464 23.0375 88.4784 22.8107 89.076 22.3573C89.6804 21.897 90.1371 21.2601 90.4459 20.4463C90.7616 19.6326 90.9194 18.6855 90.9194 17.6051C90.9194 16.5379 90.7649 15.6041 90.4561 14.8038C90.1471 14.0034 89.6939 13.3798 89.0962 12.9329C88.4985 12.4861 87.7598 12.2626 86.8801 12.2626C85.9735 12.2626 85.2181 12.4961 84.6138 12.963C84.0093 13.4298 83.5527 14.0668 83.2438 14.8738C82.9416 15.6808 82.7906 16.5912 82.7906 17.6051C82.7906 18.6322 82.9449 19.556 83.2539 20.3764C83.5628 21.1967 84.0194 21.847 84.6238 22.3272C85.2348 22.8008 85.987 23.0375 86.8801 23.0375ZM96.4067 25.2885V9.92157H99.4185V25.2885H96.4067ZM97.9276 7.55051C97.4038 7.55051 96.9539 7.37709 96.5778 7.03026C96.2085 6.67677 96.0238 6.25658 96.0238 5.76969C96.0238 5.27614 96.2085 4.85595 96.5778 4.50912C96.9539 4.15563 97.4038 3.97888 97.9276 3.97888C98.4515 3.97888 98.898 4.15563 99.2673 4.50912C99.6434 4.85595 99.8314 5.27614 99.8314 5.76969C99.8314 6.25658 99.6434 6.67677 99.2673 7.03026C98.898 7.37709 98.4515 7.55051 97.9276 7.55051ZM108.215 25.5987C106.764 25.5987 105.498 25.2686 104.417 24.6083C103.336 23.948 102.497 23.0241 101.899 21.837C101.301 20.6498 101.002 19.2625 101.002 17.6751C101.002 16.0811 101.301 14.6871 101.899 13.4932C102.497 12.2993 103.336 11.3722 104.417 10.7119C105.498 10.0516 106.764 9.72149 108.215 9.72149C109.665 9.72149 110.931 10.0516 112.012 10.7119C113.093 11.3722 113.933 12.2993 114.53 13.4932C115.128 14.6871 115.427 16.0811 115.427 17.6751C115.427 19.2625 115.128 20.6498 114.53 21.837C113.933 23.0241 113.093 23.948 112.012 24.6083C110.931 25.2686 109.665 25.5987 108.215 25.5987ZM108.225 23.0875C109.165 23.0875 109.944 22.8408 110.562 22.3472C111.179 21.8537 111.636 21.1967 111.932 20.3764C112.234 19.556 112.385 18.6522 112.385 17.6651C112.385 16.6847 112.234 15.7842 111.932 14.9639C111.636 14.1368 111.179 13.4732 110.562 12.973C109.944 12.4727 109.165 12.2226 108.225 12.2226C107.278 12.2226 106.492 12.4727 105.868 12.973C105.25 13.4732 104.79 14.1368 104.488 14.9639C104.192 15.7842 104.044 16.6847 104.044 16.6651C104.044 18.6522 104.192 19.556 104.488 20.3764C104.79 21.1967 105.25 21.8537 105.868 22.3472C106.492 22.8408 107.278 23.0875 108.225 23.0875Z" fill="white"></path></svg></div></a></div>' +
            '<nav role="navigation" class="nav-menu w-nav-menu"><div class="nav-menu-wrp">' +
            '<a href="' + linkPrefix + 'index.html" class="nav-link w-nav-link">Home</a>' +
            '<a href="' + linkPrefix + 'services.html" class="nav-link w-nav-link">Services</a>' +
            '<div class="nav-link-inner"><a href="' + linkPrefix + 'services.html" class="nav-link w-nav-link">Work</a><div class="work-number">04</div></div>' +
            '<a href="' + linkPrefix + 'contact.html" class="nav-link w-nav-link">Contact</a>' +
            '</div></nav>' +
            '<div class="nav-right-wrapper"><div class="nav-button-wrapper">' +
            '<a href="' + linkPrefix + 'contact.html" class="button nav w-inline-block"><div class="button-image"><img loading="lazy" src="' + imgPrefix + 'images/69914c2c1f1665f8efe3888d_d244a24293009aa3cdd4f70efc688c3a_Button%20Image.svg" alt="" class="nav-button-image"></div><div class="button-content-block"><div class="button-inner"><div class="button-text-wrapper"><div class="button-text">Book A Call</div></div></div></div></a>' +
            '</div><div class="hamburger w-nav-button"><div class="top-bar"></div><div class="middle-bar"></div><div class="bottom-bar"></div></div></div>' +
            '</div></div></div>';

        var defaultFoot = '<section class="footer-section"><div class="container"><div class="footer-block"><div class="footer-link-block"><div class="footer-left-block"><div class="footer-title-block"><h2 class="heading-style-03">Stay updated with Rise news</h2></div><div class="footer-form-block w-form"><form id="newsletter-form" name="email-form" method="get" class="footer-form"><div class="form-input-wrapper"><input class="footer-input footer-input-field w-input" maxlength="256" placeholder="Enter your email" type="email" required=""></div><div class="footer-form-button"><input type="submit" class="form-button w-button" value="SUBSCRIBE"><div class="footer-button"><div class="footer-button-wrapper w-embed"><svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12L12 4" stroke="#0A0A0A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.5 4H12V10.5" stroke="#0A0A0A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></div></div></form><div class="success-message w-form-done" style="display:none;"><div>Thank you! Your submission has been received!</div></div><div class="error-message w-form-fail" style="display:none;"><div>Oops! Something went wrong while submitting the form.</div></div></div><div class="footer-social-wrapper"><a href="https://www.linkedin.com/" target="_blank" class="footer-social-link w-inline-block"><div class="footer-social-icon w-embed"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.1117 2H2.88594C2.39609 2 2 2.38672 2 2.86484V13.1328C2 13.6109 2.39609 14 2.88594 14H13.1117C13.6016 14 14 13.6109 14 13.1352V2.86484C14 2.38672 13.6016 2 13.1117 2Z" fill="white"></path></svg></div><div class="footer-social-arrow w-embed"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 9L9 3" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.125 3H9V7.875" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></a><a href="https://www.instagram.com/" target="_blank" class="footer-social-link w-inline-block"><div class="footer-social-icon w-embed"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8ZM14.5 5V11C14.499 12.9323 12.9323 14.499 11 14.5H5C3.06772 14.499 1.50099 12.9323 1.5 11V5C1.50099 3.06772 3.06772 1.50099 5 1.5H11C12.9323 1.50099 14.499 3.06772 14.5 5Z" fill="white"></path></svg></div><div class="footer-social-arrow w-embed"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 9L9 3" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.125 3H9V7.875" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></a><a href="https://x.com/" target="_blank" class="footer-social-link w-inline-block"><div class="footer-social-icon w-embed"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M9.14163 7.08118L13.6089 2H12.5503L8.67137 6.41192L5.57328 2H2L6.68492 8.6716L2 14H3.05866L7.15491 9.34087L10.4267 14H14L9.14137 7.08118H9.14163Z" fill="white"></path></svg></div><div class="footer-social-arrow w-embed"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 9L9 3" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.125 3H9V7.875" stroke="white" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></a></div></div><div class="footer-link-item-block"><div class="footer-link-item"><a href="' + linkPrefix + 'index.html" class="footer-link">Home</a><a href="' + linkPrefix + 'services.html" class="footer-link">Services</a><a href="' + linkPrefix + 'contact.html" class="footer-link">Contact</a><a href="' + linkPrefix + 'services/ui-ux-design.html" class="footer-link">UI/UX Design</a><a href="' + linkPrefix + 'services/mobile-design.html" class="footer-link">Mobile Design</a></div><div class="footer-link-item"><a href="' + linkPrefix + 'services/development.html" class="footer-link">Development</a><a href="' + linkPrefix + 'services/branding-design.html" class="footer-link">Branding Design</a><a href="' + linkPrefix + 'services.html" class="footer-link">Projects</a><a href="' + linkPrefix + 'contact.html" class="footer-link">Book a Call</a><a href="' + linkPrefix + 'contact.html" class="footer-link">Career</a></div><div class="footer-link-item"><a href="' + linkPrefix + 'index.html" class="footer-link">Studio</a><a href="' + linkPrefix + 'services.html" class="footer-link">Pricing</a><a href="#" class="footer-link">Style Guide</a><a href="#" class="footer-link">Changelog</a><a href="#" class="footer-link">License</a></div></div></div><a href="' + linkPrefix + 'index.html" class="footer-logo-wrp w-inline-block"><img loading="lazy" src="' + imgPrefix + 'images/6978634bb5109a7914d3e771_Footer%20Logo.svg" alt="STODIO AGENCY"></a><div class="divider footer"></div><div class="footer_bottom-wrapper"><p class="text-l">Stodio © 2025. All rights reserved.Powered By <a target="_blank" href="https://www.webflow.com/" class="copyright-link">Webflow.</a></p><div class="w-layout-grid footer_legal-list"><a href="#" class="footer-link bottom-bar-link">Privacy Policy</a><div class="divider-bottom-bar"></div><a href="#" class="footer-link bottom-bar-link">Terms &amp; Conditions</a></div></div><div class="footer-blur"></div></div></div></section>';

        /* Load Navbar Component */
        if (navPlaceholder) {
            pending++;
            var pathPrefix = isSubFolder ? '../' : '';
            fetch(pathPrefix + 'components/navbar.html')
                .then(function (r) { if (!r.ok) throw new Error(); return r.text(); })
                .then(function (html) {
                    if (isSubFolder) {
                        html = html.replace(/src="images\//g, 'src="../images/')
                            .replace(/href="index.html"/g, 'href="../index.html"')
                            .replace(/href="services.html"/g, 'href="../services.html"')
                            .replace(/href="contact.html"/g, 'href="../contact.html"')
                            .replace(/href="services\//g, 'href="../services/');
                    }
                    navPlaceholder.outerHTML = html;
                    checkDone();
                })
                .catch(function () {
                    navPlaceholder.outerHTML = defaultNav;
                    checkDone();
                });
        }

        /* Load Footer Component */
        if (footPlaceholder) {
            pending++;
            var pathPrefixFooter = isSubFolder ? '../' : '';
            fetch(pathPrefixFooter + 'components/footer.html')
                .then(function (r) { if (!r.ok) throw new Error(); return r.text(); })
                .then(function (html) {
                    if (isSubFolder) {
                        html = html.replace(/src="images\//g, 'src="../images/')
                            .replace(/href="index.html"/g, 'href="../index.html"')
                            .replace(/href="services.html"/g, 'href="../services.html"')
                            .replace(/href="contact.html"/g, 'href="../contact.html"')
                            .replace(/href="services\//g, 'href="../services/');
                    }
                    footPlaceholder.outerHTML = html;
                    checkDone();
                })
                .catch(function () {
                    footPlaceholder.outerHTML = defaultFoot;
                    checkDone();
                });
        }

        if (pending === 0 && typeof callback === 'function') {
            callback();
        }
    }

    /* ═══════════════════════════════════════════════════════════════
     * 11. DOM READY BOOTSTRAP
     * ═══════════════════════════════════════════════════════════════ */
    function init() {
        document.documentElement.classList.add('w-mod-js');

        injectFontsAndStyles();

        loadComponents(function () {
            initNavbar();
            initScrollReveal();
            initMarquee();
            initServices();
            initFAQ();
            initTabs();
            initCounters();
            initHeroParallax();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
