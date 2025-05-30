import {
  electronicsIcon,
  furnitureIcon,
  jewelleryIcon,
  mobileIcon,
  propertyIcon,
} from "@/assets/icons/category-slider-icons";

import {
  Monitor,
  Music,
  Gem,
  Car,
  Gift,
  Utensils,
  PawPrint,
  Heart,
  Sofa,
  Smartphone,
  Home,
} from "lucide-react";

export const categories = [
  {
    title: "Mobile",
    icon: mobileIcon,
    bgColor: "#D7FFEE",
  },
  {
    title: "Property",
    icon: propertyIcon,
    bgColor: "#EAFFD5",
  },
  {
    title: "Electronics",
    icon: electronicsIcon,
    bgColor: "#FFE9D3",
  },
  {
    title: "Furniture",
    icon: furnitureIcon,
    bgColor: "#FEE2EC",
  },
  {
    title: "Jewellery",
    icon: jewelleryIcon,
    bgColor: "#FEE2EC",
  },
  {
    title: "Car Renting",
    icon: mobileIcon,
    bgColor: "#D7FFEE",
  },
  {
    title: "No Liability",
    icon: electronicsIcon,
    bgColor: "#FFE9D3",
  },
  {
    title: "Offline",
    icon: furnitureIcon,
    bgColor: "#FEE2EC",
  },
];

export const productAndServicesCategories = [
  {
    label: "Accessories",
    value: "ACCESSORIES",
    icon: Smartphone,
    bg: "bg-lightGreen",
  },
  { label: "Home", value: "HOME", icon: Home, bg: "bg-lightGreen" },
  {
    label: "Electronics",
    value: "ELECTRONICS",
    icon: Monitor,
    bg: "bg-lightOrange",
  },
  { label: "Furniture", value: "FURNITURE", icon: Sofa, bg: "bg-lightPurple" },
  { label: "Music", value: "MUSIC", icon: Music, bg: "bg-lightOrange" },
  { label: "Health", value: "HEALTH", icon: Heart, bg: "bg-lightPurple" },
  { label: "Jewellery", value: "JEWELLERY", icon: Gem, bg: "bg-lightYellow" },
  { label: "Animals", value: "ANIMALS", icon: PawPrint, bg: "bg-lightGreen" },
  { label: "Cars", value: "CARS", icon: Car, bg: "bg-lightPurple" },
  { label: "Food", value: "FOOD", icon: Utensils, bg: "bg-lightYellow" },
  { label: "Gifts", value: "GIFTS", icon: Gift, bg: "bg-lightOrange" },
];

export const homeSuppliesCategories = [
  {
    label: "Kitchen Appliances",
    value: "KITCHEN",
  },
  {
    label: "Home Decor",
    value: "HOMEDECOR",
  },
  {
    label: "Furniture",
    value: "FURNITURE",
  },
  {
    label: "Lighting",
    value: "LIGHTING",
  },
  {
    label: "Cleaning Supplies",
    value: "CLEANING",
  },
  {
    label: "Garden Supplies",
    value: "GARDEN",
  },
  {
    label: "Bedding",
    value: "BEDDING",
  },
  {
    label: "Storage",
    value: "STORAGE",
  },
  {
    label: "Tools and hardware",
    value: "TOOLSANDHARDWARE",
  },
  {
    label: "Organization",
    value: "ORGANIZATION",
  },
  {
    label: "Home Security",
    value: "HOMESECURITY",
  },
];
