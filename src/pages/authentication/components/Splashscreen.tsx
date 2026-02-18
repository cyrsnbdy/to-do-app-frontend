import Logo from "@/images/to-do.png";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

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
      <div>
        <img src={Logo} alt="Logo" className="w-55 p-4 pb-6" />
      </div>

      <div className="pb-45">
        <div className="w-13 h-13 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    </motion.div>
  );
}

export default SplashScreen;
