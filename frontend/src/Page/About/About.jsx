import React from "react";
import { motion } from "framer-motion";
import companyImage from "../../assets/Image2.jpg";

const About = () => {
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
          회사 소개
        </h2>
        <div className="text-lg leading-relaxed text-gray-600 space-y-6">
          <p>
            ABC Company는 1995년 설립 이래로 전력 변환 장치 및 전력 제어
            시스템 분야에서 혁신적인 솔루션을 제공해온 선도적인 전기 기업입니다.
            고효율 변압기, 전력변환장치(PCS), 무정전전원장치(UPS) 등의 핵심
            제품을 개발 및 생산하며, 신재생 에너지 설비와 스마트 그리드 시스템
            구축에도 앞장서고 있습니다.
          </p>
          <p>
            특히 친환경 에너지 솔루션 분야에서 탁월한 기술력을 인정받아,
            국내외 주요 발전소와 산업시설에 안정적인 전력 공급 시스템을
            구축하고 있습니다. 끊임없는 R&D 투자와 기술 혁신을 통해 에너지
            효율화와 전력 품질 향상에 기여하며, 지속 가능한 미래를 위한
            친환경 에너지 솔루션을 선도하고 있습니다.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24"
        variants={fadeInVariants}
        custom={2}
      >
        {[
          { title: "혁신", desc: "끊임없는 도전과 혁신으로 미래를 선도합니다" },
          { title: "신뢰", desc: "고객과의 신뢰를 최우선 가치로 삼습니다" },
          { title: "성장", desc: "구성원들의 지속적인 성장을 지원합니다" },
        ].map((value, index) => (
          <motion.div
            key={index}
            className="bg-white p-10 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 border border-gray-100"
            variants={fadeInVariants}
            custom={index + 3}
          >
            <h3 className="text-2xl font-bold mb-4 text-indigo-600">
              {value.title}
            </h3>
            <p className="text-gray-600 text-lg">{value.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mb-24 max-w-4xl mx-auto text-center"
        variants={fadeInVariants}
        custom={4}
      >
        <h2 className="text-4xl font-bold mb-8 text-slate-800">회사 비전</h2>
        <p className="text-2xl leading-relaxed text-gray-600 font-light">
          "2030년까지 글로벌 시장을 선도하는 기술 혁신 기업으로 도약하여,
          <br />더 나은 세상을 만드는데 기여하겠습니다."
        </p>
      </motion.div>

      <motion.div
        className="mb-24"
        variants={fadeInVariants}
        custom={5}
      >
        <h2 className="text-4xl font-bold mb-12 text-slate-800 text-center">
          회사 연혁
        </h2>
        <div className="space-y-12 max-w-5xl mx-auto">
          {[
            { year: "2023", event: "글로벌 시장 진출" },
            { year: "2022", event: "시리즈 B 투자 유치" },
            { year: "2021", event: "주요 기술 특허 획득" },
            { year: "2020", event: "회사 설립" },
          ].map((item, index) => (
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
                    {item.year}
                  </h3>
                  <p className="text-gray-700 text-lg">{item.event}</p>
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
