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
import { Input } from "@/components/ui/input";
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
}

type SortField = "rank" | "marketCap" | "change";
type SortOrder = "asc" | "desc";

export default function StockTrendTable() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("domestic");
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/stocktrend/stocks");
      const data = await response.json();
      setStocks(data);
      setFilteredStocks(data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
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
    let filtered = stocks.filter((stock) => {
      const matchesSearch = stock.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "domestic" ? stock.country === "KR" : stock.country !== "KR";
      return matchesSearch && matchesTab;
    });

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
  }, [stocks, searchTerm, activeTab, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
          <Input
            placeholder="회사명 검색..."
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-sm"
          />
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2">
              <TabsTrigger value="domestic">국내 기업</TabsTrigger>
              <TabsTrigger value="foreign">해외 기업</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ScrollArea className="h-[600px] rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("rank")}
                >
                  <div className="flex items-center gap-2">
                    순위
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>회사명</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("marketCap")}
                >
                  <div className="flex items-center gap-2">
                    시가총액
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>현재가</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("change")}
                >
                  <div className="flex items-center gap-2">
                    변동률
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>공시내용</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStocks.map((stock) => (
                <TableRow
                  key={stock.rank}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell>{stock.rank}</TableCell>
                  <TableCell>{stock.company}</TableCell>
                  <TableCell>{stock.marketCap}</TableCell>
                  <TableCell>{stock.price.toLocaleString()}</TableCell>
                  <TableCell
                    className={
                      stock.change > 0
                        ? "text-green-600"
                        : stock.change < 0
                        ? "text-red-600"
                        : ""
                    }
                  >
                    {stock.change > 0 ? "+" : ""}
                    {stock.change}%
                  </TableCell>
                  <TableCell>{stock.announcement || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>

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
      </div>
    </Card>
  );
} 