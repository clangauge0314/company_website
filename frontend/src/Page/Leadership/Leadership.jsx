import React from "react";
import Human1 from "../../assets/Human1.jpg";

const Leadership = () => {
  const executives = [
    {
      name: "이부사장",
      position: "COO",
      description:
        "운영 총괄 책임자로서 효율적인 기업 운영과 프로세스 혁신을 주도하고 있습니다.",
      imageUrl: Human1,
    },
    {
      name: "박이사",
      position: "CTO",
      description: "최신 기술 트렌드를 선도하며 R&D 부문을 총괄하고 있습니다.",
      imageUrl: Human1,
    },
    {
      name: "김이사",
      position: "CFO",
      description:
        "재무 전략 수립 및 기업 가치 향상을 위한 재무관리를 담당하고 있습니다.",
      imageUrl: Human1,
    },
    {
      name: "최이사",
      position: "CMO",
      description:
        "글로벌 마케팅 전략 수립 및 브랜드 가치 향상을 주도하고 있습니다.",
      imageUrl: Human1,
    },
  ];

  const teamMembers = [
    {
      name: "정과장",
      position: "개발팀장",
      description: "신제품 개발 및 기술 혁신을 담당하고 있습니다.",
      imageUrl: Human1,
    },
    {
      name: "최과장",
      position: "영업팀장",
      description: "글로벌 시장 개척 및 고객 관리를 담당하고 있습니다.",
      imageUrl: Human1,
    },
    {
      name: "한과장",
      position: "품질관리팀장",
      description: "제품 품질 향상 및 품질 시스템 관리를 담당하고 있습니다.",
      imageUrl: Human1,
    },
    {
      name: "김과장",
      position: "인사팀장",
      description: "인사 정책 수립 및 인사 관리를 담당하고 있습니다.",
      imageUrl: Human1,
    },
  ];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-32">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          임원진 소개
        </h1>
        <p className="text-xl text-gray-600">
          혁신과 성장을 이끄는 ABC Company의 리더쉽
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mb-24 items-center">
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">CEO 인사말</h2>
          <div className="text-lg text-gray-600 space-y-6">
            <p>안녕하십니까, ABC Company 대표이사 김대표입니다.</p>
            <p>
              저희 ABC Company는 20년 이상의 전기 산업 경력을 바탕으로, 혁신적인
              기술과 서비스를 통해 고객 여러분께 최상의 가치를 제공하기 위해
              노력하고 있습니다.
            </p>
            <p>
              급변하는 글로벌 시장 환경 속에서도 지속적인 연구개발과 품질 혁신을
              통해 세계 최고 수준의 제품과 서비스를 제공하겠습니다.
            </p>
            <p className="font-semibold mt-8">
              ABC Company 대표이사 김대표 드림
            </p>
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src={Human1} className="w-full aspect-[3/4] object-cover" />
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold text-gray-800">김대표</h3>
              <p className="text-indigo-600">대표이사</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          경영진
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {executives.map((executive, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="aspect-square bg-gray-200">
                <img
                  src={executive.imageUrl}
                  alt={executive.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{executive.name}</h3>
                <p className="text-indigo-600 font-semibold mb-4">{executive.position}</p>
                <p className="text-gray-600">{executive.description}</p>
                </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          핵심 구성원
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((teamMember, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="aspect-square bg-gray-200">
                <img
                  src={teamMember.imageUrl}
                  alt={teamMember.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{teamMember.name}</h3>
                <p className="text-indigo-600 font-semibold mb-4">{teamMember.position}</p>
                <p className="text-gray-600">{teamMember.description}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leadership;
