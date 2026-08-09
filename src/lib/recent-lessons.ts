"use client";

import { useSyncExternalStore } from "react";

export const RECENT_LESSONS_STORAGE_KEY = "trip-english-recent-lessons";

export interface RecentLessonEntry {
  lessonId: string;
  viewedAt: string;
}

const EMPTY_RECENT_LESSONS: RecentLessonEntry[] = [];
let cachedRawValue: string | null | undefined;
let cachedRecentLessons: RecentLessonEntry[] = EMPTY_RECENT_LESSONS;

function parseRecentLessons(value: string | null): RecentLessonEntry[] {
  if (!value) {
    return EMPTY_RECENT_LESSONS;
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return EMPTY_RECENT_LESSONS;
    }

    return parsed
      .filter(
        (entry): entry is RecentLessonEntry =>
          typeof entry === "object" &&
          entry !== null &&
          "lessonId" in entry &&
          typeof entry.lessonId === "string" &&
          "viewedAt" in entry &&
          typeof entry.viewedAt === "string",
      )
      .slice(0, 5);
  } catch {
    return EMPTY_RECENT_LESSONS;
  }
}

function getRecentLessonsSnapshot() {
  const currentRawValue = window.localStorage.getItem(
    RECENT_LESSONS_STORAGE_KEY,
  );

  if (currentRawValue !== cachedRawValue) {
    cachedRawValue = currentRawValue;
    cachedRecentLessons = parseRecentLessons(currentRawValue);
  }

  return cachedRecentLessons;
}

function subscribeToRecentLessons(onStoreChange: () => void) {
  const handleChange = () => {
    cachedRawValue = undefined;
    onStoreChange();
  };

  window.addEventListener("storage", handleChange);
  window.addEventListener("trip-english:recent-lessons", handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener("trip-english:recent-lessons", handleChange);
  };
}

export function useRecentLessons() {
  return useSyncExternalStore(
    subscribeToRecentLessons,
    getRecentLessonsSnapshot,
    () => EMPTY_RECENT_LESSONS,
  );
}

export function recordRecentLesson(lessonId: string) {
  const current = getRecentLessonsSnapshot().filter(
    (entry) => entry.lessonId !== lessonId,
  );
  const next = [
    { lessonId, viewedAt: new Date().toISOString() },
    ...current,
  ].slice(0, 5);

  window.localStorage.setItem(RECENT_LESSONS_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("trip-english:recent-lessons"));
}
