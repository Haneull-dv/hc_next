'use client';
import React, { useEffect, useState } from 'react';

export default function TemplatesPage() {
  const [chartHeights, setChartHeights] = useState<number[]>([]);

  useEffect(() => {
    const randomHeights = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 60 + 20)
    );
    setChartHeights(randomHeights);
  }, []);

  const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  return (
    <div className="grid grid-cols-12 gap-6 font-pretendard">
      {/* 왼쪽 큰 카드 */}
      <div className="lg:col-span-8 col-span-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">매출 및 이익 예측</h2>
          <div className="h-80 w-full">
            <div className="flex justify-between items-center h-full">
              <div className="w-1/12 flex flex-col justify-between h-full text-xs text-gray-500 dark:text-gray-400">
                {[100, 80, 60, 40, 20, 0].map(v => <span key={v}>{v}</span>)}
              </div>
              <div className="w-11/12 flex justify-between items-end h-full">
                {months.map((month, index) => (
                  <div key={month} className="flex flex-col items-center">
                    <div
                      className="w-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-t-sm"
                      style={{ height: `${chartHeights[index] || 0}%` }}
                    ></div>
                    <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">{month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 상단 카드 */}
      <div className="lg:col-span-4 col-span-12">
        <div className="grid grid-cols-12 h-full items-stretch gap-6">
          {/* 신규 고객 */}
          <div className="col-span-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292..." />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">신규 고객</h2>
              </div>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-300">신규 목표</span>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200">83%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-teal-500 dark:bg-teal-400 h-2 rounded-full" style={{ width: "83%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* 총 수입 */}
          <div className="col-span-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0..." />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">총 수입</h2>
              </div>
              <div className="mb-2">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">₩680,000</span>
                <span className="ml-2 text-sm bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-2 py-1 rounded">+18%</span>
              </div>
              <div className="h-16">
                <svg viewBox="0 0 100 20" className="w-full h-full">
                  <path d="M0,10 Q10,5 20,10 T40,10 T60,10 T80,5 T100,10" fill="none" stroke="#ec4899" className="dark:stroke-pink-400" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 제품 수익 */}
      <div className="lg:col-span-8 col-span-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">제품 수익</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">제품</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">판매량</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">수익</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">성장률</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { name: "제품 A", sales: "1,245", revenue: "₩32,500,000", growth: 15 },
                  { name: "제품 B", sales: "876", revenue: "₩21,300,000", growth: -2 },
                  { name: "제품 C", sales: "1,493", revenue: "₩45,200,000", growth: 8 },
                  { name: "제품 D", sales: "562", revenue: "₩12,700,000", growth: 22 },
                ].map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{product.sales}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">{product.revenue}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded ${
                        product.growth >= 0 
                          ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' 
                          : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300'
                      }`}>
                        {product.growth >= 0 ? `+${product.growth}%` : `${product.growth}%`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 활동 로그 */}
      <div className="lg:col-span-4 col-span-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">일일 활동</h2>
          <div className="space-y-4">
            {[
              { time: "09:46", event: "John Doe로부터 ₩385,900 결제 수신", color: "blue" },
              { time: "09:46", event: "신규 판매 기록됨", color: "yellow" },
              { time: "10:12", event: "새 고객 등록", color: "green" },
              { time: "11:30", event: "시스템 업데이트 완료", color: "purple" }
            ].map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</div>
                  <div className={`w-3 h-3 mt-1 rounded-full bg-${activity.color}-500 ml-1`}></div>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{activity.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 저작권 */}
      <div className="col-span-12 text-center mt-6">
        <p className="text-base text-gray-500 dark:text-gray-400">
          天 재무 시스템 © 2025
        </p>
      </div>
    </div>
  );
}
