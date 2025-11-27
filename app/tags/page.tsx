"use client";

import { useContext } from "react";
import Calendar from "@/components/Events/Calendar";
import { AppContext } from "@/contexts/app.context";
import { Button, LogOutIcon } from "evergreen-ui";
import { useRouter } from "next/navigation";

export default function TagsPage() {
  const { user, logOut } = useContext(AppContext);
  const router = useRouter();

  const logOutCore = () => {
    logOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white w-full p-6 flex flex-col md:flex-row justify-between items-center sticky top-0 z-20 border-b border-gray-200">
        {/* Title */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800">Manage Tags</h1>
          <p className="text-gray-500 mt-1 md:mt-0">
            Create, edit, and manage your calendar events easily
          </p>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-200">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* User details */}
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-gray-900 text-base">
                  {user.name}
                </span>
                <span className="text-sm text-gray-500">{user.email}</span>
              </div>

              {/* Logout */}
              <Button
                onClick={logOutCore}
                className="
                  w-12 h-12 
                  rounded-full 
                  bg-red-500 text-white 
                  flex items-center justify-center
                  hover:bg-red-600
                  transition-all
                "
              >
                <LogOutIcon size={24} />
              </Button>
            </div>
          ) : (
            <p className="text-gray-500 italic">No user</p>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-[95%] md:w-[70%] lg:w-[68%] h-full justify-center mx-auto mt-10 mb-10">
        <Calendar />
      </main>
    </div>
  );
}
