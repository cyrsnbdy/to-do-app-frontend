import Logo from "@/images/to-do.png";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Loading() {
  const navigate = useNavigate();

  const basicToken = localStorage.getItem("basicToken");
  let userEmail = "";
  if (basicToken) {
    try {
      const decoded = atob(basicToken);
      userEmail = decoded.split(":")[0];
    } catch {
      userEmail = "";
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/tasks");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="bg-[#1E319D] w-screen h-screen flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="text-white text-center text-xl">
        <span>Welcome! </span>
        <span className="font-bold">{userEmail || "username"}</span>
      </div>
      <div>
        <img src={Logo} alt="Logo" className="w-55 p-4 pb-6" />
      </div>

      <div className="pb-45">
        <div className="w-13 h-13 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    </motion.div>
  );
}

export default Loading;
