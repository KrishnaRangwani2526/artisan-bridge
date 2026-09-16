import rameshImg from "@/assets/artisan-ramesh.jpg";
import sunitaImg from "@/assets/artisan-sunita.jpg";
import vikramImg from "@/assets/artisan-vikram.jpg";
import potteryImg from "@/assets/product-pottery.jpg";
import textileImg from "@/assets/product-textile.jpg";
import brassImg from "@/assets/product-brass.jpg";
import tableImg from "@/assets/product-table.jpg";
import vaseImg from "@/assets/p-vase.jpg";
import terracottaImg from "@/assets/p-terracotta.jpg";
import shawlImg from "@/assets/p-shawl.jpg";
import blockprintImg from "@/assets/p-blockprint.jpg";
import diyaImg from "@/assets/p-diya.jpg";
import dhokraImg from "@/assets/p-dhokra.jpg";
import madhubaniImg from "@/assets/p-madhubani.jpg";
import juteImg from "@/assets/p-jute.jpg";
import elephantImg from "@/assets/p-elephant.jpg";
import bambooImg from "@/assets/p-bamboo.jpg";
import mojariImg from "@/assets/p-mojari.jpg";
import marbleImg from "@/assets/p-marble.jpg";

export type Artisan = {
  id: string;
  name: string;
  craft: string;
  city: string;
  rating: number;
  orders: number;
  onTime: number;
  repeatBuyers: number;
  photo: string;
  about: string;
  verified: string[];
  quote: string;
  quotedDays: number;
  sinceYear: number;
  languages: string[];
};

export const artisans: Artisan[] = [
  {
    id: "ramesh-handicrafts",
    name: "Ramesh Handicrafts",
    craft: "Woodwork & furniture",
    city: "Jaipur, Rajasthan",
    rating: 4.9,
    orders: 126,
    onTime: 98,
    repeatBuyers: 41,
    photo: rameshImg,
    about:
      "Three generations of hand-carved Rajasthani woodwork. Ramesh works mostly in sheesham and oak, and takes on custom furniture sized to a room.",
    verified: ["Identity", "Phone", "Workshop address"],
    quote: "₹9,500",
    quotedDays: 7,
    sinceYear: 1998,
    languages: ["Hindi", "English"],
  },
  {
    id: "sunita-woodworks",
    name: "Sunita Woodworks",
    craft: "Furniture, pottery & joinery",
    city: "Udaipur, Rajasthan",
    rating: 4.8,
    orders: 88,
    onTime: 96,
    repeatBuyers: 33,
    photo: sunitaImg,
    about:
      "A women-led workshop making clean-lined joinery furniture and blue pottery. Known for fast turnarounds and finishes that survive Indian summers.",
    verified: ["Identity", "Phone", "GST"],
    quote: "₹10,200",
    quotedDays: 5,
    sinceYear: 2009,
    languages: ["Hindi", "Marathi", "English"],
  },
  {
    id: "vikram-timber",
    name: "Vikram Timber Co.",
    craft: "Carving, metal & textiles",
    city: "Jodhpur, Rajasthan",
    rating: 4.6,
    orders: 53,
    onTime: 94,
    repeatBuyers: 28,
    photo: vikramImg,
    about:
      "A young workshop taking on detailed carving and metal commissions. Vikram prices keenly and sends progress photos at every stage.",
    verified: ["Identity", "Phone"],
    quote: "₹8,700",
    quotedDays: 8,
    sinceYear: 2017,
    languages: ["Hindi", "Bengali", "English"],
  },
];

export type Product = {
  id: string;
  title: string;
  craft: string;
  price: number;
  bulkPrice: number;
  moq: number;
  city: string;
  images: string[];
  description: string;
  materials: string;
  size: string;
  makeDays: number;
  artisanId: string;
  likes: number;
  tags: string[];
};

export const products: Product[] = [
  {
    id: "blue-pottery-vase",
    title: "Blue Pottery Vase",
    craft: "Pottery",
    price: 1850,
    bulkPrice: 1490,
    moq: 25,
    city: "Jaipur",
    images: [vaseImg, potteryImg, terracottaImg],
    description:
      "Hand-thrown Jaipur blue pottery vase, painted free-hand with cobalt floral vines and fired twice for a glassy finish. No two pieces are identical.",
    materials: "Quartz clay, cobalt glaze",
    size: "9 in height, 5 in width",
    makeDays: 6,
    artisanId: "sunita-woodworks",
    likes: 214,
    tags: ["vase", "blue pottery", "home decor", "jaipur"],
  },
  {
    id: "terracotta-plate-set",
    title: "Terracotta Dinner Plate Set",
    craft: "Pottery",
    price: 1200,
    bulkPrice: 890,
    moq: 40,
    city: "Jaipur",
    images: [terracottaImg, potteryImg, vaseImg],
    description:
      "A set of four wheel-thrown terracotta plates, sun-dried and kiln-fired. Food safe, keeps rotis warm and gets better with use.",
    materials: "River clay, natural finish",
    size: "10 in diameter, set of 4",
    makeDays: 5,
    artisanId: "sunita-woodworks",
    likes: 168,
    tags: ["plates", "terracotta", "kitchen", "pottery"],
  },
  {
    id: "pashmina-shawl",
    title: "Handwoven Pashmina Shawl",
    craft: "Textiles",
    price: 6400,
    bulkPrice: 5200,
    moq: 15,
    city: "Srinagar",
    images: [shawlImg, blockprintImg, textileImg],
    description:
      "Woven on a handloom over eleven days, with a hand-embroidered kani border. Light as breath, warm through a north Indian winter.",
    materials: "Pure pashmina wool, silk thread",
    size: "80 × 40 in",
    makeDays: 11,
    artisanId: "vikram-timber",
    likes: 402,
    tags: ["shawl", "pashmina", "winter", "textile"],
  },
  {
    id: "bagru-block-print",
    title: "Bagru Block Print Fabric",
    craft: "Textiles",
    price: 950,
    bulkPrice: 720,
    moq: 50,
    city: "Bagru",
    images: [blockprintImg, textileImg, shawlImg],
    description:
      "Indigo block printed cotton, stamped by hand with teakwood blocks and dyed in natural indigo vats. Sold per running metre.",
    materials: "Cotton, natural indigo dye",
    size: "1 metre × 44 in width",
    makeDays: 4,
    artisanId: "vikram-timber",
    likes: 129,
    tags: ["fabric", "block print", "indigo", "cotton"],
  },
  {
    id: "brass-diya-set",
    title: "Engraved Brass Diya Set",
    craft: "Metalwork",
    price: 2400,
    bulkPrice: 1850,
    moq: 30,
    city: "Moradabad",
    images: [diyaImg, brassImg, dhokraImg],
    description:
      "One standing lamp with four small diyas, hand engraved with lotus borders. A favourite for festival hampers and corporate gifting.",
    materials: "Solid brass, hand engraved",
    size: "Lamp 7 in, diyas 2.5 in",
    makeDays: 7,
    artisanId: "ramesh-handicrafts",
    likes: 311,
    tags: ["diya", "brass", "festival", "gifting"],
  },
  {
    id: "dhokra-figurine",
    title: "Dhokra Dancing Lady",
    craft: "Metalwork",
    price: 3100,
    bulkPrice: 2550,
    moq: 20,
    city: "Bastar",
    images: [dhokraImg, brassImg, diyaImg],
    description:
      "Cast in bell metal using the 4,000-year-old lost-wax method. Every thread of the skirt is a rolled wax coil, so each casting is one of one.",
    materials: "Bell metal, lost-wax cast",
    size: "11 in height",
    makeDays: 12,
    artisanId: "vikram-timber",
    likes: 275,
    tags: ["dhokra", "tribal", "sculpture", "brass"],
  },
  {
    id: "madhubani-painting",
    title: "Madhubani Painting on Handmade Paper",
    craft: "Painting",
    price: 2700,
    bulkPrice: 2100,
    moq: 20,
    city: "Madhubani",
    images: [madhubaniImg, textileImg, marbleImg],
    description:
      "Peacock and fish motifs painted with natural pigments and a bamboo nib on handmade paper. Unframed, ready to mount.",
    materials: "Handmade paper, natural pigments",
    size: "16 × 14 in",
    makeDays: 9,
    artisanId: "vikram-timber",
    likes: 196,
    tags: ["painting", "madhubani", "folk art", "wall"],
  },
  {
    id: "jute-tote-bag",
    title: "Embroidered Jute Tote",
    craft: "Textiles",
    price: 780,
    bulkPrice: 540,
    moq: 100,
    city: "Kolkata",
    images: [juteImg, textileImg, blockprintImg],
    description:
      "Sturdy woven jute tote with a hand-embroidered flower panel and cotton lining. Popular for retail packaging and event giveaways.",
    materials: "Jute, cotton lining",
    size: "14 × 13 × 5 in",
    makeDays: 3,
    artisanId: "sunita-woodworks",
    likes: 143,
    tags: ["bag", "jute", "eco", "bulk"],
  },
  {
    id: "carved-wooden-elephant",
    title: "Hand-carved Wooden Elephant",
    craft: "Woodwork",
    price: 4300,
    bulkPrice: 3600,
    moq: 15,
    city: "Jodhpur",
    images: [elephantImg, tableImg, brassImg],
    description:
      "Carved from a single block of seasoned sheesham, with a jali-work saddle cut by chisel. Finished in beeswax, not lacquer.",
    materials: "Sheesham wood, beeswax finish",
    size: "10 in height",
    makeDays: 10,
    artisanId: "ramesh-handicrafts",
    likes: 358,
    tags: ["elephant", "wood carving", "decor", "gift"],
  },
  {
    id: "bamboo-table-lamp",
    title: "Woven Bamboo Table Lamp",
    craft: "Bamboo & cane",
    price: 2200,
    bulkPrice: 1700,
    moq: 25,
    city: "Agartala",
    images: [bambooImg, juteImg, tableImg],
    description:
      "Split bamboo woven over a turned wood base, throwing a diamond pattern of light across the wall. BIS-marked wiring fitted.",
    materials: "Bamboo, mango wood base",
    size: "17 in height",
    makeDays: 6,
    artisanId: "sunita-woodworks",
    likes: 231,
    tags: ["lamp", "bamboo", "lighting", "decor"],
  },
  {
    id: "leather-mojari",
    title: "Embroidered Leather Mojari",
    craft: "Leather",
    price: 1650,
    bulkPrice: 1250,
    moq: 40,
    city: "Jaipur",
    images: [mojariImg, textileImg, juteImg],
    description:
      "Vegetable-tanned leather juttis with silk thread embroidery, stitched entirely by hand. Sizes 5 to 11 available.",
    materials: "Vegetable-tanned leather, silk thread",
    size: "Sizes 5–11",
    makeDays: 5,
    artisanId: "vikram-timber",
    likes: 187,
    tags: ["mojari", "jutti", "footwear", "leather"],
  },
  {
    id: "marble-inlay-coasters",
    title: "Marble Inlay Coaster Set",
    craft: "Stonework",
    price: 3400,
    bulkPrice: 2800,
    moq: 20,
    city: "Agra",
    images: [marbleImg, madhubaniImg, vaseImg],
    description:
      "Pietra dura inlay in Makrana marble — lapis, carnelian and malachite set by hand into carved channels. Set of six with a stand.",
    materials: "Makrana marble, semi-precious stone",
    size: "4 in diameter, set of 6",
    makeDays: 14,
    artisanId: "ramesh-handicrafts",
    likes: 264,
    tags: ["coasters", "marble", "inlay", "agra"],
  },
  {
    id: "oak-study-table",
    title: "Study Table, Oak",
    craft: "Woodwork",
    price: 9500,
    bulkPrice: 8400,
    moq: 10,
    city: "Jaipur",
    images: [tableImg, elephantImg, brassImg],
    description:
      "A 4 × 2 ft study table in solid oak with two drawers and a walnut finish. Built to order, delivered assembled.",
    materials: "Solid oak, walnut polish",
    size: "48 × 24 × 30 in",
    makeDays: 7,
    artisanId: "ramesh-handicrafts",
    likes: 98,
    tags: ["table", "furniture", "study", "wood"],
  },
  {
    id: "embroidered-wall-art",
    title: "Embroidered Wall Art",
    craft: "Textiles",
    price: 2100,
    bulkPrice: 1600,
    moq: 25,
    city: "Lucknow",
    images: [textileImg, blockprintImg, madhubaniImg],
    description:
      "Chikankari-inspired hand embroidery on raw cotton, stretched on a wooden frame. Each panel takes about a week at the hoop.",
    materials: "Raw cotton, cotton thread, wood frame",
    size: "18 × 18 in",
    makeDays: 7,
    artisanId: "sunita-woodworks",
    likes: 156,
    tags: ["wall art", "embroidery", "lucknow", "textile"],
  },
];

export const crafts = [
  "All crafts",
  "Pottery",
  "Woodwork",
  "Textiles",
  "Metalwork",
  "Painting",
  "Bamboo & cane",
  "Leather",
  "Stonework",
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function productsByArtisan(artisanId: string) {
  return products.filter((p) => p.artisanId === artisanId);
}

export function getArtisan(id: string) {
  return artisans.find((a) => a.id === id);
}

export const openRequirements = [
  {
    id: "req-shelf",
    title: "Wooden wall shelf",
    qty: "10 units",
    budget: "₹12,000",
    city: "Jaipur",
    posted: "2 hours ago",
    buyer: "Meera Interiors (bulk buyer)",
    note: "Sheesham, 24 × 8 in, matte finish. Repeat order likely every quarter.",
  },
  {
    id: "req-dupatta",
    title: "Hand embroidery on dupattas",
    qty: "20 units",
    budget: "₹15,000",
    city: "Lucknow",
    posted: "5 hours ago",
    buyer: "Aarti Rao (customer)",
    note: "Chikankari on cotton dupattas, pastel thread, wedding trousseau.",
  },
  {
    id: "req-boxes",
    title: "Wedding invitation boxes",
    qty: "50 units",
    budget: "₹22,000",
    city: "Ahmedabad",
    posted: "Yesterday",
    buyer: "Shubh Events (bulk buyer)",
    note: "Marble inlay lids, velvet inside. Delivery needed in 3 weeks.",
  },
  {
    id: "req-diya",
    title: "Brass diya sets for Diwali hampers",
    qty: "300 units",
    budget: "₹4,50,000",
    city: "Mumbai",
    posted: "Today",
    buyer: "Northbridge Retail (bulk buyer)",
    note: "Corporate gifting. Needs GST invoice and staggered delivery.",
  },
];

// Legacy alias used by older views
export const catalogue = products.slice(0, 4).map((p) => ({
  title: p.title,
  price: `₹${p.price.toLocaleString("en-IN")}`,
  city: p.city,
  image: p.images[0],
  artisan: getArtisan(p.artisanId)?.name ?? "",
}));
