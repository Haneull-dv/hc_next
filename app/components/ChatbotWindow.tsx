import React, { useState } from 'react';
import ChatAvatar from './ChatAvatar';

interface ChatbotWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotWindow: React.FC<ChatbotWindowProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
  };

  return (
    <div
      className={`fixed bottom-32 right-8 w-80 max-w-[95vw] h-[480px] bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ease-in-out z-50
        ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}
      `}
      style={{ boxShadow: '0 8px 32px rgba(60,60,120,0.18)' }}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <ChatAvatar size="sm" />
          <span className="font-bold text-gray-800">Conan 챗봇</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* 메시지 영역 */}
      <div className="flex-1 h-[320px] overflow-y-auto p-4 space-y-4 bg-gray-50">
        <div className="flex items-start gap-2">
          <ChatAvatar size="sm" />
          <div className="bg-white border rounded-lg p-3 max-w-[80%] shadow text-sm text-gray-800">
            안녕하세요! Conan 챗봇입니다. 무엇을 도와드릴까요?
          </div>
        </div>
      </div>
      {/* 입력 영역 */}
      <form onSubmit={handleSubmit} className="p-3 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            전송
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatbotWindow; 