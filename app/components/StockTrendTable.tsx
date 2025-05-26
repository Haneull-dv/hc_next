"use client";

import { useState, useEffect, ChangeEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpDown } from "lucide-react";

interface StockData {
  rank: number;
  country: string;
  company: string;
  marketCap: string; // 백엔드에서 "103,949억원" 형식으로 옴
  price: number;
  change: number;
  announcement: string | null;
  industry: string;
}

type SortField = "rank" | "marketCap" | "change";
type SortOrder = "asc" | "desc";

export default function StockTrendTable() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState("_ALL");
  const [activeTab, setActiveTab] = useState("domestic");
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  const industries = [
    "게임·엔터테인먼트",
    "건설·부동산",
    "금융·은행",
    "반도체·전자부품",
    "바이오·헬스케어",
    "소매·유통",
    "에너지·전력",
    "운송·물류",
    "패션·화장품",
    "플랫폼·IT서비스",
    "철강·화학",
    "통신·미디어"
  ];

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://railwaystocktrend-production.up.railway.app/api/stocktrend/stocks");
      const data = await response.json();
      console.log("💌API로 받은 데이터:", data);
      setStocks(data.companies);
      setFilteredStocks(data.companies);
      console.log("✅ filteredStocks 상태:", filteredStocks);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 시가총액 문자열을 숫자로 변환하는 함수
  const parseMarketCap = (marketCapStr: string): number => {
    // "103,949억원" -> 10394900000000
    const numericStr = marketCapStr.replace(/[^0-9]/g, '');
    const multiplier = marketCapStr.includes('억') ? 100000000 : 1;
    return parseInt(numericStr) * multiplier;
  };

  useEffect(() => {
    let filtered: StockData[] = [];

    // 게임·엔터테인먼트 산업이 선택된 경우에만 데이터 필터링
    if (selectedIndustry === "게임·엔터테인먼트") {
      filtered = stocks.filter((stock) => {
        const matchesTab = activeTab === "domestic" 
          ? stock.country === "한국" 
          : stock.country === "해외";
        return matchesTab;
      });
    }

    // 정렬 적용
    filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      if (sortField === "marketCap") {
        aValue = parseMarketCap(a.marketCap);
        bValue = parseMarketCap(b.marketCap);
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
      }

      const modifier = sortOrder === "asc" ? 1 : -1;
      return aValue > bValue ? modifier : -modifier;
    });

    setFilteredStocks(filtered);
    setCurrentPage(1);
  }, [stocks, selectedIndustry, activeTab, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);
  const paginatedStocks = filteredStocks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card className="p-6 rounded-2xl">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="산업 선택..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_ALL">전체</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2">
              <TabsTrigger value="domestic">국내 기업</TabsTrigger>
              <TabsTrigger value="foreign">해외 기업</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {selectedIndustry === "게임·엔터테인먼트" && filteredStocks.length > 0 ? (
          <>
            <ScrollArea className="h-[600px] rounded-2xl">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead
                      className="cursor-pointer h-12 align-top px-4 py-3 text-left text-sm font-medium text-gray-500 w-12 whitespace-nowrap"
                      onClick={() => handleSort("rank")}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>순위</span>
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="h-12 align-top px-4 py-3 text-left text-sm font-medium text-gray-500 w-28">
                      회사명
                    </TableHead>
                    <TableHead
                      className="cursor-pointer h-12 align-top px-4 py-3 text-left text-sm font-medium text-gray-500 w-32"
                      onClick={() => handleSort("marketCap")}
                    >
                      <div className="flex items-center gap-2">
                        시가총액
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="h-12 align-top px-4 py-3 text-left text-sm font-medium text-gray-500 w-24">
                      현재가
                    </TableHead>
                    <TableHead
                      className="cursor-pointer h-12 align-top px-4 py-3 text-left text-sm font-medium text-gray-500 w-24"
                      onClick={() => handleSort("change")}
                    >
                      <div className="flex items-center gap-2">
                        변동률
                        <ArrowUpDown className="h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead className="h-12 align-top px-4 py-3 text-left text-sm font-medium text-gray-500 w-auto">
                      공시내용 및 주가 변동 원인
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-[600px] text-center">
                        <div className="flex items-center justify-center h-full text-gray-500">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                            <span>로딩 중입니다...</span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedStocks.map((stock) => (
                      <TableRow
                        key={`${stock.company}-${stock.rank}`}
                        className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                      >
                        <TableCell className="align-top px-4 py-3 text-sm w-12 text-center">
                          {stock.rank}
                        </TableCell>
                        <TableCell className="align-top px-4 py-3 text-sm font-medium w-28">
                          {stock.company}
                        </TableCell>
                        <TableCell className="align-top px-4 py-3 text-sm w-32">
                          {stock.marketCap}
                        </TableCell>
                        <TableCell className="align-top px-4 py-3 text-sm w-24">
                          {stock.price.toLocaleString()}
                        </TableCell>
                        <TableCell
                          className={`align-top px-4 py-3 text-sm w-24 ${
                            stock.change > 0
                              ? "text-green-600"
                              : stock.change < 0
                              ? "text-red-600"
                              : ""
                          }`}
                        >
                          {stock.change > 0 ? "+" : ""}
                          {stock.change}%
                        </TableCell>
                        <TableCell className="align-top px-4 py-3 text-sm whitespace-pre-line break-words min-h-[3rem] w-auto">
                          {stock.announcement ? (
                            <div className="space-y-2.5 leading-relaxed">
                              {stock.announcement.split(/\n/).map((line, index) => (
                                <div key={index} className="pl-4">
                                  {line}
                                </div>
                              ))}
                            </div>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>

            {!isLoading && (
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg ${
                      currentPage === page
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-[600px] text-gray-500">
            {isLoading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                <span>로딩 중입니다...</span>
              </div>
            ) : (
              selectedIndustry === "_ALL" 
                ? "산업을 선택해주세요."
                : selectedIndustry === "게임·엔터테인먼트" 
                  ? "데이터가 없습니다."
                  : "현재 게임·엔터테인먼트 산업만 지원됩니다."
            )}
          </div>
        )}
      </div>
    </Card>
  );
} 