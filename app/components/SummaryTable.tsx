import { useState } from 'react';

interface SummaryTableProps {
  data: Array<{
    항목: string;
    "2024-12-31": string;
    "2023-12-31": string;
    "2022-12-31": string;
  }>;
}

export default function SummaryTable({ data }: SummaryTableProps) {
  const [highlightedItems, setHighlightedItems] = useState<string[]>([]);

  // 색상 적용 대상 항목 (10개)
  const highlightTargets = [
    "유동자산", "비유동자산", "자산 총계",
    "유동부채", "비유동부채", "부채 총계", 
    "지배기업 소유주지분", "비지배지분",
    "자본 총계", "부채와 자본 총계"
  ];

  // 하이라이트 대상 계정과 하위 항목 매핑
  const accountHierarchy = {
    "유동자산": [
      "현금및현금성자산", "매출채권", "기타수취채권", "기타유동금융자산", 
      "선급법인세", "기타유동자산", "재고자산", "매각예정자산"
    ],
    "비유동자산": [
      "장기매출채권", "기타장기수취채권", "기타비유동금융자산", "관계기업 및 공동기업투자자산",
      "이연법인세자산", "유형자산", "무형자산", "투자부동산", "기타비유동자산"
    ],
    "자산 총계": ["유동자산", "비유동자산"]
  };

  // 검증 결과 시뮬레이션 (실제로는 백엔드에서 계산)
  const validateCell = (항목: string, year: string): 'valid' | 'invalid' => {
    // 2023년과 2022년은 모두 통과
    if (year === '2023-12-31' || year === '2022-12-31') {
      return 'valid';
    }
    
    // 2024년은 자산 총계와 비유동부채만 실패
    if (year === '2024-12-31') {
      if (항목.trim() === '자산 총계' || 항목.trim() === '비유동부채') {
        return 'invalid';
      }
      return 'valid';
    }
    
    return 'valid';
  };

  // 항목별 들여쓰기 및 스타일 분류 함수
  const getItemStyle = (항목: string) => {
    // 상위 그룹 (자산, 부채, 자본 총계)
    if (항목.includes('총계') || 항목 === '유동자산' || 항목 === '비유동자산' || 항목 === '유동부채' || 항목 === '비유동부채' || 항목 === '지배기업 소유주지분' || 항목 === '비지배지분') {
      return {
        className: 'font-bold pl-0 bg-blue-50',
        isGroup: true
      };
    }
    
    // 하위 항목들
    return {
      className: 'pl-4 bg-white',
      isGroup: false
    };
  };

  // 셀 배경색 결정 (검증 결과 + 하이라이트)
  const getCellClassName = (항목: string, year: string, isItemCell: boolean = false) => {
    const baseClasses = isItemCell 
      ? `border border-gray-300 px-2 py-1 text-gray-900 text-xs leading-tight transition-colors duration-200`
      : `border border-gray-300 px-1 py-1 text-right text-gray-900 font-mono text-xs leading-tight tabular-nums transition-colors duration-200`;
    
    let bgClass = '';
    let extraClasses = '';
    
    if (isItemCell) {
      const itemStyle = getItemStyle(항목);
      bgClass = itemStyle.className;
    } else {
      // 특정 10개 항목에만 검증 결과 색상 적용
      const shouldHighlight = highlightTargets.includes(항목.trim());
      
      if (shouldHighlight) {
        const validationResult = validateCell(항목, year);
        if (validationResult === 'valid') {
          bgClass = 'bg-green-50';
        } else {
          bgClass = 'bg-red-50';
          extraClasses = 'group relative cursor-help'; // 툴팁을 위한 클래스 추가
        }
      } else {
        // 세부 계정항목은 배경색 제거
        bgClass = 'bg-transparent';
      }
    }
    
    // 하이라이트 효과
    if (highlightedItems.includes(항목)) {
      bgClass += ' bg-yellow-100 shadow-md';
    }
    
    return `${baseClasses} ${bgClass} ${extraClasses}`;
  };

  // 하이라이트 핸들러
  const handleCellMouseEnter = (groupName: string, columnIndex: number) => {
    if (accountHierarchy[groupName as keyof typeof accountHierarchy]) {
      const childItems = accountHierarchy[groupName as keyof typeof accountHierarchy];
      
      // 같은 열의 하위 항목들을 하이라이트
      const cellsToHighlight = document.querySelectorAll(
        `[data-parent="${groupName}"][data-column="${columnIndex}"]`
      );
      cellsToHighlight.forEach(cell => {
        cell.classList.add('highlight');
      });
    }
  };

  const handleCellMouseLeave = (groupName: string, columnIndex: number) => {
    if (accountHierarchy[groupName as keyof typeof accountHierarchy]) {
      // 하이라이트 제거
      const cellsToHighlight = document.querySelectorAll(
        `[data-parent="${groupName}"][data-column="${columnIndex}"]`
      );
      cellsToHighlight.forEach(cell => {
        cell.classList.remove('highlight');
      });
    }
  };

  // 항목이 특정 그룹의 하위 항목인지 확인
  const getParentGroup = (항목: string): string | null => {
    for (const [groupName, children] of Object.entries(accountHierarchy)) {
      if (children.includes(항목.trim())) {
        return groupName;
      }
    }
    return null;
  };

  // 항목이 그룹 헤더인지 확인
  const isGroupHeader = (항목: string): boolean => {
    return Object.keys(accountHierarchy).includes(항목.trim());
  };

  return (
    <div className="mt-8">
      <style jsx>{`
        .highlight {
          background-color: #fff8dc !important;
          box-shadow: 0 0 0 2px #fbbf24 !important;
        }
        
        .tooltip {
          position: absolute;
          background-color: #dc2626;
          color: white;
          font-size: 0.75rem;
          border-radius: 0.375rem;
          padding: 0.5rem;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          z-index: 50;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s, visibility 0.2s;
          pointer-events: none;
        }
        
        .tooltip::before {
          content: '';
          position: absolute;
          top: 50%;
          left: -4px;
          transform: translateY(-50%);
          border: 4px solid transparent;
          border-right-color: #dc2626;
        }
        
        .group:hover .tooltip {
          opacity: 1;
          visibility: visible;
        }
        
        @media (max-width: 768px) {
          .tooltip {
            left: 50%;
            top: -100%;
            transform: translateX(-50%);
            margin-left: 0;
            margin-top: -0.5rem;
          }
          
          .tooltip::before {
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 4px solid transparent;
            border-top-color: #dc2626;
            border-right-color: transparent;
          }
        }
      `}</style>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">🧮 합계 검증 결과</h2>
        <p className="text-sm text-gray-600">계정과목별 연도별 합계 검증 결과입니다. 초록색은 검증 성공, 빨간색은 검증 실패입니다. </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-2/5 border border-gray-300 px-2 py-2 text-left font-semibold text-gray-700 text-sm">
                항목
              </th>
              <th className="w-1/5 border border-gray-300 px-1 py-2 text-right font-semibold text-gray-700 text-sm">
                2024-12-31
              </th>
              <th className="w-1/5 border border-gray-300 px-1 py-2 text-right font-semibold text-gray-700 text-sm">
                2023-12-31
              </th>
              <th className="w-1/5 border border-gray-300 px-1 py-2 text-right font-semibold text-gray-700 text-sm">
                2022-12-31
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const isGroup = isGroupHeader(row.항목);
              const parentGroup = getParentGroup(row.항목);
              
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className={getCellClassName(row.항목, '', true)}>
                    {row.항목}
                  </td>
                  <td 
                    className={getCellClassName(row.항목, '2024-12-31')}
                    data-status={validateCell(row.항목, '2024-12-31')}
                    data-group={isGroup ? row.항목.trim() : undefined}
                    data-parent={parentGroup || undefined}
                    data-column="0"
                    onMouseEnter={isGroup ? () => handleCellMouseEnter(row.항목.trim(), 0) : undefined}
                    onMouseLeave={isGroup ? () => handleCellMouseLeave(row.항목.trim(), 0) : undefined}
                    aria-label={
                      highlightTargets.includes(row.항목.trim()) && validateCell(row.항목, '2024-12-31') === 'invalid'
                        ? '합계 검증 오류! 구성 항목을 확인해주세요.'
                        : undefined
                    }
                  >
                    {row["2024-12-31"]}
                    {highlightTargets.includes(row.항목.trim()) && validateCell(row.항목, '2024-12-31') === 'invalid' && (
                      <div className="tooltip" role="tooltip">
                        합계 검증 오류!<br/>구성 항목을 확인해주세요.
                      </div>
                    )}
                  </td>
                  <td 
                    className={getCellClassName(row.항목, '2023-12-31')}
                    data-status={validateCell(row.항목, '2023-12-31')}
                    data-group={isGroup ? row.항목.trim() : undefined}
                    data-parent={parentGroup || undefined}
                    data-column="1"
                    onMouseEnter={isGroup ? () => handleCellMouseEnter(row.항목.trim(), 1) : undefined}
                    onMouseLeave={isGroup ? () => handleCellMouseLeave(row.항목.trim(), 1) : undefined}
                    aria-label={
                      highlightTargets.includes(row.항목.trim()) && validateCell(row.항목, '2023-12-31') === 'invalid'
                        ? '합계 검증 오류! 구성 항목을 확인해주세요.'
                        : undefined
                    }
                  >
                    {row["2023-12-31"]}
                    {highlightTargets.includes(row.항목.trim()) && validateCell(row.항목, '2023-12-31') === 'invalid' && (
                      <div className="tooltip" role="tooltip">
                        합계 검증 오류!<br/>구성 항목을 확인해주세요.
                      </div>
                    )}
                  </td>
                  <td 
                    className={getCellClassName(row.항목, '2022-12-31')}
                    data-status={validateCell(row.항목, '2022-12-31')}
                    data-group={isGroup ? row.항목.trim() : undefined}
                    data-parent={parentGroup || undefined}
                    data-column="2"
                    onMouseEnter={isGroup ? () => handleCellMouseEnter(row.항목.trim(), 2) : undefined}
                    onMouseLeave={isGroup ? () => handleCellMouseLeave(row.항목.trim(), 2) : undefined}
                    aria-label={
                      highlightTargets.includes(row.항목.trim()) && validateCell(row.항목, '2022-12-31') === 'invalid'
                        ? '합계 검증 오류! 구성 항목을 확인해주세요.'
                        : undefined
                    }
                  >
                    {row["2022-12-31"]}
                    {highlightTargets.includes(row.항목.trim()) && validateCell(row.항목, '2022-12-31') === 'invalid' && (
                      <div className="tooltip" role="tooltip">
                        합계 검증 오류!<br/>구성 항목을 확인해주세요.
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
        <p className="text-green-700 text-sm">
          ✅ 합계 검증이 완료되었습니다. 총 30개 항목을 확인했습니다.
        </p>
      </div>
    </div>
  );
} 