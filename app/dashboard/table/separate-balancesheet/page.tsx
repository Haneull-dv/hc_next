"use client";

import React, { useState, useMemo, ReactElement } from "react";

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

// 엑셀 테이블 데이터 타입
interface TableData {
  [key: string]: any;
}

export default function SeparateBalanceSheetPage() {
  // 재무상태표 관련 상태
  const [corpCode, setCorpCode] = useState<string>("");
  const [lastFetchedCorpCode, setLastFetchedCorpCode] = useState<string>("");
  const [data, setData] = useState<SourceData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialState, setIsInitialState] = useState<boolean>(true);

  // 엑셀 업로드 관련 상태
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [sheetName, setSheetName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'balancesheet' | 'excel'>('balancesheet');

  // 숫자 포맷팅 함수 (백만 단위 변환 및 3자리 콤마 추가)
  const formatNumber = (num: number | string | null | undefined): string => {
    if (num === null || num === undefined || num === "") return "";
    const numValue = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(numValue)) return "";
    
    // 백만 단위로 변환 (나누기 1,000,000)
    const millionValue = numValue / 1000000;
    return new Intl.NumberFormat('ko-KR').format(millionValue);
  };

  // 계정과목 들여쓰기 처리 함수
  const formatAccountTitle = (title: string): ReactElement => {
    if (!title) return <></>;
    
    // 앞쪽 공백 개수 계산
    const leadingSpaces = title.match(/^\s*/)?.[0].length || 0;
    const trimmedTitle = title.trim();
    
    // 들여쓰기를 &nbsp; 로 대체 (공백 2개 = &nbsp; 1개로 계산)
    const indentation = Array(Math.floor(leadingSpaces / 2) + 1).join('\u00A0\u00A0\u00A0\u00A0');
    
    return (
      <span style={{fontFamily:"굴림", fontSize:"11pt", color:"buttontext"}}>
        {indentation}{trimmedTitle}
      </span>
    );
  };

  // 재무제표 테이블 렌더링 함수
  const renderBalanceSheetTable = (
    tableData: TableData[],
    headers: string[]
  ): ReactElement => {
    if (!tableData.length || !headers.length) {
      return <></>;
    }
    
    // 첫 번째 열 이름 (계정과목)
    const firstColumnHeader = headers[0];
    
    // 연도 헤더 (2024-12-31 → 2024.12.31)
    const yearHeaders = headers.slice(1).map(header => {
      return header.replace(/-/g, '.');
    });
    
    return (
      <div>
        <div style={{ textAlign: 'right', marginBottom: '5px' }}>
          <span style={{ fontFamily: '굴림', fontSize: '10pt', color: 'buttontext' }}>
            (단위: 백만원)
          </span>
        </div>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th 
                className="default" 
                style={{
                  paddingBottom: "5px", 
                  paddingTop: "5px", 
                  paddingLeft: "20px", 
                  paddingRight: "5px", 
                  textAlign: "left", 
                  verticalAlign: "middle",
                  border: "1px solid #999"
                }}
              >
                <span style={{fontFamily:"굴림", fontSize:"11pt", color:"buttontext"}}>
                  자산
                </span>
              </th>
              
              {yearHeaders.map((yearHeader, index) => (
                <th 
                  key={index} 
                  className={index === yearHeaders.length - 1 ? "lastCol" : "default"} 
                  style={{
                    paddingBottom: "5px", 
                    paddingTop: "5px", 
                    paddingLeft: "5px", 
                    paddingRight: "5px", 
                    textAlign: "right", 
                    verticalAlign: "middle",
                    border: "1px solid #999"
                  }}
                >
                  <span style={{fontFamily:"굴림", fontSize:"11pt", color:"buttontext"}}>
                    {yearHeader}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td 
                  className="default" 
                  style={{
                    paddingBottom: "5px", 
                    paddingTop: "5px", 
                    paddingLeft: "20px", 
                    paddingRight: "5px", 
                    textAlign: "left", 
                    verticalAlign: "middle",
                    border: "1px solid #999"
                  }}
                >
                  {formatAccountTitle(row[firstColumnHeader])}
                </td>
                
                {headers.slice(1).map((header, colIndex) => (
                  <td 
                    key={`${rowIndex}-${colIndex}`} 
                    className={colIndex === headers.length - 2 ? "lastCol" : "default"} 
                    style={{
                      paddingBottom: "5px", 
                      paddingTop: "5px", 
                      paddingLeft: "5px", 
                      paddingRight: "5px", 
                      textAlign: "right", 
                      verticalAlign: "middle",
                      border: "1px solid #999"
                    }}
                  >
                    <span style={{fontFamily:"굴림", fontSize:"11pt", color:"buttontext"}}>
                      {formatNumber(row[header])}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // 기업코드 변경 핸들러
  const handleCorpCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorpCode(e.target.value);
    // 입력 시 에러 초기화
    if (error) {
      setError(null);
    }
  };

  // 시트 이름 변경 핸들러
  const handleSheetNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSheetName(e.target.value);
  };

  // 탭 변경 핸들러
  const handleTabChange = (tab: 'balancesheet' | 'excel') => {
    setActiveTab(tab);
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

  // 파일 변경 핸들러
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일명 저장
    setFileName(file.name);

    // 파일 확장자 확인
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (fileExt !== 'xlsx' && fileExt !== 'xls') {
      setError("엑셀 파일(.xlsx, .xls)만 업로드 가능합니다.");
      return;
    }

    setLoading(true);
    setError(null);
    setIsInitialState(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // 시트명을 쿼리 파라미터로 포함
      let url = 'http://localhost:8085/xsldsd/upload';
      if (sheetName.trim()) {
        url += `?sheet_name=${encodeURIComponent(sheetName.trim())}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }

      const result = await response.json();

      // 데이터 형식 확인 및 파싱
      // 사용자가 입력한 시트명 또는 첫 번째 시트 데이터 추출
      const userSheetName = sheetName.trim();
      const parsed = userSheetName && result?.sheets?.[userSheetName] 
                    ? result.sheets[userSheetName]
                    : Object.values(result?.sheets || {})[0] || [];

      // 추출된 데이터 검증 및 처리
      if (Array.isArray(parsed) && parsed.length > 0) {
        setTableData(parsed);
        // 첫 번째 객체의 키를 테이블 헤더로 사용
        setHeaders(Object.keys(parsed[0]));
      } else {
        setTableData([]);
        setHeaders([]);
        throw new Error("유효한 데이터가 없습니다.");
      }
    } catch (err) {
      console.error("업로드 오류:", err);
      setError(err instanceof Error ? err.message : "파일 업로드 중 오류가 발생했습니다.");
      setTableData([]);
      setHeaders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* 탭 네비게이션 */}
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button 
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'balancesheet' 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('balancesheet')}
            >
              재무상태표
            </button>
          </li>
          <li className="mr-2">
            <button 
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'excel' 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('excel')}
            >
              엑셀 업로드
            </button>
          </li>
        </ul>
      </div>

      {activeTab === 'balancesheet' ? (
        <>
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
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">엑셀 데이터 테이블</h1>

          {/* 파일 업로드 영역 */}
          <div className="mb-6">
            <div className="flex flex-col gap-4">
              {/* 시트 이름 입력 필드 */}
              <div>
                <label htmlFor="sheetName" className="block text-sm font-medium text-gray-700 mb-1">
                  시트 이름 (선택사항)
                </label>
                <input
                  type="text"
                  id="sheetName"
                  value={sheetName}
                  onChange={handleSheetNameChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="예: D210000, D310000 (비워두면 전체 시트 변환)"
                />
                <p className="mt-1 text-sm text-gray-500">
                  변환할 특정 시트 이름을 입력하세요. 비워두면 전체 시트가 변환됩니다.
                </p>
              </div>
              
              {/* 파일 업로드 필드 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  엑셀 파일 업로드
                </label>
                <div className="flex items-center gap-3">
                  <label 
                    className="flex cursor-pointer items-center justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                  >
                    <span>파일 선택</span>
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <span className="text-gray-600 text-sm">
                    {fileName ? fileName : "선택된 파일 없음"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  엑셀 파일(.xlsx, .xls)을 업로드하세요. 자동으로 처리됩니다.
                </p>
              </div>
            </div>
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

          {!loading && headers.length > 0 && tableData.length > 0 ? (
            <div className="overflow-x-auto">
              {renderBalanceSheetTable(tableData, headers)}
            </div>
          ) : !loading && !error && !isInitialState ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-yellow-700">데이터가 없습니다. 엑셀 파일을 업로드해주세요.</p>
            </div>
          ) : isInitialState && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p className="text-blue-700">엑셀 파일을 업로드해주세요.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
} 