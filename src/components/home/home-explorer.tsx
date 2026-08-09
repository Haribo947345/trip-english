"use client";

import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Clock3,
  HeartPulse,
  Hotel,
  Map,
  Plane,
  Search,
  ShoppingBag,
  Sparkles,
  Stamp,
  Utensils,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { ThemeSelector } from "@/components/theme-selector";
import type {
  CategoryIcon,
  CategoryTone,
  LearningLevel,
  LessonSummary,
  TravelCategory,
} from "@/features/lessons/catalog";
import { useRecentLessons } from "@/lib/recent-lessons";

type LevelFilter = "all" | LearningLevel;

const iconMap = {
  plane: Plane,
  passport: Stamp,
  hotel: Hotel,
  utensils: Utensils,
  map: Map,
  shopping: ShoppingBag,
  hospital: HeartPulse,
  emergency: AlertTriangle,
} satisfies Record<CategoryIcon, typeof Plane>;

const toneClassMap = {
  sky: "bg-category-sky text-category-sky-foreground",
  amber: "bg-category-amber text-category-amber-foreground",
  mint: "bg-category-mint text-category-mint-foreground",
  violet: "bg-category-violet text-category-violet-foreground",
} satisfies Record<CategoryTone, string>;

const levelLabel = {
  basic: "기초",
  advanced: "심화",
} satisfies Record<LearningLevel, string>;

export function HomeExplorer({
  categories,
  lessons,
}: {
  categories: TravelCategory[];
  lessons: LessonSummary[];
}) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<LevelFilter>("all");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const recentEntries = useRecentLessons();

  const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");

  const visibleLessons = useMemo(
    () =>
      lessons.filter((lesson) => {
        const category = categories.find(
          (item) => item.id === lesson.categoryId,
        );
        const matchesLevel = level === "all" || lesson.level === level;
        const matchesCategory = !categoryId || lesson.categoryId === categoryId;
        const searchableText = [
          lesson.title,
          lesson.summary,
          category?.name,
          category?.englishName,
        ]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase("ko-KR");
        const matchesQuery =
          normalizedQuery.length === 0 ||
          searchableText.includes(normalizedQuery);

        return matchesLevel && matchesCategory && matchesQuery;
      }),
    [categories, categoryId, lessons, level, normalizedQuery],
  );

  const visibleCategories = useMemo(
    () =>
      categories.filter((category) => {
        const hasMatchingLevel =
          level === "all" ||
          lessons.some(
            (lesson) =>
              lesson.categoryId === category.id && lesson.level === level,
          );

        if (!hasMatchingLevel) return false;
        if (!normalizedQuery) return true;

        const categoryMatches = [
          category.name,
          category.englishName,
          category.description,
        ]
          .join(" ")
          .toLocaleLowerCase("ko-KR")
          .includes(normalizedQuery);
        const lessonMatches = lessons.some(
          (lesson) =>
            lesson.categoryId === category.id &&
            [lesson.title, lesson.summary]
              .join(" ")
              .toLocaleLowerCase("ko-KR")
              .includes(normalizedQuery),
        );

        return categoryMatches || lessonMatches;
      }),
    [categories, lessons, level, normalizedQuery],
  );

  const recentLessons = recentEntries
    .map((entry) => lessons.find((lesson) => lesson.id === entry.lessonId))
    .filter((lesson): lesson is LessonSummary => Boolean(lesson));

  const selectLevel = (nextLevel: LearningLevel) => {
    setLevel(nextLevel);
    setCategoryId(null);
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
        <div className="glass-surface mx-auto flex h-16 max-w-7xl items-center justify-between rounded-[1.35rem] px-3 sm:px-5">
          <a
            href="#top"
            className="group flex min-h-11 items-center gap-2 rounded-full px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Trip English 홈"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm transition-transform duration-150 group-hover:scale-[1.04]">
              <Plane className="size-4" aria-hidden="true" />
            </span>
            <span className="font-heading text-sm font-bold tracking-[-0.02em] sm:text-base">
              Trip English
            </span>
          </a>

          <nav className="hidden items-center gap-1 text-sm font-medium md:flex" aria-label="주요 메뉴">
            <NavLink href="#levels">레벨 선택</NavLink>
            <NavLink href="#categories">여행 상황</NavLink>
            <NavLink href="#recent">최근 학습</NavLink>
          </nav>

          <ThemeSelector />
        </div>
      </header>

      <main id="top" className="pb-28 md:pb-0">
        <section className="relative px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:pb-24 lg:pt-20">
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-sm font-semibold text-brand-soft-foreground">
                <Sparkles className="size-4" aria-hidden="true" />
                여행 영어, 필요한 순간 바로
              </div>
              <h1 className="font-heading text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.98] tracking-[-0.065em] text-balance">
                낯선 여행의 순간을,
                <span className="mt-2 block text-brand">익숙한 한마디로.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.2rem)] leading-8 text-muted-foreground text-pretty">
                공항에서 호텔, 음식점까지. 지금 필요한 상황을 골라 짧게
                듣고, 이해하고, 바로 써보세요.
              </p>

              <div id="levels" className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
                <LevelButton
                  eyebrow="처음이라면"
                  title="기초 생활 영어"
                  description="짧고 바로 쓰는 핵심 표현"
                  selected={level === "basic"}
                  onClick={() => selectLevel("basic")}
                />
                <LevelButton
                  eyebrow="더 자연스럽게"
                  title="심화 생활 영어"
                  description="뉘앙스와 돌발 상황까지"
                  selected={level === "advanced"}
                  onClick={() => selectLevel("advanced")}
                />
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="preview-shell relative overflow-hidden rounded-[2rem] border border-glass-border p-4 shadow-glass sm:p-6">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">
                      Quick lesson
                    </p>
                    <p className="mt-1 text-sm font-semibold">공항 체크인</p>
                  </div>
                  <span className="rounded-full bg-surface-elevated px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
                    약 8분
                  </span>
                </div>
                <div className="rounded-[1.5rem] bg-surface-elevated p-5 shadow-sm sm:p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">
                      핵심 표현 1 / 7
                    </span>
                    <span className="rounded-full bg-category-sky px-2.5 py-1 text-xs font-bold text-category-sky-foreground">
                      기초
                    </span>
                  </div>
                  <p lang="en" className="font-heading text-2xl font-bold tracking-[-0.035em] sm:text-3xl">
                    Airport check-in
                  </p>
                  <p className="mt-3 text-base text-muted-foreground">
                    꼭 필요한 표현 7개를 짧게 연습해요.
                  </p>
                  <div className="mt-7 flex items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-sm">
                      <span className="text-sm font-bold" aria-hidden="true">▶</span>
                      <span className="sr-only">표현 음성 재생 예시</span>
                    </span>
                    <div className="flex-1">
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full w-[42%] rounded-full bg-brand" />
                      </div>
                      <div className="mt-2 flex justify-between text-[0.7rem] font-medium text-muted-foreground">
                        <span>0:03</span>
                        <span>1.0×</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-semibold text-muted-foreground">
                  <div className="rounded-2xl bg-surface-elevated px-2 py-3 shadow-sm">듣기</div>
                  <div className="rounded-2xl bg-surface-elevated px-2 py-3 shadow-sm">이해</div>
                  <div className="rounded-2xl bg-brand-soft px-2 py-3 text-brand-soft-foreground">바로 쓰기</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="explore" className="scroll-mt-28 px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-kicker">Find your phrase</p>
              <h2 className="section-title">어떤 순간을 준비하고 있나요?</h2>
              <p className="section-description">
                여행 상황이나 강의 제목을 검색하면 필요한 학습을 빠르게 찾을 수 있어요.
              </p>
            </div>

            <div className="glass-surface mx-auto mt-8 flex max-w-3xl items-center gap-3 rounded-[1.35rem] p-2 pl-4 shadow-glass">
              <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <label htmlFor="lesson-search" className="sr-only">
                여행 상황 또는 강의 검색
              </label>
              <input
                id="lesson-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="예: 공항, 체크인, 결제"
                className="min-h-11 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="flex size-11 shrink-0 items-center justify-center rounded-2xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="검색어 지우기"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2" aria-label="레벨 필터">
              {(["all", "basic", "advanced"] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={level === filter}
                  onClick={() => {
                    setLevel(filter);
                    setCategoryId(null);
                  }}
                  className="min-h-11 rounded-full border border-border bg-surface px-5 text-sm font-semibold transition-[background-color,color,border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:border-brand aria-pressed:bg-brand aria-pressed:text-brand-foreground"
                >
                  {filter === "all" ? "전체" : levelLabel[filter]}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="categories" className="scroll-mt-28 px-4 pb-16 sm:px-6 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="section-kicker">8 travel moments</p>
                <h2 className="mt-2 font-heading text-2xl font-bold tracking-[-0.035em] sm:text-3xl">
                  여행 상황
                </h2>
              </div>
              {categoryId ? (
                <button
                  type="button"
                  onClick={() => setCategoryId(null)}
                  className="min-h-11 rounded-full px-4 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  선택 해제
                </button>
              ) : null}
            </div>

            {visibleCategories.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                {visibleCategories.map((category) => {
                  const Icon = iconMap[category.icon];
                  const categoryLessonCount = lessons.filter(
                    (lesson) =>
                      lesson.categoryId === category.id &&
                      (level === "all" || lesson.level === level),
                  ).length;
                  const selected = categoryId === category.id;

                  return (
                    <button
                      key={category.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        setCategoryId(selected ? null : category.id);
                        if (!selected) {
                          document
                            .getElementById("lessons")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="group min-h-48 rounded-[1.6rem] border border-border bg-surface p-4 text-left shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-brand/35 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:border-brand aria-pressed:ring-2 aria-pressed:ring-brand/20 sm:min-h-52 sm:p-5"
                    >
                      <span className={`flex size-12 items-center justify-center rounded-2xl ${toneClassMap[category.tone]}`}>
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="mt-5 block font-heading text-base font-bold tracking-[-0.02em] sm:text-lg">
                        {category.name}
                      </span>
                      <span className="mt-1 block text-xs font-semibold text-muted-foreground">
                        {category.englishName}
                      </span>
                      <span className="mt-3 line-clamp-2 block text-sm leading-5 text-muted-foreground">
                        {category.description}
                      </span>
                      <span className="mt-4 flex items-center justify-between text-xs font-bold text-brand">
                        {categoryLessonCount}개 강의
                        <ArrowRight className="size-4 transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <EmptySearch query={query} onReset={() => setQuery("")} />
            )}
          </div>
        </section>

        <section id="lessons" className="scroll-mt-28 border-y border-border bg-surface-subtle px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="section-kicker">Start small</p>
                <h2 className="mt-2 font-heading text-2xl font-bold tracking-[-0.035em] sm:text-3xl">
                  바로 시작할 강의
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                  선택한 조건에 맞는 공개 강의만 보여드려요.
                </p>
              </div>
              <p className="text-sm font-semibold text-muted-foreground" aria-live="polite">
                {visibleLessons.length}개 강의
              </p>
            </div>

            {visibleLessons.length > 0 ? (
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {visibleLessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    category={categories.find(
                      (category) => category.id === lesson.categoryId,
                    )}
                  />
                ))}
              </div>
            ) : (
              <EmptySearch
                query={query}
                onReset={() => {
                  setQuery("");
                  setLevel("all");
                  setCategoryId(null);
                }}
              />
            )}
          </div>
        </section>

        <section id="recent" className="scroll-mt-28 px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-soft text-brand-soft-foreground">
                  <Clock3 className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold tracking-[0.14em] text-brand uppercase">Continue</p>
                  <h2 className="mt-1 font-heading text-xl font-bold tracking-[-0.025em] sm:text-2xl">
                    최근 학습
                  </h2>
                </div>
              </div>

              {recentLessons.length > 0 ? (
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {recentLessons.slice(0, 5).map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      category={categories.find(
                        (category) => category.id === lesson.categoryId,
                      )}
                      compact
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-[1.35rem] bg-surface-subtle px-5 py-8 text-center">
                  <BookOpen className="mx-auto size-6 text-muted-foreground" aria-hidden="true" />
                  <p className="mt-3 font-semibold">아직 학습한 강의가 없어요.</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    강의를 시작하면 최근 학습 5개를 이곳에서 이어볼 수 있어요.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-foreground">Trip English</p>
          <p>여행에서 바로 쓰는 생활 영어</p>
        </div>
      </footer>

      <nav className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden" aria-label="모바일 주요 메뉴">
        <div className="glass-surface mx-auto grid max-w-sm grid-cols-3 rounded-[1.35rem] p-1.5 shadow-glass">
          <MobileNavLink href="#top" icon={<Plane />} label="홈" />
          <MobileNavLink href="#categories" icon={<Map />} label="상황" />
          <MobileNavLink href="#recent" icon={<Clock3 />} label="최근" />
        </div>
      </nav>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="flex min-h-11 items-center rounded-full px-4 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
    </a>
  );
}

function LevelButton({
  description,
  eyebrow,
  onClick,
  selected,
  title,
}: {
  description: string;
  eyebrow: string;
  onClick: () => void;
  selected: boolean;
  title: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className="group min-h-28 rounded-[1.4rem] border border-border bg-surface p-4 text-left shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:border-brand aria-pressed:ring-2 aria-pressed:ring-brand/20 sm:p-5"
    >
      <span className="block text-xs font-bold text-brand">{eyebrow}</span>
      <span className="mt-1 flex items-center justify-between font-heading text-lg font-bold tracking-[-0.025em]">
        {title}
        <ArrowRight className="size-4 text-brand transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true" />
      </span>
      <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
    </button>
  );
}

function LessonCard({
  category,
  compact = false,
  lesson,
}: {
  category?: TravelCategory;
  compact?: boolean;
  lesson: LessonSummary;
}) {
  return (
    <article className={`rounded-[1.5rem] border border-border bg-surface shadow-sm ${compact ? "p-4" : "p-5 sm:p-6"}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-bold text-brand-soft-foreground">
          {levelLabel[lesson.level]}
        </span>
        <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
          <Clock3 className="size-3.5" aria-hidden="true" />
          {lesson.durationMinutes}분
        </span>
      </div>
      <p className="mt-4 text-xs font-bold text-brand">{category?.name}</p>
      <h3 className="mt-1 font-heading text-lg font-bold tracking-[-0.025em]">
        {lesson.title}
      </h3>
      {!compact ? (
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {lesson.summary}
        </p>
      ) : null}
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs font-semibold text-muted-foreground">
        <span>핵심 표현 {lesson.expressionCount}개</span>
        <span>강의 목록에서 학습</span>
      </div>
    </article>
  );
}

function EmptySearch({ query, onReset }: { query: string; onReset: () => void }) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-border bg-surface px-5 py-12 text-center">
      <Search className="mx-auto size-6 text-muted-foreground" aria-hidden="true" />
      <p className="mt-3 font-semibold">
        {query ? `“${query}”에 맞는 결과가 없어요.` : "조건에 맞는 강의가 없어요."}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">다른 여행 상황이나 짧은 검색어로 찾아보세요.</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 min-h-11 rounded-full bg-brand-soft px-5 text-sm font-bold text-brand-soft-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        전체 보기
      </button>
    </div>
  );
}

function MobileNavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[0.7rem] font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4"
    >
      {icon}
      {label}
    </a>
  );
}
