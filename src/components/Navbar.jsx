import { useState } from "react";
import { NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <h1 className="text-2xl font-bold">
          <NavLink to="/" className="hover:text-yellow-400 transition">
            MemeVerse
          </NavLink>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-yellow-400 transition ${isActive ? "text-yellow-400 font-semibold" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/explorer"
            className={({ isActive }) =>
              `hover:text-yellow-400 transition ${isActive ? "text-yellow-400 font-semibold" : ""}`
            }
          >
            Explorer
          </NavLink>
          <NavLink
            to="/upload"
            className={({ isActive }) =>
              `hover:text-yellow-400 transition ${isActive ? "text-yellow-400 font-semibold" : ""}`
            }
          >
            Upload
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `hover:text-yellow-400 transition ${isActive ? "text-yellow-400 font-semibold" : ""}`
            }
          >
            Leaderboard
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `hover:text-yellow-400 transition ${isActive ? "text-yellow-400 font-semibold" : ""}`
            }
          >
            Profile
          </NavLink>
        </div>

        {/* Dark Mode Toggle & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <DarkModeToggle />

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 mt-4 bg-gray-900 p-4 rounded-lg">
          <NavLink
            to="/"
            className="hover:text-yellow-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/explorer"
            className="hover:text-yellow-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Explorer
          </NavLink>
          <NavLink
            to="/upload"
            className="hover:text-yellow-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Upload
          </NavLink>
          <NavLink
            to="/leaderboard"
            className="hover:text-yellow-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Leaderboard
          </NavLink>
          <NavLink
            to="/profile"
            className="hover:text-yellow-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
