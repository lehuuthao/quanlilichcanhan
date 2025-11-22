"use client";

import Calendar from "@/components/Events/Calendar";

export default function TagsPage() {
  return (
    <div className="min-h-screen w-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md w-full p-6 flex flex-col md:flex-row justify-between items-center sticky top-0 z-20">
        <h1 className="text-3xl font-bold text-gray-800">Manage Tags</h1>
        <p className="text-gray-500 mt-2 md:mt-0">
          Create, edit, and manage your calendar events easily
        </p>
      </header>

      {/* Calendar container full screen */}
      <main className="flex-1 w-[60%] h-full justify-center mx-auto mt-10 mb-10">
        <Calendar />
      </main>
    </div>
  );
}
