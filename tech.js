const cards = document.querySelectorAll(".card");
cards.forEach(card => {
  card.addEventListener("click", handleHighlight);
  card.addEventListener("touchstart", handleHighlight);
});
cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    card.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
});
function handleHighlight(e) {
  cards.forEach(c => c.classList.remove("active"));
  e.currentTarget.classList.add("active");
}
function highlightVisibleCard() {
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

// Function to highlight the first card (card 0) on entry
function highlightFirstCard() {
  cards.forEach(card => card.classList.remove("active"));
  if (cards[0]) cards[0].classList.add("active");
}

document.querySelector('.container').addEventListener('scroll', highlightVisibleCard);
window.addEventListener('load', highlightFirstCard);
// Also highlight first card when DOM is ready (in case load event already fired)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', highlightFirstCard);
} else {
  highlightFirstCard();
}
