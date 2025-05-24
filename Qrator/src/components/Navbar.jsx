import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navLinkClass = (path) =>
    `hover:text-blue-400 ${
      location.pathname === path ? "text-blue-400 font-semibold" : "text-white"
    }`;

  return (
    <ul className="flex gap-6 text-m font-medium">
      <li>
        <Link to="/home" className={navLinkClass("/home")}>
          Home
        </Link>
      </li>
      <li>
        <Link to="/idea" className={navLinkClass("/idea")}>
          Idea
        </Link>
      </li>
      <li>
        <Link to="/script" className={navLinkClass("/script")}>
          Script
        </Link>
      </li>
      <li>
        <Link to="/thumbnail" className={navLinkClass("/thumbnail")}>
          Thumbnail
        </Link>
      </li>
      <li>
        <Link to="/seo" className={navLinkClass("/seo")}>
          SEO
        </Link>
      </li>
      <li>
        <Link to="/calendar" className={navLinkClass("/calendar")}>
          Calendar
        </Link>
      </li>
      <li>
        <Link to="/vault" className={navLinkClass("/vault")}>
          Vault
        </Link>
      </li>
    </ul>
  );
}

export default Navbar;
