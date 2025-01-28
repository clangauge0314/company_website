import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Human1 from "../../assets/Human1.jpg";
import leadershipLocale from "../../Locale/Leadership.json";

const Leadership = () => {
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
    return keys.reduce((obj, k) => obj[k], leadershipLocale[language]);
  };

  const executives = t("executivesSection.members");
  const teamMembers = t("teamSection.members");

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  return (
    <motion.div
      className="container max-w-7xl mx-auto px-4 py-32"
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center mb-12" variants={fadeInVariants}>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          {t("pageTitle")}
        </h1>
        <p className="text-xl text-gray-600">
          {t("pageSubtitle")}
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row gap-12 mb-24 items-center"
        variants={fadeInVariants}
      >
        <motion.div className="md:w-2/3" variants={fadeInVariants}>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{t("ceoSection.title")}</h2>
          <div className="text-lg text-gray-600 space-y-6">
            <p>{t("ceoSection.greeting")}</p>
            <p>{t("ceoSection.message1")}</p>
            <p>{t("ceoSection.message2")}</p>
            <p className="font-semibold mt-8">{t("ceoSection.signature")}</p>
          </div>
        </motion.div>
        <motion.div
          className="md:w-1/3"
          variants={fadeInVariants}
          custom={0.2}
        >
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src={Human1} className="w-full aspect-[3/4] object-cover" />
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold text-gray-800">{t("ceoSection.name")}</h3>
              <p className="text-indigo-600">{t("ceoSection.position")}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="mb-24"
        variants={fadeInVariants}
        custom={0.4}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          {t("executivesSection.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {executives.map((executive, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              variants={fadeInVariants}
              custom={index}
            >
              <div className="aspect-square bg-gray-200">
                <img
                  src={Human1}
                  alt={executive.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {executive.name}
                </h3>
                <p className="text-indigo-600 font-semibold mb-4">
                  {executive.position}
                </p>
                <p className="text-gray-600">{executive.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mb-24"
        variants={fadeInVariants}
        custom={0.6}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          {t("teamSection.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((teamMember, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              variants={fadeInVariants}
              custom={index}
            >
              <div className="aspect-square bg-gray-200">
                <img
                  src={Human1}
                  alt={teamMember.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {teamMember.name}
                </h3>
                <p className="text-indigo-600 font-semibold mb-4">
                  {teamMember.position}
                </p>
                <p className="text-gray-600">{teamMember.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Leadership;
