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
    i18nKey: "nav.buyer.home",
  },
  {
    href: "/buyer/chats",
    title: "Chats",
    i18nKey: "nav.buyer.chats",
  },
  {
    href: "/buyer/auctions",
    title: "Auctions",
    i18nKey: "nav.buyer.auctions",
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
    i18nKey: "footer.links.explore_auctions",
    href: "#",
  },
  {
    title: "Start Selling",
    i18nKey: "footer.links.start_selling",
    href: "/seller/my-store",
  },
  {
    title: "Saved Items",
    i18nKey: "footer.links.saved_items",
    href: "#",
  },
  {
    title: "Purchase History",
    i18nKey: "footer.links.purchase_history",
    href: "#",
  },
];

export const legalAndPoliciesLinks = [
  {
    title: "Terms & Conditions",
    i18nKey: "footer.links.terms",
    href: "#",
  },
  {
    title: "Privacy Policy",
    i18nKey: "footer.links.privacy",
    href: "#",
  },
  {
    title: "Cookie Policy",
    i18nKey: "footer.links.cookie",
    href: "#",
  },
];

export const platformInformationLinks = [
  {
    title: "About",
    i18nKey: "footer.links.about",
    href: "#",
  },
  {
    title: "How It Works",
    i18nKey: "footer.links.how_it_works",
    href: "#",
  },
  {
    title: "FAQs",
    i18nKey: "footer.links.faqs",
    href: "#",
  },
  {
    title: "Contact Us",
    i18nKey: "footer.links.contact",
    href: "#",
  },
];

export const headerDropdownLinks = [
  {
    title: "My Bids",
    i18nKey: "nav.dropdown.my_bids",
    icon: myBidsIcon,
    href: "/buyer/my-bids/all",
  },
  {
    title: "Purchase History",
    i18nKey: "nav.dropdown.purchase_history",
    icon: purchaseHistoryIcon,
    href: "/buyer/profile/purchase-history/all",
  },
  {
    title: "Watchlist",
    i18nKey: "nav.dropdown.watchlist",
    icon: watchListIcon,
    href: "/buyer/watchlist",
  },
  {
    title: "Auction Preferences",
    i18nKey: "nav.dropdown.auction_preferences",
    icon: auctionPreferencesIcon,
    href: "/buyer/profile/auction-preferences",
  },
  {
    title: "Payment Methods",
    i18nKey: "nav.dropdown.payment_methods",
    icon: paymentMethodsIcon,
    href: "/buyer/payment-methods/cards",
  },
  // {
  //   title: "Shipping Address",
  //   icon: shippingAddressIcon,
  //   href: "/buyer/shipping-address",
  // },
  {
    title: "Customer Support",
    i18nKey: "nav.dropdown.customer_support",
    icon: customerSupportIcon,
    href: "/buyer/profile/settings/customer-support",
  },
  {
    title: "Help Center",
    i18nKey: "nav.dropdown.help_center",
    icon: helpCenterIcon,
    href: "/buyer/help-center/faqs/all",
  },
];

export const sellerHeaderLinks = [
  {
    href: "/seller",
    title: "Home",
    i18nKey: "nav.seller.home",
  },
  {
    href: "/seller/chats",
    title: "Chats",
    i18nKey: "nav.seller.chats",
  },
  {
    href: "/seller/auctions/live",
    title: "Auctions",
    i18nKey: "nav.seller.auctions",
  },
  {
    href: "/seller/analytics",
    title: "Analytics",
    i18nKey: "nav.seller.analytics",
  },
  {
    href: "/seller/orders/active-orders",
    title: "Orders",
    i18nKey: "nav.seller.orders",
  },
  {
    href: "/seller/my-store",
    title: "My Store",
    i18nKey: "nav.seller.my_store",
  },
];

export const sellerDropdownList = [
  {
    title: "Customer Support",
    i18nKey: "nav.dropdown.customer_support",
    icon: customerSupportIcon,
    href: "/seller/profile/settings/customer-support",
  },
  {
    title: "Help Center",
    i18nKey: "nav.dropdown.help_center",
    icon: helpCenterIcon,
    href: "/seller/help-center/faqs/all",
  },
];

export const adminLinks = [
  {
    title: "Dashboard",
    i18nKey: "admin.nav.dashboard",
    href: "/admin",
    icon: adminDashboardIcon,
  },
  {
    title: "Users",
    i18nKey: "admin.nav.users",
    href: "/admin/users",
    icon: usersIcon,
  },
  {
    title: "Orders",
    i18nKey: "admin.nav.orders",
    href: "/admin/orders",
    icon: ordersIcon,
  },
  {
    title: "Auctions",
    i18nKey: "admin.nav.auctions",
    href: "/admin/auctions",
    icon: hammerIcon,
  },
  {
    title: "Payments",
    i18nKey: "admin.nav.payments",
    href: "/admin/payments",
    icon: paymentIcon,
    subLinks: [
      {
        title: "Cash",
        i18nKey: "admin.nav.payments_cash",
        href: "/admin/payments/cash",
      },
      {
        title: "Third Party",
        i18nKey: "admin.nav.payments_third_party",
        href: "/admin/payments/third-party",
      },
    ],
  },
  {
    title: "Reports",
    i18nKey: "admin.nav.reports",
    href: "/admin/reports",
    icon: reportIcon,
    subLinks: [
      {
        title: "Buyer Reports",
        i18nKey: "admin.nav.reports_buyer",
        href: "/admin/reports/buyer",
      },
      {
        title: "Seller Reports",
        i18nKey: "admin.nav.reports_seller",
        href: "/admin/reports/seller",
      },
    ],
  },
  {
    title: "Reviews",
    i18nKey: "admin.nav.reviews",
    href: "/admin/reviews/buyer-reviews-sellers",
    icon: reviewsIcon,
  },
  {
    title: "Settings",
    i18nKey: "admin.nav.settings",
    href: "/admin/settings",
    icon: settingsIcon,
  },
];
