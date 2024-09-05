import Image from "next/image";
import Dashboard from "./pages/Dashboard";

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Dashboard />
      </main>
    </div>
  );
}
