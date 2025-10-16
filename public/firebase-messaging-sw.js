/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js",
);

// firebase.initializeApp({
//   apiKey: self.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: self.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: self.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: self.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: self.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: self.NEXT_PUBLIC_FIREBASE_APP_ID,
// });

firebase.initializeApp({
  apiKey: "AIzaSyCHX4xkQhj_DMMHb3xcNm5FejY82odfM7k",
  authDomain: "vorae-70496.firebaseapp.com",
  projectId: "vorae-70496",
  storageBucket: "vorae-70496.firebasestorage.app",
  messagingSenderId: "847303960399",
  appId: "1:847303960399:web:5dfff21c15f64cd536c73a",
  measurementId: "G-TK5GPYNDLR",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || "Notification", {
    body: body || "",
    icon: icon || "/static/logo.png",
  });
});
