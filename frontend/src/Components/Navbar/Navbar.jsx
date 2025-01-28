import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import translations from '../../Locale/Navbar.json';

const menuItems = [
  { path: "/", key: "home" },
  { path: "/about", key: "about" },
  { path: "/leadership", key: "leadership" },
  { path: "/board", key: "board" },
  { path: "/our-services", key: "services" },
  { path: "/contact", key: "contact" },
];

const MenuItem = ({ path, label, onClick }) => (
  <li>
    <Link
      to={path}
      className="hover:text-blue-600 transition duration-300"
      onClick={() => {
        onClick();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {label}
    </Link>
  </li>
);

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ko');

  useEffect(() => {
    localStorage.setItem('language', language);
    window.dispatchEvent(new Event('languageChange'));
  }, [language]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:ml-12 lg:mr-8">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {translations[language].company.name}
          </Link>
        </h1>

        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex gap-8 text-lg">
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                path={item.path}
                label={translations[language].menu[item.key]}
                onClick={() => {}}
              />
            ))}
          </ul>
        </div>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="hidden lg:block px-3 py-1 ml-8 border rounded-md bg-white hover:border-blue-500 transition duration-300"
        >
          <option value="ko">{translations.ko.language}</option>
          <option value="en">{translations.en.language}</option>
        </select>

        <button
          className="lg:hidden text-2xl"
          onClick={toggleMenu}
          aria-label={translations[language].buttons.menu}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-black transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="p-4">
          <button
            className="text-2xl mb-8 float-right"
            onClick={toggleMenu}
            aria-label={translations[language].buttons.close}
          >
            <HiX />
          </button>
          <ul className="clear-both space-y-4 pt-8 text-lg">
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                path={item.path}
                label={translations[language].menu[item.key]}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </ul>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mt-6 w-full px-3 py-1 border rounded-md bg-white hover:border-blue-500 transition duration-300"
          >
            <option value="ko">{translations.ko.language}</option>
            <option value="en">{translations.en.language}</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
