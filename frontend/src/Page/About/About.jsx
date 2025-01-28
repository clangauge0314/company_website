import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import companyImage from "../../assets/Image2.jpg";
import AboutLocale from "../../Locale/About.json";

const About = () => {
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
    return keys.reduce((obj, k) => obj[k], AboutLocale[language]);
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-32 max-w-7xl"
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl mb-24"
        variants={imageVariants}
      >
        <img src={companyImage} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900"></div>
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
          <motion.h3
            className="text-2xl md:text-4xl font-bold mb-2 md:mb-3"
            variants={fadeInVariants}
          >
            ABC Company
          </motion.h3>
          <motion.p
            className="text-base md:text-xl font-light"
            variants={fadeInVariants}
          >
            혁신과 신뢰로 글로벌 시장을 선도합니다.
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="mb-24 max-w-4xl mx-auto"
        variants={fadeInVariants}
        custom={1}
      >
        <h2 className="text-4xl font-bold mb-8 text-slate-800 text-center">
          {t("title")}
        </h2>
        <div className="text-lg leading-relaxed text-gray-600 space-y-6">
          <p>
            {t("description.part1")} {t("description.part2")}
          </p>
          <p>
            {t("description.part3")} {t("description.part4")}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24"
        variants={fadeInVariants}
        custom={2}
      >
        {[
          { key: "innovation" },
          { key: "trust" },
          { key: "growth" },
        ].map((value, index) => (
          <motion.div
            key={index}
            className="bg-white p-10 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 border border-gray-100"
            variants={fadeInVariants}
            custom={index + 3}
          >
            <h3 className="text-2xl font-bold mb-4 text-indigo-600">
              {t(`values.${value.key}.title`)}
            </h3>
            <p className="text-gray-600 text-lg">{t(`values.${value.key}.desc`)}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mb-24 max-w-4xl mx-auto text-center"
        variants={fadeInVariants}
        custom={4}
      >
        <h2 className="text-4xl font-bold mb-8 text-slate-800">{t("vision.title")}</h2>
        <p className="text-2xl leading-relaxed text-gray-600 font-light">
          "{t("vision.content")}"
        </p>
      </motion.div>

      <motion.div
        className="mb-24"
        variants={fadeInVariants}
        custom={5}
      >
        <h2 className="text-4xl font-bold mb-12 text-slate-800 text-center">
          {t("history.title")}
        </h2>
        <div className="space-y-12 max-w-5xl mx-auto">
          {Object.entries(t("history.events")).map(([year, event], index) => (
            <motion.div
              key={index}
              className={`flex items-center gap-8 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
              variants={fadeInVariants}
              custom={index + 6}
            >
              <div className="w-1/2 text-center">
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <h3 className="text-2xl font-bold mb-3 text-indigo-600">
                    {year}
                  </h3>
                  <p className="text-gray-700 text-lg">{event}</p>
                </div>
              </div>
              <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
              <div className="w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
