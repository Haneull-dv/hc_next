"use client";

import React, { useState } from "react";
import SummaryTable from "@/app/components/SummaryTable";

// 재무상태표 데이터
const summaryData = [
  { 항목: "유동자산", "2024-12-31": "27,815,627,000,000", "2023-12-31": "28,859,296,000,000", "2022-12-31": "29,674,369,000,000" },
  { 항목: "현금및현금성자산", "2024-12-31": "7,854,877,000,000", "2023-12-31": "9,084,899,000,000", "2022-12-31": "8,497,882,000,000" },
  { 항목: "매출채권", "2024-12-31": "8,166,047,000,000", "2023-12-31": "8,082,952,000,000", "2022-12-31": "7,450,395,000,000" },
  { 항목: "기타수취채권", "2024-12-31": "1,117,359,000,000", "2023-12-31": "682,178,000,000", "2022-12-31": "742,431,000,000" },
  { 항목: "기타유동금융자산", "2024-12-31": "219,845,000,000", "2023-12-31": "141,428,000,000", "2022-12-31": "9,167,000,000" },
  { 항목: "선급법인세", "2024-12-31": "127,219,000,000", "2023-12-31": "86,032,000,000", "2022-12-31": "52,920,000,000" },
  { 항목: "기타유동자산", "2024-12-31": "1,482,773,000,000", "2023-12-31": "1,211,374,000,000", "2022-12-31": "1,013,463,000,000" },
  { 항목: "재고자산", "2024-12-31": "8,847,433,000,000", "2023-12-31": "9,375,327,000,000", "2022-12-31": "11,880,631,000,000" },
  { 항목: "매각예정자산", "2024-12-31": "74,000,000", "2023-12-31": "195,106,000,000", "2022-12-31": "27,480,000,000" },
  { 항목: "비유동자산", "2024-12-31": "66,042,135,000,000", "2023-12-31": "48,607,398,000,000", "2022-12-31": "38,299,454,000,000" },
  { 항목: "장기매출채권", "2024-12-31": "392,585,000,000", "2023-12-31": "129,996,000,000", "2022-12-31": "120,698,000,000" },
  { 항목: "기타장기수취채권", "2024-12-31": "450,535,000,000", "2023-12-31": "427,693,000,000", "2022-12-31": "617,444,000,000" },
  { 항목: "기타비유동금융자산", "2024-12-31": "2,439,917,000,000", "2023-12-31": "1,228,501,000,000", "2022-12-31": "1,237,167,000,000" },
  { 항목: "관계기업 및 공동기업투자자산", "2024-12-31": "898,393,000,000", "2023-12-31": "1,005,606,000,000", "2022-12-31": "949,553,000,000" },
  { 항목: "이연법인세자산", "2024-12-31": "2,865,593,000,000", "2023-12-31": "2,308,966,000,000", "2022-12-31": "2,165,557,000,000" },
  { 항목: "유형자산", "2024-12-31": "54,570,446,000,000", "2023-12-31": "38,950,393,000,000", "2022-12-31": "29,662,743,000,000" },
  { 항목: "무형자산", "2024-12-31": "3,619,361,000,000", "2023-12-31": "3,692,922,000,000", "2022-12-31": "2,690,203,000,000" },
  { 항목: "투자부동산", "2024-12-31": "98,187,000,000", "2023-12-31": "88,950,000,000", "2022-12-31": "94,026,000,000" },
  { 항목: "기타비유동자산", "2024-12-31": "707,118,000,000", "2023-12-31": "774,371,000,000", "2022-12-31": "762,063,000,000" },
  { 항목: "자산 총계", "2024-12-31": "9,385,776,200,000", "2023-12-31": "77,466,694,000,000", "2022-12-31": "67,973,823,000,000" },

  { 항목: "유동부채", "2024-12-31": "21,085,717,000,000", "2023-12-31": "18,390,839,000,000", "2022-12-31": "16,459,563,000,000" },
  { 항목: "매입채무", "2024-12-31": "3,681,898,000,000", "2023-12-31": "4,117,913,000,000", "2022-12-31": "4,756,246,000,000" },
  { 항목: "기타지급채무", "2024-12-31": "7,024,302,000,000", "2023-12-31": "4,905,081,000,000", "2022-12-31": "4,899,553,000,000" },
  { 항목: "차입금 (유동)", "2024-12-31": "7,621,059,000,000", "2023-12-31": "7,077,782,000,000", "2022-12-31": "3,804,367,000,000" },
  { 항목: "기타유동금융부채", "2024-12-31": "352,269,000,000", "2023-12-31": "523,910,000,000", "2022-12-31": "7,271,000,000" },
  { 항목: "유동성충당부채", "2024-12-31": "1,054,559,000,000", "2023-12-31": "546,950,000,000", "2022-12-31": "1,026,446,000,000" },
  { 항목: "미지급법인세", "2024-12-31": "184,428,000,000", "2023-12-31": "45,304,000,000", "2022-12-31": "626,226,000,000" },
  { 항목: "기타유동부채", "2024-12-31": "1,167,202,000,000", "2023-12-31": "1,146,844,000,000", "2022-12-31": "1,339,454,000,000" },
  { 항목: "매각예정처분집단부채", "2024-12-31": "0", "2023-12-31": "27,055,000,000", "2022-12-31": "0" },

  { 항목: "비유동부채", "2024-12-31": "24,776,582,000,000", "2023-12-31": "18,137,670,000,000", "2022-12-31": "14,033,133,000,000" },
  { 항목: "기타장기지급채무", "2024-12-31": "31,065,000,000", "2023-12-31": "33,418,000,000", "2022-12-31": "43,708,000,000" },
  { 항목: "차입금 (비유동)", "2024-12-31": "19,755,038,000,000", "2023-12-31": "14,850,332,000,000", "2022-12-31": "12,160,152,000,000" },
  { 항목: "기타비유동금융부채", "2024-12-31": "1,043,099,000,000", "2023-12-31": "99,950,000,000", "2022-12-31": "33,319,000,000" },
  { 항목: "비유동성충당부채", "2024-12-31": "800,168,000,000", "2023-12-31": "887,775,000,000", "2022-12-31": "533,414,000,000" },
  { 항목: "순확정급여부채", "2024-12-31": "9,788,000,000", "2023-12-31": "11,879,000,000", "2022-12-31": "19,470,000,000" },
  { 항목: "이연법인세부채", "2024-12-31": "432,942,000,000", "2023-12-31": "735,326,000,000", "2022-12-31": "838,725,000,000" },
  { 항목: "기타비유동부채", "2024-12-31": "2,704,482,000,000", "2023-12-31": "1,518,990,000,000", "2022-12-31": "404,345,000,000" },

  { 항목: "부채 총계", "2024-12-31": "45,862,299,000,000", "2023-12-31": "36,528,509,000,000", "2022-12-31": "30,492,696,000,000" },

  { 항목: "지배기업 소유주지분", "2024-12-31": "33,284,180,000,000", "2023-12-31": "32,192,605,000,000", "2022-12-31": "31,450,572,000,000" },
  { 항목: "자본금", "2024-12-31": "391,406,000,000", "2023-12-31": "391,406,000,000", "2022-12-31": "391,406,000,000" },
  { 항목: "자본잉여금", "2024-12-31": "11,568,870,000,000", "2023-12-31": "11,572,098,000,000", "2022-12-31": "11,569,556,000,000" },
  { 항목: "기타자본항목", "2024-12-31": "-19,569,000,000", "2023-12-31": "-19,569,000,000", "2022-12-31": "-19,569,000,000" },
  { 항목: "기타포괄손익누계액", "2024-12-31": "2,751,299,000,000", "2023-12-31": "598,038,000,000", "2022-12-31": "366,916,000,000" },
  { 항목: "이익잉여금", "2024-12-31": "18,592,174,000,000", "2023-12-31": "19,650,632,000,000", "2022-12-31": "19,142,263,000,000" },

  { 항목: "비지배지분", "2024-12-31": "14,711,283,000,000", "2023-12-31": "8,745,580,000,000", "2022-12-31": "6,030,555,000,000" },

  { 항목: "자본 총계", "2024-12-31": "47,995,463,000,000", "2023-12-31": "40,938,185,000,000", "2022-12-31": "37,481,127,000,000" },

  { 항목: "부채와 자본 총계", "2024-12-31": "93,857,762,000,000", "2023-12-31": "77,466,694,000,000", "2022-12-31": "67,973,823,000,000" }
];

// 전기보고서 데이터 (이미지 기반)
const previousReportData = [
  { 항목: "유동자산", "2023-12-31": "28,859,296,000,000", "2022-12-31": "29,674,369,000,000", "2021-12-31": "51,135,302,000,000" },
  { 항목: "현금및현금성자산", "2023-12-31": "9,084,899,000,000", "2022-12-31": "8,497,882,000,000", "2021-12-31": "21,693,784,000,000" },
  { 항목: "매출채권", "2023-12-31": "8,082,952,000,000", "2022-12-31": "7,450,395,000,000", "2021-12-31": "391,406,000,000" },
  { 항목: "기타수취채권", "2023-12-31": "682,178,000,000", "2022-12-31": "742,431,000,000", "2021-12-31": "2,696,385,000,000" },
  { 항목: "기타유동금융자산", "2023-12-31": "141,428,000,000", "2022-12-31": "9,167,000,000", "2021-12-31": "-37,310,000,000" },
  { 항목: "선급법인세", "2023-12-31": "86,032,000,000", "2022-12-31": "52,920,000,000", "2021-12-31": "551,354,000,000" },
  { 항목: "기타유동자산", "2023-12-31": "1,211,374,000,000", "2022-12-31": "1,013,463,000,000", "2021-12-31": "18,091,949,000,000" },
  { 항목: "재고자산", "2023-12-31": "9,575,327,000,000", "2022-12-31": "11,880,631,000,000", "2021-12-31": "1,516,204,000,000" },
  { 항목: "매각예정자산", "2023-12-31": "195,106,000,000", "2022-12-31": "27,480,000,000", "2021-12-31": "23,209,988,000,000" },
  
  { 항목: "비유동자산", "2023-12-31": "48,607,398,000,000", "2022-12-31": "38,299,454,000,000", "2021-12-31": "27,925,314,000,000" },
  { 항목: "장기매출채권", "2023-12-31": "129,996,000,000", "2022-12-31": "120,698,000,000", "2021-12-31": "15,623,000,000" },
  { 항목: "기타장기수취채권", "2023-12-31": "427,693,000,000", "2022-12-31": "617,444,000,000", "2021-12-31": "11,288,654,000,000" },
  { 항목: "기타비유동금융자산", "2023-12-31": "1,228,501,000,000", "2022-12-31": "1,237,167,000,000", "2021-12-31": "126,000,000" },
  { 항목: "관계기업 및 공동기업투자자산", "2023-12-31": "1,005,606,000,000", "2022-12-31": "949,553,000,000", "2021-12-31": "636,953,000,000" },
  { 항목: "이연법인세자산", "2023-12-31": "2,308,966,000,000", "2022-12-31": "2,165,557,000,000", "2021-12-31": "18,122,000,000" },
  { 항목: "유형자산", "2023-12-31": "38,950,393,000,000", "2022-12-31": "29,662,743,000,000", "2021-12-31": "713,862,000,000" },
  { 항목: "무형자산", "2023-12-31": "3,692,922,000,000", "2022-12-31": "2,690,203,000,000", "2021-12-31": "189,878,000,000" },
  { 항목: "투자부동산", "2023-12-31": "80,950,000,000", "2022-12-31": "94,026,000,000", "2021-12-31": "0" },
  { 항목: "기타비유동자산", "2023-12-31": "774,371,000,000", "2022-12-31": "762,063,000,000", "2021-12-31": "0" },
  
  { 항목: "자산 총계", "2023-12-31": "77,466,694,000,000", "2022-12-31": "67,973,823,000,000", "2021-12-31": "79,060,616,000,000" },
  
  { 항목: "유동부채", "2023-12-31": "18,390,839,000,000", "2022-12-31": "16,459,563,000,000", "2021-12-31": "23,209,988,000,000" },
  { 항목: "매입채무", "2023-12-31": "4,117,913,000,000", "2022-12-31": "4,256,246,000,000", "2021-12-31": "3,477,080,000,000" },
  { 항목: "기타지급채무", "2023-12-31": "4,905,081,000,000", "2022-12-31": "4,899,553,000,000", "2021-12-31": "0" },
  { 항목: "차입금 (유동)", "2023-12-31": "7,077,782,000,000", "2022-12-31": "3,804,367,000,000", "2021-12-31": "1,572,755,000,000" },
  { 항목: "기타유동금융부채", "2023-12-31": "523,910,000,000", "2022-12-31": "7,271,000,000", "2021-12-31": "957,676,000,000" },
  { 항목: "유동성충당부채", "2023-12-31": "546,950,000,000", "2022-12-31": "1,026,446,000,000", "2021-12-31": "1,320,669,000,000" },
  { 항목: "미지급법인세", "2023-12-31": "45,304,000,000", "2022-12-31": "626,226,000,000", "2021-12-31": "0" },
  { 항목: "기타유동부채", "2023-12-31": "1,146,844,000,000", "2022-12-31": "1,339,454,000,000", "2021-12-31": "0" },
  { 항목: "매각예정처분집단부채", "2023-12-31": "27,055,000,000", "2022-12-31": "0", "2021-12-31": "15,881,808,000,000" },
  
  { 항목: "비유동부채", "2023-12-31": "18,137,670,000,000", "2022-12-31": "14,033,133,000,000", "2021-12-31": "12,863,218,000,000" },
  { 항목: "기타장기지급채무", "2023-12-31": "33,418,000,000", "2022-12-31": "43,708,000,000", "2021-12-31": "15,623,000,000" },
  { 항목: "차입금 (비유동)", "2023-12-31": "14,850,332,000,000", "2022-12-31": "12,160,152,000,000", "2021-12-31": "11,288,654,000,000" },
  { 항목: "기타비유동금융부채", "2023-12-31": "99,950,000,000", "2022-12-31": "33,319,000,000", "2021-12-31": "126,000,000" },
  { 항목: "비유동성충당부채", "2023-12-31": "887,775,000,000", "2022-12-31": "533,414,000,000", "2021-12-31": "636,953,000,000" },
  { 항목: "순확정급여부채", "2023-12-31": "11,879,000,000", "2022-12-31": "19,470,000,000", "2021-12-31": "18,122,000,000" },
  { 항목: "이연법인세부채", "2023-12-31": "735,326,000,000", "2022-12-31": "838,725,000,000", "2021-12-31": "713,862,000,000" },
  { 항목: "기타비유동부채", "2023-12-31": "1,518,990,000,000", "2022-12-31": "404,345,000,000", "2021-12-31": "189,878,000,000" },
  
  { 항목: "부채 총계", "2023-12-31": "36,528,509,000,000", "2022-12-31": "30,492,696,000,000", "2021-12-31": "36,073,206,000,000" },
  
  { 항목: "지배기업 소유주지분", "2023-12-31": "32,192,605,000,000", "2022-12-31": "31,450,572,000,000", "2021-12-31": "36,956,855,000,000" },
  { 항목: "자본금", "2023-12-31": "391,406,000,000", "2022-12-31": "391,406,000,000", "2021-12-31": "391,406,000,000" },
  { 항목: "자본잉여금", "2023-12-31": "11,572,098,000,000", "2022-12-31": "11,569,556,000,000", "2021-12-31": "2,696,385,000,000" },
  { 항목: "기타자본항목", "2023-12-31": "-19,569,000,000", "2022-12-31": "-19,569,000,000", "2021-12-31": "-37,310,000,000" },
  { 항목: "기타포괄손익누계액", "2023-12-31": "598,038,000,000", "2022-12-31": "366,916,000,000", "2021-12-31": "551,354,000,000" },
  { 항목: "이익잉여금", "2023-12-31": "19,650,632,000,000", "2022-12-31": "19,142,263,000,000", "2021-12-31": "33,355,020,000,000" },
  
  { 항목: "비지배지분", "2023-12-31": "8,745,580,000,000", "2022-12-31": "6,030,555,000,000", "2021-12-31": "6,030,555,000,000" },
  
  { 항목: "자본 총계", "2023-12-31": "40,938,185,000,000", "2022-12-31": "37,481,127,000,000", "2021-12-31": "42,987,410,000,000" },
  { 항목: "부채와 자본 총계", "2023-12-31": "77,466,694,000,000", "2022-12-31": "67,973,823,000,000", "2021-12-31": "79,060,616,000,000" }
];

export default function FSVerificationPage() {
  // 파일 업로드 상태 관리
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showSummaryTable, setShowSummaryTable] = useState<boolean>(false);
  const [showComparisonTables, setShowComparisonTables] = useState<boolean>(false);
  const [isLoadingPopup, setIsLoadingPopup] = useState<boolean>(false);

  // 파일 업로드 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError(null);
    }
  };

  // 합계 검증 버튼 핸들러
  const handleSumVerification = () => {
    if (!file) {
      setError("먼저 엑셀 파일을 선택해주세요.");
      return;
    }
    
    try {
      console.log("합계 검증 기능 실행 - 추후 백엔드 연동 예정");
      console.log("선택된 파일:", file.name, "크기:", file.size, "타입:", file.type);
      
      // 기존 결과 숨기고 로딩 팝업 표시
      setShowSummaryTable(false);
      setShowComparisonTables(false);
      setIsLoadingPopup(true);
      setError(null);
      
      // 1초 후 결과 표시
      setTimeout(() => {
        setIsLoadingPopup(false);
        setShowSummaryTable(true);
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "합계 검증 중 오류가 발생했습니다.";
      console.error("합계 검증 오류:", err);
      setError(errorMessage);
      setIsLoadingPopup(false);
    }
  };

  // 전기보고서 대사 버튼 핸들러
  const handlePreviousReportComparison = () => {
    if (!file) {
      setError("먼저 엑셀 파일을 선택해주세요.");
      return;
    }
    
    try {
      console.log("전기보고서 대사 기능 실행 - 추후 백엔드 연동 예정");
      console.log("선택된 파일:", file.name, "크기:", file.size, "타입:", file.type);
      
      // 기존 결과 숨기고 로딩 팝업 표시
      setShowSummaryTable(false);
      setShowComparisonTables(false);
      setIsLoadingPopup(true);
      setError(null);
      
      // 1초 후 결과 표시
      setTimeout(() => {
        setIsLoadingPopup(false);
        setShowComparisonTables(true);
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "전기보고서 대사 중 오류가 발생했습니다.";
      console.error("전기보고서 대사 오류:", err);
      setError(errorMessage);
      setIsLoadingPopup(false);
    }
  };

  // 셀 스타일 및 툴팁 결정 함수
  const getCellStyle = (항목: string, 연도: string, isLeftTable: boolean) => {
    // 빨간색 하이라이트 대상 셀 확인
    const isErrorCell = (
      (항목 === "재고자산" && 연도 === "2023-12-31") ||
      (항목 === "투자부동산" && 연도 === "2023-12-31") ||
      (항목 === "매입채무" && 연도 === "2022-12-31")
    );

    if (isErrorCell) {
      return isLeftTable 
        ? "bg-red-100 border border-gray-300 px-1 py-1 text-right text-gray-800 font-medium text-[11px] md:text-xs leading-tight tabular-nums whitespace-nowrap tracking-tight relative group cursor-pointer"
        : "bg-red-100 border border-gray-300 px-1 py-1 text-right text-gray-800 font-medium text-[11px] md:text-xs leading-tight tabular-nums whitespace-nowrap tracking-tight";
    } else if (연도 === "2023-12-31" || 연도 === "2022-12-31") {
      return "bg-green-50 border border-gray-300 px-1 py-1 text-right text-gray-800 font-medium text-[11px] md:text-xs leading-tight tabular-nums whitespace-nowrap tracking-tight";
    } else {
      return "border border-gray-300 px-1 py-1 text-right text-gray-800 font-medium text-[11px] md:text-xs leading-tight tabular-nums whitespace-nowrap tracking-tight";
    }
  };

  // 툴팁 렌더링 함수
  const renderTooltip = (항목: string, 연도: string) => {
    const isErrorCell = (
      (항목 === "재고자산" && 연도 === "2023-12-31") ||
      (항목 === "투자부동산" && 연도 === "2023-12-31") ||
      (항목 === "매입채무" && 연도 === "2022-12-31")
    );

    if (isErrorCell) {
      return (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
          전기보고서와 값이 불일치합니다!
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* 상단 고정 너비 컨테이너 - 헤더, 파일 업로드, 검증 기능 */}
      <div className="max-w-4xl mx-auto px-6">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📊 재무제표 검증
          </h1>
          <p className="text-gray-600">
            엑셀 파일을 업로드하여 재무제표의 합계 검증 및 전기보고서 대사를 수행합니다.
          </p>
        </div>

        {/* 파일 업로드 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">파일 업로드</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                재무제표 엑셀 파일 선택
              </label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-md p-2"
              />
              {fileName && (
                <p className="mt-2 text-sm text-gray-600">
                  선택된 파일: {fileName}
                </p>
              )}
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* 검증 기능 버튼들 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">검증 기능</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 합계 검증 카드 */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">합계 검증</h3>
                <p className="text-gray-600 text-sm mb-4">
                  재무제표의 각 항목별 합계가 정확한지 검증합니다.
                </p>
                <button
                  onClick={handleSumVerification}
                  disabled={!file || loading}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  합계 검증 실행
                </button>
              </div>
            </div>

            {/* 전기보고서 대사 카드 */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">전기보고서 대사</h3>
                <p className="text-gray-600 text-sm mb-4">
                  전기 보고서와 현재 보고서의 데이터를 비교 검증합니다.
                </p>
                <button
                  onClick={handlePreviousReportComparison}
                  disabled={!file || loading}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  전기보고서 대사 실행
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 사용 안내 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">사용 안내</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Excel 형식(.xlsx, .xls)의 재무제표 파일만 업로드 가능합니다.</li>
            <li>• 합계 검증: 재무제표 내 각 항목의 합계 정확성을 자동으로 검증합니다.</li>
            <li>• 전기보고서 대사: 전년도 보고서와의 연속성 및 일관성을 확인합니다.</li>
            <li>• 검증 결과는 상세한 리포트 형태로 제공됩니다.</li>
          </ul>
        </div>
      </div>

      {/* 합계 검증 결과 테이블 - 고정 너비 컨테이너 */}
      {showSummaryTable && (
        <div className="max-w-4xl mx-auto px-6 mt-8">
          <SummaryTable data={summaryData} />
        </div>
      )}

      {/* 전기보고서 대사 결과 테이블 - 넓은 컨테이너 */}
      {showComparisonTables && (
        <div className="max-w-7xl mx-auto px-6 mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">📊 전기보고서 대사 결과</h2>
            <p className="text-sm text-gray-600">당기 보고서와 전기 보고서를 비교하여 데이터 일관성을 확인합니다.</p>
          </div>
          
          <div className="flex flex-row gap-8 justify-between items-start">
            {/* 왼쪽: 당기 보고서 */}
            <div className="w-1/2">
              <h3 className="text-lg font-semibold mb-2">&lt;당기 보고서&gt;</h3>
              <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <table className="w-full table-fixed border-collapse text-sm">
                  <thead className="bg-gray-100 text-gray-700 text-center font-semibold">
                    <tr>
                      <th className="w-1/3 border border-gray-300 px-2 py-2 text-left">항목</th>
                      <th className="w-2/9 border border-gray-300 px-1 py-2 text-right">2024-12-31</th>
                      <th className="w-2/9 border border-gray-300 px-1 py-2 text-right">2023-12-31</th>
                      <th className="w-2/9 border border-gray-300 px-1 py-2 text-right">2022-12-31</th>
                    </tr>
                  </thead>
                  <tbody className="text-right text-gray-800">
                    {summaryData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-1 text-left text-gray-900 text-xs leading-tight font-semibold">
                          {row.항목}
                        </td>
                        <td className={getCellStyle(row.항목, "2024-12-31", true)}>
                          {row["2024-12-31"]}
                          {renderTooltip(row.항목, "2024-12-31")}
                        </td>
                        <td className={getCellStyle(row.항목, "2023-12-31", true)}>
                          {row["2023-12-31"]}
                          {renderTooltip(row.항목, "2023-12-31")}
                        </td>
                        <td className={getCellStyle(row.항목, "2022-12-31", true)}>
                          {row["2022-12-31"]}
                          {renderTooltip(row.항목, "2022-12-31")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 오른쪽: 전기 보고서 */}
            <div className="w-1/2">
              <h3 className="text-lg font-semibold mb-2">&lt;전기 보고서&gt;</h3>
              <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <table className="w-full table-fixed border-collapse text-sm">
                  <thead className="bg-gray-100 text-gray-700 text-center font-semibold">
                    <tr>
                      <th className="w-1/3 border border-gray-300 px-2 py-2 text-left">항목</th>
                      <th className="w-2/9 border border-gray-300 px-1 py-2 text-right">2023-12-31</th>
                      <th className="w-2/9 border border-gray-300 px-1 py-2 text-right">2022-12-31</th>
                      <th className="w-2/9 border border-gray-300 px-1 py-2 text-right">2021-12-31</th>
                    </tr>
                  </thead>
                  <tbody className="text-right text-gray-800">
                    {previousReportData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-2 py-1 text-left text-gray-900 text-xs leading-tight font-semibold">
                          {row.항목}
                        </td>
                        <td className={getCellStyle(row.항목, "2023-12-31", false)}>
                          {row["2023-12-31"]}
                          {renderTooltip(row.항목, "2023-12-31")}
                        </td>
                        <td className={getCellStyle(row.항목, "2022-12-31", false)}>
                          {row["2022-12-31"]}
                          {renderTooltip(row.항목, "2022-12-31")}
                        </td>
                        <td className={getCellStyle(row.항목, "2021-12-31", false)}>
                          {row["2021-12-31"]}
                          {renderTooltip(row.항목, "2021-12-31")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-700 text-sm">
              ✅ 전기보고서 대사가 완료되었습니다. 
            </p>
          </div>
        </div>
      )}

      {/* 로딩 팝업 - 화면 정중앙 모달 */}
      {isLoadingPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 mx-4">
            <p className="text-gray-600 font-semibold text-center">로딩 중...</p>
          </div>
        </div>
      )}
    </div>
  );
} 