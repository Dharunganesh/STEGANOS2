const cards = document.querySelectorAll(".card");
const container = document.querySelector(".container");

function setActiveCard(card) {
  document.querySelector(".card.active")?.classList.remove("active");
  card.classList.add("active");
}

function handleClick(e) {
  const card = e.currentTarget;
  setActiveCard(card);
  card.scrollIntoView({ behavior: "smooth", block: "center" });
}

cards.forEach(card => {
  card.addEventListener("click", handleClick);
  card.addEventListener("touchstart", handleClick);
});

function highlightVisibleCard() {
  const mid = window.innerHeight / 2;
  let closest = null;
  let closestDist = Infinity;

  for (let card of cards) {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.top + rect.height / 2;
    const dist = Math.abs(mid - cardCenter);
    if (dist < closestDist) {
      closest = card;
      closestDist = dist;
    }
  }

  if (closest) setActiveCard(closest);
}

// Throttle scroll to ~60fps max
let ticking = false;
container.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      highlightVisibleCard();
      ticking = false;
    });
    ticking = true;
  }
});

window.addEventListener("load", highlightVisibleCard);
