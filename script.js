// ===== TELEGRAM WEBAPP =====
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// ===== DOM =====
const petImg = document.getElementById("petImg");
const bubble = document.getElementById("bubble");
const coinsEl = document.getElementById("coins");
const dayEl = document.getElementById("day");

const hungerStat = document.getElementById("hungerStat");
const cleanStat = document.getElementById("cleanStat");
const moodStat = document.getElementById("moodStat");

// ===== СОСТОЯНИЕ ПИТОМЦА =====
let pet = {
  name: "Бублик",
  hunger: 70,
  clean: 80,
  mood: 90,
  coins: 0,
  day: 1
};

// ===== SAVE / LOAD =====
const SAVE_KEY = "pet_app_save_v1";

function saveGame() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(pet));
}

function loadGame() {
  const data = localStorage.getItem(SAVE_KEY);
  if (data) {
    pet = JSON.parse(data);
  }
}

// ===== HELPERS =====
function clamp(v) {
  return Math.max(0, Math.min(100, v));
}

// ===== UI =====
function updateUI(customText = null) {
  coinsEl.textContent = pet.coins + " 🟊";
  dayEl.textContent = pet.day;

  hungerStat.textContent = pet.hunger;
  cleanStat.textContent = pet.clean;
  moodStat.textContent = pet.mood;

  let status = "🙂 Всё хорошо";

  if (pet.hunger < 30) status = "🍖 Я голоден";
  if (pet.clean < 30) status = "🧼 Мне грязно";
  if (pet.mood < 30) status = "😟 Мне грустно";

  bubble.textContent = customText || status;
}

// ===== ANIMATION (BLINK) =====
let blinking = false;

function blink() {
  if (blinking) return;
  blinking = true;

  petImg.src = "assets/dog_closed.png";

  setTimeout(() => {
    petImg.src = "assets/dog_open.png";
    blinking = false;
  }, 120);
}

setInterval(blink, 3500);

// ===== ACTIONS =====
function feed() {
  pet.hunger = clamp(pet.hunger + 20);
  pet.mood = clamp(pet.mood + 5);
  updateUI("Бублик поел 🐾");
  saveGame();
}

function wash() {
  pet.clean = clamp(pet.clean + 25);
  updateUI("Бублик чистый ✨");
  saveGame();
}

function play() {
  pet.mood = clamp(pet.mood + 15);
  pet.hunger = clamp(pet.hunger - 10);
  updateUI("Бублик счастлив 🎾");
  saveGame();
}

function sleep() {
  pet.day += 1;
  pet.hunger = clamp(pet.hunger - 15);
  pet.mood = clamp(pet.mood + 5);
  pet.coins += 5;
  updateUI("Новый день 🌅");
  saveGame();
}

// ===== BUTTONS =====
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;

    if (action === "feed") feed();
    if (action === "wash") wash();
    if (action === "play") play();
    if (action === "sleep") sleep();
  });
});

// ===== START =====
loadGame();
updateUI("Бублик рад тебя видеть 🐶");
