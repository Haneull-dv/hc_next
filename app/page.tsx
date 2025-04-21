// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleButtonClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 md:px-12">
      {/* 상단 타이틀 + 설명 */}
      <div className="max-w-5xl mx-auto mb-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          XBRL/DSD 공시 자동화, 실무자의 고통을 덜다
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300 leading-relaxed">
          상장사 재무팀 실무자들은 이중 입력, 택사노미 매핑 오류, 수작업 부담 등 다양한 어려움을 겪고 있습니다.
        </p>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300 mt-6 leading-relaxed">
          우리는 이러한 고충을 해결하는 AI 기반 자동화 시스템을 제공합니다.
        </p>
      </div>

      {/* 중간 콘텐츠 (2열 × 2행 카드 구성) */}
      <div className="max-w-6xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {/* 카드 1 */}
          <div className="bg-[#1a1a2e] rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">문제 - DSD/XBRL 이중입력</h2>
              <p className="text-gray-300 mb-8">같은 재무정보를 두 번 입력하며 발생하는 시간 낭비와 수치 불일치</p>
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">해결책:</h3>
                <ul className="list-disc list-inside space-y-3">
                  <li>엑셀 재무제표 파일 업로드 한 번으로</li>
                  <li>XBRL 및 DSD 문서를 자동 생성</li>
                  <li>데이터 일관성 자동 검증 포함</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 카드 2 */}
          <div className="bg-[#1a1a2e] rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">문제 - 택사노미 매핑 오류</h2>
              <p className="text-gray-300 mb-8">적절한 텍소노미 요소를 찾지 못하거나 속성 불일치로 오류 발생</p>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">해결책:</h3>
                <ul className="list-disc list-inside space-y-3">
                  <li>AI 기반 택소노미 추천 시스템</li>
                  <li>기간 속성 자동 필터링</li>
                  <li>유사 계정 자동 매핑</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 카드 3 */}
          <div className="bg-[#1a1a2e] rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">문제 - 편집기 불편 및 공동작업 불가</h2>
              <p className="text-gray-300 mb-8">낯선 UI와 비협업 환경으로 반복된 수작업 및 피드백 지연</p>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">해결책:</h3>
                <ul className="list-disc list-inside space-y-3">
                  <li>엑셀 유사 웹 UI 제공</li>
                  <li>실시간 협업 및 댓글 시스템</li>
                  <li>버전 관리 및 히스토리 추적</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 카드 4 */}
          <div className="bg-[#1a1a2e] rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">문제 - 반복 검증 및 오류 대응 부담</h2>
              <p className="text-gray-300 mb-8">수치 대조, 전기 대비 변동 확인 등 반복 작업으로 인한 리소스 소모</p>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">해결책:</h3>
                <ul className="list-disc list-inside space-y-3">
                  <li>항목 간 수식 자동 검증 (자산=부채+자본 등)</li>
                  <li>전기 대비 증감 자동 분석 리포트 생성</li>
                  <li>오류 메시지 자동 해석 및 수정 가이드</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 CTA 버튼 */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-10">
          <button
            onClick={() => handleButtonClick('/dashboard')}
            className="px-10 py-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-lg font-semibold transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
          >
            시연 요청하기
          </button>
          <button
            onClick={() => handleButtonClick('/dashboard')}
            className="px-10 py-5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-lg font-semibold transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            상세 기능 보기
          </button>
        </div>
      </div>
    </div>
  );
}
