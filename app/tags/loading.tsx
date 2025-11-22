import Spinner from "@/components/Spinner";
import React from "react";

const PageLoading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-rafl_violet-300/50">
      <Spinner />
    </div>
  );
};

export default PageLoading;
