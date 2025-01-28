import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ContactLocale from "../../Locale/Contact.json";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "in progress",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/contact",
        formData
      );

      if (response.status === 201) {
        alert(t("contact.alerts.success"));
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          status: "in progress",
        });
      }
    } catch (error) {
      console.log("Error: ", error);
      alert(t("contact.alerts.error"));
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  return (
    <motion.div
      className="min-h-screen bg-white py-32"
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="container mx-auto px-4 max-w-6xl"
        variants={fadeInVariants}
        custom={0}
      >
        <motion.div className="text-center mb-16" variants={fadeInVariants} custom={1}>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            {t("contact.title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-start"
          variants={fadeInVariants}
          custom={2}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8"
            variants={fadeInVariants}
            custom={3}
          >
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
                    placeholder={t("contact.form.placeholders.name")}
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
                    placeholder={t("contact.form.placeholders.email")}
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t("contact.form.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300"
                    placeholder={t("contact.form.placeholders.phone")}
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    name="message"
                    className="w-full p-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-300 h-40"
                    placeholder={t("contact.form.placeholders.message")}
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300">
                  {t("contact.form.submit")}
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div className="space-y-8" variants={fadeInVariants} custom={4}>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {t("contact.contact_info.title")}
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: t("contact.contact_info.phone.title"),
                    info: t("contact.contact_info.phone.info"),
                    desc: t("contact.contact_info.phone.desc"),
                  },
                  {
                    title: t("contact.contact_info.email.title"),
                    info: t("contact.contact_info.email.info"),
                    desc: t("contact.contact_info.email.desc"),
                  },
                  {
                    title: t("contact.contact_info.address.title"),
                    info: t("contact.contact_info.address.info"),
                    desc: t("contact.contact_info.address.desc"),
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-800">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">{item.info}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              variants={fadeInVariants}
              custom={5}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.279301018033!2d126.9754847612344!3d37.572040327749015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2eb421c44ad%3A0xe955a50c118085f8!2sGwanghwamun%20Square!5e0!3m2!1sen!2skr!4v1735115389923!5m2!1sen!2skr"
                width="100%"
                height="400"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[400px] md:h-[600px] lg:h-[600px]"
              ></iframe>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
