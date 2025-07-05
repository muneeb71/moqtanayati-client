import {
  Smartphone,
  Home,
  Monitor,
  Sofa,
  Music,
  Heart,
  Gem,
  PawPrint,
  Car,
  Utensils,
  Gift,
} from "lucide-react";

export const categoryData = {
  accessories: {
    icon: "Smartphone",
    subcategories: [
      "Phone Cases",
      "Chargers",
      "Headphones",
      "Smart Watches",
      "Power Banks",
    ],
  },
  home: {
    icon: "Home",
    subcategories: [
      "Kitchen Appliances",
      "Home Decor",
      "Furniture",
      "Lighting",
      "Cleaning Supplies",
      "Garden Supplies",
      "Bedding",
      "Storage",
      "Tools and Hardware",
      "Organization",
      "Home Security",
    ],
  },
  electronics: {
    icon: "Monitor",
    subcategories: [
      "TVs",
      "Computers",
      "Cameras",
      "Audio Equipment",
      "Gaming Consoles",
    ],
  },
  furniture: {
    icon: "Sofa",
    subcategories: [
      "Living Room",
      "Bedroom",
      "Office",
      "Outdoor",
      "Storage Furniture",
    ],
  },
  music: {
    icon: "Music",
    subcategories: ["Instruments", "Sheet Music", "Accessories", "Audio Gear"],
  },
  health: {
    icon: "Heart",
    subcategories: [
      "Supplements",
      "Medical Devices",
      "Personal Care",
      "Fitness Equipment",
    ],
  },
  jewellery: {
    icon: "Gem",
    subcategories: ["Rings", "Necklaces", "Bracelets", "Earrings"],
  },
  animals: {
    icon: "PawPrint",
    subcategories: ["Pet Food", "Toys", "Accessories", "Grooming"],
  },
  cars: {
    icon: "Car",
    subcategories: [
      "Car Accessories",
      "Spare Parts",
      "Tools",
      "Car Electronics",
    ],
  },
  food: {
    icon: "Utensils",
    subcategories: ["Snacks", "Beverages", "Organic", "Frozen Foods"],
  },
  gifts: {
    icon: "Gift",
    subcategories: ["Gift Baskets", "Cards", "Toys", "Decorative Items"],
  },
};

export const categories = [
  {
    label: "Accessories",
    value: "accessories",
    icon: Smartphone,
    bg: "bg-lightGreen",
  },
  { label: "Home", value: "home", icon: Home, bg: "bg-lightGreen" },
  {
    label: "Electronics",
    value: "electronics",
    icon: Monitor,
    bg: "bg-lightOrange",
  },
  { label: "Furniture", value: "furniture", icon: Sofa, bg: "bg-lightPurple" },
  { label: "Music", value: "music", icon: Music, bg: "bg-lightOrange" },
  { label: "Health", value: "health", icon: Heart, bg: "bg-lightPurple" },
  { label: "Jewellery", value: "jewellery", icon: Gem, bg: "bg-lightYellow" },
  { label: "Animals", value: "animals", icon: PawPrint, bg: "bg-lightGreen" },
  { label: "Cars", value: "cars", icon: Car, bg: "bg-lightPurple" },
  {
    label: "Accessories",
    value: "accessories2",
    icon: Smartphone,
    bg: "bg-lightGreen",
  },
  { label: "Food", value: "food", icon: Utensils, bg: "bg-lightYellow" },
  { label: "Gifts", value: "gifts", icon: Gift, bg: "bg-lightOrange" },
];
