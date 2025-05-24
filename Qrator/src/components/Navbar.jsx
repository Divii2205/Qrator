import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <ul className="flex gap-6 text-m font-medium text-white">
      <li><Link to="/home" className="hover:text-blue-400">Home</Link></li>
      <li><Link to="/idea" className="hover:text-blue-400">Idea</Link></li>
      <li><Link to="/script" className="hover:text-blue-400">Script</Link></li>
      <li><Link to="/thumbnail" className="hover:text-blue-400">Thumbnail</Link></li>
      <li><Link to="/seo" className="hover:text-blue-400">SEO</Link></li>
      <li><Link to="/calendar" className="hover:text-blue-400">Calendar</Link></li>
      <li><Link to="/vault" className="hover:text-blue-400">Vault</Link></li>
    </ul>
  );
}

export default Navbar;
