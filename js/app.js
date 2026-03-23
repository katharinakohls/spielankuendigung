import { BASE_W, BASE_H, DEFAULTS } from "../data/static-layout.js";
import { asset, loadImage } from "./utils.js";
import { drawPoster } from "./draw.js";
import { SPONSORS } from "../data/sponsors.js";

const canvas = document.getElementById("poster");
const ctx = canvas.getContext("2d");

const els = {
  homeName: document.getElementById("homeName"),
  homeLogoPath: document.getElementById("homeLogoPath"),
  matchesInput: document.getElementById("matchesInput"),
  renderBtn: document.getElementById("renderBtn"),
  exportBtn: document.getElementById("exportBtn"),
  matchDay: document.getElementById("matchDay")
};

let homeLogo = null;

function setupCanvas() {
  const cssW = Math.min(1050, window.innerWidth - 450);
  const ratio = window.devicePixelRatio || 1;

  canvas.style.width = cssW + "px";
  canvas.style.height = Math.round(cssW * (BASE_H / BASE_W)) + "px";
  canvas.width = Math.round(BASE_W * ratio);
  canvas.height = Math.round(BASE_H * ratio);

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

async function readMatch(index) {
  const homeSquad = document.getElementById(`homeSquad${index}`).value.trim();
  const opponent = document.getElementById(`oppName${index}`).value.trim();
  const time = document.getElementById(`oppTime${index}`).value.trim();
  const logoInput = document.getElementById(`oppLogo${index}`);

  if (!homeSquad && !opponent && !time) return null;

  let logo = null;
  const file = logoInput.files && logoInput.files[0];
  if (file) {
    logo = await loadImage(URL.createObjectURL(file));
  }

  return {
    homeSquad: homeSquad || "",
    opponent: opponent || "Gegner",
    time,
    logo
  };
}

async function readMatches() {
  const items = [];
  for (let i = 0; i < 3; i++) {
    const match = await readMatch(i);
    if (match) items.push(match);
  }
  return items;
}

async function loadSponsorLogos() {
  const sponsors = Object.values(SPONSORS);

  for (const sponsor of sponsors) {
    if (!sponsor.logo) {
      sponsor.logoImage = null;
      continue;
    }

    try {
      sponsor.logoImage = await loadImage(asset(sponsor.logo));

      console.log("geladen:", sponsor.name, sponsor.logoImage);

    } catch (err) {
      sponsor.logoImage = null;
      console.warn("Fehler beim Laden:", sponsor.logo);
    }
  }
}

async function enrichMatchesWithLogos(matches) {
  for (const match of matches) {
    if (!match.logoPath) continue;
    try {
      match.logo = await loadImage(asset(match.logoPath));
    } catch {
      match.logo = null;
    }
  }
  return matches;
}

async function loadHomeLogo() {
  try {
    homeLogo = await loadImage(asset(els.homeLogoPath.value.trim() || DEFAULTS.homeLogoPath));
  } catch {
    homeLogo = null;
  }
}

function getBaseState(matches) {
  return {
    homeName: els.homeName.value.trim() || DEFAULTS.homeName,
    matches,
    homeLogo
  };
}

async function render() {
  await loadHomeLogo();
  await loadSponsorLogos();

  const matches = await readMatches();

  drawPoster(ctx, BASE_W, BASE_H, {
    homeName: els.homeName.value.trim() || DEFAULTS.homeName,
    matchDay: els.matchDay.value.trim(),
    matches,
    homeLogo
  });
}

function exportPNG() {
  const link = document.createElement("a");
  link.download = "spielankuendigung.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

els.renderBtn.addEventListener("click", render);
els.exportBtn.addEventListener("click", exportPNG);
window.addEventListener("resize", () => {
  setupCanvas();
  render();
});

setupCanvas();
els.homeName.value = DEFAULTS.homeName;
els.homeLogoPath.value = DEFAULTS.homeLogoPath;
render();

document.getElementById("homeSquad0").value = "II";
document.getElementById("oppName0").value = "Holzwickeder SC";
document.getElementById("oppTime0").value = "13:00";

document.getElementById("homeSquad1").value = "I";
document.getElementById("oppName1").value = "FC Overberge";
document.getElementById("oppTime1").value = "15:15";

document.getElementById("homeSquad2").value = "Damen";
document.getElementById("oppName2").value = "SuS Rünthe";
document.getElementById("oppTime2").value = "17:15";
