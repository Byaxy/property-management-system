"use client";
import TopCards from "@/components/dashboard/TopCards";
import BarchartSection from "@/components/dashboard/BarchartSection";
import UsersSection from "@/components/dashboard/UsersSection";
import Properties from "@/components/dashboard/Properties";

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl text-textPrimary py-4">Dashboard</h1>
      <TopCards />
      <BarchartSection />
      <UsersSection />
      <Properties />
    </main>
  );
}
