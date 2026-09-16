import rameshImg from "@/assets/artisan-ramesh.jpg";
import sunitaImg from "@/assets/artisan-sunita.jpg";
import vikramImg from "@/assets/artisan-vikram.jpg";
import potteryImg from "@/assets/product-pottery.jpg";
import textileImg from "@/assets/product-textile.jpg";
import brassImg from "@/assets/product-brass.jpg";
import tableImg from "@/assets/product-table.jpg";

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
  work: { title: string; price: string; image: string }[];
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
    work: [
      { title: "Study Table, Oak", price: "₹9,500", image: tableImg },
      { title: "Carved Wall Panel", price: "₹6,200", image: brassImg },
    ],
  },
  {
    id: "sunita-woodworks",
    name: "Sunita Woodworks",
    craft: "Furniture & joinery",
    city: "Udaipur, Rajasthan",
    rating: 4.8,
    orders: 88,
    onTime: 96,
    repeatBuyers: 33,
    photo: sunitaImg,
    about:
      "A women-led workshop making clean-lined joinery furniture. Sunita is known for fast turnarounds and finishes that survive Indian summers.",
    verified: ["Identity", "Phone", "GST"],
    quote: "₹10,200",
    quotedDays: 5,
    work: [
      { title: "Planed Oak Desk", price: "₹10,200", image: tableImg },
      { title: "Blue Pottery Set", price: "₹4,800", image: potteryImg },
    ],
  },
  {
    id: "vikram-timber",
    name: "Vikram Timber Co.",
    craft: "Woodwork & carving",
    city: "Jodhpur, Rajasthan",
    rating: 4.6,
    orders: 53,
    onTime: 94,
    repeatBuyers: 28,
    photo: vikramImg,
    about:
      "A young workshop taking on detailed carving commissions. Vikram prices keenly and sends progress photos at every stage.",
    verified: ["Identity", "Phone"],
    quote: "₹8,700",
    quotedDays: 8,
    work: [
      { title: "Hand-carved Chest", price: "₹8,700", image: tableImg },
      { title: "Embroidered Wall Art", price: "₹2,100", image: textileImg },
    ],
  },
];

export const catalogue = [
  { title: "Blue Pottery Set", price: "₹4,800", city: "Jaipur", image: potteryImg, artisan: "Sunita Woodworks" },
  { title: "Embroidered Wall Art", price: "₹2,100", city: "Lucknow", image: textileImg, artisan: "Vikram Timber Co." },
  { title: "Brass Table Lamp", price: "₹3,000", city: "Moradabad", image: brassImg, artisan: "Ramesh Handicrafts" },
  { title: "Study Table, Oak", price: "₹9,500", city: "Jaipur", image: tableImg, artisan: "Ramesh Handicrafts" },
];

export const openRequirements = [
  { title: "Wooden wall shelf", qty: "10 units", budget: "₹12,000", city: "Jaipur", posted: "2 hours ago" },
  { title: "Hand embroidery on dupattas", qty: "20 units", budget: "₹15,000", city: "Lucknow", posted: "5 hours ago" },
  { title: "Wedding invitation boxes", qty: "50 units", budget: "₹22,000", city: "Ahmedabad", posted: "Yesterday" },
];
