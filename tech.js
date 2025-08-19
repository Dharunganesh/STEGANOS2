const cards = document.querySelectorAll(".card");
let isAutoScrolling = false;

// 🔹 Add click + touch events
cards.forEach(card => {
  card.addEventListener("click", () => {
    isAutoScrolling = true; // lock during auto-scroll
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    card.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    // unlock after scroll settles
    setTimeout(() => { isAutoScrolling = false; }, 600);
  });

  card.addEventListener("touchstart", handleHighlight);
});

// 🔹 Highlight function
function handleHighlight(e) {
  cards.forEach(c => c.classList.remove("active"));
  e.currentTarget.classList.add("active");
}

// 🔹 Highlight closest card on scroll
function highlightVisibleCard() {
  if (isAutoScrolling) return; // ⛔ ignore while auto-scrolling

  let mid = window.innerHeight / 2;
  let closest = null;
  let closestDist = Infinity;
  cards.forEach(card => {
    let rect = card.getBoundingClientRect();
    let cardCenter = rect.top + rect.height / 2;
    let dist = Math.abs(mid - cardCenter);
    if (dist < closestDist) {
      closest = card;
      closestDist = dist;
    }
  });
  cards.forEach(card => card.classList.remove("active"));
  if (closest) closest.classList.add("active");
}

document.querySelector('.container').addEventListener('scroll', highlightVisibleCard);

// 🔹 Always highlight card 0 on entry
window.addEventListener('load', () => {
  cards.forEach(c => c.classList.remove("active"));
  if (cards.length > 0) {
    cards[0].classList.add("active");
  }
});

// 🔹 Enable hover highlight ONLY if device has mouse
if (window.matchMedia('(hover: hover)').matches) {
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
    });
    card.addEventListener("mouseleave", () => {
      // optional: remove highlight on leave
      // card.classList.remove("active");
      // or keep it highlighted until scroll/click updates
    });
  });
}
