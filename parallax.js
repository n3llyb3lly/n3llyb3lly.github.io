document.addEventListener("scroll", () => {
  const parallaxElements = document.querySelectorAll("[data-parallax]");
  parallaxElements.forEach(el => {
    let speed = 0.5;
    el.style.transform = `translateY(${window.scrollY * speed}px)`;
  });
});
