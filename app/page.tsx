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
          <p className="text-sm font-medium text-blue-400">창의성과 실행력을 겸비한</p>
          <h2 className="text-3xl font-bold">"Always Curious, Always Building" 철학을 갖춘<br />ConanAI 팀</h2>
          <p className="text-base text-gray-300 mt-2">
            ConanAI는 AI로 작업하는 <span className="font-semibold text-indigo-400">바이브 코딩</span> 방식으로 구축된 프로젝트입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 mt-12 max-w-4xl mx-auto">
          {/* 천준영 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <img src="/images/junyeongc.png" alt="천준영 팀원" className="w-48 h-48 object-cover rounded-xl shadow-lg" />
            <h3 className="text-xl font-semibold">🙋‍♂️ 천준영</h3>
            <div className="text-base text-gray-300 leading-relaxed space-y-2">
              <p>K-디지털 ESG 자동화 과정 수료 중</p>
              <p>고려대 ESG학회 'KASE' 창립자 · 회장 역임</p>
              <p>기업 공시 데이터 기반 ESG 성과 측정 연구 경험 보유</p>
            </div>
            <div className="text-sm text-gray-400">
              <p>- DSD공시 서비스 담당</p>
              <p>- ESG 공시용 텍스트 생성 AI모델 학습 담당</p>
            </div>
          </div>

          {/* 김하늘 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <img src="/images/haneull.png" alt="김하늘 팀원" className="w-48 h-48 object-cover rounded-xl shadow-lg" />
            <h3 className="text-xl font-semibold">🙋‍♀️ 김하늘</h3>
            <div className="text-base text-gray-300 leading-relaxed space-y-2">
              <p>K-디지털 ESG 자동화 과정 수료 중</p>
              <p>네오위즈 IR팀 공시 실무 인턴 경험</p>
              <p>전자공시 실무 사이클 경험 및 공시용 재무자료 검토 지원 경험 보유</p>
            </div>
            <div className="text-sm text-gray-400">
              <p>- XBRL공시 서비스 담당</p>
              <p>- AI 택소노미 매핑 서비스 담당</p>
            </div>
          </div>
        </div>
      </section>

      {/* 고객 문의 섹션 */}
      <section className="w-full bg-[#1a1a2e] text-white py-14 px-4 md:px-6 border-t border-gray-800">
        <div className="max-w-screen-xl mx-auto text-center space-y-6">
          <h2 className="text-xl md:text-2xl font-bold">
            🗣 구현이 필요하신 기능이 있으신가요?
          </h2>
          
          <p className="text-sm md:text-base lg:text-lg text-gray-300 break-words">
            더 나은 서비스를 제공하기 위해 사용자님의 소중한 피드백을 기다리고 있습니다.<br className="hidden md:block" />
            아래 담당자에게 문의해 주시면 신속히 응답드리겠습니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 text-left pt-8 px-4 md:px-12 max-w-3xl mx-auto">
            {/* 천준영 */}
            <div className="space-y-2 pl-4 md:pl-12">
              <h3 className="text-base md:text-lg font-semibold text-white">📩 천준영</h3>
              <p className="text-sm md:text-base font-medium text-gray-300 break-words">
                메일: <a href="mailto:junyeongc1000@gmail.com" className="underline hover:text-blue-300 transition-colors">junyeongc1000@gmail.com</a>
              </p>
              <p className="text-sm md:text-base font-medium text-gray-300">전화: 010-2782-1102</p>
            </div>

            {/* 김하늘 */}
            <div className="space-y-2 pl-4 md:pl-12">
              <h3 className="text-base md:text-lg font-semibold text-white">📩 김하늘</h3>
              <p className="text-sm md:text-base font-medium text-gray-300 break-words">
                메일: <a href="mailto:haneull.dv@gmail.com" className="underline hover:text-blue-300 transition-colors">haneull.dv@gmail.com</a>
              </p>
              <p className="text-sm md:text-base font-medium text-gray-300">전화: 010-9165-7262</p>
            </div>
          </div>

          <p className="text-xs md:text-sm text-gray-400 mt-8">
            © ConanAI 팀은 수집된 정보를 피드백 응답 및 서비스 개선 이외의 목적으로 사용하지 않습니다.
          </p>
        </div>
      </section>
    </div>
  );
}
