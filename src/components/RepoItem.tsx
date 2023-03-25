import React from "react";
import { HiOutlineStar } from "react-icons/hi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Repos } from "../types/Repos";

interface Props {
  detail: Repos;
}

export default function RepoItem({ detail }: Props) {
  return (
    <div
      onClick={() => window.open(detail.html_url, "_blank")}
      className="hover:bg-gray-400 group w-full rounded-xl py-4 px-8 transition-all border-2 flex  items-center overflow-scroll scrollbar-hide"
    >
      <div className="flex flex-col">
        <h3 className="font-bold">{detail.name}</h3>
        <p className="text-gray-600 text-sm group-hover:text-gray-50 transition-all duration-300">
          {detail.description
            ? detail.description
            : "*this repository have no desc"}
        </p>
        <div className="flex mt-6 space-x-2 text-xs">
          <p className="bg-gray-600 lg:flex-row lg:gap-x-1 py-1 px-4 rounded-md justify-between text-gray-50 flex flex-col items-center">
            Size <span>{detail.size}</span>
          </p>
          <p className="bg-gray-600 lg:flex-row lg:gap-x-1 flex flex-col py-1 items-center px-4 rounded-md text-gray-50 justify-between">
            Watcher <span>{detail.watchers_count}</span>
          </p>
          <p className="flex flex-col lg:flex-row lg:gap-x-1 items-center justify-between bg-gray-600 py-1 px-4 rounded-md text-gray-50">
            <HiOutlineStar />
            <span>{detail.stargazers_count}</span>
          </p>
        </div>
      </div>
      <MdKeyboardArrowRight className="text-3xl ml-auto group-hover:translate-x-2 transition-all duration-300" />
    </div>
  );
}
