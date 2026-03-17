import { SPONSOR_TILES } from "../data/static-layout.js";
import { SPONSORS } from "../data/sponsors.js";
import { fillRounded, fitText, drawContain } from "./utils.js";

// Platzhalterfunktion
// export function drawSponsorTile(ctx, tile) {
//   fillRounded(ctx, tile.x, tile.y, tile.w, tile.h, 10, "#ffffff", "#d2d6d2", 2);

//   const pad = 18;
//   const labelSize = fitText(ctx, tile.label, tile.w - 2 * pad, 34, 14, 800);

//   ctx.save();
//   ctx.fillStyle = "#68746e";
//   ctx.font = `800 ${labelSize}px system-ui`;
//   ctx.textAlign = "center";
//   ctx.textBaseline = "middle";
//   ctx.fillText(tile.label, tile.x + tile.w / 2, tile.y + tile.h / 2);
//   ctx.restore();
// }

// Funktion mit Inhalt aus sponsors.js
export function drawSponsorTile(ctx, sponsor, tile) {
  const { x, y, w, h } = tile;

  fillRounded(ctx, x, y, w, h, 12, "#ffffff", "#cfd4cf", 2);

  const layout = sponsor.layout || "horizontal";
  const hasLogo = !!sponsor.logoImage;

  if (layout === "logo-only" && hasLogo) {
    drawContain(ctx, sponsor.logoImage, x + 18, y + 18, w - 36, h - 36, 2);
    return;
  }

  if (layout === "vertical") {
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    let cursorY = y + 14;

    ctx.fillStyle = "#1f2c25";
    const nameSize = fitText(ctx, sponsor.name, w - 28, 22, 13, 800);
    ctx.font = `800 ${nameSize}px system-ui`;
    ctx.fillText(sponsor.name, x + w / 2, cursorY);
    cursorY += nameSize + 6;

    if (sponsor.subtitle) {
      ctx.fillStyle = "#5e6b65";
      ctx.font = "600 12px system-ui";
      ctx.fillText(sponsor.subtitle, x + w / 2, cursorY);
      cursorY += 18;
    }

    const logoTop = cursorY + 8;
    const logoBottom = y + h - 18;
    const logoH = Math.max(60, logoBottom - logoTop);

    if (hasLogo) {
      drawContain(ctx, sponsor.logoImage, x + 18, logoTop, w - 36, logoH, 2);
    }

    ctx.restore();
    return;
  }

  // default: horizontal
  const pad = 16;
  const gap = 16;

  const textW = Math.max(140, w * 0.56);
  const logoW = w - pad * 2 - gap - textW;

  const textX = x + pad;
  const logoX = x + w - pad - logoW;
  const centerY = y + h / 2;

  ctx.save();
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  ctx.fillStyle = "#1f2c25";
  const nameSize = fitText(ctx, sponsor.name, textW, 24, 12, 800);
  ctx.font = `800 ${nameSize}px system-ui`;

  const hasSubtitle = !!sponsor.subtitle;

  ctx.fillText(
    sponsor.name,
    textX,
    centerY - (hasSubtitle ? 12 : 0)
  );

  if (hasSubtitle) {
    ctx.fillStyle = "#5e6b65";
    ctx.font = "600 13px system-ui";
    ctx.fillText(sponsor.subtitle, textX, centerY + 12);
  }

  ctx.restore();

  if (hasLogo) {
    const logoH = h * 0.68;
    drawContain(
      ctx,
      sponsor.logoImage,
      logoX,
      centerY - logoH / 2,
      logoW,
      logoH,
      2
    );
  }
}

export function drawCenterPanel(ctx, state) {
  const { matches, matchDay, homeLogo } = state;
  const visible = matches.slice(0, 3);

  const x = 330;
  const y = 390;
  const w = 820;
  const h = 430;

  fillRounded(ctx, x, y, w, h, 14, "#ffffff", "#cfd4cf", 2);

  const bg = ctx.createLinearGradient(x, y, x, y + h);
  bg.addColorStop(0, "#dbeaf7");
  bg.addColorStop(1, "#edf4ea");
  fillRounded(ctx, x + 2, y + 2, w - 4, h - 4, 12, bg);

  const headerY = y + 18;
  const leftX = x + 26;
  const centerX = x + w / 2;
  const rightX = x + w - 26;

  ctx.fillStyle = "#16231d";
  ctx.textBaseline = "top";
  ctx.font = "800 20px system-ui";

  ctx.textAlign = "left";
  ctx.fillText("Heim", leftX, headerY);

  ctx.textAlign = "center";
  ctx.fillText("Anpfiff", centerX, headerY);

  ctx.textAlign = "right";
  ctx.fillText("Gast", rightX, headerY);

  if (matchDay) {
    ctx.textAlign = "center";
    ctx.font = "800 16px system-ui";
    ctx.fillStyle = "#415048";
    ctx.fillText(matchDay, centerX, headerY + 28);
  }

  const rowsTop = y + 90;
  const rowGap = 12;
  const rowH = 86;

  visible.forEach((m, i) => {
    const ry = rowsTop + i * (rowH + rowGap);

    const homeCard = {
      x: x + 24,
      y: ry,
      w: 275,
      h: rowH
    };

    const awayCard = {
      x: x + w - 24 - 275,
      y: ry,
      w: 275,
      h: rowH
    };

    fillRounded(ctx, homeCard.x, homeCard.y, homeCard.w, homeCard.h, 14, "rgba(255,255,255,0.96)", "rgba(0,0,0,0.08)", 2);
    fillRounded(ctx, awayCard.x, awayCard.y, awayCard.w, awayCard.h, 14, "rgba(255,255,255,0.96)", "rgba(0,0,0,0.08)", 2);

    // Heimlogo
    const homeLogoBox = {
      x: homeCard.x + 10,
      y: homeCard.y + 10,
      w: 66,
      h: homeCard.h - 20
    };

    fillRounded(ctx, homeLogoBox.x, homeLogoBox.y, homeLogoBox.w, homeLogoBox.h, 10, "#f8f9f8", "rgba(0,0,0,0.06)", 1.5);

    if (homeLogo) {
      drawContain(ctx, homeLogo, homeLogoBox.x + 5, homeLogoBox.y + 5, homeLogoBox.w - 10, homeLogoBox.h - 10, 2);
    }

    // Heimtext vertikal zentriert
    const homeTextX = homeLogoBox.x + homeLogoBox.w + 12;
    const homeTextW = homeCard.w - (homeTextX - homeCard.x) - 12;
    const homeCenterY = homeCard.y + homeCard.h / 2;

    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#17251e";

    ctx.font = "800 16px system-ui";
    ctx.fillText("SuS Oberaden", homeTextX, homeCenterY - 12);

    ctx.fillStyle = "#415048";
    ctx.font = "700 13px system-ui";
    ctx.fillText(m.homeSquad || "", homeTextX, homeCenterY + 10);

    // Uhrzeit in der Mitte
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#111d17";
    ctx.font = "900 22px system-ui";
    ctx.fillText(m.time || "", centerX, ry + rowH / 2);

    // Gastlogo
    const awayLogoBox = {
      x: awayCard.x + 10,
      y: awayCard.y + 10,
      w: 66,
      h: awayCard.h - 20
    };

    fillRounded(ctx, awayLogoBox.x, awayLogoBox.y, awayLogoBox.w, awayLogoBox.h, 10, "#f1f3f1", "rgba(0,0,0,0.06)", 1.5);

    if (m.logo) {
      drawContain(ctx, m.logo, awayLogoBox.x + 5, awayLogoBox.y + 5, awayLogoBox.w - 10, awayLogoBox.h - 10, 2);
    } else {
      ctx.fillStyle = "#7f8a84";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "800 10px system-ui";
      ctx.fillText("LOGO", awayLogoBox.x + awayLogoBox.w / 2, awayLogoBox.y + awayLogoBox.h / 2);
    }

    // Gasttext vertikal zentriert
    const awayTextX = awayLogoBox.x + awayLogoBox.w + 12;
    const awayTextW = awayCard.w - (awayTextX - awayCard.x) - 12;
    const awaySize = fitText(ctx, m.opponent || "Gegner", awayTextW, 17, 12, 800);

    ctx.fillStyle = "#17251e";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = `800 ${awaySize}px system-ui`;
    ctx.fillText(m.opponent || "Gegner", awayTextX, awayCard.y + awayCard.h / 2);
  });
}

export function drawPoster(ctx, width, height, state) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#f4f5f3";
  ctx.fillRect(0, 0, width, height);

  // Platzhalter
  // SPONSOR_TILES.forEach(tile => drawSponsorTile(ctx, tile));

  // Mit Inhalt
  SPONSOR_TILES.forEach(tile => {
  console.log("tile:", tile.sponsorId, tile.x, tile.y, tile.w, tile.h);

  const sponsor = SPONSORS[tile.sponsorId];
  if (!sponsor) {
    console.warn("Kein Sponsor gefunden für:", tile.sponsorId);
    return;
  }

  drawSponsorTile(ctx, sponsor, tile);
});
  drawCenterPanel(ctx, state);
}