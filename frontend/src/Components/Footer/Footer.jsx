import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import FooterLocale from "../../Locale/Footer.json";

const Footer = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ko');

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'ko');
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const t = (key) => {
    const keys = key.split(".");
    return keys.reduce((obj, k) => obj[k], FooterLocale[language]);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.company.title")}</h3>
            <p className="text-gray-400">
              {t("footer.company.description")}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.quickLinks.title")}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" onClick={scrollToTop} className="hover:text-white transition-colors">
                  {t("footer.quickLinks.home")}
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTop} className="hover:text-white transition-colors">
                  {t("footer.quickLinks.about")}
                </Link>
              </li>
              <li>
                <Link to="/leadership" onClick={scrollToTop} className="hover:text-white transition-colors">
                  {t("footer.quickLinks.leadership")}
                </Link>
              </li>
              <li>
                <Link to="/board" onClick={scrollToTop} className="hover:text-white transition-colors">
                  {t("footer.quickLinks.board")}
                </Link>
              </li>
              <li>
                <Link to="/our-services" onClick={scrollToTop} className="hover:text-white transition-colors">
                  {t("footer.quickLinks.services")}
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop} className="hover:text-white transition-colors">
                  {t("footer.quickLinks.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.contact.title")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>{t("footer.contact.address1")}</li>
              <li>{t("footer.contact.address2")}</li>
              <li>{t("footer.contact.phone")}</li>
              <li>{t("footer.contact.email")}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.social.title")}</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
