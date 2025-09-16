// --- TEXTE QUI TOMBE CARACTERE PAR CARACTERE ---
const textElement = document.getElementById("error-text");
const text = textElement.innerText;
textElement.innerText = "";

for (let i = 0; i < text.length; i++) {
  const span = document.createElement("span");
  span.innerText = text[i] === " " ? "\u00A0" : text[i];
  span.style.animationDelay = (i * 0.05) + "s";
  textElement.appendChild(span);
}

// --- BOUTON RETOUR ---
function goHome() {
  window.location.href = "#";
}

// --- CANVAS FILIGRAMME TECHNO ---
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 120;

// créer les particules
for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3 + 1,
    dx: (Math.random() - 0.5) * 0.7,
    dy: (Math.random() - 0.5) * 0.7
  });
}

// animation
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // dessiner particules
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,255,255,0.7)";
    ctx.fill();
  });

  // lignes entre particules proches
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0,255,255,0.2)";
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // mouvement & interaction avec texte
  const rect = textElement.getBoundingClientRect();
  particles.forEach(p => {
    // rebond simple sur la zone texte
    if(p.x > rect.left && p.x < rect.right && p.y > rect.top && p.y < rect.bottom) {
      p.dx *= -1.2;
      p.dy *= -1.2;
    }
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(draw);
}

draw();

// --- REDIMENSIONNEMENT ---
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
