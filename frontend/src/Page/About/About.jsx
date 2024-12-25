import React from "react";
import companyImage from "../../assets/Image2.jpg";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-32 max-w-7xl">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-24">
        <img src={companyImage} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900"></div>
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
          <h3 className="text-2xl md:text-4xl font-bold mb-2 md:mb-3">
            ABC Company
          </h3>
          <p className="text-base md:text-xl font-light">
            혁신과 신뢰로 글로벌 시장을 선도합니다.
          </p>
        </div>
      </div>

      <div className="mb-24 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-slate-800 text-center">
          회사 소개
        </h2>
        <div className="text-lg leading-relaxed text-gray-600 space-y-6">
          <p>
            ABC Company는 1995년 설립 이래로 전력 변환 장치 및 전력 제어 시스템
            분야에서 혁신적인 솔루션을 제공해온 선도적인 전기 기업입니다. 고효율
            변압기, 전력변환장치(PCS), 무정전전원장치(UPS) 등의 핵심 제품을 개발
            및 생산하며, 신재생 에너지 설비와 스마트 그리드 시스템 구축에도
            앞장서고 있습니다.
          </p>
          <p>
            특히 친환경 에너지 솔루션 분야에서 탁월한 기술력을 인정받아, 국내외
            주요 발전소와 산업시설에 안정적인 전력 공급 시스템을 구축하고
            있습니다. 끊임없는 R&D 투자와 기술 혁신을 통해 에너지 효율화와 전력
            품질 향상에 기여하며, 지속 가능한 미래를 위한 친환경 에너지 솔루션을
            선도하고 있습니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
        {[
          { title: "혁신", desc: "끊임없는 도전과 혁신으로 미래를 선도합니다" },
          { title: "신뢰", desc: "고객과의 신뢰를 최우선 가치로 삼습니다" },
          { title: "성장", desc: "구성원들의 지속적인 성장을 지원합니다" },
        ].map((value, index) => (
          <div
            key={index}
            className="bg-white p-10 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <h3 className="text-2xl font-bold mb-4 text-indigo-600">
              {value.title}
            </h3>
            <p className="text-gray-600 text-lg">{value.desc}</p>
          </div>
        ))}
      </div>

      <div className="mb-24 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-slate-800">회사 비전</h2>
        <p className="text-2xl leading-relaxed text-gray-600 font-light">
          "2030년까지 글로벌 시장을 선도하는 기술 혁신 기업으로 도약하여,
          <br />더 나은 세상을 만드는데 기여하겠습니다."
        </p>
      </div>

      <div className="mb-24">
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
            <div
              key={index}
              className={`flex items-center gap-8 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
