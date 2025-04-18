// app/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    // 지연 시간을 두어 클라이언트 컴포넌트가 완전히 초기화된 후 리다이렉트
    const redirectTimer = setTimeout(() => {
      router.push('/dashboard');
    }, 100);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">재무정보 대시보드</h1>
      <p className="mb-6 text-gray-600">대시보드로 이동합니다...</p>
      <Link href="/dashboard" 
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
        대시보드로 바로가기
      </Link>
    </div>
  );
}
