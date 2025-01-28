import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ServicesLocale from "../../Locale/Services.json";

const Services = () => {
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
    return keys.reduce((obj, k) => obj[k], ServicesLocale[language]);
  };

  const servicesList = [
    {
      id: 1,
      title: "맞춤형 소프트웨어 개발",
      description: "고객의 요구사항에 맞는 최적화된 솔루션을 제공합니다.",
      icon: "💻",
    },
    {
      id: 2,
      title: "클라우드 서비스",
      description: "안정적이고 확장 가능한 클라우드 인프라 구축 및 관리",
      icon: "☁️",
    },
    {
      id: 3,
      title: "보안 솔루션",
      description: "최신 보안 기술을 적용한 안전한 시스템 구축",
      icon: "🔒",
    },
    {
      id: 4,
      title: "기술 컨설팅",
      description: "전문가의 분석을 통한 최적의 기술 전략 수립",
      icon: "📊",
    },
  ];

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
      className="container mx-auto px-4 py-32 max-w-7xl"
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center mb-12" variants={fadeInVariants}>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          {t("services.mainTitle")}
        </h1>
        <p className="text-xl text-gray-600">
          {t("services.subTitle")}
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        variants={fadeInVariants}
        custom={1}
      >
        {t("services.list").map((service, index) => (
          <motion.div
            key={index}
            className="bg-white p-8 rounded-lg shadow-lg hover:-translate-y-2 transition-transform duration-300"
            variants={fadeInVariants}
            custom={index + 2}
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {service.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="text-center" variants={fadeInVariants} custom={5}>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          {t("services.whyUs.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t("services.whyUs.reasons.0.title")}
            </h3>
            <p className="text-gray-600">{t("services.whyUs.reasons.0.description")}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t("services.whyUs.reasons.1.title")}
            </h3>
            <p className="text-gray-600">{t("services.whyUs.reasons.1.description")}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t("services.whyUs.reasons.2.title")}
            </h3>
            <p className="text-gray-600">{t("services.whyUs.reasons.2.description")}</p>
          </div>
        </div>
      </motion.div>

      <motion.div className="mt-32" variants={fadeInVariants} custom={6}>
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          {t("services.process.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {t("services.process.steps").map((item, index) => (
            <motion.div
              key={index}
              className="relative p-6 bg-white rounded-xl shadow-md"
              variants={fadeInVariants}
              custom={index + 7}
            >
              <div className="text-blue-600 text-5xl font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-32 bg-blue-600 rounded-2xl p-12 text-center text-white"
        variants={fadeInVariants}
        custom={8}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {t("services.cta.title")}
        </h2>
        <p className="text-xl mb-8">
          {t("services.cta.subtitle")}
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
          {t("services.cta.button")}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Services;
