import type { Metadata } from "next";
import { HomeExplorer } from "@/components/home/home-explorer";
import { getPublicCategories, getPublicLessons } from "@/features/lessons/catalog";

export const metadata: Metadata = {
  title: "여행 영어, 필요한 순간 바로",
  description:
    "공항부터 긴급 상황까지, 여행 상황을 골라 기초·심화 영어 강의를 빠르게 찾아보세요.",
};

export default function Home() {
  return (
    <HomeExplorer
      categories={getPublicCategories()}
      lessons={getPublicLessons()}
    />
  );
}
