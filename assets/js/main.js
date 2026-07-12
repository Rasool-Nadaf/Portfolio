document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // Segmented control — filters project sections by category (projects.html only)
  const segmented = document.querySelector('.segmented-control');
  if (segmented) {
    const segs = segmented.querySelectorAll('.segment');
    const sections = document.querySelectorAll('section[data-category]');
    segs.forEach(seg => {
      seg.addEventListener('click', () => {
        segs.forEach(s => s.classList.remove('active'));
        seg.classList.add('active');
        const filter = seg.dataset.filter;
        sections.forEach(sec => {
          sec.style.display = (filter === 'all' || sec.dataset.category === filter) ? '' : 'none';
        });
      });
    });
  }

  // Contact tile — expands into Email / Call / LinkedIn / GitHub icon links
  const contactToggle = document.querySelector('[data-contact-toggle]');
  const contactPanel = document.querySelector('[data-contact-panel]');
  if (contactToggle && contactPanel) {
    contactToggle.addEventListener('click', () => {
      const isOpen = contactToggle.getAttribute('aria-expanded') === 'true';
      contactToggle.setAttribute('aria-expanded', String(!isOpen));
      contactToggle.classList.toggle('is-open', !isOpen);
      contactPanel.hidden = isOpen;
    });
  }

  // Hero typing effect (only present on home page)
  const cursor = document.querySelector('.type-cursor');
  const typeLines = document.querySelectorAll('[data-type-line]');
  if (typeLines.length) {
    typeLines.forEach(line => { line.style.opacity = 0; });
    let delay = 0;
    typeLines.forEach((line, i) => {
      const lineDelay = 220;
      setTimeout(() => {
        line.style.transition = 'opacity 0.25s ease';
        line.style.opacity = 1;
      }, delay);
      delay += lineDelay;
    });
    if (cursor) {
      setTimeout(() => { cursor.style.display = 'none'; }, delay + 600);
    }
  }
});
