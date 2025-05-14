// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Tabs from './components/Tabs';
import FinancialSection from './components/FinancialSection';
import EsgSection from './components/EsgSection';

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('financial');

  const handleButtonClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-black text-white px-8 py-24 md:px-16">
      {/* ConanAI 텍스트 로고 */}
      <div className="flex justify-center mb-6">
        <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <span className="text-white">Conan</span><span className="text-sky-400">AI</span>
        </span>
      </div>

      {/* 탭 */}
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* 메인 콘텐츠 */}
      {activeTab === 'financial' && <FinancialSection />}
      {activeTab === 'esg' && <EsgSection />}

      {/* 팀원 소개 섹션 */}
      <section className="bg-[#0f172a] text-white py-16 px-6 mt-24 mb-20">
        <div className="text-center space-y-4">
          <p className="text-sm font-medium text-blue-400">실무 전문성과 창의성을 겸비한</p>
          <h2 className="text-3xl font-bold">"Always Curious, Always Building" 철학을 갖춘<br />ConanAI 팀</h2>
          <p className="text-gray-400 text-sm">ConanAI 프로젝트를 함께 만든 사람들입니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 mt-12 max-w-4xl mx-auto">
          {/* 천준영 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <img src="/images/junyeongc.png" alt="천준영 팀원" className="w-48 h-48 object-cover rounded-xl shadow-lg" />
            <h3 className="text-xl font-semibold">🙋‍♂️ 팀원 천준영</h3>
            <p className="text-base text-gray-300 leading-relaxed">
              사용자 피드백 기반 기능 개선 주도<br />
              백엔드 구조 설계 및 FastAPI 기술 총괄
            </p>
            <div className="text-sm text-gray-400">
              <p>- 로그인/회원가입 서비스 담당</p>
              <p>- DSD공시 서비스 담당</p>
            </div>
          </div>

          {/* 김하늘 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <img src="/images/haneull.png" alt="김하늘 팀원" className="w-48 h-48 object-cover rounded-xl shadow-lg" />
            <h3 className="text-xl font-semibold">🙋‍♀️ 팀원 김하늘</h3>
            <p className="text-base text-gray-300 leading-relaxed">
              프로젝트 운영 및 사용자 중심 기능 기획<br />
              프론트엔드 구조 설계 및 next.js 기술 총괄
            </p>
            <div className="text-sm text-gray-400">
              <p>- XBRL공시 서비스 담당</p>
              <p>- AI 택소노미 매핑 서비스 담당</p>
            </div>
          </div>
        </div>
      </section>

      {/* 고객 문의 섹션 */}
      <section className="w-full bg-[#1a1a2e] text-white py-14 px-6 border-t border-gray-800">
        <div className="max-w-screen-xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-bold">
            🗣 구현이 필요하신 기능이 있으신가요?
          </h2>
          
          <p className="text-base md:text-lg text-gray-300">
            더 나은 서비스를 제공하기 위해 사용자님의 소중한 피드백을 기다리고 있습니다.<br />
            아래 담당자에게 문의해 주시면 신속히 응답드리겠습니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 text-left pt-8 px-4 md:px-12 max-w-3xl mx-auto">
            {/* 천준영 */}
            <div className="space-y-2 pl-10 md:pl-12">
              <h3 className="text-lg font-semibold text-white">📩 천준영</h3>
              <p className="text-base font-medium text-gray-300">메일: <a href="mailto:junyeongc1000@gmail.com" className="underline hover:text-blue-300 transition-colors">junyeongc1000@gmail.com</a></p>
              <p className="text-base font-medium text-gray-300">전화: 010-2782-1102</p>
            </div>

            {/* 김하늘 */}
            <div className="space-y-2 pl-14 md:pl-24">
              <h3 className="text-lg font-semibold text-white">📩 김하늘</h3>
              <p className="text-base font-medium text-gray-300">메일: <a href="mailto:haneull.dv@gmail.com" className="underline hover:text-blue-300 transition-colors">haneull.dv@gmail.com</a></p>
              <p className="text-base font-medium text-gray-300">전화: 010-9165-7262</p>
            </div>
          </div>

          <p className="text-sm text-gray-400 mt-8">
            © ConanAI 팀은 수집된 정보를 피드백 응답 및 서비스 개선 이외의 목적으로 사용하지 않습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
