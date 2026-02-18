import Loading from "@/pages/authentication/components/Loading";
import Splashscreen from "@/pages/authentication/components/Splashscreen";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  useLocation,
} from "react-router-dom";
import { PageTransition } from "./components/PageTransition";
import ChangePassword from "./pages/authentication/ChangePassword";
import ConfirmCode from "./pages/authentication/ConfirmCode";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import Tasks from "./pages/manage-tasks/Tasks";

// Create a wrapper component that uses the location
function AppContent() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Splashscreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/send-code" element={<ConfirmCode />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <AppContent />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
