"use client";

import TagList from "@/components/tags/TagList";

export default function TagsPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Manage Tags</h1>
      <TagList />
    </div>
  );
}
