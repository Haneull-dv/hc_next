// app/page.tsx
'use client';

import { redirect } from "next/navigation";
import Logo from './components/Logo';
import MainTabs from './components/MainTabs';

export default function Home() {
  redirect("/finance");
  return null;
}
