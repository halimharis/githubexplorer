import { motion } from "framer-motion";
import { MdKeyboardArrowRight } from "react-icons/md";
import { User } from "../types/User";
import DetailContext from "../context/detailContext";
import { useContext } from "react";

interface Props {
  user: User;
}

export default function ResultItem({ user }: Props) {
  const { setUser } = useContext(DetailContext);
  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setUser?.(user.login, false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      onClick={handleOnClick}
      initial={{ opacity: 0, y: "-25px" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" }}
      className="border flex gap-x-3 rounded-xl overflow-hidden items-center hover:bg-gray-300 py-2 px-4 lg:py-4"
    >
      <img
        src={user?.avatar_url}
        alt=""
        className="object-cover h-8 w-8 rounded-full shadow-md"
      />
      <h3 className="font-bold text-sm">{user.login}</h3>
      <MdKeyboardArrowRight className="ml-auto text-lg" />
    </motion.div>
  );
}
