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

  const isSmall = h <= 110;
  const isMedium = h > 110 && h <= 190;
  const isLarge = h > 190;

  const centerX = x + w / 2;
  const hasLogo = !!sponsor.logoImage;

  // --------------------------------------------------
  // Variante 1: Text links / Logo rechts
  // --------------------------------------------------
  if (sponsor.layout === "text-logo" && hasLogo) {

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

  // Titel
  ctx.fillStyle = "#1f2c25";

  const nameSize = fitText(
    ctx,
    sponsor.name,
    textW,
    26,
    14,
    800
  );

  ctx.font = `800 ${nameSize}px system-ui`;

  ctx.fillText(
    sponsor.name,
    textX,
    centerY - (sponsor.subtitle ? nameSize * 0.4 : 0)
  );

  // Subtitle optional
  if (sponsor.subtitle) {

    ctx.fillStyle = "#5e6b65";

    ctx.font = "600 14px system-ui";

    ctx.fillText(
      sponsor.subtitle,
      textX,
      centerY + nameSize * 0.6
    );
  }

  ctx.restore();

  // Logo rechts – ebenfalls vertikal zentriert
  const logoH = h * 0.65;

  drawContain(
    ctx,
    sponsor.logoImage,
    logoX,
    centerY - logoH / 2,
    logoW,
    logoH,
    2
  );

  return;
}

  // --------------------------------------------------
  // Variante 2: Standard – Titel oben / Logo unten
  // --------------------------------------------------
  const topPad = 14;
  const sidePad = 14;
  const bottomPad = 14;

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  let cursorY = y + topPad;

  // Titel
  ctx.fillStyle = "#1f2c25";
  const nameMaxWidth = w - sidePad * 2;
  const nameSize = isSmall
    ? fitText(ctx, sponsor.name, nameMaxWidth, 16, 11, 800)
    : isMedium
      ? fitText(ctx, sponsor.name, nameMaxWidth, 21, 13, 800)
      : fitText(ctx, sponsor.name, nameMaxWidth, 27, 15, 800);

  ctx.font = `800 ${nameSize}px system-ui`;
  ctx.fillText(sponsor.name, centerX, cursorY);
  cursorY += nameSize + 6;

  // Subtitle
  if (sponsor.subtitle && !isSmall) {
    ctx.fillStyle = "#5e6b65";
    const subtitleSize = isMedium ? 12 : 14;
    ctx.font = `600 ${subtitleSize}px system-ui`;
    ctx.fillText(sponsor.subtitle, centerX, cursorY);
    cursorY += subtitleSize + 6;
  }

  // Zusatzzeilen
  let maxLines = 0;
  if (isLarge && !hasLogo) maxLines = 2;
  if (isLarge && hasLogo) maxLines = 1;
  if (isMedium && !hasLogo) maxLines = 1;

  const lines = (sponsor.lines || []).slice(0, maxLines);

  if (lines.length) {
    ctx.fillStyle = "#5e6b65";
    ctx.font = "500 12px system-ui";

    for (const line of lines) {
      ctx.fillText(line, centerX, cursorY);
      cursorY += 16;
    }
  }

  // Logo unten
  if (hasLogo) {

  const logoTop = cursorY + 6;
  const logoBottom = y + h - bottomPad;

  const logoH = Math.max(40, logoBottom - logoTop);

  drawContain(
    ctx,
    sponsor.logoImage,
    x + 18,
    logoTop,
    w - 36,
    logoH,
    2
  );
}

  ctx.restore();
}

export function drawCenterPanel(ctx, state) {
  const { matches, homeName, matchDay, homeLogo } = state;
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

  const leftColX = x + 24;
  const leftColW = 250;

  const rightColX = x + 315;
  const rightColW = w - (rightColX - x) - 24;

  // Kopfzeile
  const headerY = y + 18;

  ctx.fillStyle = "#16231d";
  ctx.textBaseline = "top";

  ctx.textAlign = "left";
  const titleSize = fitText(ctx, homeName, leftColW, 28, 20, 900);
  ctx.font = `900 ${titleSize}px system-ui`;
  ctx.fillText(homeName, leftColX, headerY);

  ctx.textAlign = "left";
  ctx.font = "800 21px system-ui";
  ctx.fillText("Begegnungen", rightColX, headerY + 3);

  // gemeinsamer Startbereich
  const contentTop = y + 70;

  // Logo links größer
  const logoBox = { x: leftColX + 6, y: contentTop, w: 220, h: 220 };
  const rowH = 72;

  fillRounded(
    ctx,
    logoBox.x,
    logoBox.y,
    logoBox.w,
    logoBox.h,
    20,
    "rgba(255,255,255,0.90)",
    "rgba(0,0,0,0.08)",
    2
  );

  if (homeLogo) {
    drawContain(ctx, homeLogo, logoBox.x, logoBox.y, logoBox.w, logoBox.h, 14);
  } else {
    ctx.fillStyle = "#7a857f";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "700 20px system-ui";
    ctx.fillText("SuS LOGO", logoBox.x + logoBox.w / 2, logoBox.y + logoBox.h / 2);
  }

  if (matchDay) {
    ctx.fillStyle = "#31423a";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "800 20px system-ui";
    ctx.fillText(matchDay, logoBox.x + logoBox.w / 2, logoBox.y + logoBox.h + 16);
  }



  // Begegnungen rechts – höher und über mehr Fläche verteilt
  // const rowH = 68;
  const rowGap = 14;
  const rowsTop = contentTop;

  visible.forEach((m, i) => {
    const ry = rowsTop + i * (rowH + rowGap);

    fillRounded(
      ctx,
      rightColX,
      ry,
      rightColW,
      rowH,
      14,
      "rgba(255,255,255,0.96)",
      "rgba(0,0,0,0.08)",
      2
    );

    const lx = rightColX + 12;
    const ly = ry + 8;
    const ls = rowH - 16;

    fillRounded(ctx, lx, ly, ls, ls, 10, "#f1f3f1", "rgba(0,0,0,0.06)", 1.5);

    if (m.logo) {
      drawContain(ctx, m.logo, lx, ly, ls, ls, 5);
    } else {
      ctx.fillStyle = "#7f8a84";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "800 10px system-ui";
      ctx.fillText("LOGO", lx + ls / 2, ly + ls / 2);
    }

    const oppX = lx + ls + 12;
    const oppW = 210;
    const oppSize = fitText(ctx, m.opponent, oppW, 18, 12, 800);

    ctx.fillStyle = "#17251e";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = `800 ${oppSize}px system-ui`;
    ctx.fillText(m.opponent, oppX, ry + rowH / 2);

    ctx.textAlign = "right";
    ctx.fillStyle = "#111d17";
    ctx.font = "900 20px system-ui";
    ctx.fillText(m.time, rightColX + rightColW - 12, ry + rowH / 2 + 6);
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