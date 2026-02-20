import Button from "@/components/ButtonComponents.tsx";
import ModalPopup from "@/components/ModalPopup";
import TextComponents from "@/components/TextComponents";
import Logo from "@/images/to-do.png";
import { useAuthStore } from "@/stores/auth/auth.store";
import type { LoginDto } from "@/types/account/account.type";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckboxComponent from "./components/CheckboxComponent";
import InputFields from "./components/InputFields";

function Login() {
  const savedEmail = localStorage.getItem("rememberedEmail") || "";

  const [form, setForm] = useState<Partial<LoginDto>>({
    email: savedEmail,
    password: "",
  });

  const [accepted, setAccepted] = useState(!!savedEmail);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const [showPopup, setShowPopup] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const { loading, setLogin } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setModalTitle("Validation Error");
      setModalMessage("Please fix the highlighted fields.");
      setShowPopup(true);
      return false;
    }

    return true;
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (accepted && form.email) {
      localStorage.setItem("rememberedEmail", form.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    const success = await setLogin(form as { email: string; password: string });

    if (success) {
      setModalTitle("Success 🎉");
      setModalMessage("Login successful!");
      setShowPopup(true);
    } else {
      setModalTitle("Login Failed");
      setModalMessage("Invalid email or password.");
      setShowPopup(true);
    }
  };

  const handleRememberMe = (checked: boolean) => {
    setAccepted(checked);
    if (!checked) localStorage.removeItem("rememberedEmail");
  };

  useEffect(() => {
    if (!showPopup && modalTitle === "Success 🎉") {
      navigate("/loading");
    }
  }, [showPopup, modalTitle, navigate]);

  return (
    <div className="bg-[#1E319D] w-screen h-screen flex flex-col items-center justify-center">
      <div className="bg-white absolute inset-3.5 rounded-4xl">
        {/* Logo */}
        <div className="flex flex-col gap-2 justify-center items-center pt-40">
          <span>
            <img src={Logo} alt="Logo" className="w-50.5" />
          </span>
          <span className="text-[12px] px-20.5 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </span>
        </div>

        {/* Login Form */}
        <div className="flex flex-col justify-center items-center gap-2 pt-29">
          <span className="font-bold text-[25px] mx-auto">LOGIN</span>

          <form className="flex flex-col gap-2" onSubmit={submitForm}>
            <div className="flex flex-col gap-3.75 justify-center items-center">
              <div className="flex flex-col">
                <InputFields
                  type="email"
                  name="email"
                  value={form.email || ""}
                  placeholder="Email"
                  setValue={(value) => {
                    setForm({ ...form, email: value });
                    if (errors.email)
                      setErrors({ ...errors, email: undefined });
                  }}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <InputFields
                  type="password"
                  name="password"
                  value={form.password || ""}
                  placeholder="Password"
                  setValue={(value) => {
                    setForm({ ...form, password: value });
                    if (errors.password)
                      setErrors({ ...errors, password: undefined });
                  }}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col text-left gap-1 ml-3 self-start">
              <CheckboxComponent
                id="terms"
                label="Remember Me?"
                checked={accepted}
                onChange={handleRememberMe}
              />
            </div>

            <div className="flex flex-col mx-auto">
              <Button
                type="submit"
                id="login"
                name="login"
                label={loading ? "Logging in..." : "Login"}
                className="mt-4 px-30 py-1.5"
                disabled={loading}
              />

              <span className="mx-auto mt-1">
                <Link to="/forgot-password">
                  <TextComponents text="Forgot Password?" />
                </Link>
              </span>

              <span className="text-sm text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="font-bold">
                  <TextComponents text="Sign-up" />
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* ✅ Modal */}
      <ModalPopup
        isOpen={showPopup}
        title={modalTitle}
        message={modalMessage}
        type={
          modalTitle === "Success 🎉"
            ? "success"
            : modalTitle === "Login Failed"
              ? "error"
              : "warning"
        }
        autoCloseTime={3000}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
}

export default Login;
