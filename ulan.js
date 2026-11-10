// ===== script.js =====
// Ito ang JavaScript ng lahat ng rainforest pages.
// Ang JavaScript ang nagbibigay ng galaw: gumagalaw na gubat sa background,
// dahon na bumabagsak, alitaptap, typing effect, at ulan.
// Ang "if" sa ibaba ay para hindi mag-error kapag wala sa page ang isang bahagi
// (halimbawa, walang Rain button sa Members page).

// ---------- 0. GUMAGALAW NA RAINFOREST SA BACKGROUND ----------
// Ginagawa ng JavaScript ang buong gubat: mga puno, sinag ng araw, hamog,
// mga baging na umiindayog, at mga pakong gumagalaw. Walang kailangang picture.
function gumawa_ng_gubat() {

  // Ang design ng gubat. Nilalagay ito ng JavaScript sa page kaya
  // hindi mo na kailangang galawin ang rainforest.css
  const css = `
    #gubat-scene { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
    #gubat-scene div { position: absolute; }

    /* Sinag ng araw na pumapasok sa pagitan ng mga puno */
    .sinag {
      top: -10%; height: 130%;
      background: linear-gradient(180deg, rgba(255, 248, 190, 0.45), rgba(255, 248, 190, 0) 75%);
      transform-origin: top center;
      transform: rotate(16deg);
      filter: blur(10px);
      animation: sinag 9s ease-in-out infinite alternate;
    }
    @keyframes sinag {
      from { opacity: 0.2; transform: rotate(14deg); }
      to   { opacity: 0.7; transform: rotate(19deg); }
    }

    /* Mga puno (malayo = malabo at mapusyaw, gitna = mas madilim) */
    .puno {
      bottom: 0; height: 100%;
      background: linear-gradient(90deg, rgba(2, 22, 12, 0.95), rgba(9, 58, 34, 0.95) 50%, rgba(2, 22, 12, 0.95));
      border-radius: 12px 12px 0 0;
    }
    .puno.malayo { opacity: 0.35; filter: blur(3px); }
    .puno.gitna  { opacity: 0.75; filter: blur(1px); }

    /* Madilim na dahon sa itaas na parang bubong ng gubat */
    .kanopi {
      top: -18vh; border-radius: 50%;
      background: radial-gradient(circle, rgba(3, 30, 16, 0.95), rgba(3, 30, 16, 0) 70%);
      filter: blur(6px);
    }

    /* Hamog na dahan-dahang lumilipat */
    .ambon {
      border-radius: 50%;
      background: radial-gradient(ellipse, rgba(210, 255, 225, 0.28), rgba(210, 255, 225, 0) 70%);
      filter: blur(14px);
      animation: ambon 40s ease-in-out infinite alternate;
    }
    @keyframes ambon {
      from { transform: translateX(-8vw); }
      to   { transform: translateX(8vw); }
    }

    /* Mga baging na umiindayog */
    .liana {
      top: 0; width: 4px;
      background: linear-gradient(180deg, #06301b, #2f8f5a);
      border-radius: 0 0 4px 4px;
      transform-origin: top center;
      animation: indayog 6s ease-in-out infinite alternate;
    }
    @keyframes indayog {
      from { transform: rotate(-3deg); }
      to   { transform: rotate(3deg); }
    }
    .liana i {
      position: absolute; width: 18px; height: 18px;
      background: #3fa66b; border-radius: 0 100% 0 100%;
    }

    /* Mga pako sa ibaba na gumagalaw sa hangin */
    .pako {
      bottom: -30px;
      transform-origin: bottom center;
      background: linear-gradient(0deg, #03180d, #1f7a4a);
      border-radius: 0 100% 0 100%;
      animation: goyo 7s ease-in-out infinite;
    }
    @keyframes goyo {
      0%, 100% { transform: rotate(calc(var(--r) - 3deg)); }
      50%      { transform: rotate(calc(var(--r) + 3deg)); }
    }

    /* Kung ayaw ng user ng maraming galaw sa device niya, titigil ang mga animation */
    @media (prefers-reduced-motion: reduce) {
      #gubat-scene * { animation: none !important; }
    }
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // Ang lalagyan ng buong gubat. Nilalagay sa pinakaunahan ng page para nasa likod ng lahat
  const scene = document.createElement("div");
  scene.id = "gubat-scene";
  document.body.insertBefore(scene, document.body.firstChild);

  // Gumagawa ng random na numero sa pagitan ng min at max
  const rand = function (min, max) { return min + Math.random() * (max - min); };

  let html = "";

  // 1. Malalayong puno
  for (let i = 0; i < 10; i++) {
    html += '<div class="puno malayo" style="left:' + rand(-2, 100) + '%;width:' + rand(30, 60) + 'px"></div>';
  }

  // 2. Sinag ng araw
  for (let i = 0; i < 6; i++) {
    html += '<div class="sinag" style="left:' + rand(5, 90) + '%;width:' + rand(70, 170) +
            'px;animation-delay:' + (-rand(0, 8)) + 's;animation-duration:' + rand(7, 12) + 's"></div>';
  }

  // 3. Hamog
  for (let i = 0; i < 5; i++) {
    html += '<div class="ambon" style="left:' + rand(-10, 80) + '%;top:' + rand(30, 85) +
            '%;width:' + rand(35, 60) + 'vw;height:' + rand(15, 30) + 'vh;animation-duration:' +
            rand(30, 60) + 's;animation-delay:' + (-rand(0, 30)) + 's"></div>';
  }

  // 4. Mga puno sa gitna (mas malapit, mas madilim)
  for (let i = 0; i < 7; i++) {
    html += '<div class="puno gitna" style="left:' + rand(-3, 98) + '%;width:' + rand(60, 110) + 'px"></div>';
  }

  // 5. Madilim na bubong ng gubat sa itaas
  for (let i = 0; i < 5; i++) {
    html += '<div class="kanopi" style="left:' + (i * 22 - 10) + '%;width:40vw;height:34vh"></div>';
  }

  // 6. Mga baging na may dahon
  for (let i = 0; i < 9; i++) {
    const taas = rand(20, 60);                       // haba ng baging (porsyento ng screen)
    let dahon = "";
    for (let y = 40; y < taas * 8; y += 55) {        // maglagay ng dahon kada 55px
      const kaliwa = Math.random() < 0.5 ? -16 : 2;
      dahon += '<i style="top:' + y + 'px;left:' + kaliwa + 'px"></i>';
    }
    html += '<div class="liana" style="left:' + rand(0, 100) + '%;height:' + taas +
            'vh;animation-delay:' + (-rand(0, 6)) + 's;animation-duration:' + rand(5, 9) + 's">' + dahon + '</div>';
  }

  // 7. Mga pako sa ibaba, sa kaliwa at kanang gilid
  for (let i = 0; i < 12; i++) {
    const kaliwang_gilid = i < 6;
    const posisyon = kaliwang_gilid ? rand(-3, 22) : rand(78, 100);
    html += '<div class="pako" style="left:' + posisyon + '%;width:' + rand(90, 150) + 'px;height:' + rand(220, 380) +
            'px;--r:' + rand(-50, 50) + 'deg;animation-delay:' + (-rand(0, 7)) + 's;animation-duration:' + rand(6, 10) + 's"></div>';
  }

  scene.innerHTML = html;
}

gumawa_ng_gubat();

// ---------- 1. TYPING EFFECT SA WELCOME MESSAGE (Home page lang) ----------
const mensahe = "Welcome to Our Rainforest!";   // PALITAN ito ng sarili ninyong welcome message
const pamagat = document.getElementById("welcome-text");
let letra = 0;                                  // ilang letra na ang naisulat

function mag_type() {
  if (letra < mensahe.length) {
    // dagdagan ng isang letra ang nakasulat
    pamagat.textContent = mensahe.slice(0, letra + 1);
    letra++;
    setTimeout(mag_type, 90);                   // maghintay ng 90ms bago ang susunod na letra
  }
}

if (pamagat) {                                  // gagana lang kung may welcome-text sa page
  mag_type();
}

// ---------- 2. MGA DAHONG BUMABAGSAK ----------
const dahonLayer = document.getElementById("dahon-layer");

function gumawa_ng_dahon() {
  const dahon = document.createElement("div");  // gumawa ng bagong <div>
  dahon.classList.add("dahon");

  const laki = 12 + Math.random() * 20;         // random na laki (12 hanggang 32px)
  dahon.style.width = laki + "px";
  dahon.style.height = laki + "px";
  dahon.style.left = Math.random() * 100 + "vw";            // random na pwesto pahalang
  dahon.style.animationDuration = 8 + Math.random() * 8 + "s"; // random na bilis
  dahon.style.animationDelay = -Math.random() * 10 + "s";    // magkakaiba ang simula

  // random na kulay berde
  const kulay = ["#8fd694", "#5fc28a", "#3fa66b", "#b6e8a8"];
  dahon.style.background = kulay[Math.floor(Math.random() * kulay.length)];

  dahonLayer.appendChild(dahon);                // ilagay sa page
}

if (dahonLayer) {
  // gumawa ng 25 dahon
  for (let i = 0; i < 25; i++) {
    gumawa_ng_dahon();
  }
}

// ---------- 3. MGA ALITAPTAP ----------
const alitaptapLayer = document.getElementById("alitaptap-layer");

if (alitaptapLayer) {
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
}

// ---------- 4. ULAN AT TUNOG NA TUMATAGAL SA LAHAT NG PAGE ----------
// Kapag pinindot ang Rain button, tatandaan ng browser na umuulan.
// Sa pagbukas ng ibang page, ituloy ulit ang ulan at ang tunog.
// Gumagana ito sa lahat ng page na may <script src="ulan.js">.

const SUSI = "ulan-umuulan";                    // pangalan ng "tala" na itinatago ng browser

function basahin_ang_susi() {
  try { return sessionStorage.getItem(SUSI) === "1"; } catch (e) { return false; }
}

function isulat_ang_susi(halaga) {
  try { sessionStorage.setItem(SUSI, halaga ? "1" : "0"); } catch (e) {}
}

// Kung walang lalagyan ng ulan ang page, gumawa nito
let ulanLayer = document.getElementById("ulan-layer");
if (!ulanLayer) {
  ulanLayer = document.createElement("div");
  ulanLayer.id = "ulan-layer";
  ulanLayer.style.cssText = "position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:1;";
  document.body.appendChild(ulanLayer);
}

// Kung walang Rain button ang page (hindi Home), gumawa ng maliit na button sa kanang ibaba
let ulanButton = document.getElementById("ulan-button");
if (!ulanButton) {
  ulanButton = document.createElement("button");
  ulanButton.id = "ulan-button";
  ulanButton.className = "btn btn-outline";
  ulanButton.textContent = "Make it Rain";
  ulanButton.style.cssText =
    "position:fixed;right:20px;bottom:20px;z-index:50;padding:10px 20px;" +
    "font-size:0.9rem;background:rgba(5,46,26,0.85);";
  document.body.appendChild(ulanButton);
}

let umuulan = false;                            // false = hindi umuulan

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

// ---------- 5. TUNOG NG ULAN ----------
// Ginagawa ng browser mismo ang tunog ng ulan (walang kailangang mp3 file).
// Ang tunog ay "ingay" na sinala para marinig na parang ulan.
let audioCtx = null;      // ang "sound system" ng browser
let ulanTunog = null;     // ang kasalukuyang tunog ng ulan

const LAKAS_NG_TUNOG = 0.35;   // 0 = tahimik, 1 = pinakamalakas. PALITAN kung gusto mo

function simulan_ang_tunog() {
  if (ulanTunog) return;                        // may tunog na, huwag dagdagan
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;               // kung walang suporta ang browser, tahimik lang

  if (!audioCtx) audioCtx = new AudioContextClass();
  if (audioCtx.state === "suspended") audioCtx.resume();

  // 1. Gumawa ng 2 segundong ingay (random na numero)
  const haba = audioCtx.sampleRate * 2;
  const buffer = audioCtx.createBuffer(1, haba, audioCtx.sampleRate);
  const datos = buffer.getChannelData(0);
  for (let i = 0; i < haba; i++) {
    datos[i] = Math.random() * 2 - 1;
  }

  const ingay = audioCtx.createBufferSource();
  ingay.buffer = buffer;
  ingay.loop = true;                            // paulit-ulit

  // 2. Salain ang ingay: alisin ang sobrang lalim at sobrang tinis para maging parang ulan
  const mababa = audioCtx.createBiquadFilter();
  mababa.type = "highpass";
  mababa.frequency.value = 600;

  const mataas = audioCtx.createBiquadFilter();
  mataas.type = "lowpass";
  mataas.frequency.value = 7000;

  // 3. Lakas ng tunog, dahan-dahang lumalakas sa loob ng 1 segundo
  const lakas = audioCtx.createGain();
  lakas.gain.setValueAtTime(0, audioCtx.currentTime);
  lakas.gain.linearRampToValueAtTime(LAKAS_NG_TUNOG, audioCtx.currentTime + 1);

  // 4. Pagdugtungin: ingay → salain → lakas → speaker
  ingay.connect(mababa);
  mababa.connect(mataas);
  mataas.connect(lakas);
  lakas.connect(audioCtx.destination);
  ingay.start();

  ulanTunog = { ingay: ingay, lakas: lakas };
}

function itigil_ang_tunog() {
  if (!ulanTunog) return;

  // Dahan-dahang hihina sa loob ng 0.6 segundo bago tumigil
  const ngayon = audioCtx.currentTime;
  ulanTunog.lakas.gain.cancelScheduledValues(ngayon);
  ulanTunog.lakas.gain.setValueAtTime(ulanTunog.lakas.gain.value, ngayon);
  ulanTunog.lakas.gain.linearRampToValueAtTime(0, ngayon + 0.6);
  ulanTunog.ingay.stop(ngayon + 0.7);
  ulanTunog = null;
}

// ---------- 6. PAGBUKAS AT PAGSARA NG ULAN ----------
function buksan_ang_ulan() {
  umuulan = true;
  simulan_ang_ulan();
  simulan_ang_tunog();
  ulanButton.textContent = "Stop the Rain";
  isulat_ang_susi(true);                        // itanda na umuulan
}

function isara_ang_ulan() {
  umuulan = false;
  ulanLayer.innerHTML = "";                     // burahin lahat ng patak
  itigil_ang_tunog();
  ulanButton.textContent = "Make it Rain";
  isulat_ang_susi(false);                       // itanda na tumigil ang ulan
}

// Kapag pinindot ang button
ulanButton.addEventListener("click", function () {
  if (umuulan) {
    isara_ang_ulan();
  } else {
    buksan_ang_ulan();
  }
});

// Sa pagbukas ng page: kung umuulan sa nakaraang page, ituloy
if (basahin_ang_susi()) {
  buksan_ang_ulan();

  // Madalas hinaharangan ng browser ang tunog hanggang may pinindot ang user.
  // Kaya sa unang click, pindot ng key, o tap sa page, tutunog na ito.
  const eventos = ["pointerdown", "keydown", "touchstart"];
  const ituloy_ang_tunog = function () {
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    eventos.forEach(function (e) { document.removeEventListener(e, ituloy_ang_tunog); });
  };
  eventos.forEach(function (e) { document.addEventListener(e, ituloy_ang_tunog); });
}
