import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ContactLocale from "../../Locale/Contact-Components.json";

const Contact = () => {
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
    return keys.reduce((obj, k) => obj[k], ContactLocale[language]);
  };

  const gridVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  const titleVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const mapVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } },
  };

  const buttonVariant = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      className="bg-white py-20 lg:py-40"
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div className="text-center mb-12" variants={titleVariant}>
          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
            variants={titleVariant}
          >
            {t("contact.title")}
          </motion.h2>
          <motion.p className="text-gray-600 text-lg" variants={titleVariant}>
            {t("contact.subtitle")}
          </motion.p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              title: t("contact.contactMethods.phone.title"),
              info: t("contact.contactMethods.phone.info"),
              subInfo: t("contact.contactMethods.phone.subInfo"),
            },
            {
              title: t("contact.contactMethods.email.title"),
              info: t("contact.contactMethods.email.info"),
              subInfo: t("contact.contactMethods.email.subInfo"),
            },
            {
              title: t("contact.contactMethods.location.title"),
              info: t("contact.contactMethods.location.info"),
              subInfo: t("contact.contactMethods.location.subInfo"),
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow duration-300 text-center"
              custom={index}
              initial="hidden"
              animate="visible"
              variants={gridVariants}
            >
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.info}</p>
              <p className="text-gray-500 text-sm">{item.subInfo}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mb-12 max-w-4xl mx-auto"
          variants={mapVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white shadow rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.279301018033!2d126.9754847612344!3d37.572040327749015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2eb421c44ad%3A0xe955a50c118085f8!2sGwanghwamun%20Square!5e0!3m2!1sen!2skr!4v1735115389923!5m2!1sen!2skr"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] md:h-[600px] lg:h-[600px]"
            ></iframe>
          </div>
        </motion.div>
        <motion.div
          className="mt-12 text-center"
          variants={buttonVariant}
          initial="hidden"
          animate="visible"
        >
          <Link
            to="/contact"
            className="inline-block px-10 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-all duration-300 ease-in-out hover:shadow-lg"
          >
            {t("contact.button")}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
