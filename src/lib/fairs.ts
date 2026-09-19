/**
 * Trade-fair reference data.
 *
 * These are real, publicly documented Indian craft fairs and craft villages.
 * Artisan + product records shown against a fair are E-Setu demo data until the
 * artisan app is linked (see INTEGRATION.md → catalogue sync).
 */

export type Fair = {
  id: string;
  name: string;
  place: string;
  season: string;
  organiser: string;
  since: number | null;
  scale: string;
  crafts: string[];
  about: string;
  source: string;
  productIds: string[];
};

export const fairs: Fair[] = [
  {
    id: "shilpgram",
    name: "Shilpgram Utsav",
    place: "Udaipur, Rajasthan",
    season: "21–30 December, every year",
    organiser: "West Zone Cultural Centre, Ministry of Culture",
    since: 1989,
    scale: "70-acre craft village · 31 traditional huts of the western states",
    crafts: ["Pottery", "Textiles", "Woodwork", "Metalwork"],
    about:
      "A living rural arts and crafts complex in the lap of the Aravallis, where potters from Mewar, weavers from Marwar and Kutch, and Bhil and Rathwa tribal households keep their everyday terracotta, textile, wood and metal work in daily use rather than behind glass.",
    source: "https://wzccindia.com/shilpgram-the-rural-arts-and-crafts-complex/",
    productIds: ["blue-pottery-vase", "terracotta-plate-set", "carved-wooden-elephant", "oak-study-table"],
  },
  {
    id: "surajkund",
    name: "Surajkund International Crafts Mela",
    place: "Faridabad, Haryana",
    season: "1–15 February, every year",
    organiser: "Surajkund Mela Authority & Haryana Tourism",
    since: 1987,
    scale: "40-acre ground · about 1,000 work huts · over a million visitors",
    crafts: ["Textiles", "Painting", "Pottery", "Metalwork", "Bamboo & cane"],
    about:
      "Started to give craftspersons and weavers a way to sell directly and cut out middlemen, and now the largest crafts fair of its kind — textiles, paintings, woodwork, pottery, terracotta, stonework, lac and cane, with one theme state each year.",
    source: "https://www.surajkundmela.co.in/aboutus.html",
    productIds: ["pashmina-shawl", "madhubani-painting", "dhokra-figurine", "bamboo-table-lamp"],
  },
  {
    id: "ihgf-delhi",
    name: "IHGF Delhi Fair",
    place: "India Expo Centre, Greater Noida",
    season: "Spring & Autumn editions",
    organiser: "Export Promotion Council for Handicrafts (EPCH)",
    since: 1994,
    scale: "3,000+ manufacturers & exporters · 16 product sectors",
    crafts: ["Woodwork", "Metalwork", "Textiles", "Bamboo & cane", "Leather"],
    about:
      "India's sourcing fair for bulk and export buyers — home, lifestyle, furnishing, furniture, gifting, lamps, kitchen and eco-friendly lines. This is the buyer profile E-Setu serves with bulk pricing and minimum order quantities.",
    source: "https://www.ihgfdelhifair.in/",
    productIds: ["brass-diya-set", "jute-tote-bag", "leather-mojari", "marble-inlay-coasters"],
  },
  {
    id: "dastkari-haat",
    name: "Dastkari Haat Crafts Bazaar",
    place: "Dilli Haat, INA, New Delhi",
    season: "January, every year",
    organiser: "Dastkari Haat Samiti",
    since: 1986,
    scale: "Craftsperson-run bazaar · direct-from-maker stalls",
    crafts: ["Textiles", "Painting", "Leather"],
    about:
      "A bazaar run by the craftspeople themselves, long used as the proving ground for hand block print, embroidery and folk painting traditions meeting city buyers face to face.",
    source: "https://cultureandheritage.org/craft-and-handloom-festivals-of-india",
    productIds: ["bagru-block-print", "embroidered-wall-art", "leather-mojari"],
  },
  {
    id: "hunar-haat",
    name: "Hunar Haat",
    place: "Delhi, Lucknow, Mumbai, Hyderabad and more",
    season: "Several editions a year",
    organiser: "Ministry of Minority Affairs, Government of India",
    since: 2016,
    scale: "Travelling craft haat · live craft demonstrations",
    crafts: ["Metalwork", "Woodwork", "Textiles"],
    about:
      "A government platform for traditional artisans and weavers from minority communities, blending live demonstrations with direct sale — the closest offline parallel to what E-Setu does online.",
    source: "https://cultureandheritage.org/craft-and-handloom-festivals-of-india",
    productIds: ["brass-diya-set", "dhokra-figurine", "embroidered-wall-art"],
  },
];

export function getFair(id: string) {
  return fairs.find((f) => f.id === id);
}

export function fairsForProduct(productId: string) {
  return fairs.filter((f) => f.productIds.includes(productId));
}
