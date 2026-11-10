
// ---------- 1. TYPING EFFECT SA WELCOME MESSAGE ----------
const mensahe = "Welcome to Our Rainforest!";
const pamagat = document.getElementById("welcome-text");
let letra = 0;

function mag_type() {
  if (letra < mensahe.length) {
    pamagat.textContent = mensahe.slice(0, letra + 1);
    letra++;
    setTimeout(mag_type, 85);
  }
}

mag_type();

const dahonLayer = document.getElementById("dahon-layer");

function gumawa_ng_dahon() {
  const dahon = document.createElement("div");
  dahon.classList.add("dahon");

  const laki = 12 + Math.random() * 20; 
  dahon.style.width = laki + "px";
  dahon.style.height = laki + "px";
  dahon.style.left = Math.random() * 100 + "vw";
  dahon.style.animationDuration = 8 + Math.random() * 8 + "s"; 
  dahon.style.animationDelay = -Math.random() * 10 + "s";


  const kulay = ["#8fd694", "#5fc28a", "#3fa66b", "#b6e8a8"];
  dahon.style.background = kulay[Math.floor(Math.random() * kulay.length)];

  dahonLayer.appendChild(dahon);
}

for (let i = 0; i < 60; i++) {
  gumawa_ng_dahon();
}

const alitaptapLayer = document.getElementById("alitaptap-layer");

for (let i = 0; i < 18; i++) {
  const alitaptap = document.createElement("div");
  alitaptap.classList.add("alitaptap");
  alitaptap.style.left = Math.random() * 100 + "vw";
  alitaptap.style.top = Math.random() * 100 + "vh";
  alitaptap.style.animationDuration =
    4 + Math.random() * 4 + "s, " + (2 + Math.random() * 3) + "s";
  alitaptap.style.animationDelay = -Math.random() * 5 + "s";
  alitaptapLayer.appendChild(alitaptap);
}

const ulanLayer = document.getElementById("ulan-layer");
const ulanButton = document.getElementById("ulan-button");
let umuulan = false;

function simulan_ang_ulan() {
  for (let i = 0; i < 70; i++) {
    const patak = document.createElement("div");
    patak.classList.add("patak");
    patak.style.left = Math.random() * 100 + "vw";
    patak.style.animationDuration = 0.6 + Math.random() * 0.6 + "s";
    patak.style.animationDelay = -Math.random() * 1.2 + "s";
    ulanLayer.appendChild(patak);
  }
}

// Kapag pinindot ang button
ulanButton.addEventListener("click", function () {
  umuulan = !umuulan;

  if (umuulan) {
    simulan_ang_ulan();
    ulanButton.textContent = "Stop the Rain";
  } else {
    ulanLayer.innerHTML = "";
    ulanButton.textContent = "Make it Rain";
  }
});
