"use client";
import Logo from "../components/Logo";

export default function ESGPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-black text-white px-8 py-24 md:px-16">
      {/* 로고 */}
      <div className="flex justify-center mb-16">
        <Logo width={240} height={60} />
      </div>
      {/* 메인 콘텐츠 - 통합 섹션 */}
      <section className="max-w-5xl mx-auto text-center space-y-10">
        {/* 히어로 타이틀 */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-snug bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
          ESG 공시 자동화<br />서비스 준비 중
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 mb-10 leading-relaxed">
          ESG 공시 관련 영상 및 콘텐츠가 곧 제공될 예정입니다.
        </p>
        {/* ESG 비디오 자리 */}
        <div className="w-full mx-auto mb-12 relative overflow-visible aspect-video flex items-center justify-center bg-[#1c2444]/40 rounded-xl">
          <span className="text-gray-400 text-lg">ESG 공시 영상이 준비 중입니다.</span>
        </div>
      </section>
    </div>
  );
} 