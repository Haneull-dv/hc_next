"use client";
import React, { useState, useMemo } from "react";

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

// 그룹화된 데이터 타입 정의
interface GroupedData {
  [source_name: string]: {
    [year: number]: number;
    unit?: string;
  };
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

  // 데이터 그룹핑 및 정렬
  const { groupedData, years, unit } = useMemo(() => {
    const groupedData: GroupedData = {};
    const yearsSet = new Set<number>();
    let unit = "";

    // 데이터 그룹핑
    data.forEach((item) => {
      if (!groupedData[item.source_name]) {
        groupedData[item.source_name] = {};
      }
      
      groupedData[item.source_name][item.year] = item.value;
      groupedData[item.source_name].unit = item.unit;
      yearsSet.add(item.year);
      
      // 단위 저장 (모든 항목의 단위가 동일하다고 가정)
      if (!unit && item.unit) {
        unit = item.unit;
      }
    });

    // 연도 내림차순 정렬
    const years = Array.from(yearsSet).sort((a, b) => b - a);
    
    return { groupedData, years, unit };
  }, [data]);

  // 기수 계산 함수 (연도에서 기수로 변환)
  const calculatePeriod = (year: number): string => {
    // 가장 최근 연도를 기준으로 기수 계산 (예: 2024년 -> 제 56기)
    const latestYear = years[0] || 0;
    const basePeriod = 56; // 2024년 기준 제 56기로 가정
    const diff = latestYear - year;
    return `제 ${basePeriod - diff}기`;
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
                  항목명
                </th>
                {years.map((year, index) => (
                  <th 
                    key={year} 
                    className={`px-6 py-3 border-b border-gray-200 text-right text-xs font-medium text-gray-600 uppercase tracking-wider ${index === years.length - 1 ? 'lastCol' : ''}`}
                  >
                    {calculatePeriod(year)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedData).map((sourceName, rowIndex) => (
                <tr key={sourceName} className="hover:bg-gray-50">
                  <td 
                    className="default" 
                    valign="middle" 
                    align="left" 
                    style={{paddingBottom:"5px", paddingTop:"5px", paddingLeft:"20px", paddingRight:"5px"}}
                  >
                    <span style={{fontFamily:"굴림", fontSize:"11pt", color:"buttontext", fontStyle:"normal", fontWeight:"normal", textDecoration:"none"}}>
                      {sourceName}
                    </span>
                  </td>
                  
                  {years.map((year, colIndex) => (
                    <td 
                      key={`${sourceName}-${year}`} 
                      className={colIndex === years.length - 1 ? "lastCol" : "default"} 
                      valign="middle" 
                      align="right" 
                      style={{paddingBottom:"5px", paddingTop:"5px", paddingLeft:"5px", paddingRight:"5px"}}
                    >
                      <span style={{fontFamily:"굴림", fontSize:"11pt", color:"buttontext", fontStyle:"normal", fontWeight:"normal", textDecoration:"none"}}>
                        {groupedData[sourceName][year] !== undefined ? formatNumber(groupedData[sourceName][year]) : "-"}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={years.length + 1} className="px-6 py-3 text-right text-xs font-medium text-gray-600">
                  단위: {unit}
                </td>
              </tr>
            </tfoot>
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