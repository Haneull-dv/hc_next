"use client";

import React, { useState, ReactElement } from "react";

// 엑셀 테이블 데이터 타입
interface TableData {
  [key: string]: any;
}

// 백엔드 응답 타입
interface UploadResponse {
  filename: string;
  sheet: string;
  data: { [key: string]: { [year: string]: number } };
  xbrl_path: string;
  message: string;
}

// 에러 응답 타입
interface ErrorResponse {
  error: string;
}

interface XBRLGenerateResponse {
  success: boolean;
  error?: string;
}

interface FileUploadResponse {
  success: boolean;
  data?: Record<string, any>;
  error?: string;
  xbrl_path?: string;
  filename?: string;
}

export default function SeparateBalanceSheetPage() {
  // 상태 관리
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 엑셀 업로드 관련 상태
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'excel_file' | 'xbrl_gen' | 'dsd_gen'>('excel_file');

  // XBRL, DSD 데이터 상태
  const [xbrlData, setXbrlData] = useState<string>("");
  const [dsdData, setDsdData] = useState<string>("");

  // 숫자 포맷팅 함수 (백만 단위 변환 및 3자리 콤마 추가)
  const formatNumber = (num: number | string | null | undefined): string => {
    if (num === null || num === undefined || num === "") return "";
    const numValue = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(numValue)) return "";
    
    const millionValue = numValue / 1000000;
    return new Intl.NumberFormat('ko-KR').format(millionValue);
  };

  // 계정과목 들여쓰기 처리 함수
  const formatAccountTitle = (title: string): ReactElement => {
    if (!title) return <></>;
    
    const leadingSpaces = title.match(/^\s*/)?.[0].length || 0;
    const trimmedTitle = title.trim();
    
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
    
    const firstColumnHeader = headers[0];
    const yearHeaders = headers.slice(1).map(header => header.replace(/-/g, '.'));
    
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
              <th className="default" style={{
                paddingBottom: "5px", 
                paddingTop: "5px", 
                paddingLeft: "20px", 
                paddingRight: "5px", 
                textAlign: "left", 
                verticalAlign: "middle",
                border: "1px solid #999"
              }}>
                <span style={{fontFamily:"굴림", fontSize:"11pt", color:"buttontext"}}>
                  자산
                </span>
              </th>
              {yearHeaders.map((yearHeader, index) => (
                <th key={index} className={index === yearHeaders.length - 1 ? "lastCol" : "default"} 
                    style={{
                      paddingBottom: "5px", 
                      paddingTop: "5px", 
                      paddingLeft: "5px", 
                      paddingRight: "5px", 
                      textAlign: "right", 
                      verticalAlign: "middle",
                      border: "1px solid #999"
                    }}>
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
                <td className="default" style={{
                  paddingBottom: "5px", 
                  paddingTop: "5px", 
                  paddingLeft: "20px", 
                  paddingRight: "5px", 
                  textAlign: "left", 
                  verticalAlign: "middle",
                  border: "1px solid #999"
                }}>
                  {formatAccountTitle(row[firstColumnHeader])}
                </td>
                {headers.slice(1).map((header, colIndex) => (
                  <td key={`${rowIndex}-${colIndex}`} 
                      className={colIndex === headers.length - 2 ? "lastCol" : "default"} 
                      style={{
                        paddingBottom: "5px", 
                        paddingTop: "5px", 
                        paddingLeft: "5px", 
                        paddingRight: "5px", 
                        textAlign: "right", 
                        verticalAlign: "middle",
                        border: "1px solid #999"
                      }}>
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

  // 탭 변경 핸들러
  const handleTabChange = (tab: 'excel_file' | 'xbrl_gen' | 'dsd_gen') => {
    setActiveTab(tab);
  };

  // 파일 변경 핸들러
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/xbrlgen/upload', {
        method: 'POST',
        mode: 'cors',
        body: formData
      });

      if (!response.ok) {
        const errorData: FileUploadResponse = await response.json();
        throw new Error(errorData.error || `파일 업로드 실패: ${response.status}`);
      }

      const result: FileUploadResponse = await response.json();
      console.log('Upload response:', result);
      
      if (result.data) {
        // Convert object to array format
        const dataArray = Object.entries(result.data).map(([key, value]) => ({
          account: key,
          amount: value
        }));
        setTableData(dataArray);
      }

      // 서버에서 반환한 파일명 저장
      if (result.filename) {
        setFileName(result.filename);
      }

      setActiveTab('excel_file');
    } catch (err) {
      console.error("파일 업로드 오류:", err);
      setError(err instanceof Error ? err.message : "파일 업로드 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 백엔드 요청 데이터 변환 함수
  const convertToBackendFormat = (filename: string, sheetData: TableData[]) => {
    return {
      filename,
      data: sheetData
    };
  };

  // XML 문자열 디코딩 함수
  const decodeXML = (xmlString: string): string => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(xmlString, 'text/xml');
    const serializer = new XMLSerializer();
    return serializer.serializeToString(dom);
  };

  // XML 문자열 포맷팅 함수
  const formatXML = (xml: string): string => {
    try {
      // XML 문자열에서 HTML 엔티티를 디코딩
      const decodedXml = xml
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, '&');

      // 들여쓰기 적용
      let formatted = '';
      let indent = '';
      const tab = '  '; // 2 spaces for indentation
      
      decodedXml.split(/>\s*</).forEach(node => {
        if (node.match(/^\/\w/)) {
          // 닫는 태그
          indent = indent.substring(tab.length);
        }
        formatted += indent + '<' + node + '>\n';
        if (node.match(/^<?\w[^>]*[^\/]$/) && !node.match(/\/>/)) {
          // 여는 태그이면서 self-closing이 아닌 경우
          indent += tab;
        }
      });

      return formatted
        .replace(/\s+$/g, '')  // 후행 공백 제거
        .replace(/^\s+/g, ''); // 선행 공백 제거
    } catch (err) {
      console.error('XML 포맷팅 에러:', err);
      return xml; // 에러 발생 시 원본 반환
    }
  };

  // XBRL 생성 핸들러
  const handleXbrlGenerate = async () => {
    if (!fileName || !tableData.length) {
      setError("먼저 엑셀 파일을 업로드해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 서버에서 반환받은 파일명 그대로 사용
      const downloadResponse = await fetch(`http://localhost:8000/xbrlgen/download/${fileName}`, {
        method: 'GET',
        mode: 'cors'
      });

      console.log('Download response status:', downloadResponse.status);

      if (!downloadResponse.ok) {
        if (downloadResponse.status === 404) {
          throw new Error("파일을 찾을 수 없습니다. 파일을 다시 업로드해주세요.");
        }
        const errorData = await downloadResponse.json();
        throw new Error(errorData.error || `XBRL 다운로드 실패: ${downloadResponse.status}`);
      }

      const xmlText = await downloadResponse.text();
      if (!xmlText) {
        throw new Error("생성된 XBRL 데이터가 없습니다.");
      }

      const formattedXML = formatXML(xmlText);
      setXbrlData(formattedXML);
      setActiveTab('xbrl_gen');
    } catch (err) {
      console.error("XBRL 생성 오류:", err);
      setError(err instanceof Error ? err.message : "XBRL 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // DSD 생성 핸들러
  const handleDsdGenerate = async () => {
    if (!tableData.length) {
      setError("먼저 엑셀 파일을 업로드해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8001/xsldsd/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ 
          filename: fileName.replace('.xlsx', ''),  // 확장자 제거
          sheet_data: tableData 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `DSD 생성 실패: ${response.status}` }));
        throw new Error(errorData.error);
      }

      const result = await response.text();
      setDsdData(result);
      setActiveTab('dsd_gen');
    } catch (err) {
      console.error("DSD 생성 오류:", err);
      setError(err instanceof Error ? err.message : "DSD 생성 중 오류가 발생했습니다.");
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

      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* 로딩 인디케이터 */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}

      {activeTab === 'excel_file' && (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-6">엑셀 데이터 테이블</h1>

            {/* 파일 업로드 영역 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  엑셀 파일 업로드
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex cursor-pointer items-center justify-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors">
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
              </div>
            </div>

            {/* 데이터 변환 버튼 */}
            {tableData.length > 0 && (
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleXbrlGenerate}
                  className="flex-1 px-4 py-2 bg-white border border-indigo-600 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                  disabled={loading}
                >
                  XBRL 생성
                </button>
                <button
                  onClick={handleDsdGenerate}
                  className="flex-1 px-4 py-2 bg-white border border-indigo-600 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                  disabled={loading}
                >
                  DSD 생성
                </button>
              </div>
            )}

            {/* 테이블 표시 영역 */}
            {tableData.length > 0 ? (
              <div className="overflow-x-auto">
                {renderBalanceSheetTable(tableData, headers)}
              </div>
            ) : (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-blue-700">엑셀 파일을 업로드해주세요.</p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'xbrl_gen' && (
        <>
          <h1 className="text-2xl font-bold mb-6">XBRL 데이터</h1>
          {xbrlData ? (
            <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm font-mono" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {xbrlData}
              </pre>
            </div>
          ) : (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-blue-700">엑셀 파일을 업로드하고 XBRL 생성 버튼을 클릭해주세요.</p>
            </div>
          )}
        </>
      )}

      {activeTab === 'dsd_gen' && (
        <>
          <h1 className="text-2xl font-bold mb-6">DSD 데이터</h1>
          {dsdData ? (
            <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">{dsdData}</pre>
            </div>
          ) : (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-blue-700">엑셀 파일을 업로드하고 DSD 생성 버튼을 클릭해주세요.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
} 