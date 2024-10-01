"use client"
import Dashboard from "./pages/Dashboard";
import { RecoilRoot } from "recoil";
export default function Home() {
  return (
    <div>
      <RecoilRoot>
        <main> 
          <Dashboard />
        </main>
      </RecoilRoot>
    </div>
  );
}
