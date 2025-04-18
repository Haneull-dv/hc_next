"use client";
import React, { useState } from "react";

// API 응답 데이터 타입 정의
interface SourceData {
  id: number;
  corp_code: string;
  source_name: string;
  value: number;
  year: number;
  unit: string;
}

interface ApiResponse {
  success: boolean;
  data: SourceData[];
}

export default function SeparateBalanceSheetPage() {
  const [corpCode, setCorpCode] = useState<string>("");
  const [lastFetchedCorpCode, setLastFetchedCorpCode] = useState<string>("");
  const [data, setData] = useState<SourceData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialState, setIsInitialState] = useState<boolean>(true);

  // 숫자 포맷팅 함수
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };

  // 기업코드 변경 핸들러
  const handleCorpCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorpCode(e.target.value);
    // 입력 시 에러 초기화
    if (error) {
      setError(null);
    }
  };

  // 데이터 조회 함수
  const fetchData = async () => {
    // 기업코드 유효성 검사
    if (!corpCode.trim()) {
      setError("기업코드를 입력해주세요.");
      return;
    }

    // 기업코드 형식 검증 (8자리 숫자)
    const corpCodeRegex = /^\d{8}$/;
    if (!corpCodeRegex.test(corpCode)) {
      setError("기업코드는 8자리 숫자여야 합니다.");
      return;
    }

    // 중복 요청 방지
    if (corpCode === lastFetchedCorpCode) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setIsInitialState(false);

      // fetch 캐시 방지 옵션 추가
      const response = await fetch(`http://localhost:8085/dsdgen/dsd-auto-fetch?corp_code=${corpCode}`, {
        cache: "no-store"
      });
      
      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }
      
      const result: ApiResponse = await response.json();
      
      if (result.success) {
        setData(result.data);
        // 요청 성공 시 마지막 조회 코드 업데이트
        setLastFetchedCorpCode(corpCode);
      } else {
        throw new Error("API 응답이 성공 상태가 아닙니다.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
      console.error("데이터 가져오기 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  // 조회 버튼 클릭 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">재무상태표</h1>
      
      {/* 검색 폼 */}
      <div className="mb-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <label htmlFor="corpCode" className="block text-sm font-medium text-gray-700 mb-1">
              기업코드
            </label>
            <input
              type="text"
              id="corpCode"
              value={corpCode}
              onChange={handleCorpCodeChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="기업코드를 입력하세요 (8자리 숫자)"
            />
          </div>
          <div className="self-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              disabled={loading}
            >
              조회
            </button>
          </div>
        </form>
      </div>
      
      {loading && (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {isInitialState && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <p className="text-blue-700">기업코드를 입력하고 조회 버튼을 클릭하세요.</p>
        </div>
      )}
      
      {!loading && !error && !isInitialState && data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  항목
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  코드
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                  금액
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  연도
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  단위
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    {item.source_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.corp_code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {formatNumber(item.value)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {item.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {item.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading && !error && !isInitialState ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p className="text-yellow-700">데이터가 없습니다.</p>
        </div>
      ) : null}
    </div>
  );
} 