"use client";
import TopCards from "@/components/dashboard/TopCards";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl text-primaryColor">Dashboard</h1>
      <TopCards />
    </main>
  );
}
