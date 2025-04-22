"use client";

import React, { useState } from "react";

// 엑셀 테이블 데이터 타입
interface TableData {
  [key: string]: any;
}

// API 응답 타입
interface DsdUploadResponse {
  filename: string;
  sheets: {
    [sheetName: string]: TableData[];
  };
}

export default function SeparateBalanceSheetPage() {
  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState<'excel_file' | 'xbrl_gen' | 'dsd_gen'>('excel_file');

  // 탭 변경 핸들러
  const handleTabChange = (tab: 'excel_file' | 'xbrl_gen' | 'dsd_gen') => {
    setActiveTab(tab);
  };

  // XBRL 파일 업로드 핸들러
  const handleXbrlFileUpload = () => {
    console.log("엑셀 업로드 기능 연결 예정");
  };
  
  // DSD 상태 관리
  const [dsdLoading, setDsdLoading] = useState<boolean>(false);
  const [dsdError, setDsdError] = useState<string | null>(null);
  const [dsdFile, setDsdFile] = useState<File | null>(null);
  const [dsdFileName, setDsdFileName] = useState<string>("");
  const [sheetName, setSheetName] = useState<string>("");
  const [dsdTableData, setDsdTableData] = useState<TableData[]>([]);
  const [dsdHeaders, setDsdHeaders] = useState<string[]>([]);

  // 숫자 포맷팅 함수 (백만 단위 변환 및 3자리 콤마 추가)
  const formatNumber = (num: number | string | null | undefined): string => {
    if (num === null || num === undefined || num === "") return "";
    const numValue = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(numValue)) return "";
    
    const millionValue = numValue / 1000000;
    return new Intl.NumberFormat('ko-KR').format(millionValue);
  };

  // 공백 개수 계산 및 &nbsp; 변환 함수
  const convertSpacesToNbsp = (text: string): React.ReactNode => {
    if (!text) return '';
    
    // 앞쪽 공백 개수 계산
    let leadingSpaces = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') {
        leadingSpaces++;
      } else {
        break;
      }
    }
    
    // 공백을 제거한 실제 텍스트
    const actualText = text.trimStart();
    
    // &nbsp; 생성
    let spaces = '';
    for (let i = 0; i < leadingSpaces; i++) {
      spaces += '\u00A0';
    }
    
    return <>{spaces}{actualText}</>;
  };

  // DSD 파일 업로드 핸들러
  const handleDsdFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDsdFile(file);
      setDsdFileName(file.name);
    }
  };

  // DSD API 요청 핸들러
  const handleDsdUpload = async () => {
    if (!dsdFile) {
      setDsdError("먼저 엑셀 파일을 선택해주세요.");
      return;
    }

    if (!sheetName) {
      setDsdError("시트 이름을 입력해주세요.");
      return;
    }

    setDsdLoading(true);
    setDsdError(null);

    const formData = new FormData();
    formData.append('file', dsdFile);

    try {
      const response = await fetch(`http://localhost:8085/xsldsd/upload?sheet_name=${sheetName}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }

      const data: DsdUploadResponse = await response.json();
      
      if (data.sheets && data.sheets[sheetName] && data.sheets[sheetName].length > 0) {
        const tableData = data.sheets[sheetName];
        setDsdTableData(tableData);
        
        // 헤더 추출
        if (tableData.length > 0) {
          setDsdHeaders(Object.keys(tableData[0]));
        }
      } else {
        throw new Error("시트 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("DSD 업로드 오류:", error);
      setDsdError(error instanceof Error ? error.message : "DSD 업로드 중 오류가 발생했습니다.");
    } finally {
      setDsdLoading(false);
    }
  };

  // 재무제표 테이블 렌더링 함수
  const renderBalanceSheetTable = (
    tableData: TableData[],
    headers: string[]
  ): React.ReactElement => {
    if (!tableData.length || !headers.length) {
      return <></>;
    }
    
    // 3번째 빈 행 필터링
    const filteredTableData = tableData.filter((row, index) => index !== 2);
    
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
              {headers.map((header, index) => (
                <td
                  key={index}
                  className="default"
                  valign="middle"
                  align={index === 0 ? "left" : "right"}
                  style={{
                    paddingBottom: "5px",
                    paddingTop: "5px",
                    paddingLeft: index === 0 ? "20px" : "5px",
                    paddingRight: "5px",
                    border: "1px solid #999"
                  }}
                >
                  <span style={{ fontFamily: "굴림", fontSize: "11pt", color: "buttontext" }}>
                    {header}
                  </span>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className="default"
                    valign="middle"
                    align={colIndex === 0 ? "left" : "right"}
                    style={{
                      paddingBottom: "5px",
                      paddingTop: "5px",
                      paddingLeft: colIndex === 0 ? "20px" : "5px",
                      paddingRight: "5px",
                      border: "1px solid #999"
                    }}
                  >
                    <span style={{ fontFamily: "굴림", fontSize: "11pt", color: "buttontext" }}>
                      {colIndex === 0 
                        ? convertSpacesToNbsp(row[header]) 
                        : formatNumber(row[header])}
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* 탭 네비게이션 */}
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button 
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'excel_file' 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('excel_file')}
            >
              엑셀파일
            </button>
          </li>
          <li className="mr-2">
            <button 
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'xbrl_gen' 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('xbrl_gen')}
            >
              XBRL생성
            </button>
          </li>
          <li className="mr-2">
            <button 
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'dsd_gen' 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange('dsd_gen')}
            >
              DSD생성
            </button>
          </li>
        </ul>
      </div>

      {/* 엑셀파일 탭 */}
      {activeTab === 'excel_file' && (
        <div className="flex items-center justify-center h-64">
          <p className="text-xl text-gray-600">구현중입니다</p>
        </div>
      )}

      {/* XBRL생성 탭 */}
      {activeTab === 'xbrl_gen' && (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">XBRL 데이터</h1>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                엑셀 파일 업로드
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleXbrlFileUpload}
                  className="flex cursor-pointer items-center justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                >
                  <span>파일 선택</span>
                </button>
                <span className="text-gray-600 text-sm">
                  선택된 파일 없음
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DSD생성 탭 */}
      {activeTab === 'dsd_gen' && (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">DSD 데이터</h1>
          
          {/* 에러 메시지 */}
          {dsdError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{dsdError}</p>
            </div>
          )}
          
          {/* 로딩 인디케이터 */}
          {dsdLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          )}
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                엑셀 파일 업로드
              </label>
              <div className="flex items-center gap-3">
                <label className="flex cursor-pointer items-center justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
                  <span>파일 선택</span>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleDsdFileChange}
                    className="hidden"
                  />
                </label>
                <span className="text-gray-600 text-sm">
                  {dsdFileName || "선택된 파일 없음"}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                시트 이름
              </label>
              <input
                type="text"
                value={sheetName}
                onChange={(e) => setSheetName(e.target.value)}
                placeholder="예: D210000"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <button
              onClick={handleDsdUpload}
              disabled={dsdLoading}
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
            >
              업로드 및 변환
            </button>
          </div>
          
          {/* 테이블 표시 영역 */}
          {dsdTableData.length > 0 && dsdHeaders.length > 0 ? (
            <div className="overflow-x-auto mt-6">
              {renderBalanceSheetTable(dsdTableData, dsdHeaders)}
            </div>
          ) : (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-blue-700">엑셀 파일과 시트 이름을 입력한 후 업로드해주세요.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 