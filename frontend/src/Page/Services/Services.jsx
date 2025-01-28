import React from "react";
import { motion } from "framer-motion";

const Services = () => {
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
          우리의 서비스
        </h1>
        <p className="text-xl text-gray-600">
          혁신적인 기술로 비즈니스의 성공을 지원합니다.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        variants={fadeInVariants}
        custom={1}
      >
        {servicesList.map((service, index) => (
          <motion.div
            key={service.id}
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
          왜 우리를 선택해야 할까요?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              10년+ 경험
            </h3>
            <p className="text-gray-600">다양한 산업 분야의 프로젝트 경험</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              전문가 팀
            </h3>
            <p className="text-gray-600">숙련된 개발자와 컨설턴트로 구성</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              24/7 지원
            </h3>
            <p className="text-gray-600">연중무휴 기술 지원 서비스</p>
          </div>
        </div>
      </motion.div>

      <motion.div className="mt-32" variants={fadeInVariants} custom={6}>
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          프로젝트 진행 프로세스
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "요구사항 분석",
              desc: "고객의 니즈와 목표를 정확히 파악",
            },
            {
              step: "02",
              title: "설계 및 기획",
              desc: "최적의 솔루션 설계와 개발 계획 수립",
            },
            {
              step: "03",
              title: "개발 및 테스트",
              desc: "체계적인 개발과 품질 검증 진행",
            },
            {
              step: "04",
              title: "배포 및 유지보수",
              desc: "안정적인 서비스 운영과 지속적인 개선",
            },
          ].map((item, index) => (
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
          프로젝트를 시작할 준비가 되셨나요?
        </h2>
        <p className="text-xl mb-8">
          전문가와 상담하고 최적의 솔루션을 찾아보세요.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
          무료 상담 신청하기
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Services;
