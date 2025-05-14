import { useState } from 'react';

export default function MainTabs() {
  const [activeTab, setActiveTab] = useState<'재무공시' | 'ESG공시'>('재무공시');

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* 탭 메뉴 */}
      <div className="flex border-b border-gray-700 mb-8">
        <button
          className={`px-6 py-3 text-lg font-semibold focus:outline-none transition-colors duration-200 ${activeTab === '재무공시' ? 'border-b-4 border-blue-500 text-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
          onClick={() => setActiveTab('재무공시')}
        >
          재무공시
        </button>
        <button
          className={`px-6 py-3 text-lg font-semibold focus:outline-none transition-colors duration-200 ${activeTab === 'ESG공시' ? 'border-b-4 border-blue-500 text-blue-400' : 'text-gray-400 hover:text-blue-300'}`}
          onClick={() => setActiveTab('ESG공시')}
        >
          ESG공시
        </button>
      </div>
      {/* 탭 콘텐츠 */}
      <div className="min-h-[320px]">
        {activeTab === '재무공시' && (
          <div className="w-full mx-auto mb-12 relative overflow-visible aspect-video">
            <video 
              src="/videos/demo.mp4"
              className="w-full h-auto object-cover rounded-xl shadow-lg z-10"
              autoPlay
              loop
              muted
              playsInline
              controls
              controlsList="nodownload"
              preload="metadata"
              style={{ position: 'relative', zIndex: 10 }}
            />
          </div>
        )}
        {activeTab === 'ESG공시' && (
          <div className="w-full mx-auto mb-12 relative overflow-visible aspect-video flex items-center justify-center bg-[#1c2444]/40 rounded-xl">
            {/* 추후 ESG 영상/콘텐츠 추가 예정 */}
            <span className="text-gray-400 text-lg">ESG 공시 영상이 준비 중입니다.</span>
          </div>
        )}
      </div>
    </div>
  );
} 