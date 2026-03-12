import { SPONSOR_TILES } from "../data/static-layout.js";
import { fillRounded, fitText, drawContain } from "./utils.js";

export function drawSponsorTile(ctx, tile) {
  fillRounded(ctx, tile.x, tile.y, tile.w, tile.h, 10, "#ffffff", "#d2d6d2", 2);

  const pad = 18;
  const labelSize = fitText(ctx, tile.label, tile.w - 2 * pad, 34, 14, 800);

  ctx.save();
  ctx.fillStyle = "#68746e";
  ctx.font = `800 ${labelSize}px system-ui`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(tile.label, tile.x + tile.w / 2, tile.y + tile.h / 2);
  ctx.restore();
}

export function drawCenterPanel(ctx, state) {
  const { matches, homeName, homeLogo } = state;
  const visible = matches.slice(0, 3);

  const x = 360;
  const y = 390;
  const w = 760;
  const h = 360;

  fillRounded(ctx, x, y, w, h, 14, "#ffffff", "#cfd4cf", 2);

  const bg = ctx.createLinearGradient(x, y, x, y + h);
  bg.addColorStop(0, "#dbeaf7");
  bg.addColorStop(1, "#edf4ea");
  fillRounded(ctx, x + 2, y + 2, w - 4, h - 4, 12, bg);

  const leftColX = x + 26;
  const leftColW = 220;

  const rightColX = x + 285;
  const rightColW = w - (rightColX - x) - 24;

  // Kopfzeile
  const headerY = y + 20;

  ctx.fillStyle = "#16231d";
  ctx.textBaseline = "top";

  ctx.textAlign = "left";
  const titleSize = fitText(ctx, homeName, leftColW, 24, 18, 900);
  ctx.font = `900 ${titleSize}px system-ui`;
  ctx.fillText(homeName, leftColX, headerY);

  ctx.textAlign = "left";
  ctx.font = "800 20px system-ui";
  ctx.fillText("Begegnungen", rightColX, headerY + 2);

  // gleicher Start für Logo und Liste
  const contentTop = y + 72;

  // Logo links größer/präsenter
  const logoBox = {
    x: leftColX + 4,
    y: contentTop,
    w: 180,
    h: 180
  };

  fillRounded(
    ctx,
    logoBox.x,
    logoBox.y,
    logoBox.w,
    logoBox.h,
    20,
    "rgba(255,255,255,0.88)",
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

  // Begegnungen rechts
  const rowH = 64;
  const rowGap = 12;
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

    const lx = rightColX + 10;
    const ly = ry + 8;
    const ls = rowH - 16;

    fillRounded(ctx, lx, ly, ls, ls, 10, "#f1f3f1", "rgba(0,0,0,0.06)", 1.5);

    if (m.logo) {
      drawContain(ctx, m.logo, lx, ly, ls, ls, 5);
    } else {
      ctx.fillStyle = "#7f8a84";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "800 9px system-ui";
      ctx.fillText("LOGO", lx + ls / 2, ly + ls / 2);
    }

    const oppX = lx + ls + 12;
    const oppW = 210;
    const oppSize = fitText(ctx, m.opponent, oppW, 20, 12, 800);

    ctx.fillStyle = "#17251e";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = `800 ${oppSize}px system-ui`;
    ctx.fillText(m.opponent, oppX, ry + rowH / 2);

    ctx.textAlign = "right";
    ctx.fillStyle = "#31423a";
    ctx.font = "800 12px system-ui";
    ctx.fillText(m.date, rightColX + rightColW - 12, ry + 14);

    ctx.fillStyle = "#111d17";
    ctx.font = "900 18px system-ui";
    ctx.fillText(m.time, rightColX + rightColW - 12, ry + rowH - 12);
  });
}

export function drawPoster(ctx, width, height, state) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#f4f5f3";
  ctx.fillRect(0, 0, width, height);

  SPONSOR_TILES.forEach(tile => drawSponsorTile(ctx, tile));
  drawCenterPanel(ctx, state);
}