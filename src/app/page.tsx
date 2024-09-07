"use client"
import Dashboard from "./pages/Dashboard";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <div>
      <RecoilRoot>
        <main className="flex min-h-screen flex-col items-center no-scrollbar w-screen">
          <Dashboard />
        </main>
      </RecoilRoot>
    </div>
  );
}
