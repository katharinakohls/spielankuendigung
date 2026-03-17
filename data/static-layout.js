export const BASE_W = 1600;
export const BASE_H = 1200;

// Sponsoren als Platzhalter
// export const SPONSOR_TILES = [
//   // obere Reihe
//   { x: 20,   y: 20,  w: 290, h: 320, label: "Stations Grill" },
//   { x: 330,  y: 20,  w: 300, h: 130, label: "Fleischer Fachgeschäft" },
//   { x: 650,  y: 20,  w: 500, h: 130, label: "La Romantica Da Luigi" },
//   { x: 1170, y: 20,  w: 410, h: 320, label: "Getränke Lucas" },

//   { x: 330,  y: 170, w: 820, h: 170, label: "Restaurant Roma" },

//   // Seiten
//   { x: 20,   y: 370, w: 290, h: 470, label: "Via Veneto" },
//   { x: 1170, y: 370, w: 410, h: 470, label: "Korfu" },

//   // unten obere Reihe
//   { x: 20,   y: 870, w: 500, h: 90,  label: "Salon Dolce Vita" },
//   { x: 540,  y: 870, w: 520, h: 90,  label: "Sparkasse Bergkamen-Bönen" },
//   { x: 1080, y: 870, w: 500, h: 90,  label: "EBB" },

//   // unten untere Reihe
//   { x: 20,   y: 985, w: 370, h: 165, label: "Schäfer Fenster und Türen" },
//   { x: 410,  y: 985, w: 370, h: 165, label: "Schäfer Bestattungen" },
//   { x: 800,  y: 985, w: 370, h: 165, label: "Hoer Bedachungen" },
//   { x: 1190, y: 985, w: 390, h: 165, label: "Druckerei Trost" }
// ];

// Sponsoren mit Informationen aus sponsors.js
export const SPONSOR_TILES = [
  // links / rechts groß
  { sponsorId: "stations_grill",            x: 20,   y: 20,  w: 290, h: 320 },
  { sponsorId: "getraenke_lucas",           x: 1170, y: 20,  w: 410, h: 320 },

  // obere Mittelreihe
  { sponsorId: "fleischer_kralemann",       x: 330,  y: 20,  w: 300, h: 130 },
  { sponsorId: "la_romantica_da_luigi",     x: 650,  y: 20,  w: 500, h: 130 },

  // untere Mittelreihe
  { sponsorId: "restaurant_roma",           x: 330, y: 170, w: 400, h: 170 },
  { sponsorId: "dk_bau",                    x: 750,  y: 170, w: 400, h: 170 },

  // mittlere Seiten
  { sponsorId: "via_veneto",                x: 20,   y: 370, w: 290, h: 470 },
  { sponsorId: "korfu",                     x: 1170, y: 370, w: 410, h: 470 },

  // untere obere Reihe
  { sponsorId: "salon_dolce_vita",          x: 20,   y: 860, w: 500, h: 110 },
  { sponsorId: "sparkasse_bergkamen_boenen",x: 540,  y: 860, w: 520, h: 110 },
  { sponsorId: "ebb",                       x: 1080, y: 860, w: 500, h: 110 },

  // untere untere Reihe
  { sponsorId: "schaefer_fenster_tueren",   x: 20,   y: 990, w: 370, h: 170 },
  { sponsorId: "schaefer_kretschmer",       x: 410,  y: 990, w: 370, h: 170 },
  { sponsorId: "hoer_bedachungen",          x: 800,  y: 990, w: 370, h: 170 },
  { sponsorId: "druckerei_trost",           x: 1190, y: 990, w: 390, h: 170 }
];

export const DEFAULTS = {
  homeName: "SuS Oberaden",
  homeLogoPath: "assets/home_logo.png"
};