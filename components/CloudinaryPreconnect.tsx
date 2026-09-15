"use client";

import ReactDOM from "react-dom";

export function CloudinaryPreconnect() {
  ReactDOM.preconnect("https://res.cloudinary.com");
  return null;
}
