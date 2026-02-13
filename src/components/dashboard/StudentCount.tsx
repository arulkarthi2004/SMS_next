"use client";
import React from "react";
import { BoxIconLine, GroupIcon } from "@/icons";

export const StudentCount = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">

      {/* Total Students */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        
        <div className="flex items-center gap-4">
          
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl dark:bg-blue-900/20">
            <GroupIcon className="text-blue-600 size-6 dark:text-blue-400" />
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Students
            </span>

            <h4 className="font-bold text-gray-800 text-xl dark:text-white/90">
              3,782
            </h4>
          </div>

        </div>
      </div>

      {/* Active Students */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        
        <div className="flex items-center gap-4">
          
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-xl dark:bg-green-900/20">
            <BoxIconLine className="text-green-600 size-6 dark:text-green-400" />
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Active Students
            </span>

            <h4 className="font-bold text-gray-800 text-xl dark:text-white/90">
              5,359
            </h4>
          </div>

        </div>
      </div>

    </div>
  );
};
