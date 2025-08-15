const text = "In the shadows of cyberspace, secrets are buried deep—waiting for those bold enough to uncover them. “Capture the Flag” isn’t just a game; it’s a digital manhunt. Each flag you find peels back another layer of the unknown, drawing you deeper into encrypted puzzles, vulnerable systems, and hidden trails. Do you have the instincts of a hacker and the mind of a detective? Step into the arena, follow the whispers in the code, and prove your skills where every second counts. The flag is out there... can you capture it?"; 
let i = 0;

function typeEffect() {
  if (i < text.length) {
    document.getElementById("p").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 0.1); 
  }
}


window.onload = typeEffect;

