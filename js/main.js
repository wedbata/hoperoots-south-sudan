/* ==========================================================================
   main.js — Site interactions for HopeRoots South Sudan
   - Mobile menu toggle
   - Sticky header shadow on scroll
   - Animated stat counters (Intersection Observer)
   - Simple form validation + simulated submit
   - Smooth in-page anchor scrolling (with sticky header offset)
   - Active nav-link highlighting (based on <body data-page>)
   - Dynamic copyright year in footer
   ========================================================================== */

(function () {
  'use strict';

  /* ----------------------------------------------------------------------
     Helpers
     ---------------------------------------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------------------
     Mobile menu
     ---------------------------------------------------------------------- */
  function initMobileMenu() {
    const toggle = $('.nav__toggle');
    const menu = $('.mobile-menu');
    const closeBtn = $('.mobile-menu__close');
    if (!toggle || !menu) return;

    const openMenu = () => {
      menu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      // Move focus into the panel for accessibility
      const firstLink = $('.mobile-menu__link', menu);
      if (firstLink) firstLink.focus();
    };

    const closeMenu = () => {
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
      toggle.focus();
    };

    toggle.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);

    // Click outside the panel to close
    menu.addEventListener('click', (e) => {
      if (e.target === menu) closeMenu();
    });

    // Esc to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
    });

    // Close after clicking a link
    $$('.mobile-menu__link', menu).forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ----------------------------------------------------------------------
     Sticky header — add shadow once user scrolls
     ---------------------------------------------------------------------- */
  function initStickyHeader() {
    const header = $('.site-header');
    if (!header) return;

    let ticking = false;
    const update = () => {
      const scrolled = window.scrollY > 8;
      header.classList.toggle('is-scrolled', scrolled);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  /* ----------------------------------------------------------------------
     Animated stat counters
     - Trigger when the .stats block enters the viewport
     - Count up to data-target attribute (supports "+" suffix and decimals)
     ---------------------------------------------------------------------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target || '0');
    const suffix = el.dataset.suffix || '';
    const duration = parseInt(el.dataset.duration || '1800', 10);
    const decimals = parseInt(el.dataset.decimals || '0', 10);

    if (prefersReducedMotion || !Number.isFinite(target)) {
      el.textContent = formatNumber(target, decimals) + suffix;
      return;
    }

    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic for a smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = formatNumber(value, decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = formatNumber(target, decimals) + suffix;
    };
    requestAnimationFrame(step);
  }

  function formatNumber(value, decimals) {
    if (decimals > 0) {
      return value.toFixed(decimals);
    }
    return Math.round(value).toLocaleString('en-US');
  }

  function initStatCounters() {
    const counters = $$('.stat__number[data-target]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach((c) => observer.observe(c));
  }

  /* ----------------------------------------------------------------------
     Smooth scroll for in-page anchors — account for sticky header height
     ---------------------------------------------------------------------- */
  function initSmoothAnchors() {
    $$('a[href^="#"]').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;

      link.addEventListener('click', (e) => {
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const header = $('.site-header');
        const offset = header ? header.offsetHeight + 12 : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });

        // Update hash without jumping
        history.pushState(null, '', href);
      });
    });
  }

  /* ----------------------------------------------------------------------
     Form handling — validate + simulated submit (no backend)
     ---------------------------------------------------------------------- */
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function showFieldError(input, message) {
    const errorEl = input.parentElement?.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('is-visible');
    }
    input.setAttribute('aria-invalid', 'true');
  }

  function clearFieldError(input) {
    const errorEl = input.parentElement?.querySelector('.form-error');
    if (errorEl) errorEl.classList.remove('is-visible');
    input.removeAttribute('aria-invalid');
  }

  function validateForm(form) {
    let firstInvalid = null;
    let valid = true;

    $$('input, textarea, select', form).forEach((field) => {
      clearFieldError(field);
      const value = (field.value || '').trim();
      const required = field.hasAttribute('required');
      const type = field.getAttribute('type');

      if (required && !value) {
        showFieldError(field, 'This field is required.');
        valid = false;
        firstInvalid = firstInvalid || field;
        return;
      }

      if (type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address.');
        valid = false;
        firstInvalid = firstInvalid || field;
      }
    });

    return { valid, firstInvalid };
  }

  function initForms() {
    $$('form[data-validate]').forEach((form) => {
      const success = form.querySelector('.form-success');

      // Clear errors as the user fixes them
      $$('input, textarea, select', form).forEach((field) => {
        field.addEventListener('input', () => clearFieldError(field));
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (success) success.classList.remove('is-visible');

        const { valid, firstInvalid } = validateForm(form);
        if (!valid) {
          firstInvalid?.focus();
          return;
        }

        // Simulated submission — in production, POST to your backend here.
        if (success) {
          success.textContent = form.dataset.successMessage
            || 'Thank you. We will be in touch within 2 business days.';
          success.classList.add('is-visible');
        }
        form.reset();
      });
    });
  }

  /* ----------------------------------------------------------------------
     Footer year
     ---------------------------------------------------------------------- */
  function setFooterYear() {
    $$('[data-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ----------------------------------------------------------------------
     Boot
     ---------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initStickyHeader();
    initStatCounters();
    initSmoothAnchors();
    initForms();
    setFooterYear();
  });
})();
