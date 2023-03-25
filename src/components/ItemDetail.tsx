import React from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { RiGitRepositoryLine } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import { UserDetail } from "../types/UserDetail";
import { useState, useEffect } from "react";
import { Repos } from "../types/Repos";
import RepoItem from "./RepoItem";
import { useContext } from "react";
import DetailContext from "../context/detailContext";

interface Props {
  detail: UserDetail;
  isLoading: boolean;
}

export default function ItemDetail({ detail, isLoading }: Props) {
  const { setUser } = useContext(DetailContext);
  const [repo, setRepo] = useState<Repos[] | null>(null);
  const [loadingRepo, setLoadingRepo] = useState(false);

  useEffect(() => {
    setLoadingRepo(true);
    fetch(`https://api.github.com/users/${detail.login}/repos`)
      .then((res) => res.json())
      .then((data) => {
        const repo: Repos[] = data;
        setRepo(repo);
      })
      .finally(() => {
        setLoadingRepo(false);
      });
  }, [detail]);

  return (
    <motion.div
      initial={{ opacity: 0, x: "-50px" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="grow lg:flex flex-col mx-8 relative"
    >
      {isLoading ? (
        <div className="flex justify-center mt-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
        </div>
      ) : (
        <>
          <button
            onClick={(e: React.MouseEvent) => {
              setUser?.("", true);
            }}
            className="absolute lg:hidden flex items-center left-0 bg-gray-300 p-4 shadow-sm rounded-full"
          >
            <MdKeyboardArrowLeft />
          </button>
          <div className="flex xl:space-x-4 flex-col xl:flex-row space-y-4">
            <img
              src={detail.avatar_url}
              alt=""
              className="rounded-full h-40 w-40 object-cover self-center lg:self-start"
            />
            <div className="flex flex-col py-[2px] grow">
              <div className="flex space-x-8 grow ">
                <div className="flex flex-col w-full mb-4">
                  <h2 className="text-xl text-gray-800 mb-1">
                    {detail.name === null ? detail.login : detail.name}
                  </h2>
                  <p className="text-gray-600 text-sm">@&nbsp;{detail.login}</p>
                  <p className="text-gray-600 flex items-center text-sm">
                    <HiOutlineLocationMarker /> &nbsp;
                    <span>{detail.location}</span>
                  </p>
                </div>
                <a
                  href={detail.html_url}
                  target="blank"
                  className="min-w-max text-xs flex items-center space-x-4 bg-gray-200 rounded-md text-center py-2 pr-3 pl-5 shadow-sm hover:bg-gray-800 hover:text-gray-50 transition-all self-start "
                >
                  <span>Visit</span>
                  <MdKeyboardArrowRight />
                </a>
              </div>

              <div className="flex flex-wrap text-base mt-auto mb-2">
                <p className="mr-8">
                  <span className="font-bold ">{detail.followers}</span>
                  &nbsp; Followers
                </p>
                <p className=" mr-8">
                  <span className="font-bold">{detail.following}</span>
                  &nbsp; Following
                </p>
                <p className="">
                  <span className="font-bold">{detail.public_repos}</span>&nbsp;
                  Total Repositories
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h2 className="flex items-center space text-lg">
              <RiGitRepositoryLine /> &nbsp;
              <span>{detail.login}'s Repositories</span>
            </h2>
            <div className="flex flex-col mt-4 space-y-4">
              {detail.public_repos === 0 && (
                <p className="italic">{`There is no public repositories in this account`}</p>
              )}
              {loadingRepo ? (
                <div className="flex justify-center mt-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
                </div>
              ) : (
                <>
                  {repo?.map((repoDetail, index) => (
                    <RepoItem key={index} detail={repoDetail} />
                  ))}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
