export type LearningLevel = "basic" | "advanced";

export type CategoryIcon =
  | "plane"
  | "passport"
  | "hotel"
  | "utensils"
  | "map"
  | "shopping"
  | "hospital"
  | "emergency";

export type CategoryTone = "sky" | "amber" | "mint" | "violet";

export interface TravelCategory {
  id: string;
  slug: string;
  name: string;
  englishName: string;
  description: string;
  icon: CategoryIcon;
  tone: CategoryTone;
  status: "published" | "draft" | "private";
}

export interface LessonSummary {
  id: string;
  slug: string;
  categoryId: string;
  level: LearningLevel;
  title: string;
  summary: string;
  durationMinutes: number;
  expressionCount: number;
  status: "published" | "draft" | "private";
}

const categories: TravelCategory[] = [
  {
    id: "cat-airport",
    slug: "airport-flight",
    name: "공항·기내",
    englishName: "Airport & Flight",
    description: "체크인부터 탑승, 기내 요청까지",
    icon: "plane",
    tone: "sky",
    status: "published",
  },
  {
    id: "cat-immigration",
    slug: "immigration-customs",
    name: "입국 심사·세관",
    englishName: "Immigration",
    description: "방문 목적과 체류 일정을 또렷하게",
    icon: "passport",
    tone: "violet",
    status: "published",
  },
  {
    id: "cat-hotel",
    slug: "hotel-stay",
    name: "호텔·숙소",
    englishName: "Hotel & Stay",
    description: "예약 확인부터 편의시설 요청까지",
    icon: "hotel",
    tone: "amber",
    status: "published",
  },
  {
    id: "cat-food",
    slug: "restaurant-cafe",
    name: "음식점·카페",
    englishName: "Food & Cafe",
    description: "주문, 알레르기 확인, 계산하기",
    icon: "utensils",
    tone: "mint",
    status: "published",
  },
  {
    id: "cat-transport",
    slug: "transport-directions",
    name: "교통·길 찾기",
    englishName: "Getting Around",
    description: "표를 사고 목적지까지 이동하기",
    icon: "map",
    tone: "sky",
    status: "published",
  },
  {
    id: "cat-shopping",
    slug: "shopping-payment",
    name: "쇼핑·결제",
    englishName: "Shopping",
    description: "가격, 사이즈, 결제 방법 묻기",
    icon: "shopping",
    tone: "violet",
    status: "published",
  },
  {
    id: "cat-medical",
    slug: "hospital-pharmacy",
    name: "병원·약국",
    englishName: "Medical Help",
    description: "증상을 설명하고 도움 요청하기",
    icon: "hospital",
    tone: "mint",
    status: "published",
  },
  {
    id: "cat-emergency",
    slug: "emergency",
    name: "긴급 상황",
    englishName: "Emergency",
    description: "분실과 사고에 침착하게 대응하기",
    icon: "emergency",
    tone: "amber",
    status: "published",
  },
];

const lessons: LessonSummary[] = [
  {
    id: "lesson-airport-check-in",
    slug: "airport-check-in",
    categoryId: "cat-airport",
    level: "basic",
    title: "공항 체크인 한 번에 끝내기",
    summary: "좌석과 수하물에 필요한 기본 표현을 익혀요.",
    durationMinutes: 8,
    expressionCount: 7,
    status: "published",
  },
  {
    id: "lesson-flight-request",
    slug: "in-flight-requests",
    categoryId: "cat-airport",
    level: "advanced",
    title: "기내에서 자연스럽게 요청하기",
    summary: "상황에 맞게 정중한 요청을 이어 가요.",
    durationMinutes: 11,
    expressionCount: 9,
    status: "published",
  },
  {
    id: "lesson-immigration-basics",
    slug: "immigration-basics",
    categoryId: "cat-immigration",
    level: "basic",
    title: "입국 심사 핵심 질문",
    summary: "방문 목적과 체류 기간을 짧게 답해요.",
    durationMinutes: 7,
    expressionCount: 6,
    status: "published",
  },
  {
    id: "lesson-hotel-check-in",
    slug: "hotel-check-in",
    categoryId: "cat-hotel",
    level: "basic",
    title: "호텔 체크인 시작하기",
    summary: "예약을 확인하고 필요한 정보를 물어봐요.",
    durationMinutes: 8,
    expressionCount: 7,
    status: "published",
  },
  {
    id: "lesson-hotel-problem",
    slug: "hotel-problem-solving",
    categoryId: "cat-hotel",
    level: "advanced",
    title: "객실 문제 정중하게 해결하기",
    summary: "문제를 설명하고 가능한 해결책을 요청해요.",
    durationMinutes: 12,
    expressionCount: 10,
    status: "published",
  },
  {
    id: "lesson-food-order",
    slug: "ordering-food",
    categoryId: "cat-food",
    level: "basic",
    title: "메뉴를 고르고 주문하기",
    summary: "추천 메뉴를 묻고 원하는 음식을 주문해요.",
    durationMinutes: 9,
    expressionCount: 8,
    status: "published",
  },
  {
    id: "lesson-transport-ticket",
    slug: "buying-a-ticket",
    categoryId: "cat-transport",
    level: "basic",
    title: "교통표 사고 길 묻기",
    summary: "목적지와 출발 시간을 확인하며 이동해요.",
    durationMinutes: 8,
    expressionCount: 7,
    status: "published",
  },
  {
    id: "lesson-shopping-size",
    slug: "sizes-and-payment",
    categoryId: "cat-shopping",
    level: "basic",
    title: "사이즈 확인하고 결제하기",
    summary: "다른 옵션을 부탁하고 결제 방법을 확인해요.",
    durationMinutes: 8,
    expressionCount: 7,
    status: "published",
  },
  {
    id: "lesson-medical-symptoms",
    slug: "explaining-symptoms",
    categoryId: "cat-medical",
    level: "basic",
    title: "아픈 증상 정확히 설명하기",
    summary: "증상과 지속 시간을 간단명료하게 말해요.",
    durationMinutes: 10,
    expressionCount: 8,
    status: "published",
  },
  {
    id: "lesson-medical-details",
    slug: "medical-details",
    categoryId: "cat-medical",
    level: "advanced",
    title: "진료 중 상세 질문에 답하기",
    summary: "복용 약과 알레르기 등 중요한 정보를 전달해요.",
    durationMinutes: 13,
    expressionCount: 10,
    status: "draft",
  },
  {
    id: "lesson-emergency-help",
    slug: "asking-for-emergency-help",
    categoryId: "cat-emergency",
    level: "basic",
    title: "긴급 도움 요청하기",
    summary: "현재 위치와 필요한 도움을 분명하게 알려요.",
    durationMinutes: 7,
    expressionCount: 6,
    status: "published",
  },
];

export function getPublicCategories() {
  return categories.filter((category) => category.status === "published");
}

export function getPublicLessons() {
  return lessons.filter((lesson) => lesson.status === "published");
}
