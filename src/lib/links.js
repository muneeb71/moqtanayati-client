import {
  adminDashboardIcon,
  hammerIcon,
  ordersIcon,
  reviewsIcon,
  settingsIcon,
  usersIcon,
  reportIcon,
  paymentIcon,
} from "@/assets/icons/admin-icons";
import {
  githubIcon,
  slackIcon,
  twitterIcon,
} from "@/assets/icons/footer-icons";
import {
  auctionPreferencesIcon,
  customerSupportIcon,
  helpCenterIcon,
  myBidsIcon,
  paymentMethodsIcon,
  purchaseHistoryIcon,
  shippingAddressIcon,
  watchListIcon,
} from "@/assets/icons/header-icons";

export const headerLinks = [
  {
    href: "/buyer",
    title: "Home",
  },
  {
    href: "/buyer/chats",
    title: "Chats",
  },
  {
    href: "/buyer/auctions",
    title: "Auctions",
  },
];

export const socialLinks = [
  { icon: slackIcon, href: "#" },
  { icon: twitterIcon, href: "#" },
  { icon: githubIcon, href: "#" },
];

export const userFeatureLinks = [
  {
    title: "Explore Auctions",
    href: "#",
  },
  {
    title: "Start Selling",
    href: "/seller/my-store",
  },
  {
    title: "Saved Items",
    href: "#",
  },
  {
    title: "Purchase History",
    href: "#",
  },
];

export const legalAndPoliciesLinks = [
  {
    title: "Terms & Conditions",
    href: "#",
  },
  {
    title: "Privacy Policy",
    href: "#",
  },
  {
    title: "Cookie Policy",
    href: "#",
  },
];

export const platformInformationLinks = [
  {
    title: "About",
    href: "#",
  },
  {
    title: "How It Works",
    href: "#",
  },
  {
    title: "FAQs",
    href: "#",
  },
  {
    title: "Contact Us",
    href: "#",
  },
];

export const headerDropdownLinks = [
  {
    title: "My Bids",
    icon: myBidsIcon,
    href: "/my-bids/all",
  },
  {
    title: "Purchase History",
    icon: purchaseHistoryIcon,
    href: "/profile/purchase-history/all",
  },
  {
    title: "Watchlist",
    icon: watchListIcon,
    href: "/watchlist",
  },
  {
    title: "Auction Preferences",
    icon: auctionPreferencesIcon,
    href: "/profile/auction-preferences",
  },
  {
    title: "Payment Methods",
    icon: paymentMethodsIcon,
    href: "/payment-methods/cards",
  },
  // {
  //   title: "Shipping Address",
  //   icon: shippingAddressIcon,
  //   href: "/shipping-address",
  // },
  {
    title: "Customer Support",
    icon: customerSupportIcon,
    href: "/profile/settings/customer-support",
  },
  {
    title: "Help Center",
    icon: helpCenterIcon,
    href: "/help-center/faqs/all",
  },
];

export const sellerHeaderLinks = [
  {
    href: "/seller",
    title: "Home",
  },
  {
    href: "/seller/chats",
    title: "Chats",
  },
  {
    href: "/seller/auctions/live",
    title: "Auctions",
  },
  {
    href: "/seller/analytics",
    title: "Analytics",
  },
  {
    href: "/seller/orders/active-orders",
    title: "Orders",
  },
  {
    href: "/seller/my-store",
    title: "My Store",
  },
];

export const sellerDropdownList = [
  {
    title: "Customer Support",
    icon: customerSupportIcon,
    href: "/seller/profile/settings/customer-support",
  },
  {
    title: "Help Center",
    icon: helpCenterIcon,
    href: "/seller/help-center/faqs/all",
  },
];

export const adminLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: adminDashboardIcon,
  },
  {
    title: "Users",
    icon: usersIcon,
    subLinks: [
      { title: "Buyers", href: "/admin/users/buyer" },
      { title: "Sellers", href: "/admin/users/seller" },
    ],
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ordersIcon,
  },
  {
    title: "Auctions",
    href: "/admin/auctions",
    icon: hammerIcon,
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: paymentIcon,
    subLinks: [
      { title: "Cash", href: "/admin/payment/cod" },
      { title: "Third Party", href: "/admin/payment/online" },
    ],
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: reportIcon,
    subLinks: [
      { title: "Buyer Reports", href: "/admin/reports/buyer" },
      { title: "Seller Reports", href: "/admin/reports/seller" },
    ],
  },
  {
    title: "Reviews",
    href: "/admin/reviews/buyer-reviews-sellers",
    icon: reviewsIcon,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: settingsIcon,
  },
];
