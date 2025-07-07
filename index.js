const cards = document.querySelectorAll(".card");

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

document.querySelector('.container').addEventListener('scroll', highlightVisibleCard);
window.addEventListener('load', highlightVisibleCard);
