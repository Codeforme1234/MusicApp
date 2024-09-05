import Image from "next/image";
import Dashboard from "./pages/Dashboard";

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center  w-screen">
        <Dashboard />
      </main>
    </div>
  );
}
