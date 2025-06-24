export function sectionFadeIn() {
  const sections = document.querySelectorAll('section');
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, observerOptions);
  sections.forEach(section => {
    section.classList.add('fade-section');
    observer.observe(section);
  });
}

export function pageFadeInOnLoad() {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-visible');
  });
}

export function pageFadeOutOnNav() {
  document.querySelectorAll('a').forEach(link => {
    if (link.hostname === window.location.hostname) {
      link.addEventListener('click', function(e) {
        if (
          link.target === "_blank" ||
          (link.href.includes('#') && link.pathname === window.location.pathname)
        ) return;
        e.preventDefault();
        document.body.classList.remove('page-visible');
        setTimeout(() => {
          window.location = link.href;
        }, 300);
      });
    }
  });
}